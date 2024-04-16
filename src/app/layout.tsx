import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { DM_Sans } from 'next/font/google'

import '@/styles/tailwind.css'
import clsx from "clsx";
const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Antoine Hervet',
    default:
      'Antoine Hervet - Software developer, founder, and amateur designer',
  },
  description:
    'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={clsx(dmSans.className, "h-full antialiased scroll-smooth overflow-x-hidden")} suppressHydrationWarning>
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
