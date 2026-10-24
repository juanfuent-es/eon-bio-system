import { ApplicationForm } from '@/components/application-form'
import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'

export default function Aplica() {
  return (
    <>
      {/* Hero */}
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
              Para construir un proceso que evolucione contigo, primero necesitamos conocer tu contexto, tus objetivos y tu disponibilidad para sostenerlo.
            </p>
          </>
        }
        cta={
          <ButtonLink href="#form" size="lg">
            Enviar solicitud <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />

      {/* Sección 3: Formulario */}
      <section id="form" className="p-4">
        <Wallpaper color="mist" className="wallpaper">
          <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.68fr)_minmax(28rem,1fr)] lg:items-start">
            <div className="flex max-w-xl flex-col gap-6 text-white lg:sticky lg:top-28">
              <Subheading>Solicitud de evaluación</Subheading>
              <Text className="flex flex-col gap-4 text-white/84">
                <p>Completa esta solicitud inicial y revisaremos si EON BioSystem es adecuado para ti.</p>
                <p className="text-white/64">
                  Cuéntanos brevemente sobre ti. Tus respuestas nos ayudarán a comprender qué buscas y si el sistema se ajusta a tu contexto actual.
                </p>
              </Text>
            </div>
            <ApplicationForm />
          </Container>
        </Wallpaper>
      </section>
    </>
  )
}
