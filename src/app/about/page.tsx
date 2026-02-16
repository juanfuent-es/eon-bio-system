import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { ReactNode } from 'react'
import { Hero } from '@/components/sections/hero'
import { AnnouncementBadge } from '@/components/elements/announcement-badge'

function SectionWithHeading({
 headline,
 subheadline,
 cta,
 children,
}: {
 headline: ReactNode
 subheadline: ReactNode
 cta?: ReactNode
 children?: ReactNode
}) {
 return (
  <section className="py-16 sm:py-24">
   <Container className="flex flex-col gap-10 sm:gap-16 items-center text-center">
    <div className="flex max-w-6xl flex-col gap-6">
     <Subheading>{headline}</Subheading>
     <Text size="lg" className="flex max-w-2xl flex-col gap-4 mx-auto text-center">
      {subheadline}
     </Text>
     {cta && <div className="pt-2">{cta}</div>}
    </div>
    {children}
   </Container>
  </section>
 )
}

export default function About() {
 return (
  <>
   {/* Hero */}
   <Hero
     id="hero"
     headline={
      <>
         Dirección, criterio y respaldo clínico.
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/aplica" text="Sobre EON" cta="Iniciar evaluación" variant="overlay" />
     }
     subheadline={
      <p>EON BioSystem y NTS Clinic operan bajo una misma dirección profesional, integrando sistema estructurado y supervisión clínica cuando es necesario.</p>
     }
     cta={
      <ButtonLink href="/aplica" size="lg">
       Iniciar evaluación <ArrowNarrowRightIcon />
      </ButtonLink>
     }
    />

   {/* Sección 1: Origen del sistema */}
   <SectionWithHeading
    headline="Origen del sistema."
    subheadline={
     <>
      <p>EON surge de más de dos décadas de experiencia en entrenamiento de fuerza, nutrición funcional y salud basada en evidencia.</p>
     </>
    }
   />

   {/* Sección 2: Ricardo Sánchez */}
   <SectionWithHeading
    headline="Ricardo Sánchez."
    subheadline={
     <>
      <p>Fundador de EON y director de NTS Clinic. Su enfoque integra ciencia aplicada, criterio clínico y estructura a largo plazo.</p>
     </>
    }
   />

   {/* Sección 3: Relación entre EON y NTS Clinic */}
   <SectionWithHeading
    headline="Relación entre EON y NTS Clinic."
    subheadline={
     <>
      <p>EON estructura el sistema.<br />
      NTS Clinic respalda cuando la profundidad médica lo requiere.<br />
      Ambas operan bajo una misma dirección estratégica.</p>
     </>
    }
   />

   {/* Sección 4: Supervisión clínica responsable */}
   <SectionWithHeading
    headline="Supervisión clínica responsable."
    subheadline={
     <>
      <p>La interpretación de biomarcadores y decisiones médicas se realizan bajo estándares clínicos rigurosos.</p>
     </>
    }
   />

   {/* Sección 5: Sistema antes que volumen */}
   <SectionWithHeading
    headline="Sistema antes que volumen."
    subheadline={
     <>
      <p>El modelo prioriza seguimiento real, precisión y coherencia sobre expansión masiva.</p>
     </>
    }
    cta={
     <PlainButtonLink href="/aplica">
      Aplicar al sistema <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />
  </>
 )
}
