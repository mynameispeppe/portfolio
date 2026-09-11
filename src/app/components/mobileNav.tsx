'use client'

import { useEffect, useState } from 'react'
import { Home, LayoutGrid, User, Mail } from 'lucide-react'
import { useDict } from '@/i18n/DictContext'

const allSectionIds = ['hero', 'projects', 'experiences', 'contacts']

export default function MobileNav() {
  const dict = useDict()
  const [activeId, setActiveId] = useState<string>('hero')

  const navLinks = [
    { href: '#hero',        icon: Home,       id: 'hero',        label: dict.mobile_nav.home },
    { href: '#projects',    icon: LayoutGrid, id: 'projects',    label: dict.mobile_nav.projects },
    { href: '#experiences', icon: User,       id: 'experiences', label: dict.mobile_nav.experience },
    { href: '#contacts',    icon: Mail,       id: 'contacts',    label: dict.mobile_nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2
      let active = allSectionIds[0]
      for (const id of allSectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) active = id
      }
      setActiveId(active)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleTap = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden" aria-label="Mobile navigation">
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {navLinks.map((link) => {
          const isActive = activeId === link.id
          const Icon = link.icon
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleTap(e, link.id)}
              aria-label={link.label}
              className="flex items-center justify-center transition-all duration-200 rounded-xl"
              style={{
                width: 52,
                height: 36,
                background: isActive ? '#17171c' : 'transparent',
                color: isActive ? '#FAFAF9' : '#93939f',
              }}
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          )
        })}
      </div>
    </nav>
  )
}
