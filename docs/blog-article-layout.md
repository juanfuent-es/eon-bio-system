# Detalle del blog

El hero usa `data-full-height` para compartir la altura de pantalla y el encuadre de Publicaciones y Home, con la navegación global en su posición habitual. Al final de cada nota, después de las etiquetas, se muestra la firma con `/lic-ricardo-sanchez.jpg`, «Lic. Ricardo Sánchez» y «Especialista en Optimización Fisiometabólica y Longevidad». La foto y el texto enlazan a su perfil de Instagram en una pestaña nueva. Esta atribución es fija para todas las notas; el contrato actual del CMS no incluye autor.

`/publicaciones/[slug]` reutiliza el layout global y `Hero` con `cover_image_url`, título y extracto del CMS. Si falta portada usa `/eon-publicaciones.jpg`. Los enlaces de tarjetas, regreso al listado y URL canónica usan `/publicaciones`. Las portadas externas se sirven directamente, sin depender de una lista de dominios en el optimizador de Next.js; el CMS debe entregar imágenes comprimidas de tamaño adecuado.

`ArticleContent` limpia el HTML de `content` con sanitize-html y lo separa en bloques con parse5. Elimina atributos `style`, `class` y presentación del CMS; conserva etiquetas semánticas y atributos de enlaces y medios. Cada bloque de texto se renderiza dentro de `Container` con Tailwind Typography (`prose prose-base sm:prose-lg`). `font-sans` y `prose-headings:font-serif` usan exclusivamente las familias de `globals.css`. El tamaño, interlineado y márgenes se controlan con utilidades de Tailwind Typography: párrafos y listas de 16px en móvil y 18px desde `sm`, párrafos con `my-3`, listas con `my-3 pl-5` y elementos con `my-1 py-0`. Los subtítulos h2 usan `text-2xl sm:text-3xl`; los bloques de contenido se separan con `space-y-6`. Los párrafos, encabezados, listas, citas y tablas tienen un ancho máximo de lectura de 42rem (`max-w-2xl`) y margen lateral responsive. Las imágenes, videos y figuras ocupan todo el ancho disponible, con el margen exterior de 16px que usa el sitio. Los pies de imagen mantienen el ancho de lectura.

Para contenido nuevo en el CMS usar bloques semánticos, por ejemplo:

```html
<p>Introducción del artículo.</p>
<h2>Más que músculos: independencia</h2>
<p>Contenido de la sección con <strong>énfasis</strong>.</p>
<figure>
  <img src="https://cms.example.com/photo.jpg" alt="Descripción de la imagen" width="1920" height="1080" loading="lazy" />
  <figcaption>Pie de imagen opcional.</figcaption>
</figure>
<p>El texto continúa en el contenedor de lectura.</p>
```

También se admiten imágenes dentro de párrafos o contenedores del editor: se separan del texto para conservar su ancho completo. Los estilos inline y clases del editor se eliminan antes del renderizado. El frontend aplica una lista permitida de etiquetas y atributos; scripts, manejadores de eventos y URLs ejecutables se descartan.
