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

export default function Vision() {
 return (
  <>
   {/* Hero */}
   <Hero
     id="hero"
     headline={
      <>
         Ciencia, fuerza y conciencia como sistema de vida.
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/metodo" text="Visión EON" cta="Explorar el método" variant="overlay" />
     }
     subheadline={
      <p>EON nace de la integración entre biología, disciplina y propósito. No es solo rendimiento; es coherencia en el tiempo.</p>
     }
     cta={
      <ButtonLink href="/metodo" size="lg">
       Explorar el método <ArrowNarrowRightIcon />
      </ButtonLink>
     }
    />

   {/* Sección 1: Por qué existe EON */}
   <SectionWithHeading
    headline="Por qué existe EON."
    subheadline={
     <>
      <p>Ordenar decisiones de salud en un entorno saturado de información y soluciones inconexas.</p>
     </>
    }
   />

   {/* Sección 2: La biología guía el proceso */}
   <SectionWithHeading
    headline="La biología guía el proceso."
    subheadline={
     <>
      <p>Cada persona requiere un enfoque adaptado a su contexto fisiológico.</p>
     </>
    }
   />

   {/* Sección 3: Fuerza como base de longevidad */}
   <SectionWithHeading
    headline="Fuerza como base de longevidad."
    subheadline={
     <>
      <p>El músculo es función metabólica, estructura y resiliencia.</p>
     </>
    }
   />

   {/* Sección 4: Conciencia como equilibrio */}
   <SectionWithHeading
    headline="Conciencia como equilibrio."
    subheadline={
     <>
      <p>Descanso, propósito y naturaleza forman parte del sistema.</p>
     </>
    }
   />

   {/* Sección 5: Tiempo bien vivido */}
   <SectionWithHeading
    headline="Tiempo bien vivido."
    subheadline={
     <>
      <p>La longevidad es el resultado acumulativo de decisiones sostenidas.</p>
     </>
    }
    cta={
     <PlainButtonLink href="/aplica">
      Iniciar evaluación <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />
  </>
 )
}
