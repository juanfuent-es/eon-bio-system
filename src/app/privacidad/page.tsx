import { DocumentCentered } from '@/components/sections/document-centered'

export default function Page() {
  return (
    <DocumentCentered
      id="document"
      headline="Aviso de Privacidad"
      subheadline={<p>Última actualización: 1 de febrero de 2026.</p>}
    >
      <p>
        <strong>EON BioSystem</strong> respeta su privacidad y está comprometido con la protección de su información personal. Este Aviso de
        Privacidad describe, en términos generales, cómo recopilamos, usamos, almacenamos y protegemos la
        información cuando interactúa con nuestros sitios web, productos o servicios (colectivamente, los &quot;
        <strong>Servicios</strong>&quot;).
      </p>
      <h2>Información que Recopilamos y Cómo la Usamos</h2>
      <p>
        Podemos recopilar información que usted nos proporciona voluntariamente cuando interactúa con los Servicios,
        como cuando se comunica con nosotros, crea una cuenta o se comunica con nosotros de otra manera. Esta
        información puede incluir datos personales o de cuenta básicos, como su nombre, dirección de correo
        electrónico o información de contacto similar.
      </p>
      <p>
        También podemos recopilar automáticamente información técnica o de uso limitada cuando utiliza los Servicios.
        Esto puede incluir información como el tipo de navegador, detalles del dispositivo o sistema operativo,
        dirección IP y datos generales de uso.
      </p>
      <p>La información que recopilamos puede usarse para propósitos tales como:</p>
      <ul>
        <li>Proporcionar y mantener los Servicios</li>
        <li>Responder a consultas y comunicaciones</li>
        <li>Mejorar características y funcionalidad</li>
        <li>Cumplir con las obligaciones legales aplicables</li>
      </ul>
      <h2>Compartir, Retención y Seguridad de la Información</h2>
      <p>
        No vendemos su información personal. Podemos compartir información con proveedores de servicios externos que
        realizan servicios en nuestro nombre, como alojamiento o soporte técnico, y solo en la medida necesaria para
        que realicen esos servicios. También podemos divulgar información si así lo requiere la ley o en respuesta a
        solicitudes legales válidas.
      </p>
      <p>
        Retenemos información solo durante el tiempo razonablemente necesario para cumplir con los propósitos
        descritos en este Aviso de Privacidad, a menos que la ley requiera o permita un período de retención más
        largo.
      </p>
      <p>
        Tomamos medidas administrativas, técnicas y organizativas razonables diseñadas para proteger la información
        contra el acceso, uso, alteración o divulgación no autorizados. Sin embargo, ningún método de transmisión por
        Internet o método de almacenamiento electrónico es completamente seguro, y no podemos garantizar la seguridad
        absoluta.
      </p>
      <h2>Sus Opciones, Actualizaciones e Información de Contacto</h2>
      <p>
        Puede optar por no proporcionarnos cierta información, aunque hacerlo puede limitar su capacidad para usar
        algunas funciones de los Servicios. Dependiendo de su ubicación, puede tener ciertos derechos con respecto a
        su información personal según las leyes aplicables.
      </p>
      <p>
        Podemos actualizar este Aviso de Privacidad de vez en cuando. Cualquier cambio se reflejará actualizando la
        fecha de &quot;<strong>Última actualización</strong>&quot; en la parte superior de esta página. El uso continuado de
        los Servicios después de cualquier cambio indica la aceptación de la política actualizada.
      </p>
      <p>Si tiene alguna pregunta sobre este Aviso de Privacidad, contáctenos en:</p>
      <p>
        <strong>EON BioSystem</strong>
        <br />
        Email: <a href="mailto:contacto@eonbiosystem.com">contacto@eonbiosystem.com</a>
        <br />
        Dirección: Alotepec #50, Coapa, Villa Quietud, Alcaldía Coyoacán. CP #04918, Ciudad de México, CDMX
        <br />
        WhatsApp: <a href="https://wa.me/5215545848965">+52 1 55 4584 8965</a>
      </p>
    </DocumentCentered>
  )
}
