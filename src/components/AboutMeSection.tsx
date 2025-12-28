"use client"

import Image from 'next/image'
import { Container } from '@/components/Container'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'

const gallery = [
  {
    title: 'Lyon',
    subtitle: 'Lyon est ma maison',
    image: image1,
  },
  {
    title: 'Code',
    subtitle: 'Le code est mon carburant',
    image: image2,
  },
  {
    title: 'Nature',
    subtitle: "L'esprit s'éclaircit dans la nature",
    image: image3,
  },
  {
    title: 'Remote',
    subtitle: 'À distance, mais toujours proche',
    image: image4,
  },
]

const stats = [
  { label: 'Projets complétés', value: '10+' },
  { label: "Années d'expérience", value: '8+' },
  { label: 'Confiance des fondateurs', value: 'Trusted' },
]

export function AboutMeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinTextRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const cards = [
    {
      ...gallery[0],
      className: '',
    },
    {
      ...gallery[1],
      className: 'col-start-10 row-start-2',
    },
    {
      ...gallery[2],
      className: 'col-start-3 row-start-3',
    },
    {
      ...gallery[3],
      className: 'col-start-8 row-start-4',
    },
  ]

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const timeline = gsap.timeline({
        id: 'aboutme-waterfall',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinTextRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cardsRef.current.forEach((card, idx) => {
        if (!card) return

        const fromY = () => window.innerHeight 
        const toY = () => - window.innerHeight

        timeline.fromTo(
          card,
          { y: fromY, opacity: 1 },
          { y: toY, opacity: 1, ease: 'none' },
          0.025
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <div       ref={sectionRef}>
      			<div className="relative w-full h-16 z-10   border-t   border-gray-200 dark:border-gray-800" style={{boxShadow:  '0px -15px 15px rgba(0, 0, 0, 0.2)'}}></div>
            <section
      id="aboutme-section"
      className="relative h-[300vh]"
    >

      {/* Layer des cartes qui tombent au-dessus du texte */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative w-full px-28">
          <div className="relative grid grid-flow-col grid-rows-4 w-full grid-cols-12 gap-3">
            {cards.map((item, idx) => (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`pointer-events-none w-44 sm:w-52 lg:w-64 ${item.className} will-change-transform`}
              >
                <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-1 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-700/60">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 13rem, 10rem"
                    />
                  </div>
                  <div className="px-2 pt-1 pb-1 text-left">
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container id="aboutme-container" className="relative h-full">
        <div
        ref={pinTextRef}
          className="sticky top-6 z-10 mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center gap-6 text-center rounded-3xl bg-white/95 p-8 backdrop-blur-sm dark:bg-zinc-950/90"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:text-zinc-300">
            Bonjour, moi c&apos;est Antoine
          </div>
          <h2 className="text-xl font-serif font-italic font-medium leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            Je crée des sites qui inspirent confiance et convertissent
          </h2>
        </div>
      </Container>
    </section>
    </div>

  )
}
