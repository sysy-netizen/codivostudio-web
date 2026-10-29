import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from './blog-data'

export function ArticleList({ items }: { items: Article[] }) {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((article, index) => (
        <Link key={article.slug} href={`/articles/${article.slug}`} className="group grid gap-5 py-6 transition-colors hover:bg-black/[0.03] sm:grid-cols-[56px_1fr_auto] sm:items-center sm:gap-8">
          <span className="font-mono text-xs text-black/35">0{index + 1}</span>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-black/45"><span>{article.category}</span><span className="h-px w-5 bg-black/20" /><span>{article.date}</span></div>
            <h3 className="max-w-2xl text-xl font-medium tracking-[-0.03em] sm:text-2xl">{article.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-black/55">{article.excerpt}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-black/45 sm:flex-col sm:items-end"><span>{article.readTime}</span><ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
        </Link>
      ))}
    </div>
  )
}
