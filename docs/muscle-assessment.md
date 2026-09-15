# Muscle Assessment

Ruta: `/muscle-assessment`. Reutiliza Container, Wallpaper, Subheading y botones del sitio; no agrega CSS ni dependencias.

## Operación

Configurar las variables MAILJET existentes en `.env.example`. Cada envío se clasifica como presencial o remota y se entrega al correo interno con los datos y la fecha UTC. La confirmación sólo aparece cuando Mailjet informa éxito. El registro de interés remoto se conserva en el correo recibido; no hay base de datos, sincronización con Google Sheets ni notificación automática por WhatsApp.

Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID` para cargar GA4 en esta ruta. Eventos: `assessment_request_click` (placement), `assessment_form_start`, `assessment_form_submit` (modality), `assessment_lead_cdmx`, `assessment_lead_remote`, `assessment_whatsapp_click`, `assessment_qr_visit` (source). No se envían datos del formulario a Analytics. Marcar los eventos de prospectos como eventos clave en la propiedad GA4.

Destinos para generar los QR:

- `/muscle-assessment?qr_source=gimnasio`
- `/muscle-assessment?qr_source=futbol-americano`
- `/muscle-assessment?qr_source=pacientes`
- `/muscle-assessment?qr_source=tarjeta-general`

El evento mide visitas desde el enlace etiquetado, no escaneos físicos únicos.

## Material pendiente

Se utiliza el retrato existente de Ricardo como fondo fullscreen del componente Hero compartido. La solicitud tiene un único CTA flotante inferior, con el mismo diseño del home. Después del hero se muestra el video de YouTube `SzYJuStg_IQ` a pantalla completa, con portada y play personalizado que carga el iframe bajo demanda; las cinco tarjetas tienen número, título y descripción mientras se entregan fotos reales de cada prueba. El reporte se presenta como lista de contenido, sin resultados ni credenciales ficticias. Sustituir estos elementos con el video, fotos de pruebas y foto del reporte aprobados. Para videos: controles nativos, sin autoplay, `preload="none"`, poster optimizado y subtítulos.

## Verificación manual con servicios configurados

1. Usar el CTA flotante inferior centrado y comenzar la pre-evaluación.
2. Completar presencial: revisar validaciones, correo recibido y confirmación.
3. Completar remoto: sólo solicitar nombre, WhatsApp, correo, ciudad/país y objetivo; comprobar clasificación en el correo.
4. Simular fallo de Mailjet: conservar datos y permitir reintentar, sin mostrar éxito.
5. Abrir cada enlace QR y comprobar eventos en GA4 DebugView, sin datos personales.

El endpoint requiere protección adicional contra abuso si las campañas generan spam; la validación y el bloqueo durante envío no equivalen a un límite de solicitudes en servidor.
