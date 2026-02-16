import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Heading } from '@/components/elements/heading'
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

export default function Metodo() {
 return (
  <>
   {/* Hero */}
   <Hero
     id="hero"
     headline={
      <>
         EON BioSystem: Ciencia, fuerza y conciencia como sistema de vida.
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/aplica" text="Método EON" cta="Iniciar evaluación" variant="overlay" />
     }
     subheadline={
      <p>EON nace de la integración entre biología, disciplina y propósito. Un método estructurado que integra fuerza, nutrición y biomarcadores en una arquitectura coherente de largo plazo.</p>
     }
     cta={
      <ButtonLink href="/aplica" size="lg">
       Iniciar evaluación <ArrowNarrowRightIcon />
      </ButtonLink>
     }
    />

   {/* VISIÓN - Por qué existe EON */}
   <section className="py-16 sm:py-24 bg-green-50">
    <Container className="flex flex-col gap-10 sm:gap-16">
     <div className="max-w-3xl">
      <Heading level={2} className="mb-6">Nuestra Visión</Heading>
      <div className="space-y-6 text-green-950">
       <p className="text-lg">
        <strong>Por qué existe EON.</strong> Ordenar decisiones de salud en un entorno saturado de información y soluciones inconexas.
       </p>
       <p>
        La biología guía el proceso. Cada persona requiere un enfoque adaptado a su contexto fisiológico, donde la fuerza actúa como base de longevidad—el músculo es función metabólica, estructura y resiliencia.
       </p>
       <p>
        Conciencia como equilibrio. Descanso, propósito y naturaleza forman parte del sistema. La longevidad es el resultado acumulativo de decisiones sostenidas, tiempo bien vivido.
       </p>
      </div>
     </div>
    </Container>
   </section>

   {/* MÉTODO - Estructura y ejecución */}
   <SectionWithHeading
    headline="Estructura antes que intervención."
    subheadline={
     <>
      <p>Las decisiones no se toman de forma aislada. Se organizan dentro de un sistema coherente.</p>
     </>
    }
   />

   {/* Sección 2: Secuencia de implementación */}
   <SectionWithHeading
    headline="Secuencia de implementación."
    subheadline={
     <>
      <p>Evaluación inicial → Diseño personalizado → Ejecución estructurada → Ajustes periódicos.</p>
     </>
    }
   />

   {/* Sección 3: Pilares del sistema */}
   <SectionWithHeading
    headline="Pilares del sistema."
    subheadline={
     <>
      <p>Fuerza, nutrición, biomarcadores y suplementación como componentes integrados.</p>
     </>
    }
   />

   {/* Sección 4: Optimización basada en datos */}
   <SectionWithHeading
    headline="Optimización basada en datos."
    subheadline={
     <>
      <p>Los biomarcadores guían decisiones y permiten ajustes responsables.</p>
     </>
    }
   />

   {/* Sección 5: Diseñado para evolucionar */}
   <SectionWithHeading
    headline="Diseñado para evolucionar."
    subheadline={
     <>
      <p>El sistema se adapta conforme cambia la biología individual.</p>
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
