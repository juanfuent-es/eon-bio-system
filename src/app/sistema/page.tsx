import { ButtonLink } from '@/components/elements/button'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Document } from '@/components/elements/document'
import type { ReactNode } from 'react'
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
  <section className="px-4">
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

export default function Sistema() {
 return (
  <>
   {/* Hero */}
    <Hero
    id="hero"
    imageSrc="/photos/eon-biosystem-sistema.png"
    imageAlt="Mujer realizando ejercicio de fuerza"
    headline={
        <>
            El <i>sistema</i> detrás de la <i>longevidad</i>.
        </>
    }
    subheadline={
        <>
            <p>Un método estructurado que integra <strong>entrenamiento de fuerza</strong>, <strong>nutrición estratégica</strong> y <strong>seguimiento biológico</strong> para construir salud, rendimiento y longevidad.</p>
            <p>No es un plan aislado. <br />Es un <strong>sistema completo de optimización biológica.</strong></p>
        </>
    }
   />

   {/* Sección 1: Qué es el sistema */}
   <SectionWithHeading
    headline="Un método estructurado, no un plan genérico."
    subheadline={
     <>
      <p>
       EON BioSystem organiza todas las decisiones sobre entrenamiento, alimentación y suplementación dentro
       de una misma lógica: entender la biología individual y actuar en consecuencia.
      </p>
      <p>Cada componente del sistema responde a datos reales y se ajusta conforme el cuerpo cambia.</p>
     </>
    }
    tone="emerald"
   />

   {/* Sección 2: Cómo funciona */}
   <SectionWithHeading
    headline="Cómo se implementa el sistema."
    subheadline={
     <p>
      El método se construye en una secuencia clara que reduce la improvisación y aumenta la precisión.
     </p>
    }
    tone="mist"
   >
    <Document className="max-w-2xl rounded-lg bg-bone-50/95 p-6 shadow-sm">
     <ol>
      <li>
       <strong>Evaluación inicial</strong> — Análisis de biomarcadores y contexto individual.
      </li>
      <li>
       <strong>Diseño del sistema</strong> — Integración personalizada de fuerza, nutrición y hábitos.
      </li>
      <li>
       <strong>Ejecución estructurada</strong> — Implementación guiada con criterios definidos.
      </li>
      <li>
       <strong>Seguimiento y ajustes</strong> — Optimización continua basada en datos.
      </li>
     </ol>
    </Document>
   </SectionWithHeading>

   {/* Sección 3: Los pilares */}
   <SectionWithHeading
    headline="Los pilares que sostienen EON BioSystem."
    subheadline={
     <p>
      Cada pilar tiene sentido solo dentro del sistema completo.
     </p>
    }
    tone="bone-mist"
   >
    <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-serif font-bold text-obsidian-900 ">
       Entrenamiento de fuerza
      </h3>
      <p className="text-obsidian-700">
       Base estructural para función, masa muscular y salud metabólica.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-serif font-bold text-obsidian-900 ">
       Nutrición
      </h3>
      <p className="text-obsidian-700">
       Diseñada para optimización biológica, no para restricción arbitraria.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-serif font-bold text-obsidian-900 ">
       Biomarcadores
      </h3>
      <p className="text-obsidian-700">
       Referencia objetiva para medir progreso y guiar decisiones.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-serif font-bold text-obsidian-900 ">
       Suplementación premium
      </h3>
      <p className="text-obsidian-700">
       Herramientas estratégicas cuando aportan valor real.
      </p>
     </div>
    </div>
   </SectionWithHeading>

   {/* Sección 4: Diferencial */}
   <SectionWithHeading
    headline="Por qué EON BioSystem es diferente."
    subheadline={
     <>
      <p>
       EON BioSystem no persigue tendencias ni soluciones rápidas. Su valor está en la estructura, el
       seguimiento y la coherencia del proceso.
      </p>
      <p>
       El objetivo no es intervenir de forma puntual, sino diseñar un sistema que evolucione con la biología.
      </p>
     </>
    }
    tone="emerald"
   />

   {/* Cierre */}
   <CallToActionSimple
    id="cta"
    headline="La longevidad se diseña con método."
    subheadline="El acceso a EON BioSystem es mediante evaluación previa."
    cta={<ButtonLink href="/aplica">Aplica al sistema</ButtonLink>}
   />
  </>
 )
}
