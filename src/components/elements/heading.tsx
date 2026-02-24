import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export function Heading({
 children,
 level = 1,
 color = 'dark/light',
 className,
 ...props
}: { level?: HeadingLevel; color?: 'dark/light' | 'light' } & Omit<
 ComponentProps<'h1'>,
 'level'
>) {
 const HeadingTag = `h${level}` as const
 
 const sizeClasses = {
  // 1: 'text-xl /12 sm:text-[5rem]/20',
  1: 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]'
 }

 return (
  <HeadingTag
   className={clsx(
    'font-display tracking-tight text-balance text-white',
    sizeClasses[level],
    className,
   )}
   {...props}
  >
   {children}
  </HeadingTag>
 )
}
