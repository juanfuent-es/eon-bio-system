import { ButtonLink } from '@/components/elements/button'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import {
 FooterCategory,
 FooterLink,
 FooterWithNewsletterFormCategoriesAndSocialIcons,
 NewsletterForm,
 SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
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
   <HeroSimpleLeftAligned
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

   {/* Footer */}
   <FooterWithNewsletterFormCategoriesAndSocialIcons
    id="footer"
    cta={
     <NewsletterForm
      headline={<span className="text-lg font-display font-bold text-obsidian-900">EON Bio</span>}
      subheadline="Longevity & Antiaging System · Ciencia aplicada · Fuerza · Nutrición · Biomarcadores"
     />
    }
    links={
     <>
      <FooterCategory title="Sistema">
       <FooterLink href="/sistema">El método</FooterLink>
      </FooterCategory>
      <FooterCategory title="Empresa">
       <FooterLink href="/acerca">Acerca de EON</FooterLink>
      </FooterCategory>
      <FooterCategory title="Legal">
       <FooterLink href="/privacy-policy">Privacidad</FooterLink>
      </FooterCategory>
     </>
    }
    fineprint="© 2026 EON Bio. All rights reserved."
    socialLinks={
     <>
      <SocialLink href="https://instagram.com" name="Instagram">
       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
      </SocialLink>
      <SocialLink href="https://twitter.com" name="Twitter">
       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-9.51 11.192 11.192 0 01-3.172.652 5.588 5.588 0 002.449-3.084c-.947.564-1.995.974-3.101 1.194a5.57 5.57 0 00-9.475 5.087 15.825 15.825 0 01-11.477-5.951 5.568 5.568 0 001.726 7.436A5.588 5.588 0 012.08 9.826v.066a5.587 5.587 0 004.479 5.478 5.568 5.568 0 01-2.519.095 5.573 5.573 0 005.207 3.877A11.18 11.18 0 010 19.286a15.875 15.875 0 008.589 2.519c10.305 0 15.93-8.557 15.93-15.949 0-.243-.003-.487-.01-.73a11.377 11.377 0 002.794-2.904z"/></svg>
      </SocialLink>
     </>
    }
   />
  </>
 )
}
