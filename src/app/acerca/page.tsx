import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
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

export default function Acerca() {
 return (
  <>
   {/* Hero */}
   <Hero
    id="hero"
    headline="Ciencia aplicada con una visión clara."
    subheadline={
     <>
      <p>
       EON Bio es una plataforma de longevidad y antiaging creada para quienes buscan claridad, estructura y
       ciencia aplicada en su proceso de optimización biológica.
      </p>
      <p>No es una clínica tradicional. Es un sistema diseñado para largo plazo.</p>
     </>
    }
   />

   {/* Sección 1: Propósito */}
   <SectionWithHeading
    headline="Por qué existe EON Bio."
    subheadline={
     <>
      <p>
       EON Bio nace de una necesidad concreta: ordenar decisiones sobre salud en un entorno saturado de
       información, modas y soluciones inconexas.
      </p>
      <p>
       Su propósito es ofrecer un marco claro donde entrenamiento, nutrición y datos biológicos trabajen de
       forma coherente.
      </p>
     </>
    }
   />

   {/* Sección 2: Filosofía */}
   <SectionWithHeading
    headline="La filosofía detrás del sistema."
    subheadline={
     <p>
      EON Bio parte de una premisa simple: la biología individual debe guiar el proceso. Por eso, el sistema
      se apoya en:
     </p>
    }
   >
    <Document className="max-w-2xl">
     <ul>
      <li>Datos objetivos</li>
      <li>Estructura clara</li>
      <li>Seguimiento continuo</li>
     </ul>
     <p className="italic">La longevidad no es un evento, es un proceso.</p>
    </Document>
   </SectionWithHeading>

   {/* Sección 3: El sistema (mención breve) */}
   <SectionWithHeading
    headline="Qué es EON BioSystem."
    subheadline={
     <>
      <p>
       EON BioSystem es el método que articula el enfoque de EON Bio. Un sistema de ciencia aplicada que
       integra fuerza, nutrición y biomarcadores en una estructura diseñada para evolucionar con el tiempo.
      </p>
      <p>(Para conocer el método completo, ver El Sistema)</p>
     </>
    }
    cta={
     <PlainButtonLink href="/sistema">
      Ver el método completo <ArrowNarrowRightIcon />
     </PlainButtonLink>
    }
   />

   {/* Sección 4: Respaldo clínico */}
   <SectionWithHeading
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
     <PlainButtonLink href="https://ntsclinic.com">
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
