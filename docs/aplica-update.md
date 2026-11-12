# Update de Aplica: residencia estructurada (v2)

Actualizar el dashboard **antes de desplegar el sitio**. Mantener `POST /api/aplica`, el token compartido y la respuesta `201 {"id":"uuid"}`. El sitio sigue confirmando persistencia, pero ya no muestra ni devuelve el ID al navegador.

## Nuevo cuerpo

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

Fuera de México, por ejemplo: `city: "Madrid"`, `country_code: "ES"`, `state_code: null`.

## Validación y persistencia

- Discriminar por `schema_version`: conservar v1 con `location`; aceptar v2 con `city`, `country_code` y `state_code`, sin `location`. Rechazar campos desconocidos por versión. `residence` solo existe en el formulario; no llega a la API.
- `city`: texto obligatorio, trim, 1–100 caracteres. `country_code`: código vigente ISO 3166-1 alpha-2 en mayúsculas, validado contra catálogo, no solo por longitud.
- Para `MX`, exigir uno de los 32 códigos ISO 3166-2 mexicanos. Para cualquier otro país, exigir `state_code: null`. Las demás validaciones permanecen iguales.
- Agregar columnas `city`, `country_code`, `state_code` con restricciones según versión; permitir `location = null` en v2 y los nuevos campos nulos en v1. Actualizar la restricción de `schema_version` para admitir 1 y 2. Conservar los datos históricos sin intentar dividir automáticamente `location`.
- Adaptar `receive_application` y su transacción para guardar los campos nuevos. Incluir versión y residencia normalizada en los hashes de deduplicación de v2, conservando los hashes y el comportamiento de v1. Mantener reenvío exacto, ventana de 15 minutos y bloqueo ante concurrencia. Una v1 y una v2 no necesitan deduplicarse entre sí.
- Mantener tabla y RPC restringidas a `service_role`, incluyendo cualquier firma nueva de la función. No cambiar evaluación, correo inmutable ni recuperación de envíos.

Catálogo compartido del sitio: `src/lib/applications/residence.ts` (249 países/territorios ISO y 32 entidades). Copiar o usar un catálogo equivalente en el receptor. Códigos mexicanos admitidos:

```text
MX-AGU MX-BCN MX-BCS MX-CAM MX-CHH MX-CHP MX-CMX MX-COA
MX-COL MX-DUR MX-GRO MX-GUA MX-HID MX-JAL MX-MEX MX-MIC
MX-MOR MX-NAY MX-NLE MX-OAX MX-PUE MX-QUE MX-ROO MX-SIN
MX-SLP MX-SON MX-TAB MX-TAM MX-TLA MX-VER MX-YUC MX-ZAC
```

## Panel y despliegue

Mostrar v2 como «Ciudad, Estado, México» o «Ciudad, País», resolviendo códigos a nombres. Para v1, conservar `location` tal como fue recibido. Mantener el ID disponible únicamente para administración.

1. Aplicar migración y desplegar receptor compatible con v1 + v2.
2. Verificar v1, v2 México y v2 extranjero; rechazar país inexistente, estado mexicano inválido, México sin estado y extranjero con estado. Probar deduplicación y permisos de la RPC.
3. Desplegar el sitio y comprobar que ambas ramas aparezcan correctamente en el panel. URL y token no cambian.

El sitio oculta el formulario tras éxito o error. El éxito agradece por nombre e indica el correo de contacto; el error permite volver a las respuestas sin perderlas mientras la página siga abierta. No envía correos de recepción: el dashboard conserva el correo posterior a la evaluación.
