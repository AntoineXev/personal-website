'use client'

import { useEffect, useState } from 'react'

type Surface = 'convex' | 'concave'

const FILTER_ID = 'liquid-glass-filter'

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

// Build a displacement map encoding refraction direction in R/G channels.
// At each pixel: R = 128 + dx*127, G = 128 + dy*127, where (dx, dy) ∈ [-1, 1] is
// the refraction vector. (128, 128) = no displacement (sample the same pixel).
//
// Each pixel sums the influence of all four edges independently — pixels near
// corners pick up both an X and a Y component (proper diagonal refraction)
// while the centre stays at 0,0. A convex lens magnifies, so left-edge pixels
// sample from the right (positive X) and so on.
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

  // Smooth ease-out from an edge: 1 right at the edge (d=0), 0 once we're
  // edgePx inside. Quadratic so the falloff feels natural rather than linear.
  const edgeFade = (d: number) => {
    const t = clamp(d / edgePx, 0, 1)
    return (1 - t) * (1 - t)
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4

      // Net X contribution: positive if closer to the left edge, negative if
      // closer to the right. At the centre both fades are ≈ 0 → no displacement.
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

type LiquidGlassFilterProps = {
  /** SVG `<filter>` id — reference it via `backdrop-filter: url(#id)`. */
  id?: string
  /** Reference map width in pixels. Stretched to element bounds via preserveAspectRatio="none". */
  width?: number
  /** Reference map height in pixels. */
  height?: number
  /** Edge band depth as a fraction of min(width, height). Larger = softer refraction zone. */
  edgeRatio?: number
  /** Refraction magnitude in [0, 1]. Higher = stronger bend at the edge. */
  strength?: number
  /** Final scale fed to feDisplacementMap (pixel offset multiplier). */
  scale?: number
  /** Convex glass bends light inward (lens-like); concave bends it outward. */
  surface?: Surface
}

/**
 * Renders the SVG filter that powers the liquid-glass refraction. Mount once
 * (e.g. in the root layout) — every glass element on the page references the
 * same filter via `backdrop-filter: url(#liquid-glass-filter)`.
 *
 * Browser support: only Chromium currently honours SVG filters in
 * backdrop-filter. Safari / Firefox silently ignore the URL ref and fall back
 * to whatever native `backdrop-filter` rules the element has (blur, saturate…).
 */
export function LiquidGlassFilter({
  id = FILTER_ID,
  width = 280,
  height = 360,
  edgeRatio = 0.09,
  strength = 0.75,
  scale = 60,
  surface = 'convex',
}: LiquidGlassFilterProps) {
  const [mapUrl, setMapUrl] = useState('')

  useEffect(() => {
    setMapUrl(generateDisplacementMap(width, height, edgeRatio, strength, surface))
  }, [width, height, edgeRatio, strength, surface])

  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%">
          {mapUrl && (
            <feImage
              href={mapUrl}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="displacementMap"
              preserveAspectRatio="none"
            />
          )}
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

/** CSS value to reference the filter from any element's `backdrop-filter`. */
export const liquidGlassFilterCss = `url(#${FILTER_ID})`

/** Detect Chromium-based browsers — only ones that actually render SVG filters in backdrop-filter. */
export function useSupportsLiquidGlass() {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    setSupported('chrome' in window)
  }, [])
  return supported
}
