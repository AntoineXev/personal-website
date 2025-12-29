import React from 'react'
import clsx from 'clsx'

export const LIQUID_GLASS_FILTER_ID = 'liquid-glass-filter'

type LiquidGlassDefsProps = {
    filterId?: string
    baseFrequency?: string
    stdDeviation?: number
    scale?: number
    seed?: number
    numOctaves?: number
}

export function LiquidGlassDefs ({
                                      filterId = LIQUID_GLASS_FILTER_ID,
                                      baseFrequency = '0.20 0.10',
                                      stdDeviation = 6,
                                      scale = 70,
                                      seed = 12,
                                      numOctaves = 2,
                                  }: LiquidGlassDefsProps) {
    return (
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0 select-none">
          <defs>
              <filter
                id={filterId}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                filterUnits="objectBoundingBox"
                colorInterpolationFilters="sRGB"
              >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency={baseFrequency}
                    numOctaves={numOctaves}
                    seed={seed}
                    result="noise"
                  />
                  <feGaussianBlur in="noise" stdDeviation={stdDeviation} result="smoothedNoise"/>
                  <feColorMatrix in="smoothedNoise" type="saturate" values="0" result="monoNoise"/>
                  <feComponentTransfer in="monoNoise" result="heightMap">
                      <feFuncR type="gamma" amplitude="1.05" exponent="0.9" offset="0"/>
                      <feFuncG type="gamma" amplitude="1.05" exponent="0.9" offset="0"/>
                      <feFuncB type="gamma" amplitude="1.05" exponent="0.9" offset="0"/>
                  </feComponentTransfer>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="heightMap"
                    scale={scale}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displacement"
                  />
                  <feComposite in="displacement" in2="SourceGraphic" operator="atop"/>
              </filter>
          </defs>
      </svg>
    )
}

type LiquidGlassProps<E extends React.ElementType = 'div'> = {
    as?: E
    blur?: number
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'style' | 'className' | 'children'>

export function LiquidGlass<E extends React.ElementType = 'div'> ({
                                                                      as,
                                                                      blur = 1,
                                                                      className,
                                                                      style,
                                                                      children,
                                                                      ...rest
                                                                  }: LiquidGlassProps<E>) {
    const Component = (as || 'div') as React.ElementType

    return (
      <Component
        className={clsx('liquid-glass', className)}
        style={{
            ...style,
            ['--glass-blur' as const]: `${blur}px`,
        } as React.CSSProperties}
        {...rest}
      >
          {children}
      </Component>
    )
}

