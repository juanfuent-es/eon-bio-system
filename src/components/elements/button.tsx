import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const sizes = {
 md: 'px-3 py-1',
 lg: 'px-4 py-2',
}

export function Button({
 size = 'md',
 type = 'button',
 className,
 ...props
}: {
 size?: keyof typeof sizes
} & ComponentProps<'button'>) {
 return (
  <button
   type={type}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium bg-green-800 hover:bg-orange-700 transition-colors duration-200',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function ButtonLink({
 size = 'md',
 className,
 href,
 ...props
}: {
 href: string
 size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium bg-green-800 text-white hover:bg-orange-900 transition-colors duration-200',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function SoftButton({
 size = 'md',
 type = 'button',
 className,
 ...props
}: {
 size?: keyof typeof sizes
} & ComponentProps<'button'>) {
 return (
  <button
   type={type}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-green-800/10 text-sm/7 font-medium text-green-950 hover:bg-green-900/15',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function SoftButtonLink({
 size = 'md',
 href,
 className,
 ...props
}: {
 href: string
 size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-green-800/10 text-sm/7 font-medium text-green-950 hover:bg-green-900/15',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function PlainButton({
 size = 'md',
 type = 'button',
 className,
 ...props
}: {
 size?: keyof typeof sizes
} & ComponentProps<'button'>) {
 return (
  <button
   type={type}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium text-green-950 hover:bg-green-900/10',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function PlainButtonLink({
 size = 'md',
 href,
 className,
 ...props
}: {
 href: string
 size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium text-green-950 hover:bg-green-900/10',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}
