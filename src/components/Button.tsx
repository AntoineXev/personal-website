import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-200 dark:active:text-zinc-100/70',
  secondary:
    'bg-red-500 font-medium text-zinc-900 hover:bg-red-700 active:bg-red-600 active:text-zinc-900/60 dark:text-zinc-300 dark:hover:text-zinc-50 dark:active:text-zinc-50/70',
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
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
  className = clsx(
    'inline-flex items-stretch group gap-2 transition-all rounded-2xl px-6 py-4 outline-offset-2 transition active:transition-none shadow-lg shadow-zinc-800/30',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>
      {children}
      {hasArrow &&
        <span className="transition-all group-hover:translate-x-2 w-7 pl-1 flex items-start"><ChevronRightIcon className="h-full -rotate-90 stroke-white dark:stroke-zinc-900" /></span>
      }
    </button>
  ) : (
    <Link className={className} {...props}>
      {children}
      {hasArrow &&
        <span className="transition-all group-hover:translate-x-2 w-7 pl-1 flex items-start"><ChevronRightIcon
          className="h-full -rotate-90 stroke-white"/></span>
      }
    </Link>
  )
}
