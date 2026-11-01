import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import { createClient } from '@/lib/supabase/server'
import { EditArticleForm } from './edit-article-form'

export const metadata: Metadata = { title: '글 수정', robots: { index: false, follow: false } }

export default async function EditArticlePage ({ params }: { params: Promise<{ slug: string }> }) {
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
		<main className="mx-auto max-w-2xl px-6 py-24 lg:px-10 lg:py-32">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">스튜디오 대시보드</p>
			<h1 className="text-5xl font-medium tracking-[-0.06em]">글 <span className="italic">수정.</span></h1>
			<EditArticleForm article={article} />
		</main>
	)
}
