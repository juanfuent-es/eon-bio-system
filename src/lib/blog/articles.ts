export type ArticleCategory = {
  slug: string
  name: string
}

export type ImageVariant = {
  url: string
  width: number
  height: number
  type: 'image/webp' | 'image/jpeg'
}

export type ArticleCoverImage = {
  alt: string
  width: number
  height: number
  /** = variants.desktop.url */
  url: string
  variants: {
    desktop: ImageVariant // 1920×1080
    tablet: ImageVariant // 1280×720
    mobile: ImageVariant // 768×432
  }
  /** 1200×630 JPG, solo para metadata social. */
  og: ImageVariant
}

export type ArticleSummary = {
  id: string
  slug: string
  title: string
  /** ≤ 256, visible en tarjeta y bajo el título. */
  synopsis: string
  /** ≤ 164, solo metadata. */
  description: string
  category: ArticleCategory
  tags: string[]
  cover_image: ArticleCoverImage | null
  published_at: string
  created_at: string
  updated_at: string
}

export type Article = ArticleSummary & {
  content: string
}

export type BlogCategory = ArticleCategory & {
  sort_order: number
  article_count: number
}

export type ArticleQuery = {
  page?: string | string[] | null
  pageSize?: string | string[] | null
  q?: string | string[] | null
  category?: string | string[] | null
  tag?: string | string[] | null
}

export type ArticleListResult = {
  items: ArticleSummary[]
  total: number
  page: number
  pageSize: number
}

export type BlogApiResult<T> = {
  data: T | null
  status: number
}

const BLOG_API_BASE_URL = process.env.BLOG_API_BASE_URL ?? 'https://eonbiosystem.com/blog/api/v1'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eonbiosystem.com'
const REVALIDATE_SECONDS = 300
const REQUEST_TIMEOUT_MS = 5000

function firstParam(value: string | string[] | null | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function getApiUrl(path: string, query?: ArticleQuery) {
  const url = new URL(`${BLOG_API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`)

  Object.entries(query ?? {}).forEach(([key, value]) => {
    const param = firstParam(value)

    if (param) {
      url.searchParams.set(key, param)
    }
  })

  return url
}

async function fetchBlogApi<T>(url: URL): Promise<BlogApiResult<T>> {
  let response: Response

  try {
    response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (error) {
    console.error(`[blog-api] GET ${url.toString()} failed`, error)

    return {
      data: null,
      status: 0,
    }
  }

  if (!response.ok) {
    console.error(`[blog-api] GET ${url.toString()} returned ${response.status} ${response.statusText}`)

    return {
      data: null,
      status: response.status,
    }
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    console.error(`[blog-api] GET ${url.toString()} returned non-JSON content-type: ${contentType || 'unknown'}`)

    return {
      data: null,
      status: response.status,
    }
  }

  return {
    data: (await response.json()) as T,
    status: response.status,
  }
}

export function listArticles(query: ArticleQuery = {}) {
  return fetchBlogApi<ArticleListResult>(getApiUrl('/articles', { page: '1', pageSize: '10', ...query }))
}

export function getArticleBySlug(slug: string) {
  return fetchBlogApi<{ article: Article }>(getApiUrl(`/articles/${encodeURIComponent(slug)}`))
}

export async function listCategories(): Promise<BlogCategory[]> {
  const { data } = await fetchBlogApi<{ items: BlogCategory[] }>(getApiUrl('/categories'))
  return [...(data?.items ?? [])].sort((a, b) => a.sort_order - b.sort_order)
}

/** Texto alternativo de la portada: el CMS puede mandar `alt` vacío. */
export function coverAlt(article: Pick<ArticleSummary, 'title' | 'cover_image'>) {
  return article.cover_image?.alt.trim() || article.title
}

export function formatArticleDate(value: string | null | undefined) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    date,
  )
}

export function getCanonicalArticleUrl(slug: string) {
  return new URL(`/publicaciones/${slug}`, SITE_URL).toString()
}

export function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
