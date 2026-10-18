import { ButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'

export default function Page() {
  return (
    <>
      <Hero
        headline="Página no encontrada"
        subheadline={<p>No encontramos la página que buscas.</p>}
        cta={
          <ButtonLink href="/home">
            Volver al inicio <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />
    </>
  )
}
