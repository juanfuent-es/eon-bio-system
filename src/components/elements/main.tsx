import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Main({ children, className, ...props }: ComponentProps<'main'>) {
 return (
  <main className={clsx('', className)} {...props}>
   {children}
  </main>
 )
}
