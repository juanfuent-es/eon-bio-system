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
              Si estás listo para transformar tu biología de forma consciente y estructurada,{' '}
              <em>este es el momento de empezar.</em>
            </p>
            <p>El proceso comienza con una evaluación de compatibilidad y compromiso.</p>
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
              <Text size="lg" className="flex flex-col gap-4 text-white/84">
                <p>
                  Déjanos tus datos y responde brevemente las preguntas. La información se utiliza únicamente para
                  evaluar tu compatibilidad con el sistema.
                </p>
                <p className="text-base/7 text-white/64">
                  El envío del formulario no garantiza el ingreso a EON BioSystem.
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
