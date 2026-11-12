# /aplica — formulario y API mínima

## Campos para dar de alta en Ombio

Se conserva el nombre de marca del sitio: **EON BioSystem**.

| Clave           | Tipo     | Obligatorio | Validación / valores                                                                                 |
| --------------- | -------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `name`          | Texto    | Sí          | Nombre completo; máximo 150 caracteres                                                               |
| `email`         | Email    | Sí          | Correo válido; máximo 254 caracteres                                                                 |
| `phone`         | Texto    | Sí          | Teléfono / WhatsApp; 7–25 caracteres, al menos 7 dígitos; admite `+`, espacios, paréntesis y guiones |
| `age`           | Entero   | Sí          | 0–120                                                                                                |
| `location`      | Texto    | Sí          | Ciudad y país; máximo 200 caracteres                                                                 |
| `commitment`    | Radio    | Sí          | Una opción: `high`, `medium`, `low`                                                                  |
| `accompaniment` | Radio    | Sí          | Una opción: `integral`, `partial`, `one_off`                                                         |
| `consent`       | Checkbox | Sí          | Debe ser `true`                                                                                      |

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

## Contrato propuesto para aonbyon.com

Implementar un endpoint HTTPS que reciba `POST` JSON y autentique `Authorization: Bearer <token>`. La ruta final la defines en la otra plataforma; no se presupone que exista actualmente.

```json
{
  "name": "Persona de ejemplo",
  "email": "persona@example.com",
  "phone": "+52 55 0000 0000",
  "age": 35,
  "location": "Ciudad de México, México",
  "commitment": "high",
  "accompaniment": "integral",
  "consent": true,
  "source": "/aplica",
  "schema_version": 1,
  "submitted_at": "2026-11-11T18:00:00.000Z"
}
```

Validar de nuevo en la API y persistir antes de responder. `submitted_at` llega en UTC; guardar también la fecha de recepción del servidor. Aceptar `source: "/aplica"` y `schema_version: 1`.

- Registro confirmado: **201** con `{"id":"identificador-del-registro"}` (ID no vacío, de tipo string).
- Datos inválidos: **422**. Credenciales inválidas: **401/403**. Límite de solicitudes: **429**. Fallo interno: **5xx**.
- La interfaz muestra errores genéricos de envío; no expone respuestas internas del servidor.

## Activación en este sitio

Configurar únicamente en el servidor Next.js y reiniciar o volver a desplegar:

```dotenv
APPLICATION_API_URL=https://aonbyon.com/RUTA_POR_DEFINIR
APPLICATION_API_TOKEN=TOKEN_PRIVADO
```

No usar el prefijo `NEXT_PUBLIC_`. El navegador llama a una Server Action y Next.js llama a la API; no se requiere CORS entre navegador y aonbyon.com.

Sin ambas variables, el envío se realiza por Resend. Con URL y token, solo se utiliza la API. Una configuración parcial produce error; un fallo de API no dispara un correo alternativo. El límite de espera es de 15 segundos y no hay reintentos automáticos.

Después de un envío confirmado se muestra: “Recibimos tu solicitud. Revisaremos tu información y te contactaremos si el sistema es compatible con tu contexto actual.” No hay alerta ni este texto en el estado inicial.

Pendiente para conectar: ruta real, token y una prueba conjunta de registro. Ante un timeout, el registro podría haberse guardado: prever deduplicación en la API para reenvíos manuales. Las notificaciones posteriores al registro quedan a cargo de Ombio.

## Correo con Resend

Ambos formularios (`/aplica` y `/muscle-assessment`) utilizan el mismo servicio de correo. Configurar en el servidor:

```dotenv
RESEND_API_KEY=CLAVE_PRIVADA
RESEND_FROM_EMAIL=REMITENTE_DEL_DOMINIO_VERIFICADO
RESEND_FROM_NAME="EON BioSystem"
RESEND_TO_EMAIL=CORREO_INTERNO
```

`RESEND_TO_EMAIL` admite varios destinatarios separados por comas. La respuesta se dirige al correo de la persona solicitante. La integración HTTP sigue el [contrato oficial de Resend](https://resend.com/docs/api-reference/emails/send-email) y confirma el envío únicamente cuando recibe un ID. No se utilizan credenciales ni servicios de Mailjet.

Todos los campos del formulario son obligatorios, sin asteriscos. El navegador impide enviar campos vacíos o el consentimiento sin aceptar; el servidor vuelve a validar todos los datos.
