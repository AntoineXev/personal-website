import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { DM_Sans } from 'next/font/google'

import '@/styles/tailwind.css'
import clsx from "clsx";

const dmSans = DM_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s - Antoine Hervet',
        default:
            'Antoine Hervet - Dev fullstack, fondateur et designer amateur.',
    },
    description:
        'Developpeur web fullstack, créateur d\'entreprise, je donne vie à des projets et des produits tech. depuis maintenant plus de 10 ans',
    alternates: {
        types: {
            'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
        },
    },
}

export default function RootLayout ({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={clsx(dmSans.className, "h-full antialiased scroll-smooth overflow-x-hidden")}
              suppressHydrationWarning>
        <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
            <div className="flex w-full">
                <Layout>{children}</Layout>
            </div>
        </Providers>
        </body>
        </html>
    )
}
