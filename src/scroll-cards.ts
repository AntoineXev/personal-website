import { scroll } from 'motion'
import { cardConfigs, type CardConfig } from './cards'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}

// y = distance from center in vh, based on scroll progress.
// Fade in/out when the card is near the viewport edges (±100vh).
function frame(cfg: CardConfig, progress: number) {
  const y = (progress - cfg.centerAt) * cfg.speed

  // Rotation interpolated from y position relative to travel range
  const t = clamp((y + 130) / 260, 0, 1)
  const rotate = lerp(cfg.rotateStart, cfg.rotateEnd, t)

  // Fade based on y: fully visible when |y| < 80vh, fades out approaching ±120vh
  const absY = Math.abs(y)
  const opacity = absY > 120 ? 0 : absY > 80 ? 1 - (absY - 80) / 40 : 1

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
