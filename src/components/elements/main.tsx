import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Main({ children, className, ...props }: ComponentProps<'main'>) {
  return (
    <main
      className={clsx(
        'has-[>[data-blog-article]]:snap-y has-[>[data-blog-article]]:snap-proximity [&:has(>[data-blog-article])_:not(.hero)]:snap-align-none [&:has(>[data-blog-article])_:not(.hero)]:snap-normal',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  )
}
