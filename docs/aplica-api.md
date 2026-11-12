# /aplica — formulario y API mínima

## Campos para dar de alta en Ombio

Se conserva el nombre de marca del sitio: **EON BioSystem**. Este sitio envía `schema_version: 2`; antes de desplegarlo, actualizar el receptor siguiendo [aplica-update.md](aplica-update.md). [aplica.md](aplica.md) describe la versión 1 del dashboard.

| Clave           | Tipo            | Obligatorio | Validación / valores                                                                                 |
| --------------- | --------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `name`          | Texto           | Sí          | Nombre completo; máximo 150 caracteres                                                               |
| `email`         | Email           | Sí          | Correo válido; máximo 254 caracteres                                                                 |
| `phone`         | Texto           | Sí          | Teléfono / WhatsApp; 7–25 caracteres, al menos 7 dígitos; admite `+`, espacios, paréntesis y guiones |
| `age`           | Entero          | Sí          | 0–120                                                                                                |
| `city`          | Texto           | Sí          | Ciudad; máximo 100 caracteres                                                                        |
| `country_code`  | Catálogo        | Sí          | ISO 3166-1 alpha-2; `MX` para México                                                                 |
| `state_code`    | Catálogo / null | Sí          | ISO 3166-2 mexicano si `country_code = MX`; `null` para otros países                                 |
| `commitment`    | Radio           | Sí          | Una opción: `high`, `medium`, `low`                                                                  |
| `accompaniment` | Radio           | Sí          | Una opción: `integral`, `partial`, `one_off`                                                         |
| `consent`       | Checkbox        | Sí          | Debe ser `true`                                                                                      |

### Residencia

La pregunta «¿Vives en México o en otro país?» usa dos radios obligatorios sin opción inicial. México muestra ciudad y selector de las 32 entidades; otro país muestra ciudad y selector de países/territorios ISO, excluyendo México. `residence` es un campo del formulario, no se envía a la API. El servidor fija `country_code: "MX"` para México e ignora valores de la rama inactiva.

### 1. Compromiso

**EON BioSystem requiere constancia y seguimiento. ¿Qué nivel de compromiso estás dispuesto a asumir?**

- `high`: Alto: puedo seguir indicaciones y priorizar el proceso.
- `medium`: Medio: puedo adaptarme al sistema con ciertas limitaciones.
- `low`: Bajo: busco algo flexible con poca estructura.

### 2. Acompañamiento

**EON BioSystem trabaja sobre un proceso continuo de evaluación, seguimiento y ajustes. ¿Qué tipo de acompañamiento estás buscando?**

- `integral`: Integral: quiero entender mi situación actual y trabajar de forma estructurada en nutrición, fuerza, salud y hábitos a lo largo del tiempo.
- `partial`: Parcial: me interesa mejorar, pero por ahora podría comprometerme solo con algunas áreas del sistema.
- `one_off`: Puntual: busco principalmente una consulta aislada, una dieta o una solución específica sin seguimiento continuo.

Se elimina `biomarkers`. `commitment` antes representaba acompañamiento: si existen registros anteriores, conservar su significado original al migrarlos.

### Consentimiento

“Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no garantiza el ingreso al sistema.”

## Contrato con el dashboard

El dashboard implementa `POST /api/aplica` sobre HTTPS, con `Content-Type: application/json` y `Authorization: Bearer <APPLICATION_API_TOKEN>`. La implementación receptora y su activación están descritas en [aplica.md](aplica.md).

```json
{
  "name": "Persona de ejemplo",
  "email": "persona@example.com",
  "phone": "+52 55 0000 0000",
  "age": 35,
  "city": "Ciudad de México",
  "country_code": "MX",
  "state_code": "MX-CMX",
  "commitment": "high",
  "accompaniment": "integral",
  "consent": true,
  "source": "/aplica",
  "schema_version": 2,
  "submitted_at": "2026-11-11T18:00:00.000Z"
}
```

Validar de nuevo en la API y persistir antes de responder. `submitted_at` llega en UTC; guardar también la fecha de recepción del servidor. Aceptar `source: "/aplica"` y `schema_version: 2`.

- Registro confirmado: **201** con `{"id":"uuid"}`. El servidor valida el UUID; no se devuelve al navegador ni se muestra en la interfaz.
- Datos inválidos: **422**. Credenciales inválidas: **401**. Límite de solicitudes: **429** con `Retry-After`. Receptor sin token: **503**. Fallo de persistencia: **500**. El cuerpo admite hasta 16 KiB.
- La interfaz muestra errores genéricos de envío; no expone respuestas internas del servidor.

## Activación en este sitio

Configurar únicamente en el servidor Next.js y reiniciar o volver a desplegar:

```dotenv
APPLICATION_API_URL=https://<dominio-real-del-dashboard>/api/aplica
APPLICATION_API_TOKEN=TOKEN_PRIVADO
```

No usar el prefijo `NEXT_PUBLIC_`. El navegador llama a una Server Action y Next.js llama a la API; no se requiere CORS entre navegador y dashboard.

Ambas variables son obligatorias. El token debe coincidir con el del dashboard. Si falta configuración o falla la API, el sitio no confirma recepción ni envía un correo alternativo. El límite de espera es de 15 segundos y no hay reintentos automáticos, incluido ante `429`; se invita a reintentar manualmente en unos minutos.

Después de la respuesta del servidor, el resultado sustituye visualmente al formulario y recibe el foco. La confirmación agradece por nombre, explica la revisión e indica el correo al que llegará el resultado. No muestra identificadores internos ni ofrece otro envío. Ante validación inválida o fallo de entrega, se muestra una tarjeta con el motivo y un botón «Volver a mis respuestas» que conserva todos los campos. Las respuestas permanecen solo en memoria mientras esta página siga abierta.

Para activar: aplicar primero la migración del dashboard, configurar URL y token en este servidor y verificar con una solicitud de prueba que el ID aparezca en `/admin/solicitudes`. Ante un timeout, el registro podría haberse guardado. El receptor deduplica reenvíos exactos y respuestas normalizadas idénticas con fecha nueva dentro de 15 minutos; después puede crear otra solicitud. Las evaluaciones y sus correos quedan a cargo del dashboard. Este sitio no necesita claves de Supabase, agenda ni credenciales de Resend para `/aplica`.

## Correo con Resend

El formulario `/muscle-assessment` conserva el servicio de correo directo. Estas variables corresponden a ese flujo en este sitio; el dashboard configura sus propias credenciales según [aplica.md](aplica.md):

```dotenv
RESEND_API_KEY=CLAVE_PRIVADA
RESEND_FROM_EMAIL=REMITENTE_DEL_DOMINIO_VERIFICADO
RESEND_FROM_NAME="EON BioSystem"
RESEND_TO_EMAIL=CORREO_INTERNO
```

`RESEND_TO_EMAIL` admite varios destinatarios separados por comas. La respuesta se dirige al correo de la persona solicitante. La integración HTTP sigue el [contrato oficial de Resend](https://resend.com/docs/api-reference/emails/send-email) y confirma el envío únicamente cuando recibe un ID. No se utilizan credenciales ni servicios de Mailjet.

Todos los campos del formulario son obligatorios, sin asteriscos. El navegador impide enviar campos vacíos o el consentimiento sin aceptar; el servidor vuelve a validar todos los datos.
