'use client'

import { useActionState, useRef } from 'react'
import { updateArticle, type CreateArticleState } from '@/app/admin/actions'
import type { Article } from '@/lib/articles'

const initialState: CreateArticleState = {}

function slugify (value: string): string {
	const base = value.toLowerCase().trim().replace(/[\s_]+/g, '-')
	// 영문/숫자 제목은 ASCII 슬러그로, 한글 등은 문자를 그대로 남겨 비어 있지 않게 한다.
	const ascii = base.replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
	if (ascii) {
		return ascii
	}
	return base.replace(/[^\p{L}\p{N}-]/gu, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export function EditArticleForm ({ article }: { article: Article }) {
	const [state, formAction, isPending] = useActionState(updateArticle, initialState)
	const slugRef = useRef<HTMLInputElement>(null)
	const slugTouchedRef = useRef(true)
	const readMinutes = Number(article.readTime.replace(/\D/g, '')) || 5

	return (
		<form action={formAction} className="mt-10 flex flex-col gap-4">
			<input type="hidden" name="originalSlug" value={article.slug} />

			<label htmlFor="title" className="text-sm text-black/60">제목</label>
			<input
				id="title"
				name="title"
				type="text"
				required
				autoFocus
				defaultValue={article.title}
				onChange={(event) => {
					if (!slugTouchedRef.current && slugRef.current) {
						slugRef.current.value = slugify(event.target.value)
					}
				}}
				className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black"
			/>

			<label htmlFor="slug" className="text-sm text-black/60">슬러그 (URL 주소에 쓰임 — 바꾸면 기존 주소는 더 이상 접속되지 않습니다)</label>
			<input
				id="slug"
				name="slug"
				type="text"
				required
				defaultValue={article.slug}
				ref={slugRef}
				onChange={() => { slugTouchedRef.current = true }}
				className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black"
			/>

			<label htmlFor="category" className="text-sm text-black/60">카테고리</label>
			<input id="category" name="category" type="text" required defaultValue={article.category} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="excerpt" className="text-sm text-black/60">요약</label>
			<textarea id="excerpt" name="excerpt" required rows={2} defaultValue={article.excerpt} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="content" className="text-sm text-black/60">본문 (마크다운 지원 — #, ##, **굵게**, - 목록, 링크 등)</label>
			<textarea id="content" name="content" rows={14} defaultValue={article.content.join('\n\n')} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="readMinutes" className="text-sm text-black/60">읽는 시간(분)</label>
			<input id="readMinutes" name="readMinutes" type="number" min={1} defaultValue={readMinutes} required className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="status" className="text-sm text-black/60">상태</label>
			<select id="status" name="status" defaultValue={article.status} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black">
				<option value="draft">초안</option>
				<option value="published">게시</option>
			</select>

			{state.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
			<button type="submit" disabled={isPending} className="bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{isPending ? '저장 중...' : '수정 저장'}</button>
		</form>
	)
}
