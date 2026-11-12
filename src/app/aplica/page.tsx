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
        imageSrc="/eon-biosystem-aplica.jpg"
        imageAlt="Ricardo Sánchez recibiendo a dos personas en consulta en EON BioSystem"
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
        className="text-section min-h-0 w-full pt-10 pb-6 text-green-950 sm:pt-14 sm:pb-8"
      >
        <Container className="max-sm:px-0">
          <header className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-4 text-center sm:gap-5">
            <Subheading id="solicitud-heading">
              Solicitud de <i>evaluación</i>
            </Subheading>
            <p className="max-w-2xl text-balance text-green-900">
              Comparte tus datos de contacto y elige tu nivel de compromiso y el acompañamiento que buscas.
            </p>
          </header>
        </Container>
      </section>

      <section id="form" aria-labelledby="solicitud-heading" className="min-h-0 scroll-mt-28 px-4 pt-0 pb-10 sm:pb-14">
        <Container>
          <div className="mx-auto w-full max-w-4xl">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  )
}
