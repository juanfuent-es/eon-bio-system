import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Subheading({
 children,
 className,
 ...props
}: ComponentProps<'h2'>) {
 return (
  <h2
   className={clsx(
    'font-display tracking-tight text-balance leading-tight',
    'text-[2rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem]',
    className,
   )}
   {...props}
  >
   { children }
  </h2>
 )
}
