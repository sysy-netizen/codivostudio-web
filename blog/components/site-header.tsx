'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/articles', label: '아티클' },
  { href: '/contact', label: '연락처' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen((prev) => !prev)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" onClick={handleClose} className="text-sm font-semibold tracking-[-0.02em]">
          Code+Vivo <span className="font-normal text-black/50">studio blog</span>
        </Link>
        <button type="button" aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isOpen} aria-controls="mobile-nav" onClick={handleToggle} className="-mr-2 flex size-10 items-center justify-center md:hidden">
          {isOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-black/70 transition-colors hover:text-black">{link.label}</Link>)}
        </nav>
      </div>
      {isOpen && (
        <nav id="mobile-nav" className="border-t border-black/10 px-6 py-2 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={handleClose} className="block py-3 text-base font-medium">{link.label}</Link>)}
        </nav>
      )}
    </header>
  )
}
