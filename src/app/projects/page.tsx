import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoXev from '@/images/logos/xev.svg'
import logoWod from '@/images/logos/wodapp.png'
import logoWeblaunch from '@/images/logos/weblaunch.svg'
import logoMLC from '@/images/logos/mlc.svg'
import { Schema } from "@/components/Schema";

const projects = [
  {
    name: 'Xev.',
    description:
      'Construire des applications puissantes et sur mesure pour les PME de demain.',
    link: { href: 'https://xev.agency', label: 'xev.agency' },
    logo: logoXev,
  },
  {
    name: 'Mon livret C',
    description:
      'Renforcer la finance traditionnelle avec des produits basés sur les crypto-actifs.',
    link: { href: 'https://monlivretc.com', label: 'monlivretc.com' },
    logo: logoMLC,
  },
  {
    name: 'WodApp',
    description:
      'Une application universelle pour la réservation de WOD. Libre d\'utilisation, pour tous.',
    link: { href: 'https://wodapp.fr', label: 'wodapp.fr' },
    logo: logoWod,
  },
  {
    name: 'Weblaunch',
    description:
        'Une entreprise qui lance des sites e-commerce en moins d\'un mois."',
    link: { href: 'https://weblaunch.fr', label: 'weblaunch.fr' },
    logo: logoWeblaunch,
  }
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Voila tous les projets auquels j\'ai eu la chance de contribuer. Je tire du positif de chacun d\'entre eux, mais aussi beaucoup d\'enseignements',
  alternates: {
    canonical: '/projects'
  },
}

export default function Projects() {
  return (
      <>
        <Schema things={[]} slug={'/projects'} />
        <SimpleLayout
            title="Les choses que j'ai construit pour me faire une petite place dans l'unvivers"
            intro="Au cours des dernières années, j'ai travaillé sur plusieurs projets. Certains ont donné naissance à des entreprises, d'autres sont restés de simples dépôts Git que vous pouvez utiliser librement. Si quelque chose vous intéresse, n'hésitez pas à me contacter pour en discuter."
        >
          <ul
              role="list"
              className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
                <Card as="li" key={project.name}>
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                        src={project.logo}
                        alt=""
                        className="h-8 w-8 rounded-full"
                        unoptimized
                    />
                  </div>
                  <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={project.link.href} target="_blank">{project.name}</Card.Link>
                  </h2>
                  <Card.Description>{project.description}</Card.Description>
                  <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-red-500 dark:text-zinc-200">
                    <LinkIcon className="h-6 w-6 flex-none" />
                    <span className="ml-2">{project.link.label}</span>
                  </p>
                </Card>
            ))}
          </ul>
        </SimpleLayout>
      </>
  )
}
