import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Subheading({
 children,
 color = 'dark/light',
 className,
 ...props
}: { color?: 'dark/light' | 'light' } & ComponentProps<'h1'>) {
 return (
  <h2
   className={clsx(
    'font-display text-4xl/12 tracking-tight text-balance sm:text-[4rem]/20 text-green-900',
    className,
   )}
   {...props}
  >
   { children }
  </h2>
 )
}
