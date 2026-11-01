import { notFound, redirect } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import { createClient } from '@/lib/supabase/server'
import { MarkdownContent } from '@/components/markdown-content'

export default async function AdminArticlePreviewPage ({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}
	const article = await getArticleBySlug(supabase, slug)
	if (!article) {
		notFound()
	}
	return (
		<main className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-36">
			{article.status === 'draft' && <p className="mb-10 border border-black/15 bg-black/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/60">초안 미리보기 · 공개되지 않은 글입니다</p>}
			<div className="mb-16 border-b border-black/10 pb-10">
				<p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">{article.category} · {article.date} · {article.readTime}</p>
				<h1 className="text-2xl font-medium leading-[0.95] tracking-[-0.07em] sm:text-5xl">{article.title}</h1>
				<p className="mt-8 max-w-2xl text-xl leading-8 text-black/60">{article.excerpt}</p>
			</div>
			<article className="max-w-2xl text-lg leading-9 text-black/70 [&>*:first-child]:!mt-0"><MarkdownContent content={article.content} /></article>
		</main>
	)
}
