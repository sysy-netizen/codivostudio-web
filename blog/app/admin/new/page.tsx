import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NewArticleForm } from './new-article-form'

export const metadata: Metadata = { title: '새 아티클', robots: { index: false, follow: false } }

export default async function NewArticlePage () {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}
	return (
		<main className="mx-auto max-w-2xl px-6 py-24 lg:px-10 lg:py-32">
			<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">스튜디오 대시보드</p>
			<h1 className="text-5xl font-medium tracking-[-0.06em]">새 <span className="italic">아티클.</span></h1>
			<NewArticleForm />
		</main>
	)
}
