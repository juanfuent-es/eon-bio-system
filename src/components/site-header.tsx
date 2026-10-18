import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { clsx } from 'clsx/lite'

export function SiteHeader({
  label,
  href = '/home',
  children,
  inline = false,
  logoSrc = '/logos/logo.svg',
}: {
  label: string
  href?: string
  children?: ReactNode
  inline?: boolean
  logoSrc?: string
}) {
  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 z-60 flex max-w-full gap-3 p-6',
        inline ? 'w-full items-start justify-between' : 'flex-col items-start',
      )}
      aria-label={label}
    >
      <Link
        href={href}
        aria-label="Ir a EON BioSystem"
        className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-white/90 text-green-900 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-orange-600"
      >
        <Image id="eon-logo" src={logoSrc} alt="" width={122} height={100} priority className="h-auto w-9" />
      </Link>
      {children && (
        <div className={clsx('flex flex-wrap gap-2 text-green-900', inline && 'min-w-0 justify-end sm:pt-3')}>
          {children}
        </div>
      )}
    </nav>
  )
}
