'use client'

import { useActionState } from 'react'
import { createArticle, type CreateArticleState } from '@/app/admin/actions'

const initialState: CreateArticleState = {}

export function NewArticleForm () {
	const [state, formAction, isPending] = useActionState(createArticle, initialState)

	return (
		<form action={formAction} className="mt-10 flex flex-col gap-4">
			<label htmlFor="title" className="text-sm text-black/60">제목</label>
			<input id="title" name="title" type="text" required autoFocus className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="slug" className="text-sm text-black/60">슬러그 (영문 소문자, 숫자, 하이픈)</label>
			<input id="slug" name="slug" type="text" required pattern="[a-z0-9-]+" placeholder="example-article-title" className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="category" className="text-sm text-black/60">카테고리</label>
			<input id="category" name="category" type="text" required className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="excerpt" className="text-sm text-black/60">요약</label>
			<textarea id="excerpt" name="excerpt" required rows={2} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="content" className="text-sm text-black/60">본문 (문단 사이는 빈 줄로 구분)</label>
			<textarea id="content" name="content" rows={10} className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="readMinutes" className="text-sm text-black/60">읽는 시간(분)</label>
			<input id="readMinutes" name="readMinutes" type="number" min={1} defaultValue={5} required className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black" />

			<label htmlFor="status" className="text-sm text-black/60">상태</label>
			<select id="status" name="status" defaultValue="draft" className="border border-black/20 px-4 py-3 text-base outline-none focus:border-black">
				<option value="draft">초안</option>
				<option value="published">게시</option>
			</select>

			{state.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
			<button type="submit" disabled={isPending} className="bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{isPending ? '저장 중...' : '저장'}</button>
		</form>
	)
}
