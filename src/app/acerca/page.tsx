import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Hero } from '@/components/sections/hero'
import type { ReactNode } from 'react'

function SectionWithHeading({
  headline,
  subheadline,
  cta,
  layout = 'stack',
  tone = 'emerald',
  children,
}: {
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  layout?: 'stack' | 'split'
  tone?: 'green-copper' | 'emerald' | 'mist' | 'bone-mist'
  children?: ReactNode
}) {
  const isLightTone = tone === 'bone-mist'
  const textColor = isLightTone ? 'text-obsidian-900' : 'text-white'
  const bodyColor = isLightTone ? 'text-obsidian-700' : 'text-white/88'

  return (
    <section className="px-4">
      <Wallpaper color={tone} className="wallpaper rounded-lg">
        <Container className="flex flex-col gap-10 py-12 text-left sm:gap-14 sm:py-16">
          <div
            className={
              layout === 'split'
                ? 'grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] lg:items-center'
                : 'flex w-full max-w-4xl flex-col gap-6'
            }
          >
            <div className={`flex flex-col gap-6 text-left ${textColor}`}>
              <Subheading>{headline}</Subheading>
              <Text size="lg" className={`flex max-w-3xl flex-col gap-4 text-pretty ${bodyColor}`}>
                {subheadline}
              </Text>
              {cta && <div className="pt-2">{cta}</div>}
            </div>
            {layout === 'split' && children ? <div className="w-full">{children}</div> : null}
          </div>
          {layout === 'stack' ? children : null}
        </Container>
      </Wallpaper>
    </section>
  )
}

export default function Acerca() {
  return (
    <>
      {/* Hero */}
      <Hero
        id="hero"
        imageSrc="/photos/eon-biosystem-acerca-ricardo-sanchez.jpg"
        imageAlt="Dirección profesional y respaldo clínico EON"
        headline={
          <>
            La <i>experiencia</i> detrás <br /> del <em>sistema</em>.
          </>
        }
        subheadline={
          <>
            <p>
              EON BioSystem nace de años de trabajo en
              <em>entrenamiento de fuerza</em>,<em>nutrición aplicada</em> y<em>optimización del metabolismo</em>.
            </p>
            <p>
              Un enfoque construido desde la práctica, <br />
              con una visión clara: <em>longevidad con funcionalidad.</em>
            </p>
          </>
        }
      />

      {/* Sección 1: Propósito */}
      <SectionWithHeading
        tone="bone-mist"
        headline="Por qué existe EON Bio."
        subheadline={
          <>
            <p>
              EON Bio nace de una necesidad concreta: ordenar decisiones sobre salud en un entorno saturado de
              información, modas y soluciones inconexas.
            </p>
            <p>
              Su propósito es ofrecer un marco claro donde entrenamiento, nutrición y datos biológicos trabajen de forma
              coherente.
            </p>
          </>
        }
      />

      {/* Sección 2: Filosofía */}
      <SectionWithHeading
        tone="emerald"
        layout="split"
        headline="La filosofía detrás del sistema."
        subheadline={
          <p>
            EON Bio parte de una premisa simple: la biología individual debe guiar el proceso. Por eso, el sistema se
            apoya en:
          </p>
        }
      >
        <div className="grid gap-3 text-left sm:grid-cols-3 lg:grid-cols-1">
          {['Datos objetivos', 'Estructura clara', 'Seguimiento continuo'].map((item) => (
            <div
              key={item}
              className="border-bone-50/40 bg-obsidian-950/22 border-l px-4 py-3 text-base/7 font-medium text-white backdrop-blur-sm"
            >
              {item}
            </div>
          ))}
          <p className="pt-2 text-base/7 text-white/82 italic sm:col-span-3 lg:col-span-1">
            La longevidad no es un evento, es un proceso.
          </p>
        </div>
      </SectionWithHeading>

      {/* Sección 3: El sistema (mención breve) */}
      <SectionWithHeading
        tone="mist"
        headline="Qué es EON BioSystem."
        subheadline={
          <>
            <p>
              EON BioSystem es el método que articula el enfoque de EON Bio. Un sistema de ciencia aplicada que integra
              fuerza, nutrición y biomarcadores en una estructura diseñada para evolucionar con el tiempo.
            </p>
            <p>(Para conocer el método completo, ver El Sistema)</p>
          </>
        }
        cta={
          <PlainButtonLink href="/sistema" className="bg-bone-50 text-obsidian-900 hover:bg-vital-500 hover:text-white">
            Ver el método completo <ArrowNarrowRightIcon />
          </PlainButtonLink>
        }
      />

      {/* Sección 4: Respaldo clínico */}
      <SectionWithHeading
        tone="bone-mist"
        headline="Respaldo clínico cuando el proceso lo requiere."
        subheadline={
          <>
            <p>
              Cuando el sistema exige profundidad clínica, EON Bio cuenta con el respaldo profesional de NTS Clinic.
            </p>
            <p>
              NTS Clinic es el brazo clínico donde se supervisan e interpretan los aspectos médicos del proceso con
              rigor y responsabilidad.
            </p>
            <p>EON Bio diseña el sistema. NTS Clinic respalda cuando es necesario.</p>
          </>
        }
        cta={
          <PlainButtonLink href="https://ntsclinic.com" className="w-fit">
            Conocer NTS Clinic <ArrowNarrowRightIcon />
          </PlainButtonLink>
        }
      />

      {/* Cierre */}
      <CallToActionSimple
        id="cta"
        headline="¿Listo para comenzar?"
        subheadline="Aplica al sistema y conoce cómo EON BioSystem puede acompañarte en tu proceso de optimización biológica."
        cta={<ButtonLink href="/aplica">Aplica al sistema</ButtonLink>}
      />
    </>
  )
}
