"use client"

import { useRef, Fragment } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import logoXev from '@/images/logos/xev.svg'
import mlcAppImage from '@/images/mlc-apps.png'
import wodappImage from '@/images/wodapp.png'

gsap.registerPlugin(useGSAP)

interface Project {
  title: string
  subtitle: string
  image: StaticImageData
  href: string
}

const projects: Project[] = [
  {
    title: 'Xev.',
    subtitle: 'Agence web sur mesure pour logiciels métier.',
    image: logoXev,
    href: 'https://xev.agency',
  },
  {
    title: 'Mon Livret C',
    subtitle: 'Gestionnaire de fonds crypto-actifs.',
    image: mlcAppImage,
    href: 'https://monlivretc.com',
  },
  {
    title: 'Wodapp',
    subtitle: 'Outil de réservation de sport & CrossFit.',
    image: wodappImage,
    href: 'https://wodapp.fr',
  },
]

function DashSeparator({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <div className={clsx(className, vertical ? "h-full w-[2px] shrink-0" : "w-full h-[2px] shrink-0")}>
      <svg 
        width={vertical ? "2" : "4268"} 
        height={vertical ? "4268" : "2"} 
        fill="none" 
        className="text-zinc-200 dark:text-zinc-800 h-full w-full"
        preserveAspectRatio="none"
      >
        <path 
          stroke="currentColor" 
          strokeDasharray="9 8" 
          strokeWidth="1.5"
          d={vertical ? "M1 0v4267" : "M.5 1h4267"}
        />
      </svg>
    </div>
  )
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({ scope: panelRef })

  const onMouseEnter = contextSafe(() => {
    if (window.innerWidth < 1024) return

    gsap.to(panelRef.current, {
      flexGrow: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.01)',
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.1,
    })
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
    })
  })

  const onMouseLeave = contextSafe(() => {
    if (window.innerWidth < 1024) return

    gsap.to(panelRef.current, {
      flexGrow: 1,
      backgroundColor: 'transparent',
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
    })
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
    })
  })

  return (
    <div 
      ref={panelRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex-1 flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-white dark:bg-transparent"
    >
      {/* Background Number */}
      <div className="absolute top-10 left-10 text-9xl font-black text-[#ededef] dark:text-zinc-900/50 select-none">
        {index + 1}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Image Wrapper */}
        <div 
          ref={imageRef}
          className="relative w-40 h-40 md:w-56 md:h-56 mb-12 transition-transform duration-700 ease-out"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">
          {project.title}
        </h3>

        <div 
          ref={contentRef}
          className="lg:opacity-0 lg:translate-y-5 flex flex-col items-center gap-6 max-w-xs"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            {project.subtitle}
          </p>
          <Button href={project.href} target="_blank" hasArrow className="scale-90">
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between py-6 px-4 md:px-8 lg:px-12 gap-6">
        <h2 className="text-3xl font-medium">Mes Projets</h2>
      </div>

      <DashSeparator />
      <div className="flex flex-col lg:flex-row lg:h-[65vh]">
        {projects.map((project, index) => (
          <Fragment key={project.title}>
            <ProjectPanel 
              project={project} 
              index={index} 
            />
            {index < projects.length - 1 && (
              <>
                <DashSeparator vertical className="hidden lg:block h-full" />
                <DashSeparator className="lg:hidden w-full" />
              </>
            )}
          </Fragment>
        ))}
      </div>
      <DashSeparator />

      <div className="flex justify-end py-6 px-4 md:px-8 lg:px-12">
        <Button href="/projects" variant="secondary" className="group shrink-0">
          Voir tous les projets
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="ml-2 h-4 w-4 stroke-current transition group-hover:translate-x-1"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </section>
  )
}
