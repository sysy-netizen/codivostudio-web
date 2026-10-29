import { ArticleList } from '@/components/article-list'
import { articles } from '@/components/blog-data'

export default function ArticlesPage() {
  return <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="mb-20 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">아카이브</p><div><h1 className="text-6xl font-medium leading-[0.92] tracking-[-0.07em] sm:text-8xl">모든 <span className="italic">아티클.</span></h1><p className="mt-8 max-w-lg text-lg leading-8 text-black/60">디자인, 코드, 문화, 그리고 세심하게 바라보는 태도에 관한 기록입니다.</p></div></div><ArticleList items={articles} /></main>
}
