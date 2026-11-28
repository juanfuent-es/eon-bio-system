import { ArticleContent } from '@/components/blog/article-content'
import { PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { Hero } from '@/components/sections/hero'
import {
  coverAlt,
  formatArticleDate,
  getArticleBySlug,
  getCanonicalArticleUrl,
  isSafeSlug,
  type Article,
} from '@/lib/blog/articles'
import { pageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function loadArticle(params: PageProps['params']) {
  const { slug: encodedSlug } = await params
  const slug = decodeURIComponent(encodedSlug)
  if (!isSafeSlug(slug)) return null
  const response = await getArticleBySlug(slug).catch(() => ({ data: null, status: 500 }))
  return response.data?.article ?? null
}

function jsonLd(article: Article) {
  const cover = article.cover_image
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: cover ? [cover.variants.desktop.url, cover.og.url] : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    articleSection: article.category.name,
    keywords: article.tags.join(', ') || undefined,
    mainEntityOfPage: getCanonicalArticleUrl(article.slug),
    author: { '@type': 'Person', name: 'Ricardo Sánchez' },
    publisher: { '@type': 'Organization', name: 'EON BioSystem' },
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await loadArticle(params)

  if (!article) {
    return {
      title: 'Artículo no encontrado | EON BioSystem',
    }
  }

  const url = getCanonicalArticleUrl(article.slug)
  const og = article.cover_image?.og
  // `description` es solo para buscadores y vistas previas; nunca se muestra en la página.
  const image = og
    ? { url: og.url, secureUrl: og.url, type: og.type, width: og.width, height: og.height, alt: coverAlt(article) }
    : undefined
  const base = pageMetadata({
    title: `${article.title} | EON BioSystem`,
    description: article.description,
    image,
  })

  return {
    ...base,
    alternates: { canonical: url },
    openGraph: {
      ...base.openGraph,
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      section: article.category.name,
      tags: article.tags,
    },
    twitter: {
      ...base.twitter,
      title: article.title,
      description: article.description,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await loadArticle(params)

  if (!article) {
    notFound()
  }

  const publishedDate = formatArticleDate(article.published_at)
  const cover = article.cover_image
  const categoryHref = `/publicaciones?category=${encodeURIComponent(article.category.slug)}#articulos`

  return (
    <>
      <script
        type="application/ld+json"
        // `<` escapado para que el contenido del CMS no pueda cerrar la etiqueta <script>.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(article)).replace(/</g, '\\u003c') }}
      />
      <Hero
        data-full-height
        imageSrc={cover?.variants.desktop.url ?? '/eon-publicaciones.jpg'}
        imageSrcSet={
          cover
            ? (['mobile', 'tablet', 'desktop'] as const)
                .map((size) => `${cover.variants[size].url} ${cover.variants[size].width}w`)
                .join(', ')
            : undefined
        }
        imageAlt={coverAlt(article)}
        eyebrow={
          <Link
            href={categoryHref}
            className="mb-4 w-fit rounded-full bg-white/15 px-4 py-1.5 text-xs/5 font-semibold tracking-[0.08em] text-white uppercase ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            {article.category.name}
          </Link>
        }
        headline={article.title}
        subheadline={article.synopsis ? <p>{article.synopsis}</p> : null}
      />

      <article
        data-blog-article
        className="mx-4 rounded-lg bg-neutral-100 py-10 text-green-900 sm:py-16 lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl"
      >
        <Container>
          <div className="mx-auto mb-8 flex max-w-2xl flex-wrap items-center justify-between gap-4 border-b border-green-900/15 pb-6">
            <PlainButtonLink href="/publicaciones" className="w-fit">
              <ArrowNarrowLeftIcon className="size-5" />
              Publicaciones
            </PlainButtonLink>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-green-700">
              <Link href={categoryHref} className="hover:text-orange-600">
                {article.category.name}
              </Link>
              {publishedDate ? <time dateTime={article.published_at}>{publishedDate}</time> : null}
            </div>
          </div>
        </Container>

        <ArticleContent content={article.content} />

        {article.tags.length > 0 ? (
          <Container>
            <ul
              aria-label="Temas del artículo"
              className="mx-auto mt-10 flex max-w-2xl flex-wrap gap-2 border-t border-green-900/15 pt-6"
            >
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/publicaciones?tag=${encodeURIComponent(tag)}#articulos`}
                    className="block rounded-full bg-green-900/8 px-3 py-1 text-xs/6 font-medium text-green-900 transition-colors hover:bg-green-900/15"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        ) : null}
        <Container>
          <footer className="mx-auto mt-10 max-w-2xl border-t border-green-900/15 pt-8">
            <p className="mb-4 text-xs/4 font-semibold tracking-[0.14em] text-green-700 uppercase">Autor</p>
            <a
              href="https://www.instagram.com/ricardo.sanchez.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit max-w-full items-center gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:gap-5"
            >
              <Image
                src="/lic-ricardo-sanchez.jpg"
                alt="Lic. Ricardo Sánchez"
                width={96}
                height={96}
                sizes="(min-width: 640px) 96px, 80px"
                className="size-20 shrink-0 rounded-full object-cover sm:size-24"
              />
              <div className="min-w-0">
                <p className="font-serif text-xl/6 text-green-950 transition-colors group-hover:text-orange-600 sm:text-2xl/7">
                  Lic. Ricardo Sánchez
                </p>
                <p className="mt-1 max-w-sm text-sm/5 text-green-700">
                  Especialista en Optimización Fisiometabólica y Longevidad
                </p>
              </div>
            </a>
          </footer>
        </Container>
      </article>
    </>
  )
}
