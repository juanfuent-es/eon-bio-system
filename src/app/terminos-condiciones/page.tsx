import Link from 'next/link'

import { DocumentCentered } from '@/components/sections/document-centered'

export default function Page() {
 return (
  <>
   <DocumentCentered id="document" headline="Términos y Condiciones" subheadline={<p>Última actualización: 15 de febrero de 2026.</p>}>
    <h2>1. Aceptación de los Términos</h2>
    <p>
     Al acceder y utilizar este sitio web y los servicios de EON BioSystem ("Servicios"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice nuestros Servicios.
    </p>

    <h2>2. Descripción de Servicios</h2>
    <p>
     EON BioSystem proporciona asesoramiento y orientación personalizada en materia de longevidad, nutrición, entrenamiento de fuerza y optimización de biomarcadores. Nuestros servicios incluyen evaluaciones iniciales, diseño de programas personalizados, seguimiento y ajustes periódicos basados en datos biológicos.
    </p>

    <h2>3. Limitaciones de Responsabilidad</h2>
    <p>
     Los servicios y contenido proporcionados por EON BioSystem son únicamente para fines educativos e informativos. No constituyen asesoramiento médico profesional, diagnóstico o tratamiento médico. Siempre consulte con un profesional de la salud calificado antes de realizar cambios significativos en su régimen de salud o estilo de vida.
    </p>
    <p>
     EON BioSystem no es responsable por:
    </p>
    <ul>
     <li>Lesiones, enfermedades o condiciones resultantes del uso de nuestros servicios o recomendaciones</li>
     <li>Interacciones entre suplementos, medicamentos o cambios dietéticos</li>
     <li>Resultados específicos o resultados no alcanzados</li>
     <li>Daños indirectos, incidentales, especiales o consecuentes derivados del uso de nuestros servicios</li>
    </ul>

    <h2>4. Responsabilidades del Usuario</h2>
    <p>
     El usuario es responsable de:
    </p>
    <ul>
     <li>Proporcionar información precisa y completa en evaluaciones y consultas</li>
     <li>Informar sobre cualquier condición médica preexistente, medicamentos o alergias</li>
     <li>Seguir recomendaciones solo bajo supervisión médica apropiada</li>
     <li>Buscar aprobación médica profesional antes de implementar cambios significativos</li>
     <li>Monitorear su propia salud y detener cualquier práctica que cause malestar</li>
    </ul>

    <h2>5. Propiedad Intelectual</h2>
    <p>
     Todo el contenido del sitio web, incluyendo texto, gráficos, logotipos, imágenes y software, es propiedad de EON BioSystem o sus proveedores de contenido y está protegido por las leyes de derechos de autor. No está permitido reproducir, distribuir o transmitir ningún contenido sin consentimiento previo por escrito.
    </p>

    <h2>6. Modificación de Servicios</h2>
    <p>
     EON BioSystem se reserva el derecho de modificar, suspender o descontinuar sus servicios en cualquier momento, con aviso previo cuando sea posible. No somos responsables de cualquier interrupción en el acceso a nuestros servicios.
    </p>

    <h2>7. Cambios a los Términos</h2>
    <p>
     EON BioSystem puede actualizar estos Términos y Condiciones en cualquier momento. Los cambios serán comunicados por medio de la actualización de la fecha "Última actualización" en esta página. El uso continuado de nuestros servicios después de cualquier cambio constituye su aceptación de los términos revisados.
    </p>

    <h2>8. Ley Aplicable</h2>
    <p>
     Estos Términos y Condiciones se rigen por las leyes del Estado de México y de México. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes en esa ubicación.
    </p>

    <h2>9. Información de Contacto</h2>
    <p>
     Para preguntas sobre estos Términos y Condiciones, por favor contacte:
    </p>
    <p>
     <strong>EON BioSystem</strong>
     <br />
     Email: <Link href="mailto:contacto@eonbiosystem.com">contacto@eonbiosystem.com</Link>
     <br />
     WhatsApp: <Link href="https://wa.me/5215545848965">+52 155 458 48965</Link>
     <br />
     Ubicación: Alotepec #50, Coapa, Villa Quietud, Alcaldía Coyoacán, CP 04918, Ciudad de México
    </p>

    <h2>Descargo de Responsabilidad</h2>
    <p>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
   </DocumentCentered>
  </>
 )
}
