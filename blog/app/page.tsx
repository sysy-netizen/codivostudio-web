import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { ArticleList } from '@/components/article-list'
import { articles } from '@/components/blog-data'

export default function HomePage() {
  return <main>
    <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-24 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:pb-32 lg:pt-36">
      <div>
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">독립적인 기록 · 2026</p>
        <h1 className="max-w-4xl text-6xl font-medium leading-[0.92] tracking-[-0.07em] sm:text-8xl">더 <span className="italic">사려 깊은</span> 인터넷을 위한 생각</h1>
      </div>
      <div className="flex flex-col justify-end lg:pb-2">
        <p className="max-w-sm text-lg leading-8 text-black/65">Code+Vivo studio blog는 디자인, 기술, 그리고 창작 과정에 대한 생각을 나누는 작은 공간입니다.</p>
        <Link href="/articles" className="mt-8 flex w-fit items-center gap-2 border-b border-black pb-2 text-sm font-medium">아티클 읽기 <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </div>
    </section>
    <section className="border-t border-black/10 bg-[#f5f5f3]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="mb-12 flex items-end justify-between"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">선별한 글</p><h2 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">최근 아티클</h2></div><ArrowDownRight aria-hidden="true" size={24} /></div>
        <ArticleList items={articles.slice(0, 3)} />
      </div>
    </section>
  </main>
}
