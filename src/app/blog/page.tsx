import { Container } from '@/components/elements/container'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'
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
  const secondaryArticles = articles

  return (
    <>
      <Hero
        imageSrc="/photos/eon-biosystem-home.png"
        imageAlt="Mujer entrenando en espacio natural"
        headline="Biblioteca EON"
        subheadline={<p>Comprender sistemas biológicos. <br />Preservar función. <br />Extender vida.</p>}
      />

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
