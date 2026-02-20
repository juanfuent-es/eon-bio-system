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
         EON BioSystem <small className="block">Seguimiento metabólico y funcional</small>
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/sistema" text="Un sistema de longevidad diseñado desde la ciencia." cta="Conoce más" variant="overlay" />
     }
     subheadline={
      <>
        <p>Un sistema integral que une <strong>fuerza, nutrición y biomarcadores</strong> para optimizar tu biología de forma sostenible.</p>
      </>
     }
     cta={
      <>
        <ButtonLink href="/aplica" size="lg">
          Aplica al sistema <ArrowNarrowRightIcon />
          </ButtonLink>
        <p className="text-sm font-light italic text-green-200">*Acceso mediante evaluación previa.</p>
      </>
     }
    />

   {/* Sección 2: Contexto / Problema */}
   <SectionWithHeading
    headline={
     <>
      La longevidad se construye <br />todos los días
     </>
    }
    subheadline={
     <>
      <p className="italic">Con el tiempo, el cuerpo cambia. La recuperación y el rendimiento también.</p>
      <p className='text-balance'>Sin datos claros, nuestras decisiones se suelen basar en intuición o ensayo y error. <strong>EON BioSystem</strong> reemplaza la improvisación por un sistema diseñado desde la ciencia.</p>
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
    headline="Un sistema, no un plan."
    subheadline={
     <>
      <p>EON BioSystem es un sistema de longevidad basado en el análisis de biomarcadores para diseñar estrategias personalizadas de entrenamiento, nutrición y suplementación.</p>
      <p>No es genérico ni una solución rápida.<br />Es un sistema pensado para acompañar tu biología a largo plazo.</p>
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
      <p>Diseñado para quienes valoran la valoran la ciencia, buscan estructura y están dispuestas a seguir un sistema con criterio y constancia.</p>
      <p>No es para quienes buscan soluciones rápidas o atajos.</p>
      <p><small><i>*Trabajamos con un número limitado de personas para asegurar seguimiento, profundidad y calidad real.</i></small></p>
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
    headline="Dirección y respaldo profesional."
    subheadline={
     <>
      <p className=''>EON BioSystem opera con respaldo clínico de <a href="https://ntsclinic.com" title="Visita el sitio de NTS Clinic" target='_blank' className='text-green-800 transition-colors underline hover:text-orange-500'>NTS Clinic</a>, que supervisa los aspectos médicos cuando el proceso lo exige.</p>
      <p className='italic mt-2 text-green-800/80'>*El acceso requiere evaluación previa.</p>
     </>
    }
    cta={
      <>
        <PlainButtonLink href="/acerca">
          Aplica ahora <ArrowNarrowRightIcon />
        </PlainButtonLink>
      </>
    }
   />
  </>
 )
}
