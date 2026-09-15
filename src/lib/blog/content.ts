import { parseFragment, serializeOuter, type DefaultTreeAdapterMap } from 'parse5'
import sanitizeHtml from 'sanitize-html'

type Node = DefaultTreeAdapterMap['childNode']
type Element = DefaultTreeAdapterMap['element']
export type ArticleBlock = { kind: 'text' | 'media'; html: string }

const mediaTags = new Set(['img', 'picture', 'video', 'figure'])
const wrapperTags = new Set(['div', 'section', 'article', 'main'])

function isElement(node: Node): node is Element {
  return 'tagName' in node
}

function containsMedia(node: Node): boolean {
  return isElement(node) && (mediaTags.has(node.tagName) || node.childNodes.some(containsMedia))
}

export function getArticleBlocks(content: string): ArticleBlock[] {
  // Presentation belongs to the site. Preserve semantic markup and media/link
  // attributes, but discard CMS styles, classes, font attributes and scripts.
  const clean = sanitizeHtml(content, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'picture', 'source', 'video'],
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      source: ['src', 'srcset', 'sizes', 'type', 'media'],
      video: ['src', 'poster', 'controls', 'preload', 'width', 'height'],
      th: ['scope', 'colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      ol: ['start', 'reversed'],
      li: ['value'],
      time: ['datetime'],
    },
    transformTags: {
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
      video: (tagName, attribs) => ({ tagName, attribs: { ...attribs, controls: '', preload: 'none' } }),
    },
  })
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
    } else if (isElement(node) && mediaTags.has(node.tagName)) {
      append('media', serializeOuter(node))
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
