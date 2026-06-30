'use client'

import { usePathname } from 'next/navigation'

import { ButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export function FloatingApplyButton() {
  const pathname = usePathname()
  const isApplyPage = pathname === '/aplica' || pathname.startsWith('/aplica/')

  if (isApplyPage) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-60 flex justify-center">
      <ButtonLink href="/aplica" size="lg" className="pointer-events-auto px-8 text-[1.25rem]">
        Aplica al sistema <ArrowNarrowRightIcon />
      </ButtonLink>
    </div>
  )
}
