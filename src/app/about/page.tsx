import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { ReactNode } from 'react'
import { Hero } from '@/components/sections/hero'
import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { Wallpaper } from '@/components/elements/wallpaper'

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

 return (
  <section className="p-4">
   <Wallpaper color={tone} className="wallpaper rounded-lg">
    <Container className="flex flex-col gap-10 sm:gap-16 items-center text-left md:text-center py-12 sm:py-16">
     <div className={layout === 'split' ? 'grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:items-center' : 'flex w-full max-w-6xl flex-col gap-6'}>
      <div className={layout === 'split' ? `flex flex-col gap-6 text-left ${isLightTone ? 'text-green-900' : 'text-white'}` : isLightTone ? 'text-green-900' : 'text-white'}>
       <Subheading>{headline}</Subheading>
       <Text size="lg" className={layout === 'split' ? 'flex flex-col gap-4' : `mx-auto flex max-w-2xl flex-col gap-4 ${isLightTone ? 'text-green-800/90' : 'text-white/90'}`}>
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
      tone="emerald"
   />

   {/* Sección 2: Ricardo Sánchez */}
   <SectionWithHeading
    headline="Ricardo Sánchez."
    subheadline={
     <>
      <p>Fundador de EON y director de NTS Clinic. Su enfoque integra ciencia aplicada, criterio clínico y estructura a largo plazo.</p>
     </>
    }
      tone="mist"
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
      tone="bone-mist"
   />

   {/* Sección 4: Supervisión clínica responsable */}
   <SectionWithHeading
    headline="Supervisión clínica responsable."
    subheadline={
     <>
      <p>La interpretación de biomarcadores y decisiones médicas se realizan bajo estándares clínicos rigurosos.</p>
     </>
    }
      tone="emerald"
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
   tone="mist"
   />
  </>
 )
}
