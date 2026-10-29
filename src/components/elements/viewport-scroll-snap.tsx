'use client'

import { ViewportSnapTracker } from '@/lib/scroll/viewport-snap'
import { useEffect } from 'react'

export function ViewportScrollSnap() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main > [data-viewport-snap]')]
    if (!sections.length) return

    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tracker = new ViewportSnapTracker()
    let frame = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let active: HTMLElement | undefined
    let touching = false

    const release = () => {
      clearTimeout(timer)
      root.removeAttribute('data-viewport-snap-active')
      active?.removeAttribute('data-snap-active')
      if (active) window.scrollTo({ top: window.scrollY, behavior: 'instant' })
      active = undefined
    }

    const measure = () => {
      frame = 0
      clearTimeout(timer)
      if (reducedMotion.matches || touching) return

      const target = tracker.update(
        sections.map((section) => {
          const { top, bottom } = section.getBoundingClientRect()
          return { id: section.id, top, bottom }
        }),
        window.innerHeight,
        window.scrollY,
      )
      if (!target) return

      // Wait for the gesture to settle so wheel inertia cannot fight the alignment.
      timer = setTimeout(() => {
        release()
        tracker.commit(target.id)
        active = sections.find((section) => section.id === target.id)
        active?.setAttribute('data-snap-active', '')
        root.setAttribute('data-viewport-snap-active', '')
        window.scrollTo({ top: target.top, behavior: 'smooth' })
      }, 120)
    }

    const onScrollEnd = () => {
      if (active) release()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    const onTouchStart = () => {
      touching = true
      release()
    }
    const onTouchEnd = () => {
      touching = false
      schedule()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) release()
    }
    const onMotionChange = () => {
      release()
      schedule()
    }
    const observer = new ResizeObserver(schedule)
    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('scrollend', onScrollEnd)
    window.addEventListener('resize', schedule)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    window.addEventListener('pointerdown', release, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    reducedMotion.addEventListener('change', onMotionChange)
    schedule()

    return () => {
      release()
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('pointerdown', release)
      window.removeEventListener('keydown', onKeyDown)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return null
}
