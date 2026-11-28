# Detalle del blog

El hero usa `data-full-height` para compartir la altura de pantalla y el encuadre de Publicaciones y Home, con la navegación global en su posición habitual. Al final de cada nota, después de las etiquetas, se muestra la firma con `/lic-ricardo-sanchez.jpg`, «Lic. Ricardo Sánchez» y «Especialista en Optimización Fisiometabólica y Longevidad». La foto y el texto enlazan a su perfil de Instagram en una pestaña nueva. Esta atribución es fija para todas las notas; el contrato actual del CMS no incluye autor.

Contrato de datos: API pública `/blog/api/v1` (variable `BLOG_API_BASE_URL`, por defecto `https://eonbiosystem.com/blog/api/v1`). Tipos en `src/lib/blog/articles.ts`.

- `synopsis` es visible: tarjeta del listado y subtítulo del hero en el detalle. `description` es solo metadata (`<meta name="description">`, `og:description`, `twitter:description`) y nunca se muestra.
- `category` es un objeto `{ slug, name }`. El listado lee las categorías de `GET /categories` (ordenadas por `sort_order`, ocultando las de `article_count = 0` salvo la seleccionada) y filtra con `/publicaciones?category={slug}`. Los tags del detalle enlazan a `/publicaciones?tag={tag}`. El listado pagina de 12 en 12.
- `cover_image` trae versiones fijas 16:9. La tarjeta usa `mobile`/`tablet` con `srcset`; el hero del detalle usa `mobile`/`tablet`/`desktop` (prop `imageSrcSet` de `Hero`, sin el optimizador de Next). `og` (1200×630) se usa solo en metadata. Si `alt` viene vacío se usa `title`. Sin portada, el hero usa `/eon-publicaciones.jpg`.
- `generateMetadata` entrega en el HTML del servidor `og:*` (incluye `og:image:secure_url/type/width/height/alt`), `article:published_time/modified_time/section/tag` y `twitter:*`, más JSON-LD `BlogPosting`. La URL canónica usa `/publicaciones/{slug}`.

`ArticleContent` limpia el HTML de `content` con sanitize-html y lo separa en bloques con parse5. Elimina atributos `style`, `class` (salvo `article-table` y `article-video` en `figure`) y presentación del CMS; fuerza `target="_blank" rel="noopener noreferrer"` en todos los enlaces, solo acepta `https:`, `http:` y `mailto:`, y permite `iframe` únicamente con `src` que empiece por `https://www.youtube-nocookie.com/embed/`. Las tablas (`figure.article-table`) quedan en el ancho de lectura con scroll horizontal y `tabular-nums`; los videos ocupan el ancho completo en 16:9; conserva etiquetas semánticas y atributos de enlaces y medios. Cada bloque de texto se renderiza dentro de `Container` con Tailwind Typography (`prose prose-base sm:prose-lg`). `font-sans` y `prose-headings:font-serif` usan exclusivamente las familias de `globals.css`. El tamaño, interlineado y márgenes se controlan con utilidades de Tailwind Typography: párrafos y listas de 16px en móvil y 18px desde `sm`, párrafos con `my-3`, listas con `my-3 pl-5` y elementos con `my-1 py-0`. Los subtítulos h2 usan `text-2xl sm:text-3xl`; los bloques de contenido se separan con `space-y-6`. Los párrafos, encabezados, listas, citas y tablas tienen un ancho máximo de lectura de 42rem (`max-w-2xl`) y margen lateral responsive. Las imágenes, videos y figuras ocupan todo el ancho disponible, con el margen exterior de 16px que usa el sitio. Los pies de imagen mantienen el ancho de lectura.

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
