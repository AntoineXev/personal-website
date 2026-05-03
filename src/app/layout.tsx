import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Courier_Prime, Ballet } from 'next/font/google'

import '@/styles/tailwind.css'
import clsx from "clsx";

const typewriter = Courier_Prime({subsets: ['latin'], weight: ['400', '700']})
const handwritten = Ballet({subsets: ['latin'], variable: '--font-handwritten'})

export const metadata: Metadata = {
    title: {
        template: '%s - Antoine Hervet',
        default:
            'Antoine Hervet - Dev fullstack, fondateur et designer amateur.',
    },
    description:
        'Developpeur web fullstack, créateur d\'entreprise, je donne vie à des projets et des produits tech. depuis maintenant plus de 10 ans',
    metadataBase: new URL('https://aher.vet/'),
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: {
            template: '%s - Antoine Hervet',
            default:
                'Antoine Hervet - Dev fullstack, fondateur et designer amateur.',
        },
        description:
            'Developpeur web fullstack, créateur d\'entreprise, je donne vie à des projets et des produits tech. depuis maintenant plus de 10 ans',
    },

}

export default function RootLayout ({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={clsx(typewriter.className, handwritten.variable, "antialiased scroll-smooth")}
              suppressHydrationWarning>
        <body className="bg-white dark:bg-black">
        <Providers>
                <Layout>{children}</Layout>
        </Providers>
        </body>
        </html>
    )
}
