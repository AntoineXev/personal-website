import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import logoMLC from '@/images/logos/mlc.svg'
import logoXev from '@/images/logos/xev.svg'
import logoBloom from '@/images/logos/bloom.svg'
import logoWeblaunch from '@/images/logos/weblaunch.svg'
import HeroImage from '@/images/hero-image.png'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { BreadcrumbList, Graph, Person } from "schema-dts";
import { Schema } from "@/components/Schema";
import {HeroSection} from "@/components/HeroSection";
import {AboutMeSection} from "@/components/AboutMeSection";
import {FeaturesSection} from "@/components/FeaturesSection";
import {SkillsSection} from "@/components/SkillsSection";
import {ProjectsSection} from "@/components/ProjectsSection";


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
          className="min-w-0 w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-zinc-200 dark:focus:ring-zinc-100/10 sm:text-sm"
        />
        <Button type="submit" hasArrow className="">
          Discutons ensemble
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



const person: Person = {
  "@type": "Person",
  "name": "Antoine Hervet",
  "url": "https://aher.vet",
  "@id": "https://aher.vet/#",
  "worksFor": {"@id": "https://xev.agency"},
  "honorificSuffix": "M.",
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Telecom Bretagne",
      "@id": "https://www.wikidata.org/wiki/Q2460307"
    },
    {
      "@type": "Organization",
      "name": "EmLyon Business School",
      "@id": "https://www.wikidata.org/wiki/Q1795504"
    }],
  "sameAs": [
    "https://fr.linkedin.com/in/ahervet",
    "https://www.pappers.fr/dirigeant/antoine_hervet_1996-02"
  ],
  "jobTitle": {
    "@type": "DefinedTerm",
    "name": "Entrepreneur",
    "alternateName": "entrepreneur",
    "sameAs": "https://resources.workable.com/entrepreneur-job-description"
  },
  "knowsLanguage": ["french", "english"],
  "knowsAbout": [
    {
      "@type": "Thing",
      "name": "Web developpement",
      "alternateName": "Fullstack developpment",
      "@id": "https://www.wikidata.org/wiki/Q386275"
    },
    {
      "@type": "Thing",
      "name": "Enterprise ressource planning",
      "alternateName": "ERP",
      "@id": "https://www.wikidata.org/wiki/Q131508"
    },
    {
      "@type": "Thing",
      "name": "Angular",
      "alternateName": "Angular material",
      "@id": "https://www.wikidata.org/wiki/Q28925578"
    },
    {
      "@type": "Thing",
      "name": "Strapi",
      "alternateName": "Strapi CMS",
      "@id": "https://www.wikidata.org/wiki/Q105826887"
    },
    {
      "@type": "Thing",
      "name": "addiction",
      "alternateName": "addictions",
      "@id": "https://www.wikidata.org/wiki/Q12029"
    },
    {
      "@type": "Thing",
      "name": "Cryptocurrency",
      "alternateName": "Crypto",
      "@id": "https://www.wikidata.org/wiki/Q13479982"
    },
    {
      "@type": "Thing",
      "name": "Blockchain",
      "@id": "https://www.wikidata.org/wiki/Q20514253"
    }
  ]
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Schema things={[person]} slug={''}/>
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ProjectsSection />
    
    </>
  )
}
