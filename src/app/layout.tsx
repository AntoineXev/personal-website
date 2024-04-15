import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Head } from "next/document";
import { readFileSync } from "fs";

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

class InlineStylesHead extends Head {
  getCssLinks: Head["getCssLinks"] = ({ allFiles }) => {
    const { assetPrefix } = this.context;
    if (!allFiles || allFiles.length === 0) return null;
    return allFiles
        .filter((file: any) => /\.css$/.test(file))
        .map((file: any) => (
            <style
                key={file}
                nonce={this.props.nonce}
                data-href={`${assetPrefix}/_next/${file}`}
                dangerouslySetInnerHTML={{
                  __html: readFileSync(`${process.cwd()}/.next/${file}` , "utf-8"),
                }}
            />
        ));
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full antialiased scroll-smooth overflow-x-hidden" suppressHydrationWarning>
    <InlineStylesHead />
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
