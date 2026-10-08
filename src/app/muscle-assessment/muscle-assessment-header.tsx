import Image from 'next/image'
import Link from 'next/link'

export function MuscleAssessmentHeader() {
  return (
    <nav className="fixed top-0 left-0 z-60 p-6" aria-label="EON Muscle Assessment">
      <Link
        href="/"
        aria-label="Ir a EON BioSystem"
        className="inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-green-900 shadow-lg ring-1 shadow-black/10 ring-black/10 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-orange-600"
      >
        <Image id="eon-logo" src="/logos/logo.svg" alt="" width={122} height={100} priority className="h-auto w-9" />
      </Link>
    </nav>
  )
}
