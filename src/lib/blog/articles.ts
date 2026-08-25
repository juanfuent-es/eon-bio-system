export type PublicArticleListItem = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image_url: string | null
  category: string
  tags: string[]
  published_at: string | null
  created_at: string | null
  updated_at: string | null
}

export type PublicArticleDetail = PublicArticleListItem & {
  content: string
}

export type ArticleQuery = {
  page?: string | string[] | null
  pageSize?: string | string[] | null
  q?: string | string[] | null
  category?: string | string[] | null
  tag?: string | string[] | null
}

export type ArticleListResult = {
  items: PublicArticleListItem[]
  total: number
  page: number
  pageSize: number
}

export type BlogApiResult<T> = {
  data: T | null
  status: number
}

const BLOG_API_BASE_URL = process.env.BLOG_API_BASE_URL ?? 'https://eonvyon.com/blog/api/v1'
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
  return fetchBlogApi<{ article: PublicArticleDetail }>(getApiUrl(`/articles/${encodeURIComponent(slug)}`))
}

export function getCanonicalArticleUrl(slug: string) {
  return new URL(`/blog/${slug}`, SITE_URL).toString()
}

export function isSafeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
