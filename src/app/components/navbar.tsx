'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDict } from '@/i18n/DictContext'

export default function Navbar() {
  const dict = useDict()
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
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

  useEffect(() => {
    if (!isHome) return
    const ids = ['hero', 'projects', 'experiences', 'contacts']
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { threshold: 0.4 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [isHome])

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
            className="flex items-center gap-0.5 group cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="font-display font-normal group-hover:opacity-60 transition-opacity"
              style={{ fontSize: 14, lineHeight: 1.4, letterSpacing: 0, color: '#17171c' }}
            >
              <span style={{ color: '#93939f' }}>&lt; </span>
              {dict.nav.logo}
              <span style={{ color: '#93939f' }}> &gt;</span>
            </span>
          </a>

          {/* Nav links */}
          {isHome && (
            <nav className="hidden lg:flex items-center justify-center gap-6 flex-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="font-body transition-colors"
                    style={{
                      fontSize: 12,
                      lineHeight: 1.4,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? '#17171c' : '#93939f',
                      fontWeight: 400,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>
          )}

          {/* Right: lang toggle */}
          <div className="flex items-center justify-end gap-0 ml-auto">
            {(['it', 'en'] as const).map((l, i) => {
              const isActive = lang === l
              return (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span className="font-body select-none" style={{ fontSize: 12, color: '#d9d9dd', padding: '0 4px' }}>|</span>
                  )}
                  <button
                    onClick={() => { if (!isActive) toggleLang() }}
                    className="font-body transition-colors"
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? '#17171c' : '#93939f',
                      background: 'none',
                      border: 'none',
                      cursor: isActive ? 'default' : 'pointer',
                      padding: '2px 4px',
                    }}
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
