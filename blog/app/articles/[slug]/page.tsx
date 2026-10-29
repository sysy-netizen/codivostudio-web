import { notFound } from 'next/navigation'
import { articles } from '@/components/blog-data'

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })) }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()
  return <main className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-36"><div className="mb-16 border-b border-black/10 pb-10"><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">{article.category} · {article.date} · {article.readTime}</p><h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.07em] sm:text-8xl">{article.title}</h1><p className="mt-8 max-w-2xl text-xl leading-8 text-black/60">{article.excerpt}</p></div><article className="max-w-2xl text-lg leading-9 text-black/70"><p>좋은 작업은 대개 간단한 질문에서 시작합니다. 이 경험을 더 명확하고, 차분하고, 유용하게 만들려면 무엇이 필요할까요? 답은 새로운 레이어를 더하는 데 있지 않습니다. 눈앞에 있는 디테일을 더 가까이 들여다보는 데 있습니다.</p><p className="mt-8">이곳은 우리가 만드는 것을 형성하는 선택, 제약, 작은 관찰을 탐구하는 공간입니다. 연습은 계속되지만 방향은 변하지 않습니다. 소음은 줄이고, 의도는 더 선명하게.</p></article></main>
}
