import { Main } from '@/components/elements/main'
import { FacebookIcon } from '@/components/icons/social/facebook-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { SiteHeader } from '@/components/site-header'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EON BioSystem',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
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
    <html lang="es" className="bg-neutral-200 text-neutral-50">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="https://use.typekit.net/xsn1nhj.css" />
      </head>
      <body className="w-full overflow-x-hidden">
        <SiteHeader />
        <Main id="main-content">
          {children}

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <div className="flex flex-col gap-6 text-green-700">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Visítanos</h3>
                  <address className="text-sm/7 not-italic">
                    <a
                      href="https://maps.app.goo.gl/7HCJZv8jL7gShTRs9"
                      target="_blank"
                      title="Ver Ubicación en GoogleMaps"
                      className="transition-colors md:hover:text-orange-600"
                    >
                      <p className="font-medium">Alotepec #50, Coapa, Villa Quietud</p>
                      <p>Alcaldía Coyoacán. CP #04918</p>
                      <p>Ciudad de México, CDMX</p>
                    </a>
                    <div className="mt-4">
                      <h3 className="mb-2 text-base font-semibold text-green-800">Horario:</h3>
                      <p>Lunes a viernes de 10:00 am - 7:00 pm</p>
                      <p>Sábado de 8:00 am - 4:00 pm</p>
                    </div>
                  </address>
                </div>
              </div>
            }
            links={
              <>
                <FooterCategory title="Legal">
                  <FooterLink href="/privacidad">Aviso de Privacidad</FooterLink>
                  <FooterLink href="/terminos-condiciones">Términos y Condiciones</FooterLink>
                </FooterCategory>
                <FooterCategory title="Contacto">
                  <FooterLink href="mailto:contacto@eonbiosystem.com">contacto@eonbiosystem.com</FooterLink>
                  <FooterLink target="_blank" href="https://wa.me/+525549562488">
                    Whatsapp: 55 49 56 24 88
                  </FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2026 EON BioSystem. Todos los derechos reservados."
            socialLinks={
              <>
                <SocialLink href="https://www.instagram.com/eonbiosystem" name="Instagram" target="_blank">
                  <InstagramIcon />
                </SocialLink>
                <SocialLink href="https://www.facebook.com/eonbiosystem" name="Facebook" target="_blank">
                  <FacebookIcon />
                </SocialLink>
              </>
            }
          />
        </Main>
      </body>
    </html>
  )
}
