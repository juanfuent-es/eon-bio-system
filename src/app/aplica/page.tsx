import { ApplicationForm } from '@/components/application-form'
import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
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
              Si estás listo para transformar tu biología de forma consciente y estructurada,
              <em>este es el momento de empezar.</em>
            </p>
            <p>El proceso comienza con una evaluación de compatibilidad y compromiso.</p>
          </>
        }
        cta={
          <ButtonLink href="#form" size="lg">
            Enviar solicitud
          </ButtonLink>
        }
      />

      {/* Sección 3: Formulario */}
      <section id="form" className="p-4">
        <Wallpaper color="mist" className="wallpaper rounded-lg">
          <Container className="max-w-2xl py-12 sm:py-16">
            <div className="mb-12 flex flex-col gap-6 text-white">
              <Subheading>Aplicación</Subheading>
              <Text size="lg" className="text-white/90">
                Déjanos tus datos y responde brevemente las preguntas. La información se utiliza únicamente para evaluar
                tu solicitud.
              </Text>
            </div>
            <ApplicationForm />
          </Container>
        </Wallpaper>
      </section>
    </>
  )
}
