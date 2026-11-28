import { Container } from '@/components/elements/container'
import { getArticleBlocks } from '@/lib/blog/content'

const editorialTypography = [
  'prose prose-base max-w-none font-sans text-green-900 sm:prose-lg',
  'prose-headings:mt-6 prose-headings:mb-3 prose-headings:font-serif prose-headings:font-normal prose-headings:leading-tight prose-headings:text-green-900',
  'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg sm:prose-h1:text-4xl sm:prose-h2:text-3xl sm:prose-h3:text-2xl sm:prose-h4:text-xl',
  'prose-p:my-3 prose-p:text-base prose-p:leading-relaxed prose-p:text-green-900 sm:prose-p:text-lg',
  'prose-ul:my-3 prose-ul:pl-5 prose-ol:my-3 prose-ol:pl-5 prose-li:my-1 prose-li:py-0 prose-li:text-base prose-li:leading-relaxed prose-li:marker:text-green-600 prose-li:prose-p:my-1 sm:prose-li:text-lg',
  'prose-a:text-green-800 prose-strong:text-green-950 prose-blockquote:my-4 prose-blockquote:pl-4 prose-blockquote:text-base prose-blockquote:leading-relaxed prose-blockquote:text-green-900 sm:prose-blockquote:text-lg',
  'prose-code:font-sans prose-pre:font-sans prose-pre:bg-green-50 prose-pre:text-green-900 prose-th:text-green-900 prose-figcaption:font-sans prose-figcaption:text-sm prose-figcaption:text-green-700',
].join(' ')

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="space-y-6">
      {getArticleBlocks(content).map((block, index) =>
        block.kind === 'text' ? (
          <Container key={index}>
            <div className="mx-auto max-w-2xl">
              <div
                className={`${editorialTypography} break-words [&_pre]:overflow-x-auto [&_.article-table]:my-6 [&_.article-table]:overflow-x-auto [&_.article-table_table]:my-0 [&_table]:tabular-nums [&_td_p]:my-0 [&_th_p]:my-0 [&_figure:not(.article-table)_table]:block [&_figure:not(.article-table)_table]:overflow-x-auto`}
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            </div>
          </Container>
        ) : (
          <div
            key={index}
            className={`${editorialTypography} prose-figure:m-0 prose-figcaption:mx-auto prose-figcaption:max-w-2xl prose-figcaption:px-4 prose-figcaption:text-center sm:prose-figcaption:px-6 prose-img:m-0 prose-img:w-full prose-img:rounded-lg prose-video:m-0 prose-video:w-full [&_picture]:block [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-lg [&_iframe]:border-0`}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ),
      )}
    </div>
  )
}
