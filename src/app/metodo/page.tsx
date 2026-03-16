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
   <SectionWithHeading
    headline="Nuestra visión"
    subheadline={
     <>
      <p>
       <strong>Por qué existe EON.</strong> Ordenar decisiones de salud en un entorno saturado de información y soluciones inconexas.
      </p>
      <p>
       La biología guía el proceso. Cada persona requiere un enfoque adaptado a su contexto fisiológico, donde la fuerza actúa como base de longevidad: el músculo es función metabólica, estructura y resiliencia.
      </p>
      <p>
       Conciencia como equilibrio. Descanso, propósito y naturaleza forman parte del sistema. La longevidad es el resultado acumulativo de decisiones sostenidas y tiempo bien vivido.
      </p>
     </>
    }
    tone="bone-mist"
   />

   {/* MÉTODO - Estructura y ejecución */}
   <SectionWithHeading
    headline="Estructura antes que intervención."
    subheadline={
     <>
      <p>Las decisiones no se toman de forma aislada. Se organizan dentro de un sistema coherente.</p>
     </>
    }
      tone="emerald"
   />

   {/* Sección 2: Secuencia de implementación */}
   <SectionWithHeading
    headline="Secuencia de implementación."
    subheadline={
     <>
      <p>Evaluación inicial → Diseño personalizado → Ejecución estructurada → Ajustes periódicos.</p>
     </>
    }
      tone="mist"
   />

   {/* Sección 3: Pilares del sistema */}
   <SectionWithHeading
    headline="Pilares del sistema."
    subheadline={
     <>
      <p>Fuerza, nutrición, biomarcadores y suplementación como componentes integrados.</p>
     </>
    }
      tone="bone-mist"
   />

   {/* Sección 4: Optimización basada en datos */}
   <SectionWithHeading
    headline="Optimización basada en datos."
    subheadline={
     <>
      <p>Los biomarcadores guían decisiones y permiten ajustes responsables.</p>
     </>
    }
      tone="emerald"
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
   tone="mist"
   />
  </>
 )
}
