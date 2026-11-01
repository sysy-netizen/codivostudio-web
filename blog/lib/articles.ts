import type { SupabaseClient } from '@supabase/supabase-js'
import { createPublicClient } from '@/lib/supabase/public'

export type Article = {
	title: string
	excerpt: string
	category: string
	/** 화면 표시용. 예: October 24, 2026 */
	date: string
	/** 화면 표시용. 예: 6분 읽기 */
	readTime: string
	slug: string
	status: 'draft' | 'published'
	/** 본문 문단 목록. 비어 있으면 상세 페이지에서 기본 안내 문구를 보여준다. */
	content: string[]
	publishedAt: string | null
}

type ArticleRow = {
	slug: string
	title: string
	excerpt: string
	category: string
	content: string[]
	read_minutes: number
	status: 'draft' | 'published'
	published_at: string | null
	created_at: string
}

const columns = 'slug, title, excerpt, category, content, read_minutes, status, published_at, created_at'

const dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Seoul' })

function toArticle (row: ArticleRow): Article {
	return {
		slug: row.slug,
		title: row.title,
		excerpt: row.excerpt,
		category: row.category,
		date: dateFormat.format(new Date(row.published_at ?? row.created_at)),
		readTime: `${row.read_minutes}분 읽기`,
		status: row.status,
		content: row.content,
		publishedAt: row.published_at,
	}
}

/** 공개된 글을 최신순으로 가져온다. RLS가 초안과 예약 글을 걸러낸다. */
export async function getPublishedArticles (limit?: number): Promise<Article[]> {
	let query = createPublicClient()
		.from('articles')
		.select(columns)
		.eq('status', 'published')
		.order('published_at', { ascending: false })
	if (limit) {
		query = query.limit(limit)
	}
	const { data, error } = await query
	if (error) {
		throw new Error(`아티클을 불러오지 못했습니다: ${error.message}`)
	}
	return (data as ArticleRow[]).map(toArticle)
}

/** slug로 공개된 글 하나를 가져온다. 없으면 null. */
export async function getPublishedArticle (slug: string): Promise<Article | null> {
	const { data, error } = await createPublicClient()
		.from('articles')
		.select(columns)
		.eq('slug', slug)
		.eq('status', 'published')
		.maybeSingle()
	if (error) {
		throw new Error(`아티클을 불러오지 못했습니다: ${error.message}`)
	}
	return data ? toArticle(data as ArticleRow) : null
}

/** 관리자용: 초안을 포함한 전체 글. 로그인 세션을 가진 클라이언트를 넘겨야 한다. */
export async function getAllArticles (supabase: SupabaseClient): Promise<Article[]> {
	const { data, error } = await supabase
		.from('articles')
		.select(columns)
		.order('created_at', { ascending: false })
	if (error) {
		throw new Error(`아티클을 불러오지 못했습니다: ${error.message}`)
	}
	return (data as ArticleRow[]).map(toArticle)
}

/** 관리자용: 상태와 무관하게 slug로 글 하나를 가져온다. 로그인 세션을 가진 클라이언트를 넘겨야 한다. */
export async function getArticleBySlug (supabase: SupabaseClient, slug: string): Promise<Article | null> {
	const { data, error } = await supabase
		.from('articles')
		.select(columns)
		.eq('slug', slug)
		.maybeSingle()
	if (error) {
		throw new Error(`아티클을 불러오지 못했습니다: ${error.message}`)
	}
	return data ? toArticle(data as ArticleRow) : null
}
