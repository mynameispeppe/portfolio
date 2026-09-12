'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDict } from '@/i18n/DictContext'

export default function Navbar() {
  const dict = useDict()
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const lang = pathname.split('/')[1] ?? 'it'
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`

  const navLinks = [
    { id: 'projects',    label: dict.nav.links.projects },
    { id: 'experiences', label: dict.nav.links.experience },
    { id: 'contacts',    label: dict.nav.links.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleLang = () => {
    const next = lang === 'en' ? 'it' : 'en'
    document.cookie = `locale=${next};path=/;max-age=31536000`
    router.push(pathname.replace(`/${lang}`, `/${next}`))
  }

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: 0,
        background: scrolled ? 'rgba(250,250,249,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-14">

          {/* Logo */}
          <a
            href={isHome ? undefined : `/${lang}`}
            onClick={isHome ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
            className="flex items-center gap-0.5 group cursor-pointer no-underline"
          >
            <span className="font-display font-normal text-[14px] leading-[1.4] tracking-[0] text-[#17171c] group-hover:opacity-60 transition-opacity">
              <span className="text-[#93939f]">&lt; </span>
              {dict.nav.logo}
              <span className="text-[#93939f]"> &gt;</span>
            </span>
          </a>

          {/* Nav links */}
          {isHome && (
            <nav className="hidden lg:flex items-center justify-center gap-6 flex-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-[12px] leading-[1.4] tracking-[0.06em] uppercase font-normal text-[#93939f] hover:text-[#17171c] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right: lang toggle */}
          <div className="flex items-center justify-end gap-0 ml-auto">
            {(['it', 'en'] as const).map((l, i) => {
              const isActive = lang === l
              return (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span className="font-body select-none text-[12px] text-[#d9d9dd] px-1">|</span>
                  )}
                  <button
                    onClick={() => { if (!isActive) toggleLang() }}
                    className={`font-body text-[12px] font-normal tracking-[0.06em] uppercase bg-transparent border-none px-1 py-0.5 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#17171c] cursor-default'
                        : 'text-[#93939f] hover:text-[#17171c] cursor-pointer'
                    }`}
                  >
                    {l}
                  </button>
                </span>
              )
            })}
          </div>

        </div>
      </div>
    </header>
  )
}
