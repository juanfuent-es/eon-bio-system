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
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

export const metadata: Metadata = {
 title: 'EON BioSystem',
 icons: {
  icon: [
   { url: '/favicon.ico', sizes: 'any' },
   { url: '/favicon.svg', type: 'image/svg+xml' },
   { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
 },
 manifest: '/site.webmanifest',
 appleWebApp: {
  title: 'BioSystem',
 },
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
  <html lang="es" className="bg-neutral-200 text-neutral-900">
   <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="./eon-symbol.svg" type="image/svg-xml" />
        <link rel="stylesheet" href="https://use.typekit.net/xsn1nhj.css" />
   </head>
   <body>
    <>
     <NavbarWithLinksActionsAndCenteredLogo
      id="navbar"
      logo={
       <NavbarLogo href="/">
        <svg id="eon-logo" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 60" fill="currentColor" width="30" height="18" className="w-20 h-auto transition-colors duration-300">
            <path d="M99.99,47.23c-.21-5.65-4.85-11.22-13.96-11.22,3.23-12.07.12-15.68.12-15.68-2.55-4.4-6.88-1.5-9.43,1.19-2.42,2.55-4.07,5.69-6.06,8.56.76-2.42,1.9-5.17,1.9-8.2,0-3.29-2.5-6.28-6.16-2.28-2.84,3.1-4.28,5.48-6.14,9.46.28-1.11.55-2.32.76-3.59.98-5.73,1-19.57-8.75-14.22-6.39,3.51-9.73,12.82-11.77,17.21-6.58,12.96-9.87,12.95-9.87,12.95-1.46,0,.02-4.9.46-6.18,1.94-5.73,4.88-11.1,7.13-16.7-1.89,1.45-4.49,1.02-4.49,1.02-1.75,4.26-3.43,7.83-5.83,11.77-1.92,3.15-4.85,7.4-8.09,9.25-5.87,3.35-4.86-4.91-4.22-8.15.42-2.12,1.16-4.37,1.89-6.4,0,0,.32-.95.85-2.34,6.82-1.68,13.82-6.76,16.68-13.17,1.78-3.99,2.65-10.88-4.07-9.01-3.6,1-7.37,4.85-9.64,7.71-3.35,4.23-5.66,9.24-7.21,14.39-7.79,0-11.88-4.33-12.57-9.17C.1,4.5,10.25-1.87,19.17,1.17c2.16.74,2.23.92,2.96,1.34C13.73-3.4-.4,1.58,0,12.77c.21,5.65,4.85,11.22,13.96,11.22-3.23,12.07-.12,15.68-.12,15.68,2.55,4.4,6.88,1.5,9.43-1.19,2.42-2.55,4.07-5.69,6.06-8.56-.76,2.42-1.9,5.17-1.9,8.2,0,3.29,2.5,6.28,6.16,2.28,2.91-3.17,4.35-5.6,6.28-9.75-.82,3.07-1.12,5.22-1.12,5.22-.49,4.43-.78,15.23,6.39,13.99,5.69-.98,9.97-8.35,12.25-13.09,0,0,.35-.79,2.51-5.8,6.33-12.25,9.45-12.39,9.45-12.39,1.46,0-.02,4.9-.46,6.18-1.94,5.73-4.88,11.1-7.13,16.7,1.89-1.45,4.49-1.02,4.49-1.02,1.75-4.26,3.43-7.83,5.83-11.77,1.92-3.15,4.85-7.4,8.09-9.25,5.87-3.35,4.86,4.91,4.22,8.15-.42,2.12-1.16,4.37-1.89,6.4,0,0-.32.95-.85,2.34-6.82,1.68-13.82,6.76-16.68,13.17-1.78,3.99-2.65,10.88,4.07,9.01,3.6-1,7.37-4.85,9.64-7.71,3.35-4.23,5.66-9.24,7.21-14.39,7.79,0,11.88,4.33,12.57,9.17,1.42,9.9-8.73,16.27-17.65,13.23-2.16-.74-2.23-.92-2.96-1.34,8.4,5.91,22.53.93,22.12-10.26ZM25.51,9.33c1.38-2.16,4.66-6.93,7.32-7.35,4.4-.69,2.68,5.93,1.71,8.14-2.61,5.91-8.93,11.15-16.04,13.1.6-1.54,1.42-3.51,2.34-5.29,2.19-4.27,2.99-5.95,4.67-8.61ZM58.13,23.4c-1.61,6.42-4.71,14.68-8.11,20.36-1.15,1.92-3.36,5.54-5.79,5.65-4.48.2-3.61-6.57-3.13-9.38,1.27-7.5,6.29-21.08,11.08-26.98.76-.93,1.69-2.08,2.93-2.33,6.21-1.26,3.8,9.6,3.03,12.68ZM74.49,50.67c-1.38,2.16-4.66,6.93-7.32,7.35-4.4.69-2.68-5.93-1.71-8.14,2.61-5.91,8.93-11.15,16.04-13.1-.6,1.54-1.42,3.51-2.34,5.29-2.19,4.27-2.99,5.95-4.67,8.61Z"/>
        </svg>
       </NavbarLogo>
      }
      links={
       <>
        <NavbarLink href="/metodo">Método</NavbarLink>
        <NavbarLink href="/about">Acerca de</NavbarLink>
        <NavbarLink href="/preguntas-frecuentes">FAQS</NavbarLink>
       </>
      }
      actions={
       <>
        <ButtonLink href="/aplica" className='min-w-20'>Aplica <ArrowNarrowRightIcon /></ButtonLink>
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
         <address className="not-italic text-sm/7 text-green-700">
          <p className="font-medium">Alotepec #50, Coapa, Villa Quietud</p>
          <p>Alcaldía Coyoacán. CP #04918</p>
          <p>Ciudad de México, CDMX</p>
          <div className="mt-4">
           <p className="font-medium text-green-800">Horario de atención:</p>
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
         <FooterLink href="/">Inicio</FooterLink>
         <FooterLink href="/metodo">Método</FooterLink>
         <FooterLink href="/about">Acerca de</FooterLink>
         <FooterLink href="/aplica">Aplicar</FooterLink>
         <FooterLink href="/preguntas-frecuentes">FAQ</FooterLink>
        </FooterCategory>
        <FooterCategory title="Legal">
         <FooterLink href="/privacidad">Aviso de Privacidad</FooterLink>
         <FooterLink href="/terminos-condiciones">Términos y Condiciones</FooterLink>
        </FooterCategory>
        <FooterCategory title="Contacto">
         <FooterLink href="mailto:contacto@eonbiosystem.com">Email</FooterLink>
         <FooterLink href="https://wa.me/5215545848965">WhatsApp</FooterLink>
        </FooterCategory>
       </>
      }
      fineprint="© 2026 EON BioSystem. Todos los derechos reservados."
      socialLinks={
       <>
        <SocialLink href="https://www.facebook.com/eonbiosystem" name="Facebook" target='_blank'>
         <FacebookIcon />
        </SocialLink>
        <SocialLink href="https://www.instagram.com/eonbiosystem" name="Instagram" target='_blank'>
         <InstagramIcon />
        </SocialLink>
        <SocialLink href="https://x.com/eonbiosystem" name="X" target='_blank'>
         <XIcon />
        </SocialLink>
        <SocialLink href="mailto:contacto@eonbiosystem.com" name="Email" target='_blank'>
         <MailIcon />
        </SocialLink>
        <SocialLink href="https://wa.me/5215545848965" name="WhatsApp" target='_blank'>
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
