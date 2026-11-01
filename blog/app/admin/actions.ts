'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getArticleBySlug } from '@/lib/articles'

export interface CreateArticleState {
	error?: string
}

/** 본문은 마크다운 원문을 그대로 한 블록으로 저장한다 (줄바꿈 구조를 보존해야 리스트/코드블록이 깨지지 않는다). */
function parseContent (raw: string): string[] {
	const trimmed = raw.trim()
	return trimmed ? [trimmed] : []
}

function revalidateArticlePaths (slug: string) {
	revalidatePath('/admin')
	revalidatePath('/articles')
	revalidatePath('/')
	revalidatePath(`/articles/${slug}`)
}

type ParsedArticleInput = {
	title: string
	slug: string
	category: string
	excerpt: string
	content: string[]
	readMinutes: number
	status: 'draft' | 'published'
}

function parseArticleInput (formData: FormData): ParsedArticleInput | { error: string } {
	const title = String(formData.get('title') ?? '').trim()
	const slug = String(formData.get('slug') ?? '').trim().toLowerCase()
	const category = String(formData.get('category') ?? '').trim()
	const excerpt = String(formData.get('excerpt') ?? '').trim()
	const content = parseContent(String(formData.get('content') ?? ''))
	const readMinutes = Number(formData.get('readMinutes') ?? 0)
	const status = String(formData.get('status') ?? 'draft') === 'published' ? 'published' : 'draft'

	if (!title || !slug || !category || !excerpt) {
		return { error: '제목, 슬러그, 카테고리, 요약을 모두 입력해 주세요.' }
	}
	if (!/^[\p{L}\p{N}-]+$/u.test(slug)) {
		return { error: '슬러그에는 문자, 숫자, 하이픈만 사용할 수 있습니다.' }
	}
	if (!Number.isFinite(readMinutes) || readMinutes <= 0) {
		return { error: '읽는 시간(분)을 올바르게 입력해 주세요.' }
	}

	return { title, slug, category, excerpt, content, readMinutes, status }
}

export async function createArticle (_state: CreateArticleState, formData: FormData): Promise<CreateArticleState> {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}

	const input = parseArticleInput(formData)
	if ('error' in input) {
		return input
	}

	const { error } = await supabase.from('articles').insert({
		slug: input.slug,
		title: input.title,
		excerpt: input.excerpt,
		category: input.category,
		content: input.content,
		read_minutes: input.readMinutes,
		status: input.status,
		published_at: input.status === 'published' ? new Date().toISOString() : null,
	})
	if (error) {
		return { error: error.code === '23505' ? '이미 사용 중인 슬러그입니다.' : `글을 저장하지 못했습니다: ${error.message}` }
	}

	revalidateArticlePaths(input.slug)
	redirect('/admin')
}

export async function updateArticle (_state: CreateArticleState, formData: FormData): Promise<CreateArticleState> {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}

	const originalSlug = String(formData.get('originalSlug') ?? '').trim()
	if (!originalSlug) {
		return { error: '수정할 글을 찾을 수 없습니다.' }
	}

	const input = parseArticleInput(formData)
	if ('error' in input) {
		return input
	}

	const existing = await getArticleBySlug(supabase, originalSlug)
	if (!existing) {
		return { error: '수정할 글을 찾을 수 없습니다.' }
	}

	const publishedAt = input.status === 'published' ? (existing.publishedAt ?? new Date().toISOString()) : null

	const { error } = await supabase
		.from('articles')
		.update({
			slug: input.slug,
			title: input.title,
			excerpt: input.excerpt,
			category: input.category,
			content: input.content,
			read_minutes: input.readMinutes,
			status: input.status,
			published_at: publishedAt,
		})
		.eq('slug', originalSlug)
	if (error) {
		return { error: error.code === '23505' ? '이미 사용 중인 슬러그입니다.' : `글을 수정하지 못했습니다: ${error.message}` }
	}

	revalidateArticlePaths(originalSlug)
	if (input.slug !== originalSlug) {
		revalidateArticlePaths(input.slug)
	}
	redirect('/admin')
}

export async function deleteArticle (formData: FormData) {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}

	const slug = String(formData.get('slug') ?? '')
	if (!slug) {
		return
	}

	const { error } = await supabase.from('articles').delete().eq('slug', slug)
	if (error) {
		throw new Error(`글을 삭제하지 못했습니다: ${error.message}`)
	}

	revalidateArticlePaths(slug)
}
