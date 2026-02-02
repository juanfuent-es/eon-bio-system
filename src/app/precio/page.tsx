import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PricingSingleTierTwoColumn } from '@/components/sections/pricing-single-tier-two-column'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'

export default function Page() {
  return (
    <>
      <Main>
        {/* Pricing */}
        <PricingSingleTierTwoColumn
          id="pricing"
          headline="EON BioSystem"
          subheadline={
            <p>Biosistema de Longevidad - Seguimiento metabólico y funcional. <br />Contrata tu plan de seguimiento mensual.</p>
          }
          price="$99"
          period="/mes"
          features={[
            'Análisis de biomarcadores completo',
            'Plan personalizado de entrenamiento',
            'Plan nutricional diseñado',
            'Seguimiento mensual de progreso',
            'Acceso a comunidad EON',
            'Reportes de seguimiento',
            'Consultas y seguimiento con especialistas',
          ]}
          cta={
            <ButtonLink href="/aplica" size="lg">
              Comenzar ahora
            </ButtonLink>
          }
        />

        {/* Testimonial */}
        <TestimonialLargeQuote
          id="testimonial"
          quote={
            <p>
              EON Bio transformó completamente mi enfoque hacia la longevidad. Con datos objetivos y un sistema claro, 
              pude ver resultados reales en mi biología. Es la diferencia entre hacer cambios al azar y diseñar tu futuro.
            </p>
          }
          img={
            <img
              src="https://assets.tailwindplus.com/avatars/10.webp?size=160"
              alt=""
              width={160}
              height={160}
            />
          }
          name="Cliente EON"
          byline="Sistema de longevidad"
        />

        {/* FAQs */}
        <FAQsAccordion id="faqs" headline="Preguntas Frecuentes">
          <Faq
            id="faq-1"
            question="¿Necesito una tarjeta de crédito para comenzar?"
            answer="Para aplicar al sistema no necesitas tarjeta de crédito. Solo completamos un formulario de evaluación para asegurar que el programa es adecuado para ti."
          />
          <Faq
            id="faq-2"
            question="¿Cuánto tiempo toma ver resultados?"
            answer="Los cambios biológicos toman tiempo. En EON Bio trabajamos con un horizonte de 12 semanas mínimo. Muchos usuarios reportan cambios notables en energía y bienestar en las primeras 4 semanas."
          />
          <Faq
            id="faq-3"
            question="¿Qué pasa si no completo el sistema?"
            answer="Entendemos que la vida es impredecible. Puedes pausar o cancelar en cualquier momento. No hay penalizaciones ni contratos obligatorios."
          />
          <Faq
            id="faq-4"
            question="¿Se adapta el plan a mis limitaciones?"
            answer="Absolutamente. EON Bio se personaliza a tu situación actual, incluyendo lesiones, limitaciones médicas o preferencias específicas. Es un sistema flexible."
          />
        </FAQsAccordion>

        {/* Call To Action */}
        <CallToActionSimpleCentered
          id="call-to-action"
          headline="¿Tienes más preguntas?"
          subheadline={
            <p>Habla con nuestro equipo para conocer más sobre cómo EON Bio puede ayudarte.</p>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/aplica" size="lg">
                Aplicar al sistema
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                Agendar consulta
              </PlainButtonLink>
            </div>
          }
        />
      </Main>
    </>
  )
}
