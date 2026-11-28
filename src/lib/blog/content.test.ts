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

test('keeps YouTube nocookie embeds and drops any other iframe', () => {
  const html = getArticleBlocks(
    '<figure class="article-video x" data-youtube-video=""><iframe src="https://www.youtube-nocookie.com/embed/abc123" title="Video" width="1280" height="720" allowfullscreen onload="alert(1)"></iframe></figure><iframe src="https://www.youtube.com/embed/abc123"></iframe><iframe src="https://evil.example/embed"></iframe>',
  )
    .map((block) => block.html)
    .join('')
  assert.match(html, /<figure class="article-video" data-youtube-video="">/)
  assert.match(html, /src="https:\/\/www\.youtube-nocookie\.com\/embed\/abc123"/)
  assert.match(html, /loading="lazy"/)
  assert.equal(html.match(/<iframe/g)?.length, 1)
  assert.doesNotMatch(html, /onload|evil|youtube\.com\/embed/)
})

test('keeps CMS tables in the reading column with their wrapper class', () => {
  const blocks = getArticleBlocks(
    '<p>Antes</p><figure class="article-table"><table><tbody><tr><th colspan="2"><p>Marcador</p></th></tr><tr><td><p>Glucosa</p></td><td style="color:red"><p>70–99</p></td></tr></tbody></table></figure>',
  )
  assert.equal(blocks.length, 1)
  assert.equal(blocks[0].kind, 'text')
  assert.match(blocks[0].html, /<figure class="article-table"><table>/)
  assert.match(blocks[0].html, /<th colspan="2">/)
  assert.doesNotMatch(blocks[0].html, /style=/)
})

test('opens every link in a new tab and only allows http, https and mailto', () => {
  const html = getArticleBlocks(
    '<p><a href="https://ejemplo.com/estudio">estudio</a> <a href="mailto:hola@ejemplo.com">correo</a> <a href="javascript:alert(1)">x</a></p>',
  )[0].html
  assert.equal(html.match(/target="_blank" rel="noopener noreferrer"/g)?.length, 3)
  assert.match(html, /href="https:\/\/ejemplo\.com\/estudio"/)
  assert.match(html, /href="mailto:hola@ejemplo\.com"/)
  assert.doesNotMatch(html, /javascript/)
})

test('marks content images as lazy and async', () => {
  const blocks = getArticleBlocks('<img src="https://eonbiosystem.com/uploads/blog/content/a.webp" alt="A">')
  assert.equal(blocks[0].kind, 'media')
  assert.match(blocks[0].html, /loading="lazy"/)
  assert.match(blocks[0].html, /decoding="async"/)
})
