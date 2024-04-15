import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import logoMLC from '@/images/logos/mlc.svg'
import logoXev from '@/images/logos/xev.svg'
import logoBloom from '@/images/logos/bloom.svg'
import logoWeblaunch from '@/images/logos/weblaunch.svg'
import mlcAppImage from '@/images/mlc-apps.png'
import wodappImage from '@/images/wodapp.png'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import '../styles/global.scss';
import { ProjectExcerpt } from "@/components/ProjectExcerpt";


function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Lire l'article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="my-auto lg:basis-7/12 py-6 dark:border-zinc-700/40 lg:order-0 order-1"
    >
      <h2 className="flex mb-6 text-4xl text-zinc-900 dark:text-zinc-100">
       Un projet ?
      </h2>
      <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-100">
        Vous souhaitez travailler avec moi ? Vous avez un projet d'application que vous souhaitez développer ?
      </p>
      <p className="mt-4 text-sm text-zinc-800 dark:text-zinc-100">
        Entrez votre mail, je vous recontacterai le plus rapidement possible.
      </p>
      <div className="mt-8 flex flex-col items-start gap-6">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-400/10 sm:text-sm"
        />
        <Button variant="secondary" type="submit" className="">
          Discutons ensemble
          <ArrowDownIcon className="h-4 w-4 stroke-white transition group-active:stroke-gray-100 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50 -rotate-90" />
        </Button>
      </div>
    </form>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 bg-zinc-800 dark:ring-0">
        <div className="p-1 bg-zinc-800 rounded-full">
          <Image quality={80} src={role.logo} alt={role.title} width={100} height={100} className="h-6 w-6" unoptimized />
        </div>
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Xev.',
      title: 'P.D.G.',
      logo: logoXev,
      start: '2018',
      end: {
        label: 'Maintenant',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Mon Livret C',
      title: 'Directeur de la technologie',
      logo: logoMLC,
      start: '2023',
      end: {
        label: 'Maintenant',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Weblaunch',
      title: 'Directeur Général',
      logo: logoWeblaunch,
      start: '2016',
      end: '2022',
    },
    {
      company: 'Bloom Partners',
      title: 'Web developpeur & Shopify Expert',
      logo: logoBloom,
      start: '2019',
      end: '2021',
    },
  ]

  return (
    <div className="my-16 lg:order-1 order-0 flex-grow lg:basis-5/12 rounded-2xl bg-white dark:bg-zinc-800/50 border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Parcours</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="https://www.linkedin.com/in/ahervet" target="_blank" className="group mt-6 w-full">
        Voir le détail
      </Button>
    </div>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9 snap-center">
        <div className="max-w-5xl">
          <h1 className="text-6xl tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-7xl">
            Dev fullstack, fondateur et designer amateur.
          </h1>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/AntoineXevlabs"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/ahervet/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container>
        <ProjectExcerpt title={'Xev. — Une agence web sur mesure pour tous vos logiciels métier'} subtitle={'Du simple audit au développement et à la mise en place d\'ERP sur mesure, en passant par la connexion d\'outils, nous sommes capables de réaliser tout type d\'application métier.'} image={logoXev} imageAlt={'Logo de l\'entrprise Xev.'} buttonText={'Voir le projet'} href={'https://xev.agency'} />
      </Container>
      <Container>
        <ProjectExcerpt align={'right'} title={'Mon Livret C — Spécialiste de l’investissement en crypto-actifs'} subtitle={'Mon rôle est de concevoir, développer, et faire évoluer les outils et l\'environnemnt technique de ce gestionnaire de fond particulier.'} image={mlcAppImage} imageAlt={'Application web et mobile de gestion MLC'} buttonText={'En savoir plus'} href={'https://monlivretc.com'} />
      </Container>
      <Container>
        <ProjectExcerpt align={'center'} title={'Wodapp — Outil de réservation de séance de sport.'} subtitle={'Wodapp est une suite complète d\'outils - Application mobile client & Application Web de Gestion - pour gérer les réservations de ses cours de sports, en particulier pour les salles de crossfit.'} imageAlt={'Application web et mobile de wodapp'} image={wodappImage} buttonText={'En savoir plus'} href={'https://wodapp.fr'} />
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
                <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Container>
      <Container>
        <div className="min-h-screen flex flex-col items-center lg:flex-row gap-10 md:gap-32 my-auto">
          <Newsletter />
          <Resume />
        </div>
      </Container>
    </>
  )
}
