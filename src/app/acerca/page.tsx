import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
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

export default function Acerca() {
 return (
  <>
   {/* Hero */}
   <HeroSimpleLeftAligned
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
