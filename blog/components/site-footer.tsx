import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10">
        <div>
          <p className="text-sm font-semibold">Code+Vivo studio blog</p>
          <p className="mt-2 text-sm text-black/50">정성을 담아 무언가를 만드는 일에 대한 생각</p>
        </div>
        <div className="flex gap-5 text-xs text-black/50">
          <Link href="/about" className="hover:text-black">소개</Link>
          <span>© {new Date().getFullYear()} Code+Vivo</span>
        </div>
      </div>
    </footer>
  )
}
