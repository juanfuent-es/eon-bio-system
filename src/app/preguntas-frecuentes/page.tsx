import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Main } from '@/components/elements/main'
import { Hero } from '@/components/sections/hero'
import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

export default function PreguntasFrecuentes() {
 return (
  <>
   {/* Hero */}
   <Hero
     id="hero"
     headline={
      <>
         Preguntas frecuentes sobre EON BioSystem
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/aplicar" text="FAQ" cta="Aplicar al sistema" variant="overlay" />
     }
     subheadline={
      <p>Respuestas claras sobre el sistema de longevidad clínica basado en ciencia aplicada, biomarcadores y optimización estructurada.</p>
     }
    />

   <Main>
    {/* FAQs */}
    <FAQsAccordion id="faqs" headline="Preguntas Frecuentes">
     <Faq
      id="faq-1"
      question="¿Qué es exactamente EON BioSystem?"
      answer="Sistema integral de longevidad clínica basado en análisis de biomarcadores, composición corporal, optimización hormonal y entrenamiento estructurado."
     />
     <Faq
      id="faq-2"
      question="¿En qué se diferencia de una consulta nutricional tradicional?"
      answer="Porque no es dieta + rutina. Es: Evaluación fisiológica profunda, paneles de laboratorio estratégicos, protocolos personalizados, seguimiento longitudinal y enfoque anual."
     />
     <Faq
      id="faq-3"
      question="¿Quién es candidato ideal para EON?"
      answer="Empresarios, profesionistas de alto rendimiento, atletas recreativos o competitivos, personas interesadas en longevidad activa y pacientes con resistencia metabólica leve–moderada."
     />
     <Faq
      id="faq-4"
      question="¿Es un programa para bajar de peso?"
      answer="No. Es un sistema de optimización metabólica y corporal. La pérdida de grasa es consecuencia, no objetivo aislado."
     />
     <Faq
      id="faq-5"
      question="¿Trabajan con biomarcadores y estudios de laboratorio?"
      answer="Sí. EON se fundamenta en: Perfil hormonal, perfil metabólico, marcadores inflamatorios, composición corporal (InBody) y seguimiento trimestral."
     />
     <Faq
      id="faq-6"
      question="¿Cuánto dura el programa?"
      answer="Modelo anual recomendado. La longevidad no se trabaja en 12 semanas."
     />
     <Faq
      id="faq-7"
      question="¿Incluye medicación o terapias farmacológicas?"
      answer="Solo si existe indicación clínica documentada y bajo consentimiento informado."
     />
     <Faq
      id="faq-8"
      question="¿Es un programa online o presencial?"
      answer="Modelo híbrido."
     />
     <Faq
      id="faq-9"
      question="¿Qué tipo de resultados se pueden esperar?"
      answer="Reducción de grasa visceral, aumento de masa magra, optimización hormonal, mejora en marcadores cardiometabólicos y mejora en energía y desempeño."
     />
     <Faq
      id="faq-10"
      question="¿Qué nivel de compromiso requiere?"
      answer="Alto. EON no es para personas que buscan soluciones rápidas."
     />
    </FAQsAccordion>

    {/* Call To Action */}
    <CallToActionSimpleCentered
     id="call-to-action"
     headline="¿Tienes más preguntas?"
     subheadline={
      <p>Contacta con nuestro equipo para conocer más sobre cómo EON BioSystem puede ayudarte en tu proceso de optimización y longevidad.</p>
     }
     cta={
      <div className="flex items-center gap-4">
       <ButtonLink href="/aplicar" size="lg">
        Aplicar al sistema
       </ButtonLink>

       <PlainButtonLink href="/metodo" size="lg">
        Conocer el método <ArrowNarrowRightIcon />
       </PlainButtonLink>
      </div>
     }
    />
   </Main>
  </>
 )
}
