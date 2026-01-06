import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-900 font-semibold text-zinc-100 hover:bg-zinc-800 active:bg-zinc-900 active:text-zinc-100/80 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-100 dark:active:text-zinc-900/80 shadow-lg shadow-zinc-800/30 rounded-xl px-5 py-3',
  secondary: 'secondary-btn',
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 8h9m0 0L9 4.5M12.5 8 9 11.5"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ButtonProps = {
  variant?: keyof typeof variantStyles,
  hasArrow?: boolean,
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
  )

export function Button({
                         variant = 'primary',
                         className,
                         children,
                         hasArrow = false,
  ...props
}: ButtonProps) {
  const isSecondary = variant === 'secondary'
  
  const baseClassName = clsx(
    'inline-flex items-center group gap-2 transition-all outline-offset-2 active:transition-none',
    variantStyles[variant],
    className,
  )

  const content = isSecondary ? (
    <>
      <span className="relative">
        <span className="relative z-10">{children}</span>
        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
      </span>
      {hasArrow && (
        <span className="relative overflow-hidden w-4 h-4">
          <ArrowIcon className="absolute inset-0 w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-4" />
          <ArrowIcon className="absolute inset-0 w-4 h-4 -translate-x-4 transition-transform duration-300 ease-out group-hover:translate-x-0" />
        </span>
      )}
    </>
  ) : (
    <>
      {children}
      {hasArrow && (
        <span className="transition-all group-hover:translate-x-2 w-7 pl-1 flex items-start text-inherit">
          <ChevronRightIcon className="h-full -rotate-90 stroke-current" />
        </span>
      )}
    </>
  )

  return typeof props.href === 'undefined' ? (
    <button className={baseClassName} {...props}>
      {content}
    </button>
  ) : (
    <Link className={baseClassName} {...props}>
      {content}
    </Link>
  )
}
