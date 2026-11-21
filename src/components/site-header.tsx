'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NavButtonLink } from './elements/nav-button'

const navigation = [
  { href: '/muscle-assessment', label: 'Muscle Assessment' },
  { href: '/sistema', label: 'Sistema' },
  { href: '/aplica', label: 'Aplica' },
]

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [openPath, setOpenPath] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuOpen = openPath === pathname

  useEffect(() => {
    if (!menuOpen) return

    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpenPath(null)
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenPath(null)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-60 p-4 sm:p-6" id="navbar">
      <nav aria-label="Navegación principal" className="flex items-start justify-between gap-4">
        <Link
          href="/"
          aria-label="Ir a EON BioSystem"
          onClick={() => setOpenPath(null)}
          className="group pointer-events-auto inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
        >
          <Image
            id="eon-logo"
            src="/logos/eon-mark.svg"
            alt=""
            width={100}
            height={60}
            priority
            className="h-auto w-11 transition-transform group-hover:md:scale-110"
          />
        </Link>
        <div className="pointer-events-auto hidden min-w-0 flex-wrap justify-end gap-2 pt-2 md:flex">
          {navigation.map(({ href, label }) => (
            <NavButtonLink
              key={href}
              href={href}
              active={pathname === href || pathname.startsWith(`${href}/`)}
              onClick={() => setOpenPath(null)}
            >
              {label}
            </NavButtonLink>
          ))}
        </div>
        <div
          ref={menuRef}
          className="pointer-events-auto relative md:hidden"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setOpenPath(null)
          }}
        >
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setOpenPath(menuOpen ? null : pathname)}
            className="inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-green-950 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="size-6"
            >
              <path d={menuOpen ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
          <div
            id="mobile-navigation"
            hidden={!menuOpen}
            className="absolute top-full right-0 mt-3 w-56 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/95 p-2 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur"
          >
            <div className="flex flex-col gap-1">
              {navigation.map(({ href, label }) => (
                <NavButtonLink
                  key={href}
                  href={href}
                  active={pathname === href || pathname.startsWith(`${href}/`)}
                  onClick={() => setOpenPath(null)}
                  className="w-full"
                >
                  {label}
                </NavButtonLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
