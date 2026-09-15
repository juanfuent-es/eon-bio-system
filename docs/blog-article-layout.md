# Detalle del blog

`/blog/[slug]` reutiliza `Hero` con `cover_image_url`, título y extracto del CMS. Si falta portada usa `/eon-blog-bg.jpg`. Las portadas externas se sirven directamente, sin depender de una lista de dominios en el optimizador de Next.js; el CMS debe entregar imágenes comprimidas de tamaño adecuado.

`ArticleContent` limpia el HTML de `content` con sanitize-html y lo separa en bloques con parse5. Elimina atributos `style`, `class` y presentación del CMS; conserva etiquetas semánticas y atributos de enlaces y medios. Cada bloque de texto se renderiza dentro de `Container` con Tailwind Typography (`prose`). `font-sans` y `prose-headings:font-serif` usan exclusivamente las familias de `globals.css`. Los párrafos, encabezados, listas, citas y tablas tienen un ancho máximo de lectura de 48rem y margen lateral responsive. Las imágenes, videos y figuras ocupan todo el ancho disponible, con el margen exterior de 16px que usa el sitio. Los pies de imagen mantienen el ancho de lectura.

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
