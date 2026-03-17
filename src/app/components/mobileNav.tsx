'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#experiences', label: 'Experiences', id: 'experiences' },
  { href: '#about', label: 'About me', id: 'about' },
  { href: '#contacts', label: 'Contact', id: 'contacts' },
]

// Tutte le sezioni da osservare, inclusa hero per resettare l'active
const allSectionIds = ['hero', 'projects', 'experiences', 'about', 'contacts']

export default function MobileNav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          // Hero non ha voce nel nav → reset a nessun active
          if (entry.target.id === 'hero') {
            setActiveId('')
          } else {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleTap = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="bg-card rounded-2xl squircle px-2 py-2 flex items-center gap-1 shadow-md">
        {navLinks.map((link) => {
          const isActive = activeId === link.id
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleTap(e, link.id)}
              className={`px-4 py-2 text-sm font-medium font-body transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-accent text-[#F4F7F9] rounded-xl squircle'
                  : 'text-text-primary/70'
              }`}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
