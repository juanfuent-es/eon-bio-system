'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavButtonLink } from './elements/nav-button'

export function SiteHeader() {
  const pathname = usePathname() ?? '/'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-60 p-4 sm:p-6" id="navbar">
      <nav
        aria-label="Navegación principal"
        className="flex items-start justify-between gap-4"
      >
        <Link
          href="/"
          aria-label="Ir a EON BioSystem"
          className="pointer-events-auto inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 md:hover:bg-orange-200"
        >
          <Image
            id="eon-logo"
            src="/logos/eon-mark.svg"
            alt=""
            width={100}
            height={60}
            priority
            className="h-auto w-11"
          />
        </Link>
        <div className="pointer-events-auto min-w-0 pt-2">
          <NavButtonLink
            href="/muscle-assessment"
            active={pathname === '/muscle-assessment' || pathname.startsWith('/muscle-assessment/')}
          >
            Muscle Assessment
          </NavButtonLink>
        </div>
      </nav>
    </header>
  )
}
