import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-16 lg:px-10 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">연락처</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">함께 이야기해요.</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-black/60">아이디어, 협업, 또는 가볍게 나누고 싶은 이야기가 있다면 편하게 연락해주세요.</p>
      </div>
      <div className="mt-16 grid gap-10 border-t border-black/10 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-sm text-black/50">이메일</p>
          <a href="mailto:hello@codevivo.studio" className="mt-3 flex items-center gap-2 text-2xl font-medium tracking-[-0.03em] hover:underline">
            <Mail aria-hidden="true" /> hello@codevivo.studio
          </a>
        </div>
        <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">아티클 둘러보기 <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </main>
  )
}
