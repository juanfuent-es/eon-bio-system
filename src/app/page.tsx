import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Document } from '@/components/elements/document'
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

export default function Page() {
 return (
  <>
   {/* Hero */}
   <Hero
     id="hero"
     headline={
      <>
         EON BioSystem <small className="block">Seguimiento metabólico y funcional.</small>
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/sistema" text="Un sistema de longevidad basado en ciencia aplicada." cta="Conoce más" variant="overlay" />
     }
     subheadline={
      <p>Un sistema antiaging que integra <strong>fuerza, nutrición y biomarcadores</strong> para optimizar tu biología de forma sostenible.</p>
     }
     cta={
      <ButtonLink href="/aplica" size="lg">
       *Aplica al sistema <ArrowNarrowRightIcon />
      </ButtonLink>
     }
    />

   {/* Sección 2: Contexto / Problema */}
   <SectionWithHeading
    headline={
     <>
      La longevidad se construye,<br /> no se improvisa.
     </>
    }
    subheadline={
     <>
      <p className="italic">Con el tiempo, el cuerpo cambia.</p>
      <p>La recuperación, el metabolismo y el rendimiento dejan de responder igual. <br />  
      Sin datos claros, la mayoría de las decisiones sobre salud se basan en intuición, tendencias o ensayo y error.</p>
      <p>EON BioSystem existe para reemplazar la improvisación por un sistema diseñado desde la ciencia.</p>
     </>
    }
    cta={
     <PlainButtonLink href="/sistema">
      Conoce el método <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />

   {/* Sección 3: Qué es EON BioSystem */}
   <SectionWithHeading
    headline="Un enfoque estructurado para optimizar tu biología."
    subheadline={
     <>
      <p>
       EON BioSystem es un sistema de longevidad y antiaging que parte del análisis de biomarcadores clave
       para diseñar estrategias personalizadas de entrenamiento, alimentación y suplementación.
      </p>
      <p>
       No es un plan genérico. No es una solución rápida. <br />Es un sistema diseñado para acompañar tu biología
       a largo plazo.
      </p>
     </>
    }
    cta={
     <PlainButtonLink href="/sistema">
      Ver cómo funciona <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />

   {/* Sección 6: Para quién es */}
   <SectionWithHeading
    headline={
      <>
        EON BioSystem no es para todos. <br /> <small>*Esto es parte del sistema*</small>
      </>
    }
    subheadline={
     <>
      <p>Nuestro sistema está diseñado para personas que valoran la ciencia, buscan estructura y están dispuestas a seguir un sistema con criterio y constancia.</p>
      <p>No es para quienes buscan soluciones rápidas o atajos. Trabajamos con un número limitado de personas para asegurar seguimiento, profundidad y calidad real.</p>
     </>
    }
    cta={
     <PlainButtonLink href="/aplica">
      Ver si califico <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />

   {/* Sección 7: Respaldo clínico */}
   <SectionWithHeading
    headline="Respaldo clínico cuando el proceso lo requiere."
    subheadline={
     <>
      <p>EON BioSystem cuenta con respaldo clínico profesional a través de NTS Clinic, donde se ejecutan y supervisan los aspectos clínicos con rigor y responsabilidad.</p>
      <p>EON BioSystem diseña el sistema. NTS Clinic respalda cuando es necesario.</p>
     </>
    }
    cta={
      <>
        <PlainButtonLink href="/acerca">
          Conoce más <ArrowNarrowRightIcon />
        </PlainButtonLink>
        <p className='italic mt-2 text-green-800/80'>*El acceso a EON BioSystem requiere evaluación previa.</p>
      </>
    }
   />
  </>
 )
}
