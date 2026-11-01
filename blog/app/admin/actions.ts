'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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

export async function createArticle (_state: CreateArticleState, formData: FormData): Promise<CreateArticleState> {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}

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

	const { error } = await supabase.from('articles').insert({
		slug,
		title,
		excerpt,
		category,
		content,
		read_minutes: readMinutes,
		status,
		published_at: status === 'published' ? new Date().toISOString() : null,
	})
	if (error) {
		return { error: error.code === '23505' ? '이미 사용 중인 슬러그입니다.' : `글을 저장하지 못했습니다: ${error.message}` }
	}

	revalidateArticlePaths(slug)
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
