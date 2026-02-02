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
 color = 'dark/light',
 className,
 ...props
}: {
 size?: keyof typeof sizes
 color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
 return (
  <button
   type={type}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium',
    color === 'dark/light' &&
     'bg-green-600 text-white hover:bg-green-900',
    color === 'light' && 'hover bg-white text-green-950 hover:bg-green-100',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function ButtonLink({
 size = 'md',
 color = 'dark/light',
 className,
 href,
 ...props
}: {
 href: string
 size?: keyof typeof sizes
 color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium',
    color === 'dark/light' &&
     'bg-green-600 text-white hover:bg-green-900',
    color === 'light' && 'hover bg-white text-green-950 hover:bg-green-100',
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
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-green-600/10 text-sm/7 font-medium text-green-950 hover:bg-green-900/15',
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
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-green-600/10 text-sm/7 font-medium text-green-950 hover:bg-green-900/15',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function PlainButton({
 size = 'md',
 color = 'dark/light',
 type = 'button',
 className,
 ...props
}: {
 size?: keyof typeof sizes
 color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
 return (
  <button
   type={type}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium',
    color === 'dark/light' && 'text-green-950 hover:bg-green-900/10',
    color === 'light' && 'text-white hover:bg-white/15',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}

export function PlainButtonLink({
 size = 'md',
 color = 'dark/light',
 href,
 className,
 ...props
}: {
 href: string
 size?: keyof typeof sizes
 color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   className={clsx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium',
    color === 'dark/light' && 'text-green-950 hover:bg-green-900/10',
    color === 'light' && 'text-white hover:bg-white/15',
    sizes[size],
    className,
   )}
   {...props}
  />
 )
}
