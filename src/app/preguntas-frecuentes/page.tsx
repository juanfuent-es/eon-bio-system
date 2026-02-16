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
         Preguntas frecuentes
      </>
     }
     eyebrow={
      <AnnouncementBadge href="/aplica" text="FAQ" cta="Aplicar al sistema" variant="overlay" />
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
      question={<>¿Qué es exactamente <strong>EON BioSystem</strong>?</>}
      answer={
       <div>
        <strong>Sistema integral de longevidad clínica</strong> basado en <em>análisis de biomarcadores</em>, <strong>composición corporal</strong>, <em>optimización hormonal</em> y <strong>entrenamiento estructurado</strong>. No es genérico; es <em>diseñado personalmente</em> para tu biología.
       </div>
      }
     />
     <Faq
      id="faq-2"
      question={<>¿En qué se diferencia de una <strong>consulta nutricional tradicional</strong>?</>}
      answer={
       <div>
        Porque <strong>no es dieta + rutina</strong>. Es: <em>Evaluación fisiológica profunda</em>, <strong>paneles de laboratorio estratégicos</strong>, <em>protocolos personalizados</em>, <strong>seguimiento longitudinal</strong> y <em>enfoque anual</em>. La diferencia es el rigor científico y la integración sistémica.
       </div>
      }
     />
     <Faq
      id="faq-3"
      question={<>¿Quién es <strong>candidato ideal</strong> para <em>EON</em>?</>}
      answer={
       <div>
        <strong>Empresarios</strong>, <em>profesionistas de alto rendimiento</em>, <strong>atletas recreativos o competitivos</strong>, <em>personas interesadas en longevidad activa</em> y <strong>pacientes con resistencia metabólica</strong> leve–moderada. Si tu salud es una prioridad, eres candidato.
       </div>
      }
     />
     <Faq
      id="faq-4"
      question={<>¿Es un <strong>programa para bajar de peso</strong>?</>}
      answer={
       <div>
        No. Es un <strong>sistema de optimización metabólica y corporal</strong>. La <em>pérdida de grasa es consecuencia</em>, no objetivo aislado. El enfoque es construir <em>composición corporal óptima</em> y <strong>función metabólica sostenible</strong>.
       </div>
      }
     />
     <Faq
      id="faq-5"
      question={<>¿Trabajan con <strong>biomarcadores</strong> y <em>estudios de laboratorio</em>?</>}
      answer={
       <div>
        <strong>Sí</strong>. EON se fundamenta en: <em>Perfil hormonal</em>, <strong>perfil metabólico</strong>, <em>marcadores inflamatorios</em>, <strong>composición corporal (InBody)</strong> y <em>seguimiento trimestral</em>. Los datos guían cada decisión.
       </div>
      }
     />
     <Faq
      id="faq-6"
      question={<>¿Cuánto <strong>dura el programa</strong>?</>}
      answer={
       <div>
        <strong>Modelo anual recomendado</strong>. La <em>longevidad no se trabaja en 12 semanas</em>. Requiere visión a largo plazo, ajustes continuos y compromiso sostenido.
       </div>
      }
     />
     <Faq
      id="faq-7"
      question={<>¿Incluye <strong>medicación</strong> o <em>terapias farmacológicas</em>?</>}
      answer={
       <div>
        <strong>Solo si existe indicación clínica documentada</strong> y bajo <em>consentimiento informado</em>. Cada decisión está respaldada por datos y es tu elección.
       </div>
      }
     />
     <Faq
      id="faq-8"
      question={<>¿Es un programa <strong>online</strong> o <em>presencial</em>?</>}
      answer={
       <div>
        <strong>Modelo híbrido</strong>. Evaluaciones iniciales presenciales, seguimiento flexible según necesidad, con acceso a herramientas digitales y espacios de entrenamiento.
       </div>
      }
     />
     <Faq
      id="faq-9"
      question={<>¿Qué tipo de <strong>resultados</strong> se pueden <em>esperar</em>?</>}
      answer={
       <div>
        <em>Reducción de grasa visceral</em>, <strong>aumento de masa magra</strong>, <em>optimización hormonal</em>, <strong>mejora en marcadores cardiometabólicos</strong>, <em>mejor energía</em> y <strong>desempeño físico elevado</strong>. Pero los resultados varían según adherencia y biología individual.
       </div>
      }
     />
     <Faq
      id="faq-10"
      question={<>¿Qué nivel de <strong>compromiso</strong> requiere?</>}
      answer={
       <div>
        <strong>Alto</strong>. EON <em>no es para personas que buscan soluciones rápidas</em>. Es para quienes están dispuestos a <strong>invertir en su biología</strong> de forma constante y estructurada. La longevidad exige disciplina, no atajos.
       </div>
      }
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
       <ButtonLink href="/aplica" size="lg">
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
