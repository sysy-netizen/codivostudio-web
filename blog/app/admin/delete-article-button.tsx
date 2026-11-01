'use client'

import { deleteArticle } from './actions'

export function DeleteArticleButton ({ slug }: { slug: string }) {
	return (
		<form
			action={deleteArticle}
			onSubmit={(event) => {
				if (!window.confirm('이 글을 삭제할까요? 되돌릴 수 없습니다.')) {
					event.preventDefault()
				}
			}}
		>
			<input type="hidden" name="slug" value={slug} />
			<button type="submit" className="border border-black/15 px-3 py-2 text-xs font-medium text-black/50 transition-colors hover:border-red-500 hover:text-red-600">
				삭제
			</button>
		</form>
	)
}
