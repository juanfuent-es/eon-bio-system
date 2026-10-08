import { ArticleContent } from '@/components/blog/article-content'
import { PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { Hero } from '@/components/sections/hero'
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
      <Hero
        imageSrc={article.cover_image_url || '/eon-blog-bg.jpg'}
        imageAlt={article.title}
        imageUnoptimized={Boolean(article.cover_image_url)}
        headline={article.title}
        subheadline={article.excerpt ? <p>{article.excerpt}</p> : null}
      />

      <article
        data-blog-article
        className="mx-4 rounded-lg bg-neutral-100 py-10 text-green-900 sm:py-16 lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl"
      >
        <Container>
          <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-b border-green-900/15 pb-6">
            <PlainButtonLink href="/blog" className="w-fit">
              <ArrowNarrowLeftIcon className="size-5" />
              Blog
            </PlainButtonLink>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-green-700">
              <span>{article.category}</span>
              {publishedDate ? <time dateTime={article.published_at!}>{publishedDate}</time> : null}
            </div>
          </div>
        </Container>

        <ArticleContent content={article.content} />

        {article.tags.length > 0 ? (
          <Container>
            <ul
              aria-label="Temas del artículo"
              className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2 border-t border-green-900/15 pt-6"
            >
              {article.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-green-900/8 px-3 py-1 text-xs/6 font-medium text-green-900">
                  {tag}
                </li>
              ))}
            </ul>
          </Container>
        ) : null}
      </article>
    </>
  )
}
