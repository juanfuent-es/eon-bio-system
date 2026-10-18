'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavButtonLink, navButtonStyles } from './elements/nav-button'

const sections = [
  { href: '/publicaciones', label: 'Publicaciones' },
  { href: '/muscle-assessment', label: 'Muscle Assessment' },
  { href: '/sistema', label: 'Sistema' },
]

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const showLinks = pathname !== '/'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-60 p-4 sm:p-6" id="navbar">
      <nav
        aria-label="Navegación principal"
        className="flex items-start justify-between gap-4"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setMenuOpen(false)
            event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus()
          }
        }}
      >
        <Link
          href="/"
          aria-label="Ir a EON BioSystem"
          onClick={() => setMenuOpen(false)}
          className="pointer-events-auto inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
        >
          <Image
            id="eon-logo"
            src="/logos/eon-mark.svg"
            alt=""
            width={100}
            height={60}
            priority
            className="h-auto w-9"
          />
        </Link>
        {showLinks && (
          <div className="pointer-events-auto flex min-w-0 flex-col items-end gap-3 pt-2">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-navigation-links"
              className={clsx(navButtonStyles(), 'lg:hidden')}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Cerrar' : 'Menú'}
            </button>
            <div
              id="site-navigation-links"
              className={clsx(
                'max-w-[calc(100vw-7rem)] flex-col items-end gap-2 lg:max-w-none lg:flex-row lg:items-center lg:gap-3',
                menuOpen ? 'flex' : 'hidden lg:flex',
              )}
            >
              {sections.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <NavButtonLink
                    key={href}
                    href={href}
                    active={active}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavButtonLink>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
