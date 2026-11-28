import { ArticleCard } from '@/components/blog/article-card'
import { PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'
import { listArticles, listCategories } from '@/lib/blog/articles'
import { pageMetadata } from '@/lib/metadata'
import { clsx } from 'clsx/lite'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = pageMetadata({
  title: 'Publicaciones | EON BioSystem',
  description:
    'Artículos, evidencia y casos clínicos explicados con claridad para ayudarte a comprender mejor tu metabolismo, tu fuerza y tu salud, y tomar decisiones con más criterio.',
})

const PAGE_SIZE = 12

type Filters = { category?: string; tag?: string; q?: string; page?: string }

type PageProps = {
  searchParams: Promise<Filters & { pageSize?: string }>
}

function single(value: string | string[] | undefined) {
  const first = Array.isArray(value) ? value[0] : value
  return first?.trim() || undefined
}

function listingHref(filters: Filters) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value && !(key === 'page' && value === '1')) params.set(key, value)
  })
  const query = params.toString()
  return `/publicaciones${query ? `?${query}` : ''}#articulos`
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const filters: Filters = {
    category: single(params.category),
    tag: single(params.tag)?.toLowerCase(),
    q: single(params.q),
  }
  const page = Math.max(1, Number.parseInt(single(params.page) ?? '1', 10) || 1)

  const [response, categories] = await Promise.all([
    listArticles({ ...filters, page: String(page), pageSize: String(PAGE_SIZE) }).catch(() => ({
      data: null,
      status: 500,
    })),
    listCategories().catch(() => []),
  ])
  const articles = response.data?.items ?? []
  const total = response.data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = Boolean(filters.category || filters.tag || filters.q)
  // Se ocultan las categorías vacías, salvo la que esté seleccionada.
  const visibleCategories = categories.filter((c) => c.article_count > 0 || c.slug === filters.category)
  const activeCategoryName =
    categories.find((c) => c.slug === filters.category)?.name ??
    articles.find((a) => a.category.slug === filters.category)?.category.name

  return (
    <>
      <Hero
        data-full-height
        imageSrc="/eon-publicaciones.jpg"
        imageAlt="Ricardo Sánchez"
        logo={{ src: '/logos/eon-publicaciones-logo.svg', alt: 'EON Publicaciones' }}
        subheadline={
          <p>
            Artículos, evidencia y casos clínicos explicados con claridad para ayudarte a comprender mejor tu
            metabolismo, tu fuerza y tu salud, y tomar decisiones con más criterio.
          </p>
        }
        cta={
          articles.length > 0 || isFiltered ? (
            <PlainButtonLink href="#articulos" size="lg">
              Explorar publicaciones <ArrowNarrowRightIcon />
            </PlainButtonLink>
          ) : undefined
        }
      />

      {articles.length > 0 || isFiltered ? (
        <section id="articulos" className="scroll-mt-28 px-4">
          <Container className="flex flex-col gap-10 py-16">
            {visibleCategories.length > 0 ? (
              <nav aria-label="Categorías">
                <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                  <li className="shrink-0">
                    <CategoryChip href={listingHref({ tag: filters.tag, q: filters.q })} active={!filters.category}>
                      Todas
                    </CategoryChip>
                  </li>
                  {visibleCategories.map((category) => (
                    <li key={category.slug} className="shrink-0">
                      <CategoryChip
                        href={listingHref({ category: category.slug, tag: filters.tag, q: filters.q })}
                        active={filters.category === category.slug}
                      >
                        {category.name}
                      </CategoryChip>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {filters.tag || filters.q ? (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-green-800">
                <span>
                  {filters.tag ? <>Tema: <strong className="font-semibold">#{filters.tag}</strong></> : null}
                  {filters.tag && filters.q ? ' · ' : null}
                  {filters.q ? <>Búsqueda: <strong className="font-semibold">“{filters.q}”</strong></> : null}
                </span>
                <Link href={listingHref({ category: filters.category })} className="underline hover:text-orange-600">
                  Quitar filtro
                </Link>
              </p>
            ) : null}

            {articles.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} priority={page === 1 && index < 3} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-lg bg-white/60 p-8 text-green-900">
                <p>
                  {activeCategoryName
                    ? `Todavía no hay publicaciones en ${activeCategoryName}.`
                    : 'No encontramos publicaciones con ese filtro.'}
                </p>
                <PlainButtonLink href={listingHref({})}>
                  Ver todas las publicaciones <ArrowNarrowRightIcon />
                </PlainButtonLink>
              </div>
            )}

            {totalPages > 1 ? (
              <nav aria-label="Paginación" className="flex items-center justify-between gap-4 text-green-900">
                {page > 1 ? (
                  <PlainButtonLink href={listingHref({ ...filters, page: String(page - 1) })}>
                    <ArrowNarrowLeftIcon className="size-5" /> Anteriores
                  </PlainButtonLink>
                ) : (
                  <span />
                )}
                <span className="text-sm text-green-700 tabular-nums">
                  Página {page} de {totalPages}
                </span>
                {page < totalPages ? (
                  <PlainButtonLink href={listingHref({ ...filters, page: String(page + 1) })}>
                    Siguientes <ArrowNarrowRightIcon className="size-5" />
                  </PlainButtonLink>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </Container>
        </section>
      ) : null}
    </>
  )
}

function CategoryChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      scroll={false}
      className={clsx(
        'block rounded-full px-4 py-2 text-sm/5 font-medium whitespace-nowrap ring-1 transition-colors',
        active
          ? 'bg-green-900 text-white ring-green-900'
          : 'bg-white/70 text-green-900 ring-green-900/15 hover:bg-white hover:ring-green-900/30',
      )}
    >
      {children}
    </Link>
  )
}
