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
import { Schema } from "@/components/Schema";

function SocialLink ({
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
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-50"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-50"/>
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    )
}

function MailIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
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
    title: 'À propos',
    description:
        'Je m\'apelle Antoine, et mon but c\'est de concevoir des solutions digitales qui améliorent la vie des autres.',
    alternates: {
        canonical: '/about'
    },
}

export default function About () {
    return (
        <>
            <Schema things={[]} slug={'/about'}></Schema>
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
                        <h1 className="text-3xl md:text-5xl tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl mb-16">
                            Concevoir des solutions qui améliorent la vie des autres.
                        </h1>
                        <div className="mt-6 space-y-7 text-base text-zinc-800 dark:text-zinc-200">
                        <p>
Je m’appelle Antoine. Depuis toujours, j’aime comprendre comment les choses tiennent debout — et ce qu’il se passe quand on les démonte. Très tôt, j’ai bricolé des ordinateurs, des consoles, des projets imparfaits, souvent juste pour voir jusqu’où je pouvais aller.
</p>

<p>
Avec le temps, j’ai appris la rigueur (en classe préparatoire), la construction méthodique (en école d’ingénieurs), puis l’expérimentation réelle : entreprendre, me tromper, recommencer. Berlin a été un terrain d’exploration, où j’ai confronté la tech à des problématiques d’entreprises très concrètes.
</p>

<p>
Aujourd’hui, je dirige Xev., une agence qui conçoit des logiciels sur mesure, et j'occupe une place de CTO chez Mon Livret C sur des produits financiers basés sur les cryptomonnaies.
</p>

<p>
Au fond, mon fil conducteur est simple : construire. Des produits, des équipes, des systèmes. Et continuer à apprendre en le faisant.
</p>
                        </div>
                    </div>
                    <div className="lg:pl-20">
                        <ul role="list">
                            <SocialLink href="https://github.com/AntoineXev" icon={GitHubIcon} className="mt-4">
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
        </>
    )
}
