'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#experiences', label: 'Experiences', id: 'experiences' },
  { href: '#about', label: 'About me', id: 'about' },
  { href: '#contacts', label: 'Contact', id: 'contacts' },
]

export default function MobileNav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="bg-card/20 rounded-[30px] squircle px-2 py-2 flex items-center gap-1 shadow-md">
        {navLinks.map((link) => {
          const isActive = activeId === link.id
          return (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-[15px] squircle text-sm font-medium font-body transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-accent text-background'
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
