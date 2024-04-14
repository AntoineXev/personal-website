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
            Je construit des applications et des architectures d'application web & mobiles.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-800 dark:text-zinc-200">
            <p>
              I’ve been making stuff for as long as I can remember.
              At around 13, I made a few bucks fixing Iphone screens (at that time that was a complex process),
              and glitching some of the newest consoles on the market. I run mac on a non windows machine (hackintosh
              for the close ones), at 15 years old, giving a second life to my old home computer
              (I think it was OsX Tiger, back at that time, couldn't manage to put leopard on it). That way
              I learned about bootloaders, command lines tools and kext files. A cool adventure.
            </p>
            <p>
              Back at that time, the only thing I loved more than computers was sneakers.
              When I did not spend my free time on a computer, I spend time camping out for the
              latest fashion sneakers that released. Spent some nights out in front of shops to get some pairs, and
              resell them the next day for 3 times the price. Funny tho.
            </p>
            <p>
             But I stopped everything from the age of 18 to my 20, doing some preparatory classes.
              A specific of the french educational system, where you need to study very intensively math & physics for
              2 years (from 7am to 1am, quite challenging, lol). But trust me, it was worth it,
              the 2 most shaping years of my life. Then I get to a computer oriented engineer school (Imt Atlantique, formerly
              known as Telecom Bretagne).
            </p>
            <p>
              After that, I tried the entrepreneurial adventure, trying to make some marketplace in the sneaker industries,
              where the resellers could sell their sneakers to anyone... Well it did not work.
              But that was a nice and learning experience. I moved to Berlin to learn more about web development applied to
              corporate challenges
            </p>
            <p>
              Today, I’m the founder of Xev., where we’re working on improving workers' life, trying to build
              fully customised software for companies specific challenges.
              A next generation of consulting and development agency, where we try to help companies to
              really embrace the power of the web and cloud-based applications.
            </p>
            <p>
              Recently I took a position of general manager and CTO at Mon livret C. It's a french asset manager,
              where we're trying to build and ship strong and robust cryptocurrencies based financial product to
              the banks, and the whole traditional financial system.
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
