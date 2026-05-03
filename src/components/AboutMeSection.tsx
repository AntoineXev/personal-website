'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import image1 from '@/images/photos/groles.jpeg'
import image2 from '@/images/photos/image-4.jpg'
import image3 from '@/images/photos/mer.jpeg'
import image4 from '@/images/photos/cafe.jpeg'
import { liquidGlassFilterCss, useSupportsLiquidGlass } from './LiquidGlass'

type GalleryItem = {
  title: string
  subtitle: string
  image: StaticImageData
}

type CardConfig = {
  xPctDesktop: number
  xPctMobile: number
  scale: number
  rotateStart: number
  rotateEnd: number
  startPct: number
  travelPct: number
}

const gallery: GalleryItem[] = [
  { title: 'Groles', subtitle: "J'adore les groles", image: image1 },
  { title: 'Café', subtitle: 'Je carbure au café', image: image4 },
  { title: 'Code', subtitle: 'Le code ca me détends', image: image2 },
  { title: 'Nature', subtitle: "J'aime bien les balades", image: image3 },
]

// Per-card config — deterministic so positions stay stable across reloads / SSR.
// xPct       : horizontal anchor (% of stage width), distinct desktop/mobile
// scale      : depth-effect size variation
// rotate*    : rotation in degrees at start / end of fall
// startPct   : when (in section progress 0..1) the card begins falling
// travelPct  : how long the fall takes (smaller = faster card)
const cardConfigs: CardConfig[] = [
  { xPctDesktop: 14, xPctMobile: 4, scale: 0.95, rotateStart: -7, rotateEnd: 5, startPct: 0.00, travelPct: 0.55 },
  { xPctDesktop: 36, xPctMobile: 53, scale: 1.00, rotateStart: 4, rotateEnd: -3, startPct: 0.30, travelPct: 0.55 },
  { xPctDesktop: 58, xPctMobile: 4, scale: 0.88, rotateStart: -3, rotateEnd: 6, startPct: 0.15, travelPct: 0.55 },
  { xPctDesktop: 74, xPctMobile: 53, scale: 0.78, rotateStart: 6, rotateEnd: -4, startPct: 0.45, travelPct: 0.55 },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

function FallingCard({
  item,
  cfg,
  isDesktop,
  scrollYProgress,
  supportsLiquid,
}: {
  item: GalleryItem
  cfg: CardConfig
  isDesktop: boolean
  scrollYProgress: MotionValue<number>
  supportsLiquid: boolean
}) {
  const xPct = isDesktop ? cfg.xPctDesktop : cfg.xPctMobile
  const start = cfg.startPct
  const end = Math.min(1, cfg.startPct + cfg.travelPct)
  const fadeIn = start + (end - start) * 0.08
  const fadeOut = end - (end - start) * 0.08

  const y = useTransform(scrollYProgress, [start, end], ['-130vh', '130vh'])
  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [cfg.rotateStart, cfg.rotateEnd],
  )
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0],
  )

  // Apple-style liquid glass on Chromium:
  //   1. soft blur of the backdrop FIRST so harsh edges don't get distorted
  //   2. SVG displacement bends the softened content at the rim
  //   3. light saturate to keep colours lively
  // Inset highlights and a soft drop shadow give the "lit from above" specular
  // that Apple's material has.
  const liquidStyle = supportsLiquid
    ? {
        backdropFilter: `blur(2px) ${liquidGlassFilterCss} saturate(120%)`,
        WebkitBackdropFilter: `blur(2px) ${liquidGlassFilterCss} saturate(120%)`,
        boxShadow:
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.18), 0 18px 36px -8px rgba(0, 0, 0, 0.45)',
      }
    : undefined

  return (
    <div
      className="pointer-events-none absolute inset-y-0 flex items-center w-44 md:w-72"
      style={{ left: `${xPct}%` }}
    >
      <motion.div
        style={{ y, rotate, opacity, scale: cfg.scale, ...liquidStyle }}
        className="flex w-full flex-col overflow-hidden rounded-2xl bg-white/10 p-1 shadow-xl shadow-black/20 will-change-transform dark:bg-white/5"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 18rem, 11rem"
          />
        </div>
        <div className="px-2 pt-2 pb-1 text-left">
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
            {item.subtitle}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()
  const supportsLiquid = useSupportsLiquidGlass()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={sectionRef}
      id="aboutme-section"
      className="relative h-[500vh]"
    >
      {/* Single sticky stage: pins both the cards AND the text together for the section's scroll length */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Pinned text (behind the falling cards) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="pointer-events-auto mx-auto flex max-w-4xl flex-col items-center gap-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-lg border border-zinc-200 bg-white/80 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300">
              Bonjour, moi c&apos;est Antoine
            </div>
            <h2 style={{ fontFamily: 'var(--font-handwritten)' }} className="text-3xl leading-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Intéressé par l'art de construire des trucs (des objets, des applications, des équipes, des entreprises...) et le processus créatif inhérent et sous-jacent.

            </h2>
          </div>
        </div>

        {/* Cards layer (in front of the text) */}
        <div className="absolute inset-0 z-20">
          {cardConfigs.map((cfg, idx) => (
            <FallingCard
              key={gallery[idx].title}
              item={gallery[idx]}
              cfg={cfg}
              isDesktop={isDesktop}
              supportsLiquid={supportsLiquid}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
