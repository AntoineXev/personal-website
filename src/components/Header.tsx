'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.png'
import {Button} from "@/components/Button";

function AboutIcon (props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"/>
          <circle cx="128" cy="136" r="32" fill="none" stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="16"/>
          <path d="M80,192a60,60,0,0,1,96,0" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
          <rect x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)" fill="none"
                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <line x1="96" y1="64" x2="160" y2="64" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="16"/>
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
    let isHomePage = usePathname() === '/'

    let headerRef = useRef<React.ElementRef<'div'>>(null)
    let isInitial = useRef(true)

    useEffect(() => {
        let downDelay = 0
        let upDelay = 64

        function setProperty (property: string, value: string) {
            document.documentElement.style.setProperty(property, value)
        }

        function removeProperty (property: string) {
            document.documentElement.style.removeProperty(property)
        }

        function updateHeaderStyles () {
            if (!headerRef.current) {
                return
            }

            let {top, height} = headerRef.current.getBoundingClientRect()
            let scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight,
            )

            if (isInitial.current) {
                setProperty('--header-position', 'sticky')
            }

            setProperty('--content-offset', `${downDelay}px`)

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`)
                setProperty('--header-mb', `${-downDelay}px`)
            }
            else if (top + height < -upDelay) {
                let offset = Math.max(height, scrollY - upDelay)
                setProperty('--header-height', `${offset}px`)
                setProperty('--header-mb', `${height - offset}px`)
            }
            else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`)
                setProperty('--header-mb', `${-scrollY}px`)
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed')
                removeProperty('--header-top')
                removeProperty('--avatar-top')
            }
            else {
                removeProperty('--header-inner-position')
                setProperty('--header-top', '0px')
                setProperty('--avatar-top', '0px')
            }
        }

        function updateAvatarStyles () {
            if (!isHomePage) {
                return
            }

            let fromScale = 1
            let toScale = 36 / 64
            let fromX = 0
            let toX = 2 / 16

            let scrollY = downDelay - window.scrollY

            let scale = ( scrollY * ( fromScale - toScale ) ) / downDelay + toScale
            scale = clamp(scale, fromScale, toScale)

            let x = ( scrollY * ( fromX - toX ) ) / downDelay + toX
            x = clamp(x, fromX, toX)

            setProperty(
                '--avatar-image-transform',
                `translate3d(${x}rem, 0, 0) scale(${scale})`,
            )

            let borderScale = 1 / ( toScale / scale )
            let borderX = ( -toX + x ) * borderScale
            let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

            setProperty('--avatar-border-transform', borderTransform)
            setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
        }

        function updateStyles () {
            updateHeaderStyles()
            updateAvatarStyles()
            isInitial.current = false
        }

        updateStyles()
        window.addEventListener('scroll', updateStyles, {passive: true})
        window.addEventListener('resize', updateStyles)

        return () => {
            window.removeEventListener('scroll', updateStyles)
            window.removeEventListener('resize', updateStyles)
        }
    }, [isHomePage])

    return (
      <>
          <header
            className="pointer-events-none relative z-50 flex flex-none flex-col"
            style={{
                height: 'var(--header-height)',
                marginBottom: 'var(--header-mb)',
            }}
          >
              <div
                ref={headerRef}
                className="top-0 z-10 h-24 pt-6"
                style={{
                    position:
                      'var(--header-position)' as React.CSSProperties['position'],
                }}
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
                                  <ul
                                    className="flex items-stretch rounded-3xl p-2 gap-3 bg-white/70 text-sm font-medium text-zinc-800  ring-2 ring-zinc-900/5 backdrop-blur-md dark:bg-zinc-800/70 dark:text-zinc-200 dark:ring-white/20">
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
                                      <NavItem href="/articles"><AboutIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <NavItem href="/projects"><AboutIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <NavItem href="/uses"><AboutIcon
                                        className="h-10 w-10 text-white stroke-white"/></NavItem>
                                      <div className="border-r-2 dark:border-white/20 my-2 hidden md:block"></div>
                                      <Button hasArrow className="hidden md:flex">Discutons</Button>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                  </Container>
              </div>
          </header>
          <div className="md:hidden fixed bottom-4 left-0 right-0 flex items-center justify-center  z-50">
              <Button className="text-base font-medium" hasArrow>Discutons ensemble</Button>
          </div>
          {isHomePage && (
            <div
              className="flex-none"
              style={{height: 'var(--content-offset)'}}
            />
          )}
      </>
    )
}
