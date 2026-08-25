import { Container } from '@/components/elements/container'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { listArticles } from '@/lib/blog/articles'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | EON BioSystem',
  description: 'Notas de EON BioSystem sobre fuerza, nutrición, biomarcadores y longevidad.',
}

type PageProps = {
  searchParams: Promise<{
    page?: string
    pageSize?: string
    q?: string
    category?: string
    tag?: string
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

export default async function BlogPage({ searchParams }: PageProps) {
  const query = await searchParams
  const response = await listArticles({ pageSize: '12', ...query }).catch(() => ({ data: null, status: 500 }))
  const articles = response.data?.items ?? []
  const [featuredArticle, ...secondaryArticles] = articles

  return (
    <>
      <section className="px-4">
        <Container className="grid min-h-[80dvh] items-center gap-10 py-20 text-green-950 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex max-w-2xl flex-col gap-6">
            <p className="text-sm/7 font-semibold tracking-[0.2em] text-orange-600 uppercase">Blog</p>
            <h1 className="font-serif text-5xl/13 font-semibold text-pretty sm:text-6xl/16 lg:text-7xl/18">
              Ciencia aplicada para optimizar tu biología.
            </h1>
            <Text size="lg" className="max-w-xl text-green-900/82">
              Notas sobre fuerza, nutrición, biomarcadores y hábitos sostenibles desde el enfoque EON BioSystem.
            </Text>
          </div>

          {featuredArticle ? (
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group grid overflow-hidden rounded-lg bg-green-950 text-white shadow-xl shadow-green-950/12"
            >
              {featuredArticle.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredArticle.cover_image_url}
                  alt={featuredArticle.title}
                  className="aspect-[15/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : null}
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs/6 font-semibold tracking-[0.14em] text-green-100 uppercase">
                  <span>{featuredArticle.category}</span>
                  {formatDate(featuredArticle.published_at) ? (
                    <span>{formatDate(featuredArticle.published_at)}</span>
                  ) : null}
                </div>
                <h2 className="font-serif text-3xl/9 font-semibold text-pretty">{featuredArticle.title}</h2>
                {featuredArticle.excerpt ? <p className="text-base/7 text-white/78">{featuredArticle.excerpt}</p> : null}
                <span className="inline-flex items-center gap-2 text-sm/7 font-semibold text-orange-200">
                  Leer nota <ArrowNarrowRightIcon className="size-5" />
                </span>
              </div>
            </Link>
          ) : (
            <div className="rounded-lg border border-green-900/10 bg-white/45 p-8 text-green-900">
              {response.status === 200 ? 'Todavía no hay artículos publicados.' : 'No se pudieron cargar los artículos.'}
            </div>
          )}
        </Container>
      </section>

      {secondaryArticles.length > 0 ? (
        <section className="px-4">
          <Container className="py-16">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {secondaryArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group flex min-h-80 flex-col overflow-hidden rounded-lg bg-white text-green-950 shadow-sm ring-1 ring-green-950/8 transition-shadow hover:shadow-lg hover:shadow-green-950/10"
                >
                  {article.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.cover_image_url}
                      alt={article.title}
                      className="aspect-[15/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs/6 font-semibold tracking-[0.14em] text-orange-600 uppercase">
                      <span>{article.category}</span>
                      {formatDate(article.published_at) ? <span>{formatDate(article.published_at)}</span> : null}
                    </div>
                    <h2 className="font-serif text-2xl/8 font-semibold text-pretty">{article.title}</h2>
                    {article.excerpt ? <p className="text-sm/7 text-green-900/72">{article.excerpt}</p> : null}
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm/7 font-semibold text-green-800">
                      Leer nota <ArrowNarrowRightIcon className="size-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
