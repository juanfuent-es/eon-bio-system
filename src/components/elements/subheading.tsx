import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Subheading({
 children,
 className,
 ...props
}) {
 return (
  <h2
   className={clsx(
    'font-display tracking-tight text-balance text-green-900',
    'text-[1.75rem] md:text-[2rem] lg:text-[2.25rem]',
    className,
   )}
   {...props}
  >
   { children }
  </h2>
 )
}
