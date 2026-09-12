'use client'

import { useState } from 'react'
import { useDict } from '@/i18n/DictContext'
import { Home, FileBracesCorner, CircleUser, MessageCircle } from 'lucide-react'

export default function MobileNav() {
  const dict = useDict()
  const [activeId, setActiveId] = useState('hero')

  const navLinks = [
    { href: '#hero',        icon: Home,             id: 'hero',        label: dict.mobile_nav.home },
    { href: '#projects',    icon: FileBracesCorner, id: 'projects',    label: dict.mobile_nav.projects },
    { href: '#experiences', icon: CircleUser,       id: 'experiences', label: dict.mobile_nav.experience },
    { href: '#contacts',    icon: MessageCircle,    id: 'contacts',    label: dict.mobile_nav.contact },
  ]

  const handleTap = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden" aria-label="Mobile navigation">
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/45 backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/50 shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeId === link.id
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleTap(e, link.id)}
              aria-label={link.label}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 rounded-xl w-14 h-11 no-underline border ${
                isActive
                  ? 'bg-[rgba(23,23,28,0.75)] border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_4px_rgba(0,0,0,0.2)] text-white'
                  : 'bg-transparent border-transparent text-[#17171c]'
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className={`font-body text-[9px] leading-none tracking-[0.04em] ${isActive ? 'text-white' : 'text-[#17171c]'}`}>
                {link.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
