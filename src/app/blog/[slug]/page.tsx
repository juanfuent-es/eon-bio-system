import { Container } from '@/components/elements/container'
import { Document } from '@/components/elements/document'
import { PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { getArticleBySlug, getCanonicalArticleUrl, isSafeSlug } from '@/lib/blog/articles'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function formatDate(value: string | null) {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  const response = isSafeSlug(slug) ? await getArticleBySlug(slug).catch(() => ({ data: null, status: 500 })) : null
  const article = response?.data?.article ?? null

  if (!article) {
    return {
      title: 'Artículo no encontrado | EON BioSystem',
    }
  }

  return {
    title: `${article.title} | EON BioSystem`,
    description: article.excerpt ?? undefined,
    alternates: {
      canonical: getCanonicalArticleUrl(article.slug),
    },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
      url: getCanonicalArticleUrl(article.slug),
      images: article.cover_image_url ? [{ url: article.cover_image_url }] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  const response = isSafeSlug(slug) ? await getArticleBySlug(slug).catch(() => ({ data: null, status: 500 })) : null
  const article = response?.data?.article ?? null

  if (!article) {
    notFound()
  }

  const publishedDate = formatDate(article.published_at)

  return (
    <>
      <section className="px-4">
        <Container className="grid min-h-[80dvh] items-center gap-10 py-20 text-green-950 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex max-w-3xl flex-col gap-6">
            <PlainButtonLink href="/blog" className="w-fit">
              <ArrowNarrowLeftIcon className="size-5" />
              Blog
            </PlainButtonLink>
            <div className="flex flex-wrap items-center gap-3 text-xs/6 font-semibold tracking-[0.16em] text-orange-600 uppercase">
              <span>{article.category}</span>
              {publishedDate ? <span>{publishedDate}</span> : null}
            </div>
            <h1 className="font-serif text-5xl/13 font-semibold text-pretty sm:text-6xl/16 lg:text-7xl/18">
              {article.title}
            </h1>
            {article.excerpt ? <p className="max-w-2xl text-lg/8 text-green-900/78">{article.excerpt}</p> : null}
            {article.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-green-900/8 px-3 py-1 text-xs/6 font-medium text-green-900">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {article.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="aspect-[15/8] w-full rounded-lg object-cover shadow-xl shadow-green-950/12"
            />
          ) : null}
        </Container>
      </section>

      <section className="px-4">
        <Container className="py-16">
          <Document
            className="mx-auto max-w-3xl rounded-lg bg-white p-6 text-base/8 shadow-sm ring-1 ring-green-950/8 sm:p-10 [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-5 [&_blockquote]:text-xl/9 [&_blockquote]:font-medium [&_blockquote]:text-green-950 [&_h2]:font-serif [&_h2]:text-3xl/10 [&_h3]:font-serif [&_h3]:text-2xl/8 [&_p]:text-green-900/78"
            dangerouslySetInnerHTML={{ __html: article.content.trim() }}
          />
        </Container>
      </section>
    </>
  )
}
