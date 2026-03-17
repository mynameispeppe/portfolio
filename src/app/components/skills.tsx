'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const skillsData = [
    { name: 'Angular',      logo: '/images/brands/angular.svg' },
    { name: 'TypeScript',   logo: '/images/brands/typescript.svg' },
    { name: 'HTML5',        logo: '/images/brands/html5.svg' },
    { name: 'CSS3',         logo: '/images/brands/css3.svg' },
    { name: 'Sass',         logo: '/images/brands/sass.svg' },
    { name: 'ESLint',       logo: '/images/brands/eslint.svg' },
    { name: 'Karma',        logo: '/images/brands/karma.svg' },
    { name: 'Cypress',      logo: '/images/brands/cypress.svg' },
    { name: 'React',        logo: '/images/brands/react.svg' },
    { name: 'Next.js',      logo: '/images/brands/nextjs.svg' },
    { name: 'Tailwind CSS', logo: '/images/brands/tailwindcss.svg' },
    { name: 'Figma',        logo: '/images/brands/figma.svg' },
    { name: 'Git',          logo: '/images/brands/github.svg' },
    { name: 'npm',          logo: '/images/brands/npm.svg' },
];

export function Skills() {
  const [paused, setPaused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      setPaused(p => !p);
    }
  };

  return (
    <div className="hidden md:block relative w-full overflow-hidden py-4">

      {/* fade left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-background to-transparent z-10" />

      {/* fade right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-background to-transparent z-10" />

      <div
        className="flex w-max items-center gap-16 animate-marquee"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Tech skills carousel — press Space to pause"
      >
        {[...skillsData, ...skillsData].map((skill, index) => (
          <div key={index} className="flex-none flex items-center justify-center h-9">
            <Image
              src={skill.logo}
              alt={skill.name}
              width={120}
              height={36}
              className="h-9 w-auto opacity-60 hover:opacity-100 transition duration-300"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
