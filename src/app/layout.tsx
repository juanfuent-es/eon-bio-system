import Image from 'next/image'

import { ButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { FacebookIcon } from '@/components/icons/social/facebook-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import { WhatsAppIcon } from '@/components/icons/social/whatsapp-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import {
 FooterCategory,
 FooterLink,
 FooterWithNewsletterFormCategoriesAndSocialIcons,
 SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import type { Metadata } from 'next'
import './globals.css'
import {
 NavbarLink,
 NavbarLogo,
 NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'

export const metadata: Metadata = {
 title: 'EON BioSystem',
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
  <html lang="en" className="bg-neutral-200 text-neutral-900">
   <head>
    <link rel="stylesheet" href="https://use.typekit.net/xsn1nhj.css" />
   </head>
   <body>
    <>
     <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      logo={
       <NavbarLogo href="/">
        <Image
         src="/logo-eon.svg"
         alt="EON BioSystem"
         className=""
         width={85}
         height={28}
        />
        <Image
         src="/logo-eon.white.svg"
         alt="EON BioSystem"
         className=""
         width={85}
         height={28}
        />
       </NavbarLogo>
      }
      links={
       <>
        <NavbarLink href="/sistema">El Sistema</NavbarLink>
        <NavbarLink href="/acerca">Acerca de</NavbarLink>
        <NavbarLink href="/precio">Precio</NavbarLink>
       </>
      }
      actions={
       <>
        <ButtonLink href="https://wa.me/5215545848965" target="_blank">Aplica</ButtonLink>
       </>
      }
     />

     <Main>{children}</Main>

     <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
       <div className="flex flex-col gap-6">
        <div>
         <h3 className="text-lg font-semibold mb-2">Visítanos</h3>
         <address className="not-italic text-sm/7 text-olive-700">
          <p className="font-medium">Alotepec #50, Coapa, Villa Quietud</p>
          <p>Alcaldía Coyoacán. CP #04918</p>
          <p>Ciudad de México, CDMX</p>
          <div className="mt-4">
           <p className="font-medium text-olive-800">Horario de atención:</p>
           <p>Lunes a viernes de 10:00 am - 7:00 pm</p>
           <p>Sábado de 8:00 am - 4:00 pm</p>
          </div>
         </address>
        </div>
       </div>
      }
      links={
       <>
        <FooterCategory title="Navegación">
         <FooterLink href="/sistema">Sistema</FooterLink>
         <FooterLink href="/acerca">Acerca</FooterLink>
         <FooterLink href="/aplica">Aplica</FooterLink>
        </FooterCategory>
        <FooterCategory title="Legal">
         <FooterLink href="/privacy-policy">Aviso de Privacidad</FooterLink>
        </FooterCategory>
        <FooterCategory title="Contacto">
         <FooterLink href="mailto:contacto@eonbiosystem.com">Email</FooterLink>
         <FooterLink href="https://wa.me/5215545848965">WhatsApp</FooterLink>
        </FooterCategory>
       </>
      }
      fineprint="© 2025 EON BioSystem. Todos los derechos reservados."
      socialLinks={
       <>
        <SocialLink href="https://www.facebook.com/eonbiosystem" name="Facebook">
         <FacebookIcon />
        </SocialLink>
        <SocialLink href="https://www.instagram.com/eonbiosystem" name="Instagram">
         <InstagramIcon />
        </SocialLink>
        <SocialLink href="https://x.com/eonbiosystem" name="X">
         <XIcon />
        </SocialLink>
        <SocialLink href="mailto:contacto@eonbiosystem.com" name="Email">
         <MailIcon />
        </SocialLink>
        <SocialLink href="https://wa.me/5215545848965" name="WhatsApp">
         <WhatsAppIcon />
        </SocialLink>
       </>
      }
     />
    </>
   </body>
  </html>
 )
}
