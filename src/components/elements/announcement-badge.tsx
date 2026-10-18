import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { ChevronIcon } from '../icons/chevron-icon'
import { buttonStyles } from './button'

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
      className={clsx(buttonStyles('secondary'), 'group relative flex-wrap gap-x-3', className)}
    >
      <span className="text-pretty sm:truncate">{text}</span>
      <span className={clsx('h-3 w-px max-sm:hidden', 'bg-current opacity-20')} />
      <span className={clsx('inline-flex shrink-0 items-center gap-2 pl-1 font-semibold')}>
        {cta} <ChevronIcon className="shrink-0" />
      </span>
    </Link>
  )
}
