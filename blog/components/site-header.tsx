import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const links = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/articles', label: '아티클' },
  { href: '/contact', label: '연락처' },
  { href: '/admin', label: '관리자' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="text-sm font-semibold tracking-[-0.02em]">
          Code+Vivo <span className="font-normal text-black/50">studio blog</span>
        </Link>
        <details className="group relative lg:hidden">
          <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.14em]">메뉴</summary>
          <nav className="absolute right-0 top-8 z-10 flex min-w-40 flex-col gap-1 border border-black/10 bg-white p-2 shadow-xl">
            {links.map((link) => <Link key={link.href} href={link.href} className="px-3 py-2 text-sm hover:bg-black hover:text-white">{link.label}</Link>)}
          </nav>
        </details>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-black/60 transition-colors hover:text-black">{link.label}</Link>)}
        </nav>
      </div>
    </header>
  )
}
