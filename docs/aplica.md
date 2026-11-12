# Solicitudes Aplica

## Activación

1. Aplicar `supabase/migrations/52_aplica_applications.sql` en Supabase antes de desplegar el código. Crea una tabla nueva: no modifica ni reinterpreta registros anteriores de otros formularios.
2. En este dashboard configurar `APPLICATION_API_TOKEN` (token privado aleatorio, por ejemplo `openssl rand -hex 32`), `APPLICATION_BOOKING_URL` (URL HTTPS real para agendar), `RESEND_API_KEY` y `RESEND_SENDER_EMAIL` (remitente verificado). Usa el cliente privilegiado existente: `SUPABASE_SECRET_KEY`.
3. En el servidor del sitio EON BioSystem configurar `APPLICATION_API_URL=https://<dominio-real-del-dashboard>/api/aplica` y el mismo `APPLICATION_API_TOKEN`. Reiniciar ambos despliegues. No poner estas variables en `NEXT_PUBLIC_*`.
4. Enviar una solicitud desde el sitio, verificar su ID y su aparición en **Administrador → Solicitudes Aplica** (`/admin/solicitudes`). Evaluar una solicitud de prueba con un correo propio y revisar el enlace de agenda antes de activar tráfico real.

La API receptora se implementa aquí; la Server Action y el formulario del sitio externo se configuran en su propio proyecto.

## Contrato

`POST /api/aplica`, `Content-Type: application/json`, `Authorization: Bearer <APPLICATION_API_TOKEN>`.

El cuerpo es el contrato de `aplica-aip.md`: `name`, `email`, `phone`, `age`, `location`, `commitment`, `accompaniment`, `consent: true`, `source: "/aplica"`, `schema_version: 1`, `submitted_at` en UTC ISO 8601. Se rechazan campos desconocidos, incluidos los antiguos `biomarkers`. Respuestas: `201 {"id":"uuid"}`, `422` para datos/JSON inválidos, `401` para token incorrecto, `429` con `Retry-After`, `503` si falta el token del receptor y `500` ante un fallo de persistencia. El cuerpo tiene un máximo de 16 KiB. No se exponen errores de Supabase o Resend.

Se guardan por separado `submitted_at` y `received_at` (hora del servidor). La RPC `receive_application` guarda la solicitud en una transacción antes de confirmar. Un hash de los datos normalizados y la fecha permite repetir exactamente un envío sin crear otra fila. Reenvíos con las mismas respuestas y una fecha nueva dentro de 15 minutos también devuelven el ID existente; un bloqueo transaccional evita carreras entre peticiones. Pasado ese periodo se permite una nueva solicitud con otra fecha. No se deduplica únicamente por email: la persona puede volver a aplicar. La deduplicación temporal conserva las fechas de la primera recepción y puede agrupar dos envíos intencionales idénticos dentro de esos 15 minutos.

## Panel y autorización

El panel tiene filtros por evaluación, paginación de 20 registros, respuestas completas, motivo personalizado de rechazo, fecha de revisión y el ID del administrador. Es una bandeja común de EON BioSystem para los roles **admin** y **superadmin** activos. Nutriólogos y clientes no tienen acceso. No se asignan solicitudes a administradores individuales ni se crean cuentas de paciente al aceptar.

La API valida sesión y rol en cada lectura y escritura; el token de recepción no permite leer ni evaluar. La tabla y la RPC no son accesibles por `anon` ni `authenticated`; solo por el cliente servidor con `service_role`. Las decisiones usan una actualización condicional `status = pending`: únicamente una evaluación simultánea puede ganar. La confirmación explica el envío y la decisión definitiva. Para cambiar una decisión ya enviada se requiere un proceso explícito de corrección, fuera de este flujo.

## Correo y recuperación

Los textos en `src/features/aplica/mail.ts` reproducen los de `aplica-aip.md`, con nombre, motivo de rechazo y enlace de agenda. El correo incluye texto plano y HTML con datos escapados. La marca de este flujo es **EON BioSystem**. El rechazo exige de 10 a 1500 caracteres; la aceptación exige agenda HTTPS. La configuración se valida antes de guardar una decisión.

Al confirmar, primero se persisten decisión, administrador, fecha y el contenido completo e inmutable del correo. Después se intenta enviar en el servidor (timeout de 15 segundos). No hay una transacción distribuida entre Supabase y Resend. Si el correo falla, la decisión sigue guardada y el panel permite reintentar únicamente su envío. Un timeout del navegador requiere actualizar la lista para conocer el estado real.

Una reserva atómica de 60 segundos impide envíos simultáneos; si el proceso se interrumpe, se puede recuperar después de ese plazo. Cada reintento usa el mismo contenido y la clave `aplica-decision/<id>`. Se guarda el ID confirmado por Resend y la fecha de envío. “Enviado a Resend” confirma aceptación por el proveedor; no implica entrega al buzón. No se han implementado webhooks de entrega/rebote ni un worker automático: los correos sin confirmar se reintentan desde el panel.

Resend conserva las claves de idempotencia durante 24 horas; se bloquean reintentos después de 23 horas desde el primer intento como margen de seguridad ([documentación de Resend](https://resend.com/docs/dashboard/emails/idempotency-keys)). En ese caso, buscar el envío por destinatario, fecha y clave en Resend. Si existe, reconciliar `email_status`, `email_id` y `email_sent_at` en Supabase. Si se confirma que nunca fue enviado, un operador puede restablecer el primer intento y el estado a `ready` para habilitar el reenvío. No restablecer una operación cuyo resultado siga siendo incierto.

Los textos de WhatsApp están disponibles para copiar después de confirmar el correo; su envío es manual. No se presupone un proveedor de WhatsApp ni una clave de país a partir del teléfono.

El rate limiter existente usa memoria del proceso: 60 peticiones/minuto por IP para recepción y 30 para evaluación. Si se despliega con múltiples workers/instancias debe sustituirse por almacenamiento compartido. La IP depende de que el proxy de producción normalice las cabeceras de reenvío.

## Verificación

`pnpm exec vitest run src/features/aplica/aplica.test.ts src/app/api/aplica/route.test.ts src/__tests__/components/route-access.test.ts`

`pnpm exec tsc --noEmit`

`pnpm exec eslint src/features/aplica src/app/api/aplica 'src/app/(protected-routes)/admin/solicitudes/page.tsx'`

Los tests de servicio simulan Supabase y Resend: no envían correos reales. La prueba conjunta de producción requiere aplicar la migración y configurar las variables anteriores.

`supabase/tests/aplica.sql` verifica la migración con PostgreSQL: reenvío exacto, reenvío manual, nueva solicitud después de 15 minutos, prioridad del ID original, motivo de rechazo obligatorio, separación de los valores de compromiso y permisos de tabla/RPC. Ejecutarlo únicamente en una base de prueba después de la migración; los datos de prueba se revierten al terminar.
