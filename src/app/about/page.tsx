import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/image-1.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-red-500 dark:text-zinc-200 dark:hover:text-red-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-red-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-6xl tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl mb-16">
            Concevoir des solutions qui améliorent la vie des autres.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-800 dark:text-zinc-200">
            <p>
              Je m'appele Antoine, et depuis mon plus jeune âge, je bricole divers projets. À l'âge de 13 ans, je réparais des écrans d'iPhone, une tâche assez complexe à l'époque, et je bidouillais les dernières consoles de jeu du marché. À 15 ans, j'ai transformé un vieil ordinateur familial en machine Mac (un hackintosh pour les initiés), utilisant alors OS X Tiger. Cette expérience m'a permis d'apprendre à manipuler les chargeurs de démarrage, les outils en ligne de commande et les fichiers kext. Un projet sympa !
            </p>
            <p>
              À cette époque, ma passion pour l'informatique n'était surpassée que par mon amour pour les baskets. Lorsque je ne passais pas mon temps libre sur un ordinateur, je faisais la queue devant les magasins pour acheter les dernières sneakers à la mode et les revendre le lendemain pour le triple de leur prix. Drôle, n'est-ce pas ?
            </p>
            <p>
              Cependant, j'ai tout arrêté entre 18 et 20 ans pour suivre un classe préparatoire, un pilier du système éducatif français, où j'ai étudié intensément les mathématiques et la physique (de 7h à 1h du matin). Ces deux années ont été les plus formatrices de ma vie. Par la suite, j'ai intégré l'école d'ingénieurs IMT Atlantique, anciennement Télécom Bretagne. Après mes études, j'ai tenté l'aventure entrepreneuriale en essayant de créer une marketplace dans le secteur des sneakers, qui malheureusement n'a pas abouti mais m'a beaucoup appris. Par la suite, je me suis installé à Berlin pour approfondir mes connaissances en développement web appliqué aux défis corporatifs.
            </p>
            <p>
              Aujourd'hui, je suis le fondateur de Xev., une agence de conseil et de développement de nouvelle génération. Nous travaillons à améliorer la vie des travailleurs en construisant des logiciels entièrement personnalisés pour répondre aux défis spécifiques des entreprises, en les aidant à tirer pleinement parti du web et des applications basées sur le cloud. Récemment, j'ai pris le poste de directeur général et CTO chez Mon livret C, un gestionnaire d'actifs français, où nous nous efforçons de développer et de commercialiser des produits financiers robustes basés sur les cryptomonnaies destinés aux banques et à l'ensemble du système financier traditionnel.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/antoinexev" icon={GitHubIcon} className="mt-4">
              Suivez-moi sur GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/ahervet/" icon={LinkedInIcon} className="mt-4">
              Suivez-moi sur Linkedin
            </SocialLink>
            <SocialLink
              href="mailto:hello@aher.vet"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              hello@aher.vet
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
