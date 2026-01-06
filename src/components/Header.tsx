'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'
import {Button} from "@/components/Button";
import { LiquidGlass } from '@/components/LiquidGlass'

function AboutIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <path
            d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <circle cx="128" cy="180" r="12" fill="currentColor"/>
          <path d="M128,144v-8c17.67,0,32-12.54,32-28s-14.33-28-32-28S96,92.54,96,108v4" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      </svg>
    )
}
function BlogIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <rect x="48" y="40" width="64" height="176" rx="8" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <path
            d="M217.67,205.77l-46.81,10a8,8,0,0,1-9.5-6.21L128.18,51.8a8.07,8.07,0,0,1,6.15-9.57l46.81-10a8,8,0,0,1,9.5,6.21L223.82,196.2A8.07,8.07,0,0,1,217.67,205.77Z"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <line x1="48" y1="72" x2="112" y2="72" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="48" y1="184" x2="112" y2="184" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="133.16" y1="75.48" x2="195.61" y2="62.06" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="139.79" y1="107.04" x2="202.25" y2="93.62" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="156.39" y1="185.94" x2="218.84" y2="172.52" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
      </svg>
    )
}
function ProjectIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <line x1="48" y1="184" x2="48" y2="72" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="208" y1="72" x2="208" y2="184" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="96" y1="128" x2="96" y2="144" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="128" y1="120" x2="128" y2="144" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="160" y1="112" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <rect x="32" y="40" width="192" height="32" rx="8" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <line x1="128" y1="184" x2="128" y2="216" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <circle cx="128" cy="232" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="16"/>
          <line x1="32" y1="184" x2="224" y2="184" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
      </svg>
    )
}
function SetupIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <path
            d="M104,126.94a64,64,0,0,1,80-90.29L144,80l5.66,26.34L176,112l43.35-40a64,64,0,0,1-90.29,80L73,217A24,24,0,0,1,39,183Z"
            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      </svg>
    )
}

function NavItem ({
                      href,
                      children,
                  }: {
    href: string
    children: React.ReactNode
}) {
    let isActive = usePathname() === href

    return (
        <li className="m-auto">
            <Link
                href={href}
                className={clsx(
                    'relative block transition h-12 w-12 text-gray-400 dark:text-gray-300 ',
                    isActive
                        ? 'text-white dark:text-white'
                        : 'hover:text-gray-900 dark:hover:text-gray-100',
                )}
            >
                {children}
            </Link>
        </li>
    )
}


function clamp (number: number, a: number, b: number) {
    let min = Math.min(a, b)
    let max = Math.max(a, b)
    return Math.min(Math.max(number, min), max)
}

export function Header () {
    return (
      <>
          <header
            className="fixed left-0 right-0 top-2 pointer-events-none z-50 flex flex-none flex-col"
            style={{
                marginBottom: 'var(--header-mb)',
            }}
          >
              <div
                className="top-0 z-10 h-24 pt-6"
              >
                  <Container
                    className="top-[var(--header-top,theme(spacing.6))] w-full"
                    style={{
                        position:
                          'var(--header-inner-position)' as React.CSSProperties['position'],
                    }}
                  >
                      <div className="relative flex gap-4">
                          <div className="flex flex-1 justify-center">
                              <nav className="pointer-events-auto">
                                  <LiquidGlass
                                    as="ul"
                                    blur={1.5}
                                    className="flex items-stretch rounded-3xl p-2 gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                                  >
                                      <Link
                                        href="/"
                                        aria-label="Home"
                                        className='pointer-events-auto'
                                      >
                                          <Image src={avatarImage} alt="Avatar"
                                                 className="h-14 w-14 rounded-2xl shadow-md shadow-zinc-800/15"/>
                                      </Link>
                                      <div className="border-r-2 dark:border-white/20 my-2"></div>
                                      <NavItem href="/about"><AboutIcon
                                        className="h-10 w-10"/></NavItem>
                                      <NavItem href="/articles"><BlogIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <NavItem href="/projects"><ProjectIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <NavItem href="/uses"><SetupIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <div className="border-r-2 dark:border-white/20 my-2 hidden md:block"></div>
                                      <Button hasArrow href="https://calendar.app.google/BGyUfPHTsESBuo51A" target="_blank" className="hidden md:flex text-lg">Discutons</Button>
                                  </LiquidGlass>
                              </nav>
                          </div>
                      </div>
                  </Container>
              </div>
          </header>
          <div className="md:hidden fixed bottom-4 left-0 right-0 flex items-center justify-center  z-50">
              <Button className="text-base font-medium" href="https://calendar.app.google/BGyUfPHTsESBuo51A" target="_blank" hasArrow>Discutons ensemble</Button>
          </div>
      </>
    )
}
