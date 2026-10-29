'use client'

import { useEffect } from 'react'

export function SectionScrollSnap({ closingId }: { closingId: string }) {
  useEffect(() => {
    const closing = document.getElementById(closingId)
    const main = closing?.closest('main')
    if (!closing || !main) return

    const root = document.documentElement
    let closingTop = 0

    const updateSnap = () => {
      // Release mandatory snapping; testimonial proximity targets remain available.
      root.toggleAttribute('data-snap-end', window.scrollY >= closingTop - 1)
    }
    const measure = () => {
      closingTop = closing.getBoundingClientRect().top + window.scrollY
      updateSnap()
    }

    const observer = new ResizeObserver(measure)
    observer.observe(main)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', updateSnap, { passive: true })
    measure()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', updateSnap)
      root.removeAttribute('data-snap-end')
    }
  }, [closingId])

  return null
}
