import { parseFragment, serializeOuter, type DefaultTreeAdapterMap } from 'parse5'
import sanitizeHtml from 'sanitize-html'

type Node = DefaultTreeAdapterMap['childNode']
type Element = DefaultTreeAdapterMap['element']
export type ArticleBlock = { kind: 'text' | 'media'; html: string }

const mediaTags = new Set(['img', 'picture', 'video', 'figure', 'iframe'])
const wrapperTags = new Set(['div', 'section', 'article', 'main'])
const YOUTUBE_EMBED = 'https://www.youtube-nocookie.com/embed/'
/** Clases del CMS que el sitio sí estiliza; cualquier otra se descarta. */
const allowedFigureClasses = ['article-table', 'article-video']

function isElement(node: Node): node is Element {
  return 'tagName' in node
}

function hasClass(node: Element, className: string) {
  return node.attrs.some((attr) => attr.name === 'class' && attr.value.split(/\s+/).includes(className))
}

/** Las tablas van en el ancho de lectura, como el texto; el resto de figuras ocupa todo el ancho. */
function isMedia(node: Node): boolean {
  return isElement(node) && mediaTags.has(node.tagName) && !(node.tagName === 'figure' && hasClass(node, 'article-table'))
}

function containsMedia(node: Node): boolean {
  return isElement(node) && (isMedia(node) || node.childNodes.some(containsMedia))
}

export function sanitizeArticleHtml(content: string) {
  // Presentation belongs to the site. Preserve semantic markup and media/link
  // attributes, but discard CMS styles, classes, font attributes and scripts.
  return sanitizeHtml(content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'picture', 'source', 'video', 'iframe'],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
      source: ['src', 'srcset', 'sizes', 'type', 'media'],
      video: ['src', 'poster', 'controls', 'preload', 'width', 'height'],
      iframe: ['src', 'title', 'width', 'height', 'loading', 'allow', 'allowfullscreen', 'referrerpolicy'],
      figure: ['class', 'data-youtube-video'],
      th: ['scope', 'colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      ol: ['start', 'reversed'],
      li: ['value'],
      time: ['datetime'],
    },
    allowedClasses: { figure: allowedFigureClasses },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowedSchemesByTag: { img: ['https', 'http'], source: ['https', 'http'], video: ['https', 'http'] },
    exclusiveFilter: (frame) =>
      frame.tag === 'iframe' && !String(frame.attribs.src ?? '').startsWith(YOUTUBE_EMBED),
    transformTags: {
      // Todos los enlaces del CMS son externos y se abren en otra pestaña.
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' },
      }),
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy', decoding: 'async' } }),
      video: (tagName, attribs) => ({ tagName, attribs: { ...attribs, controls: '', preload: 'none' } }),
      iframe: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          loading: 'lazy',
          allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture',
          referrerpolicy: 'strict-origin-when-cross-origin',
          allowfullscreen: '',
        },
      }),
    },
  })
}

export function getArticleBlocks(content: string): ArticleBlock[] {
  const clean = sanitizeArticleHtml(content)
  const blocks: ArticleBlock[] = []
  function append(kind: ArticleBlock['kind'], html: string) {
    if (!html.trim()) return
    const previous = blocks.at(-1)
    if (kind === 'text' && previous?.kind === kind) previous.html += html
    else blocks.push({ kind, html })
  }
  function visit(node: Node) {
    if (isElement(node) && wrapperTags.has(node.tagName)) {
      node.childNodes.forEach(visit)
    } else if (isMedia(node)) {
      append('media', serializeOuter(node as Element))
    } else if (isElement(node) && containsMedia(node)) {
      // Split mixed paragraphs/links around media, preserving their text tags.
      let children: Node[] = []
      function flush() {
        if (children.length) append('text', serializeOuter({ ...(node as Element), childNodes: children }))
        children = []
      }
      for (const child of node.childNodes) {
        if (containsMedia(child)) {
          flush()
          visit(child)
        } else children.push(child)
      }
      flush()
    } else {
      append('text', serializeOuter(node))
    }
  }
  parseFragment(clean).childNodes.forEach(visit)
  return blocks
}
