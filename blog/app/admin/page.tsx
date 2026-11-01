import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Pencil, Plus } from 'lucide-react'
import { getAllArticles } from '@/lib/articles'
import { logout } from '@/app/login/actions'
import { createClient } from '@/lib/supabase/server'
import { DeleteArticleButton } from './delete-article-button'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }
  const articles = await getAllArticles(supabase)
  const published = articles.filter((article) => article.status === 'published')
  const thisMonth = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).slice(0, 7)
  const thisMonthCount = published.filter((article) => article.publishedAt && new Date(article.publishedAt).toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).startsWith(thisMonth)).length
  return <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-10 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">스튜디오 대시보드</p><h1 className="text-5xl font-medium tracking-[-0.06em] sm:text-7xl">관리자 <span className="italic">공간.</span></h1></div><div className="flex items-center gap-3"><form action={logout}><button type="submit" className="border border-black/20 px-5 py-3 text-sm font-medium">로그아웃</button></form><Link href="/admin/new" className="flex w-fit items-center gap-2 bg-black px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"><Plus aria-hidden="true" size={16} /> 새 아티클</Link></div></div><div className="mt-10 grid gap-4 sm:grid-cols-3"><div className="border border-black/10 p-5"><p className="text-xs uppercase tracking-[0.16em] text-black/45">게시된 글</p><p className="mt-4 text-4xl font-medium tracking-[-0.05em]">{published.length}</p></div><div className="border border-black/10 p-5"><p className="text-xs uppercase tracking-[0.16em] text-black/45">이번 달</p><p className="mt-4 text-4xl font-medium tracking-[-0.05em]">{String(thisMonthCount).padStart(2, '0')}</p></div><div className="border border-black/10 p-5"><p className="text-xs uppercase tracking-[0.16em] text-black/45">상태</p><p className="mt-4 text-4xl font-medium tracking-[-0.05em]">공개 중</p></div></div><div className="mt-20"><h2 className="mb-6 text-xl font-medium">최근 게시물</h2><div className="divide-y divide-black/10 border-y border-black/10">{articles.map((article) => <div key={article.slug} className="flex items-center justify-between gap-4 py-5 hover:bg-black/[0.03]"><Link href={article.status === 'published' ? `/articles/${article.slug}` : `/admin/preview/${article.slug}`} className="flex flex-1 items-center justify-between gap-4"><div><p className="text-base font-medium">{article.title}</p><p className="mt-1 text-xs text-black/45">{article.category} · {article.date}{article.status === 'draft' && ' · 초안'}</p></div><ArrowUpRight aria-hidden="true" size={16} /></Link><Link href={`/admin/edit/${article.slug}`} className="flex items-center gap-1.5 border border-black/15 px-3 py-2 text-xs font-medium text-black/60 transition-colors hover:border-black hover:text-black"><Pencil aria-hidden="true" size={13} /> 수정</Link><DeleteArticleButton slug={article.slug} /></div>)}</div></div></main>
}
