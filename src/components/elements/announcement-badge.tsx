import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { ChevronIcon } from '../icons/chevron-icon'

export function AnnouncementBadge({
 text,
 href,
 cta = 'Learn more',
 variant = 'normal',
 className,
 ...props
}: {
 text: ReactNode
 href: string
 cta?: ReactNode
 variant?: 'normal' | 'overlay'
} & Omit<ComponentProps<'a'>, 'href' | 'children'>) {
 return (
  <Link
   href={href}
   {...props}
   data-variant={variant}
   className={clsx(
    'group relative inline-flex max-w-full gap-x-3 overflow-hidden rounded-md px-3.5 py-2 text-sm/6 max-sm:flex-col sm:items-center sm:rounded-full sm:px-3 sm:py-0.5',
    variant === 'normal' &&
     'bg-green-800/5 text-green-950 hover:bg-green-900/10',
    variant === 'overlay' &&
     'bg-green-800/15 text-white hover:bg-green-900/20',
    className,
   )}
  >
   <span className="text-pretty sm:truncate">{text}</span>
   <span
    className={clsx(
     'h-3 w-px max-sm:hidden',
     variant === 'normal' && 'bg-green-800/20',
     variant === 'overlay' && 'bg-white/20',
    )}
   />
   <span
    className={clsx(
     'inline-flex shrink-0 items-center gap-2 font-semibold',
     variant === 'normal' && 'text-green-950',
    )}
   >
    {cta} <ChevronIcon className="shrink-0" />
   </span>
  </Link>
 )
}
