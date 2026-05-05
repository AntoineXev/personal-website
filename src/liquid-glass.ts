export const FILTER_ID = 'liquid-glass-filter'
export const liquidGlassFilterCss = `url(#${FILTER_ID})`

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

// --- Displacement map generation ---

// Signed distance from point to a rounded rectangle border (negative = inside).
function sdRoundedRect(px: number, py: number, w: number, h: number, r: number): number {
  const cx = w / 2, cy = h / 2
  const qx = Math.abs(px - cx) - (cx - r)
  const qy = Math.abs(py - cy) - (cy - r)
  const outside = Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2)
  const inside = Math.min(Math.max(qx, qy), 0)
  return outside + inside - r
}

// Build displacement map using a smooth cubic falloff from the border.
// This matches the kube.io reference pattern: max displacement at edge,
// smooth (1-t)³ decay over bezelWidth pixels, neutral in the center.
function generateDisplacementMap(
  w: number,
  h: number,
  cornerRadius: number,
  bezelWidth: number,
): string {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const d = img.data

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const i = (py * w + px) * 4

      // Signed distance to rounded-rect border (negative inside)
      const sd = sdRoundedRect(px, py, w, h, cornerRadius)
      // t: 0 at edge → 1 at bezelWidth deep inside
      const t = clamp(-sd / bezelWidth, 0, 1)

      // Smooth cubic falloff: 1 at edge, 0 deep inside (matches kube.io reference)
      const mag = (1 - t) * (1 - t) * (1 - t)

      // Direction: SDF gradient (points outward from border), then negate for inward displacement
      const eps = 1
      const sdR = sdRoundedRect(px + eps, py, w, h, cornerRadius)
      const sdL = sdRoundedRect(px - eps, py, w, h, cornerRadius)
      const sdD = sdRoundedRect(px, py + eps, w, h, cornerRadius)
      const sdU = sdRoundedRect(px, py - eps, w, h, cornerRadius)
      let gx = (sdR - sdL) / (2 * eps)
      let gy = (sdD - sdU) / (2 * eps)
      const glen = Math.sqrt(gx * gx + gy * gy) || 1
      gx /= glen
      gy /= glen

      const dx = -gx * mag
      const dy = -gy * mag

      d[i + 0] = clamp(Math.round(128 + dx * 127), 0, 255)
      d[i + 1] = clamp(Math.round(128 + dy * 127), 0, 255)
      d[i + 2] = 128
      d[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}

// Specular highlight: radial gradient, brighter top-left
function generateSpecularMap(w: number, h: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const grad = ctx.createRadialGradient(
    w * 0.38, h * 0.3, 0,
    w * 0.5, h * 0.5, Math.min(w, h) * 0.55,
  )
  grad.addColorStop(0, 'rgba(255,255,255,0.6)')
  grad.addColorStop(0.3, 'rgba(255,255,255,0.12)')
  grad.addColorStop(0.7, 'rgba(255,255,255,0.0)')
  grad.addColorStop(1, 'rgba(0,0,0,0.0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
  return canvas.toDataURL('image/png')
}

// --- Mount ---

export function supportsLiquidGlass() {
  return typeof window !== 'undefined' && 'chrome' in window
}

export function mountLiquidGlassFilter(
  opts: {
    width?: number
    height?: number
    scale?: number
    bezelWidth?: number
    cornerRadius?: number
    specularOpacity?: number
    saturation?: number
  } = {},
) {
  const {
    width = 280,
    height = 360,
    scale = 60,
    bezelWidth = 40,
    cornerRadius = 16,
    specularOpacity = 0.5,
    saturation = 9,
  } = opts

  const mapUrl = generateDisplacementMap(width, height, cornerRadius, bezelWidth)
  const specularUrl = generateSpecularMap(width, height)

  const NS = 'http://www.w3.org/2000/svg'
  const el = (tag: string, attrs: Record<string, string>) => {
    const e = document.createElementNS(NS, tag)
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v)
    return e
  }

  // colorInterpolationFilters="sRGB" is critical — without it, the browser
  // interprets displacement values in linearRGB, distorting the neutral point (128).
  const svg = el('svg', {
    'aria-hidden': 'true',
    width: '0',
    height: '0',
    colorInterpolationFilters: 'sRGB',
  })
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'

  const defs = el('defs', {})
  const filter = el('filter', {
    id: FILTER_ID, x: '0%', y: '0%', width: '100%', height: '100%',
  })

  // Refraction displacement
  filter.appendChild(el('feImage', {
    href: mapUrl, x: '0%', y: '0%', width: '100%', height: '100%',
    result: 'displacement_map', preserveAspectRatio: 'none',
  }))
  filter.appendChild(el('feDisplacementMap', {
    in: 'SourceGraphic', in2: 'displacement_map',
    scale: String(scale),
    xChannelSelector: 'R', yChannelSelector: 'G',
    result: 'displaced',
  }))

  // Saturation
  filter.appendChild(el('feColorMatrix', {
    in: 'displaced', type: 'saturate',
    values: String(saturation), result: 'displaced_saturated',
  }))

  // Specular highlight
  filter.appendChild(el('feImage', {
    href: specularUrl, x: '0%', y: '0%', width: '100%', height: '100%',
    result: 'specular_layer', preserveAspectRatio: 'none',
  }))
  filter.appendChild(el('feComposite', {
    in: 'displaced_saturated', in2: 'specular_layer',
    operator: 'in', result: 'specular_masked',
  }))
  const transfer = el('feComponentTransfer', {
    in: 'specular_layer', result: 'specular_faded',
  })
  transfer.appendChild(el('feFuncA', {
    type: 'linear', slope: String(specularOpacity),
  }))
  filter.appendChild(transfer)

  filter.appendChild(el('feBlend', {
    in: 'specular_masked', in2: 'displaced',
    mode: 'normal', result: 'withSpecular',
  }))
  filter.appendChild(el('feBlend', {
    in: 'specular_faded', in2: 'withSpecular',
    mode: 'normal',
  }))

  defs.appendChild(filter)
  svg.appendChild(defs)
  document.body.appendChild(svg)
}

export function applyLiquidGlassToCards() {
  if (!supportsLiquidGlass()) return
  const cards = document.querySelectorAll<HTMLElement>('[data-card-inner]')
  const bdFilter = `blur(0.3px) ${liquidGlassFilterCss} saturate(120%)`
  const shadow = 'inset 0 1.5px 0 rgba(255,255,255,.35), inset 0 -1px 0 rgba(0,0,0,.18), 0 18px 36px -8px rgba(0,0,0,.45)'
  for (const c of cards) {
    c.style.backdropFilter = bdFilter
    c.style.setProperty('-webkit-backdrop-filter', bdFilter)
    c.style.boxShadow = shadow
  }
}
