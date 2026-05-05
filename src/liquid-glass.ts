type Surface = 'convex' | 'concave'

export const FILTER_ID = 'liquid-glass-filter'
export const liquidGlassFilterCss = `url(#${FILTER_ID})`

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

// At each pixel: R = 128 + dx*127, G = 128 + dy*127, where (dx, dy) ∈ [-1, 1] is
// the refraction vector. (128, 128) = no displacement. Each pixel sums the
// influence of all four edges independently — corners get diagonal refraction,
// the centre stays untouched.
function generateDisplacementMap(
  w: number,
  h: number,
  edgeRatio: number,
  strength: number,
  surface: Surface,
): string {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  const img = ctx.createImageData(w, h)
  const data = img.data

  const edgePx = Math.min(w, h) * edgeRatio
  const sign = surface === 'concave' ? -1 : 1

  const edgeFade = (d: number) => {
    const t = clamp(d / edgePx, 0, 1)
    return (1 - t) * (1 - t)
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const xRefr = edgeFade(x) - edgeFade(w - 1 - x)
      const yRefr = edgeFade(y) - edgeFade(h - 1 - y)
      const dx = xRefr * strength * sign
      const dy = yRefr * strength * sign
      data[i + 0] = clamp(Math.round(128 + dx * 127), 0, 255)
      data[i + 1] = clamp(Math.round(128 + dy * 127), 0, 255)
      data[i + 2] = 128
      data[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL('image/png')
}

export function supportsLiquidGlass() {
  return typeof window !== 'undefined' && 'chrome' in window
}

export function mountLiquidGlassFilter(
  opts: {
    width?: number
    height?: number
    edgeRatio?: number
    strength?: number
    scale?: number
    surface?: Surface
  } = {},
) {
  const {
    width = 280,
    height = 360,
    edgeRatio = 0.20,
    strength = 1,
    scale = 2,
    surface = 'convex',
  } = opts

  const mapUrl = generateDisplacementMap(width, height, edgeRatio, strength, surface)

  const SVG_NS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'

  const defs = document.createElementNS(SVG_NS, 'defs')
  const filter = document.createElementNS(SVG_NS, 'filter')
  filter.setAttribute('id', FILTER_ID)
  filter.setAttribute('x', '0%')
  filter.setAttribute('y', '0%')
  filter.setAttribute('width', '100%')
  filter.setAttribute('height', '100%')

  const feImage = document.createElementNS(SVG_NS, 'feImage')
  feImage.setAttribute('href', mapUrl)
  feImage.setAttribute('x', '0%')
  feImage.setAttribute('y', '0%')
  feImage.setAttribute('width', '100%')
  feImage.setAttribute('height', '100%')
  feImage.setAttribute('result', 'displacementMap')
  feImage.setAttribute('preserveAspectRatio', 'none')

  const feDisp = document.createElementNS(SVG_NS, 'feDisplacementMap')
  feDisp.setAttribute('in', 'SourceGraphic')
  feDisp.setAttribute('in2', 'displacementMap')
  feDisp.setAttribute('scale', String(scale))
  feDisp.setAttribute('xChannelSelector', 'R')
  feDisp.setAttribute('yChannelSelector', 'G')

  filter.appendChild(feImage)
  filter.appendChild(feDisp)
  defs.appendChild(filter)
  svg.appendChild(defs)
  document.body.appendChild(svg)
}

const liquidGlassStyle =
  'backdrop-filter: blur(2px) ' +
  liquidGlassFilterCss +
  ' saturate(120%); -webkit-backdrop-filter: blur(2px) ' +
  liquidGlassFilterCss +
  ' saturate(120%); box-shadow: inset 0 1.5px 0 rgba(255,255,255,.35), inset 0 -1px 0 rgba(0,0,0,.18), 0 18px 36px -8px rgba(0,0,0,.45);'

export function applyLiquidGlassToCards() {
  if (!supportsLiquidGlass()) return
  const cards = document.querySelectorAll<HTMLElement>('[data-card-inner]')
  for (const c of cards) c.setAttribute('style', c.getAttribute('style') + ';' + liquidGlassStyle)
}
