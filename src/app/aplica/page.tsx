import { ApplicationForm } from '@/components/application-form'
import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'

export default function Aplica() {
  return (
    <>
      <Hero
        id="hero"
        imageSrc="/photos/eon-biosystem-aplica.png"
        imageAlt="Evaluación inicial y acompañamiento personalizado"
        headline={
          <>
            Todo gran cambio comienza <br />
            por el <em>primer paso</em>
          </>
        }
        subheadline={
          <>
            <p>
              Para construir un proceso que evolucione contigo, primero necesitamos conocer tu contexto, tus objetivos y
              tu disponibilidad para sostenerlo.
            </p>
          </>
        }
        cta={
          <ButtonLink href="#form" size="lg">
            Enviar solicitud <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />

      <section
        id="solicitud"
        aria-labelledby="solicitud-heading"
        className="text-section min-h-0 w-full bg-white py-20 text-green-950 sm:py-28"
      >
        <Container className="max-sm:px-0">
          <header className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
            <Subheading id="solicitud-heading">
              Solicitud de <i>evaluación</i>
            </Subheading>
            <div className="flex max-w-2xl flex-col gap-6 text-balance text-green-900">
              <p>Completa esta solicitud inicial y revisaremos si EON BioSystem es adecuado para ti.</p>
              <p>
                Cuéntanos brevemente sobre ti. Tus respuestas nos ayudarán a comprender qué buscas y si el sistema se
                ajusta a tu contexto actual.
              </p>
            </div>
            <p className="text-sm text-green-700">Acceso mediante evaluación previa.</p>
          </header>
        </Container>
      </section>

      <section
        id="form"
        aria-labelledby="solicitud-heading"
        className="min-h-0 scroll-mt-28 bg-white px-4 pt-0 pb-20 sm:pb-28"
      >
        <Container>
          <div className="mx-auto w-full max-w-4xl">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  )
}
