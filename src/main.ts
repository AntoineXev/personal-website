import { mountLiquidGlassFilter, applyLiquidGlassToCards } from './liquid-glass'
import { initScrollCards } from './scroll-cards'

// Dark mode: follow the system, no toggle.
const darkMq = window.matchMedia('(prefers-color-scheme: dark)')
const applyDark = () => document.documentElement.classList.toggle('dark', darkMq.matches)
applyDark()
darkMq.addEventListener('change', applyDark)

mountLiquidGlassFilter()
applyLiquidGlassToCards()
initScrollCards()
