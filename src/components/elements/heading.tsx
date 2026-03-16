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
 
 const sizeClasses: Record<HeadingLevel, string> = {
  1: 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]',
  2: 'text-3xl sm:text-4xl md:text-5xl',
  3: 'text-2xl sm:text-3xl md:text-4xl',
  4: 'text-xl sm:text-2xl md:text-3xl',
  5: 'text-lg sm:text-xl md:text-2xl',
  6: 'text-base sm:text-lg md:text-xl',
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
