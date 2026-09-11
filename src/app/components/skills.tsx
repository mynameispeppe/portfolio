'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const skills = [
  { name: 'Angular',      logo: '/images/devicons/angular.svg' },
  { name: 'TypeScript',   logo: '/images/devicons/typescript.svg' },
  { name: 'HTML5',        logo: '/images/devicons/html5.svg' },
  { name: 'CSS3',         logo: '/images/devicons/css3.svg' },
  { name: 'Sass',         logo: '/images/devicons/sass.svg' },
  { name: 'React',        logo: '/images/devicons/react.svg' },
  { name: 'Next.js',      logo: '/images/devicons/nextjs.svg' },
  { name: 'Tailwind CSS', logo: '/images/devicons/tailwindcss.svg' },
  { name: 'Figma',        logo: '/images/devicons/figma.svg' },
  { name: 'GitHub',       logo: '/images/devicons/github.svg' },
  { name: 'ESLint',       logo: '/images/devicons/eslint.svg' },
  { name: 'Cypress',      logo: '/images/devicons/cypress.svg' },
]

export function Skills({ aria = 'Tech skills' }: { aria?: string }) {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="relative w-full overflow-hidden py-1">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
        style={{ background: 'linear-gradient(to right, #FAFAF9, transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
        style={{ background: 'linear-gradient(to left, #FAFAF9, transparent)' }}
      />

      <div
        className="flex w-max items-center gap-10 animate-marquee"
        style={{ animationPlayState: paused || reduced ? 'paused' : 'running' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-label={aria}
      >
        {[...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex-none flex items-center h-7" aria-hidden={i >= skills.length}>
            <Image
              src={skill.logo}
              alt={i < skills.length ? skill.name : ''}
              width={28}
              height={28}
              className="h-7 w-auto transition-all duration-300"
              style={{ opacity: 0.55, filter: 'brightness(0)' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.55' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
