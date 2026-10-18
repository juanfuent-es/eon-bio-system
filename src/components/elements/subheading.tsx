import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2 className={clsx('section-heading', className)} {...props}>
      {children}
    </h2>
  )
}
