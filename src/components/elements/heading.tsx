import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export function Heading({
  children,
  level = 1,
  color = 'dark/light',
  className,
  ...props
}: { level?: HeadingLevel; color?: 'dark/light' | 'light' } & Omit<ComponentProps<'h1'>, 'level'>) {
  const HeadingTag = `h${level}` as const

  return (
    <HeadingTag className={clsx('heading', className)} data-color={color} {...props}>
      {children}
    </HeadingTag>
  )
}
