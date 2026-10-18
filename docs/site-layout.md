# Layout compartido

`src/app/layout.tsx` envuelve todas las rutas con `SiteHeader`, `Main` y el footer. Las páginas no agregan headers propios ni botones flotantes sobre el hero.

`SiteHeader` muestra enlaces a `/publicaciones`, `/muscle-assessment` y `/sistema`. El logo circular lleva a `/`; no hay un botón Home y `/home` permanece accesible por URL sin aparecer en el menú. En `/` se ocultan temporalmente los enlaces. Las rutas hijas mantienen activo su enlace de sección. En móvil los enlaces se despliegan mediante el botón Menú y se cierran al elegir destino o pulsar Escape.

`Hero` conserva el diseño original: fotografía, degradados, bordes redondeados, contenido inferior y la textura de ruido de `Wallpaper` superpuesta sobre la imagen. Cada página aporta imagen, título, texto y acciones.

Todos los testimonios usan `TestimonialLargeQuote`, que incluye el fondo `Wallpaper` de tono `colors`, la cita centrada, el avatar circular y los datos del autor. Las páginas aportan contenido y enlaces sin reemplazar el fondo ni envolverlo en otro `Wallpaper`. La textura de ruido de `Wallpaper` es decorativa (`aria-hidden`) y usa `pointer-events-none` para permitir clics en el contenido.

La navegación usa `NavButtonLink` y `navButtonStyles`, independientes de los botones de acción. Conserva las pills originales con tipografía serif, fondo blanco y hover/activo naranja con texto blanco. Los controles de acción usan `Button` o `ButtonLink`, con variantes `primary`, `secondary` y `soft`. Sus tamaños y estilos se mantienen separados de la navegación. Los controles de reproducción y acordeón conservan su forma según su función.

Las páginas de documentos que no tienen hero reservan espacio para el header mediante `main:not(:has(> .hero))` en `globals.css`.
