import { ButtonLink } from '@/components/elements/button'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { Document } from '@/components/elements/document'
import type { ReactNode } from 'react'

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
   <Container className="flex flex-col gap-10 sm:gap-16">
    <div className="flex max-w-3xl flex-col gap-6">
     <Heading>{headline}</Heading>
     <Text size="lg" className="flex max-w-2xl flex-col gap-4">
      {subheadline}
     </Text>
     {cta && <div className="pt-2">{cta}</div>}
    </div>
    {children}
   </Container>
  </section>
 )
}

export default function Sistema() {
 return (
  <>
   {/* Hero */}
   <Hero
    id="hero"
    headline="EON BioSystem: longevidad diseñada como sistema."
    subheadline={
     <p>
      EON BioSystem es un método de ciencia aplicada que integra fuerza, nutrición y biomarcadores en una
      estructura clara para optimizar la biología humana de forma sostenible. No trabaja con acciones aisladas,
      sino con decisiones conectadas entre sí.
     </p>
    }
    cta={
     <ButtonLink href="/aplica" size="lg">
      Aplica al sistema
     </ButtonLink>
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
   />

   {/* Sección 2: Cómo funciona */}
   <SectionWithHeading
    headline="Cómo se implementa el sistema."
    subheadline={
     <p>
      El método se construye en una secuencia clara que reduce la improvisación y aumenta la precisión.
     </p>
    }
   >
    <Document className="max-w-2xl">
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
   >
    <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-display font-bold text-obsidian-900 ">
       Entrenamiento de fuerza
      </h3>
      <p className="text-obsidian-700">
       Base estructural para función, masa muscular y salud metabólica.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-display font-bold text-obsidian-900 ">
       Nutrición
      </h3>
      <p className="text-obsidian-700">
       Diseñada para optimización biológica, no para restricción arbitraria.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-display font-bold text-obsidian-900 ">
       Biomarcadores
      </h3>
      <p className="text-obsidian-700">
       Referencia objetiva para medir progreso y guiar decisiones.
      </p>
     </div>
     <div className="flex flex-col gap-3">
      <h3 className="text-lg font-display font-bold text-obsidian-900 ">
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
