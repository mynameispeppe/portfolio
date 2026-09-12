'use client'

import React, { useState } from 'react'
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
  { name: 'Karma',        logo: '/images/devicons/karma.svg' },
  { name: 'Cypress',      logo: '/images/devicons/cypress.svg' },
  { name: 'npm',          logo: '/images/devicons/npm.svg' },
]

export function Skills({ aria = 'Tech skills' }: { aria?: string }) {
  const [paused, setPaused] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      setPaused(p => !p)
    }
  }

  return (
    <div className="relative w-full overflow-hidden py-1">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-[linear-gradient(to_right,#FAFAF9,transparent)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-[linear-gradient(to_left,#FAFAF9,transparent)]" />

      <div
        className="flex w-max animate-marquee"
        style={{ animationPlayState: paused ? 'paused' : 'running', willChange: 'transform', backfaceVisibility: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={aria}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-[60px] pr-[60px]" aria-hidden={copy === 1}>
            {skills.map((skill, i) => (
              <div key={i} className="flex-none flex items-center h-7 w-7">
                <Image
                  src={skill.logo}
                  alt={copy === 0 ? skill.name : ''}
                  width={28}
                  height={28}
                  loading="eager"
                  className="h-7 w-auto transition-all duration-300 opacity-[0.55] brightness-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
