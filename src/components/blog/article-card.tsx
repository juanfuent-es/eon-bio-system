import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { coverAlt, formatArticleDate, type ArticleSummary } from '@/lib/blog/articles'
import Link from 'next/link'

/** Portada (mobile/tablet) → categoría → título → sinopsis → fecha. */
export function ArticleCard({ article, priority = false }: { article: ArticleSummary; priority?: boolean }) {
  const cover = article.cover_image
  const date = formatArticleDate(article.published_at)

  return (
    <Link
      href={`/publicaciones/${article.slug}`}
      className="group flex min-h-80 flex-col overflow-hidden rounded-lg bg-white text-green-950 shadow-sm ring-1 ring-green-950/8 transition-shadow hover:shadow-lg hover:shadow-green-950/10"
    >
      <div className="aspect-video w-full overflow-hidden bg-green-900/10">
        {cover ? (
          // Las versiones ya vienen generadas por el CMS; no pasan por el optimizador de Next.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.variants.mobile.url}
            srcSet={`${cover.variants.mobile.url} ${cover.variants.mobile.width}w, ${cover.variants.tablet.url} ${cover.variants.tablet.width}w`}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            width={cover.variants.mobile.width}
            height={cover.variants.mobile.height}
            alt={coverAlt(article)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <span className="w-fit rounded-full bg-orange-500/10 px-3 py-1 text-xs/4 font-semibold tracking-[0.08em] text-orange-700 uppercase">
          {article.category.name}
        </span>
        <h2 className="article-card-title">{article.title}</h2>
        {article.synopsis ? <p className="leading-snug text-green-900/72">{article.synopsis}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-4 pt-2 text-sm/7">
          {date ? (
            <time dateTime={article.published_at} className="text-green-700">
              {date}
            </time>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-2 font-semibold text-green-800">
            Leer nota <ArrowNarrowRightIcon className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
