import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function AboutPage() {
  return <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36"><div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">스튜디오 소개</p></div><div><h1 className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-7xl">호기심 많고, 꼼꼼하며, <span className="italic">언제나 배우는 사람들</span>을 위한 스튜디오 블로그</h1><div className="mt-16 grid max-w-2xl gap-8 border-t border-black/10 pt-8 text-lg leading-8 text-black/65 sm:grid-cols-2"><p>Code+Vivo는 사람과 기술, 문화 사이의 가능성을 탐구하는 독립 크리에이티브 스튜디오입니다.</p><p>우리는 만들고, 발견하고, 배워가는 과정에서 얻은 생각을 기록합니다.</p></div><Link href="/articles" className="mt-12 flex w-fit items-center gap-2 border-b border-black pb-2 text-sm font-medium">글 둘러보기 <ArrowUpRight aria-hidden="true" size={16} /></Link></div></div></main>
}
