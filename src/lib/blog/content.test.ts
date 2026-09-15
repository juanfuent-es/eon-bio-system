import assert from 'node:assert/strict'
import test from 'node:test'
import { getArticleBlocks } from './content'

test('removes CMS presentation while keeping semantic text and links', () => {
  const blocks = getArticleBlocks(
    '<div class="text-white"><h2 style="font-family:Arial;color:white">Título</h2><p><span style="font-size:40px">Texto <strong>importante</strong></span> <a href="/blog" style="color:red">Blog</a></p></div>',
  )
  assert.equal(blocks.length, 1)
  assert.equal(blocks[0].kind, 'text')
  assert.doesNotMatch(blocks[0].html, /style=|class=|font-family/)
  assert.match(blocks[0].html, /<h2>Título<\/h2>/)
  assert.match(blocks[0].html, /<strong>importante<\/strong>/)
  assert.match(blocks[0].html, /href="\/blog"/)
})

test('splits nested mixed content into safe-area text and full-width media', () => {
  const blocks = getArticleBlocks(
    '<section><div><p>Antes<img src="/photo.jpg" alt="Prueba" style="width:200px">Después <em>del medio</em></p></div></section>',
  )
  assert.deepEqual(
    blocks.map((block) => block.kind),
    ['text', 'media', 'text'],
  )
  assert.equal(blocks[0].html, '<p>Antes</p>')
  assert.match(blocks[1].html, /loading="lazy"/)
  assert.equal(blocks[2].html, '<p>Después <em>del medio</em></p>')
})

test('preserves figures, captions and lists without active HTML', () => {
  const blocks = getArticleBlocks(
    '<ul><li>Uno</li><li>Dos</li></ul><figure><img src="/photo.jpg" onerror="alert(1)"><figcaption style="color:white">Descripción</figcaption></figure><script>alert(1)</script>',
  )
  assert.deepEqual(
    blocks.map((block) => block.kind),
    ['text', 'media'],
  )
  assert.match(blocks[0].html, /<ul><li>Uno<\/li><li>Dos<\/li><\/ul>/)
  assert.match(blocks[1].html, /<figcaption>Descripción<\/figcaption>/)
  assert.doesNotMatch(blocks.map((block) => block.html).join(''), /script|onerror|style=/)
})
