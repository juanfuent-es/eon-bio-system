import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps } from 'react'

export function navButtonStyles(active = false) {
  return clsx(
    'inline-flex items-center justify-between rounded-full px-4 py-2 font-serif text-sm no-underline transition-colors duration-200 hover:bg-orange-500 hover:text-white focus-visible:bg-orange-500 focus-visible:text-white sm:px-6 lg:font-semibold lg:tracking-wide',
    active ? 'bg-orange-500 text-white' : 'bg-white text-green-950',
  )
}

export function NavButtonLink({
  active = false,
  className,
  ...props
}: { active?: boolean; href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      {...props}
      aria-current={active ? 'page' : undefined}
      className={clsx(navButtonStyles(active), className)}
    />
  )
}
