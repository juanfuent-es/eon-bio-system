import { ButtonLink } from '@/components/elements/button'
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

export default function Aplica() {
 return (
  <>
   {/* Hero */}
   <HeroSimpleLeftAligned
    id="hero"
    headline="Aplica al Sistema EON Bio"
    subheadline={
     <p>
      Este formulario nos permite entender tu nivel de interés y compromiso antes de contactarte para
      explicarte el funcionamiento completo de EON BioSystem. Completarlo no garantiza el ingreso al sistema.
     </p>
    }
    cta={
     <ButtonLink href="#form" size="lg">
      Aplica al sistema
     </ButtonLink>
    }
   />

   {/* Sección 1: Qué es este paso */}
   <SectionWithHeading
    headline="Qué significa aplicar."
    subheadline={
     <>
      <p>
       Aplicar a EON Bio es iniciar una evaluación inicial, no inscribirte a un programa ni realizar un pago.
      </p>
      <p>
       Revisamos tu información para determinar si el sistema puede aportarte valor y si existe alineación
       para avanzar al siguiente paso, donde se explican expectativas, metodología y forma de trabajo.
      </p>
     </>
    }
   />

   {/* Sección 2: A quién suele servir */}
   <SectionWithHeading
    headline="Este enfoque suele ser adecuado si:"
    subheadline={
     <p>
      Si este enfoque resuena contigo, continúa con el registro.
     </p>
    }
   >
    <Document className="max-w-2xl">
     <ul>
      <li>Buscas un sistema estructurado, no recomendaciones aisladas</li>
      <li>Estás abierto(a) a entrenar fuerza y ajustar hábitos</li>
      <li>Valoras la ciencia, los datos y el seguimiento</li>
      <li>Te interesa un proceso diseñado para el largo plazo</li>
     </ul>
    </Document>
   </SectionWithHeading>

   {/* Sección 3: Formulario */}
   <section id="form" className="py-16 sm:py-24">
    <Container className="max-w-2xl">
     <div className="mb-12 flex flex-col gap-6">
      <Heading>Registro para evaluación inicial</Heading>
      <Text size="lg">
       Déjanos tus datos y responde brevemente las preguntas. La información se utiliza únicamente para
       evaluar tu solicitud.
      </Text>
     </div>

     <form className="flex flex-col gap-8">
      {/* Datos básicos */}
      <fieldset className="flex flex-col gap-6 border-t border-mineral-200 pt-8 ">
       <legend className="text-lg font-display font-bold text-obsidian-900 ">
        Datos básicos
       </legend>

       <div>
        <label htmlFor="name" className="block text-sm font-semibold text-obsidian-900 ">
         Nombre completo <span className="text-vital-600">*</span>
        </label>
        <input
         type="text"
         id="name"
         name="name"
         required
         className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
         placeholder="Tu nombre completo"
        />
       </div>

       <div>
        <label htmlFor="email" className="block text-sm font-semibold text-obsidian-900 ">
         Correo electrónico <span className="text-vital-600">*</span>
        </label>
        <input
         type="email"
         id="email"
         name="email"
         required
         className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
         placeholder="tu@email.com"
        />
       </div>

       <div>
        <label
         htmlFor="phone"
         className="block text-sm font-semibold text-obsidian-900 "
        >
         Teléfono / WhatsApp <span className="text-vital-600">*</span>
        </label>
        <input
         type="tel"
         id="phone"
         name="phone"
         required
         className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
         placeholder="+57 300 000 0000"
        />
       </div>

       <div>
        <label htmlFor="age" className="block text-sm font-semibold text-obsidian-900 ">
         Edad
        </label>
        <input
         type="number"
         id="age"
         name="age"
         className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
         placeholder="35"
        />
       </div>

       <div>
        <label
         htmlFor="location"
         className="block text-sm font-semibold text-obsidian-900 "
        >
         Ciudad y país de residencia
        </label>
        <input
         type="text"
         id="location"
         name="location"
         className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
         placeholder="Medellín, Colombia"
        />
       </div>
      </fieldset>

      {/* Preguntas de compromiso */}
      <fieldset className="flex flex-col gap-6 border-t border-mineral-200 pt-8 ">
       <legend className="text-lg font-display font-bold text-obsidian-900 ">
        Preguntas de interés y compromiso
       </legend>

       <div className="flex flex-col gap-4">
        <label className="block text-sm font-semibold text-obsidian-900 ">
         EON BioSystem requiere constancia y seguimiento. ¿Qué nivel de compromiso estás dispuesto(a) a
         asumir? <span className="text-vital-600">*</span>
        </label>
        <div className="flex flex-col gap-3">
         {[
          {
           value: 'high',
           label: 'Alto — Puedo seguir indicaciones y priorizar el proceso.',
          },
          {
           value: 'medium',
           label: 'Medio — Puedo adaptarme al sistema con ciertas limitaciones.',
          },
          {
           value: 'low',
           label: 'Bajo — Busco algo flexible y con poca estructura.',
          },
         ].map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
           <input
            type="radio"
            name="commitment"
            value={option.value}
            required
            className="h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
           />
           <span className="text-sm text-obsidian-700">{option.label}</span>
          </label>
         ))}
        </div>
       </div>

       <div className="flex flex-col gap-4">
        <label className="block text-sm font-semibold text-obsidian-900 ">
         EON BioSystem se basa en la lectura y análisis de biomarcadores. ¿Estás dispuesto(a) a realizar
         analíticas de laboratorio de forma periódica (al menos cada 6 meses)? <span className="text-vital-600">*</span>
        </label>
        <div className="flex flex-col gap-3">
         {[
          {
           value: 'yes',
           label: 'Sí — Entiendo que el laboratorio es parte central del sistema.',
          },
          {
           value: 'conditional',
           label: 'Sí, con ciertas limitaciones — Dependería del contexto o indicación.',
          },
          {
           value: 'no',
           label: 'No — Prefiero no realizar estudios de laboratorio de forma periódica.',
          },
         ].map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
           <input
            type="radio"
            name="biomarkers"
            value={option.value}
            required
            className="h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
           />
           <span className="text-sm text-obsidian-700">{option.label}</span>
          </label>
         ))}
        </div>
       </div>
      </fieldset>

      {/* Consentimiento */}
      <fieldset className="flex flex-col gap-4 border-t border-mineral-200 pt-8 ">
       <label className="flex items-start gap-3 cursor-pointer">
        <input
         type="checkbox"
         name="consent"
         required
         className="mt-1 h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
        />
        <span className="text-sm text-obsidian-700">
         Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no
         garantiza el ingreso al sistema.
        </span>
       </label>
      </fieldset>

      {/* Botón de envío */}
      <div className="flex gap-4 border-t border-mineral-200 pt-8 ">
       <ButtonLink href="#" type="submit">
        Enviar solicitud
       </ButtonLink>
      </div>
     </form>
    </Container>
   </section>

   {/* Sección 4: Qué sucede después */}
   <SectionWithHeading
    headline="Qué ocurre después."
    subheadline={
     <p>
      Si tu perfil es compatible con el enfoque de EON BioSystem, nos pondremos en contacto contigo para
      explicarte el sistema con mayor detalle y definir el siguiente paso.
     </p>
    }
   >
    <Document className="max-w-2xl">
     <p>En esa etapa se revisan:</p>
     <ul>
      <li>Funcionamiento completo del sistema</li>
      <li>Expectativas de compromiso</li>
      <li>Modalidad de trabajo</li>
      <li>Acuerdo de colaboración</li>
     </ul>
    </Document>
   </SectionWithHeading>

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
