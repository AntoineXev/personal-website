import { scroll } from 'motion'
import { cardConfigs, type CardConfig } from './cards'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

// Given section progress 0..1, return per-card { y, rotate, opacity }.
// Mirrors useTransform mappings from the original AboutMeSection.
function frame(cfg: CardConfig, p: number) {
  const start = cfg.startPct
  const end = Math.min(1, cfg.startPct + cfg.travelPct)
  const fadeIn = start + (end - start) * 0.08
  const fadeOut = end - (end - start) * 0.08

  const t = clamp01((p - start) / (end - start))
  // y: -130vh → 130vh linearly between start and end (clamped outside)
  const y = lerp(-130, 130, t)
  const rotate = lerp(cfg.rotateStart, cfg.rotateEnd, t)

  let opacity: number
  if (p <= start || p >= end) opacity = 0
  else if (p < fadeIn) opacity = (p - start) / (fadeIn - start)
  else if (p > fadeOut) opacity = (end - p) / (end - fadeOut)
  else opacity = 1

  return { y, rotate, opacity }
}

export function initScrollCards() {
  const section = document.getElementById('aboutme-section')
  if (!section) return

  const desktopMq = window.matchMedia('(min-width: 768px)')
  const positioners = Array.from(
    section.querySelectorAll<HTMLElement>('[data-card-pos]'),
  )
  const inners = Array.from(
    section.querySelectorAll<HTMLElement>('[data-card-inner]'),
  )

  function applyXPositions() {
    const isDesktop = desktopMq.matches
    positioners.forEach((el, idx) => {
      const cfg = cardConfigs[idx]
      el.style.left = `${isDesktop ? cfg.xPctDesktop : cfg.xPctMobile}%`
    })
  }
  applyXPositions()
  desktopMq.addEventListener('change', applyXPositions)

  scroll(
    (progress: number) => {
      for (let i = 0; i < cardConfigs.length; i++) {
        const cfg = cardConfigs[i]
        const f = frame(cfg, progress)
        const el = inners[i]
        if (!el) continue
        el.style.transform = `translateY(${f.y}vh) rotate(${f.rotate}deg) scale(${cfg.scale})`
        el.style.opacity = String(f.opacity)
      }
    },
    { target: section, offset: ['start start', 'end end'] },
  )
}
