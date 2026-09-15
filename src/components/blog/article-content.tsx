import { Container } from '@/components/elements/container'
import { getArticleBlocks } from '@/lib/blog/content'

const editorialTypography =
  'prose prose-lg max-w-none font-sans text-green-900 prose-headings:font-serif prose-headings:font-normal prose-headings:text-green-900 prose-p:text-green-900 prose-a:text-green-800 prose-strong:text-green-950 prose-blockquote:text-green-900 prose-code:font-sans prose-pre:font-sans prose-pre:bg-green-50 prose-pre:text-green-900 prose-li:marker:text-green-600 prose-th:text-green-900 prose-figcaption:font-sans prose-figcaption:text-green-700'

export function ArticleContent({ content }: { content: string }) {
  return (
    <div className="space-y-10">
      {getArticleBlocks(content).map((block, index) =>
        block.kind === 'text' ? (
          <Container key={index}>
            <div className="mx-auto max-w-3xl">
              <div
                className={`${editorialTypography} break-words [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto`}
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            </div>
          </Container>
        ) : (
          <div
            key={index}
            className={`${editorialTypography} prose-figure:m-0 prose-figcaption:mx-auto prose-figcaption:max-w-3xl prose-figcaption:px-4 prose-figcaption:text-center sm:prose-figcaption:px-6 prose-img:m-0 prose-img:w-full prose-img:rounded-lg prose-video:m-0 prose-video:w-full [&_picture]:block`}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ),
      )}
    </div>
  )
}
