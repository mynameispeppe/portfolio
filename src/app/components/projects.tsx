'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useDict } from '@/i18n/DictContext'

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

type ProjectMeta = {
  githubUrl?: string
  liveUrl?: string
  previewSlug?: string
  wip?: boolean
  stack: string[]
  account?: { username: string; password: string }
}

const projectsMeta: ProjectMeta[] = [
  {
    stack: ['Next.js 14', 'TypeScript', 'Supabase'],
    wip: true,
  },
  {
    stack: ['Angular 15', 'NgRx', 'Material', 'Karma'],
  },
  {
    stack: ['Angular 15', 'Standalone', 'NgRx', 'Material'],
  },
  {
    stack: ['Angular 20', 'Auth0', 'NgRx', 'Tailwind'],
    githubUrl: 'https://github.com/mynameispeppe/Todo',
  },
  {
    stack: ['Next.js', 'Figma', 'Responsive Design'],
    liveUrl: 'https://www.eurosplendore.it/',
  },
  {
    stack: ['HTML', 'CSS', 'Responsive Design'],
    liveUrl: 'https://www.bb-imori.it/',
  },
]

function ProjectCard({
  title, subtitle, description, tags, meta, index, active, reduced,
  labelView, labelWip, labelEnterprise,
}: {
  title: string; subtitle: string; description: string; tags: string[]
  meta: ProjectMeta; index: number; active: boolean; reduced: boolean
  labelView: string; labelWip: string; labelEnterprise: string
}) {
  const scale = active ? 1 : 0.9
  const opacity = active ? 1 : 0.45

  const href = meta.liveUrl ?? meta.githubUrl ?? (meta.previewSlug ? `/projects/${meta.previewSlug}` : '#')
  const isExternal = !meta.previewSlug || !!meta.liveUrl || !!meta.githubUrl
  const hasLink = !!(meta.liveUrl || meta.githubUrl || meta.previewSlug)

  return (
    <div
      className="rounded-[22px] overflow-hidden h-full flex flex-col bg-white border border-[#f2f2f2] relative"
      style={{
        transform: reduced ? 'none' : `scale(${scale})`,
        opacity,
        transition: reduced ? 'none' : 'transform 0.35s ease, opacity 0.35s ease',
        transformOrigin: 'center center',
        pointerEvents: active ? 'auto' : 'none',
      }}
      aria-hidden={active ? undefined : true}
      tabIndex={active ? 0 : -1}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[22px] z-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,rgba(238,236,231,0.9)_0%,rgba(241,245,255,0.4)_50%,rgba(255,255,255,0)_80%)]"
        style={{ filter: 'url(#grainy)' }}
      />

      <div className="p-8 flex flex-col flex-1 relative z-[1]">

        <p className="font-display font-normal text-text-primary text-[32px] leading-[1.2] tracking-[-0.32px] mb-[6px]">
          {title}
        </p>
        <p className="font-body text-[16px] leading-[1.5] text-[#616161] mb-4">
          {subtitle}
        </p>
        <p className="font-body text-text-secondary text-[16px] leading-[1.5] flex-1 mb-6">
          {description}
        </p>

        {/* CTA */}
        {hasLink ? (
          <div className="mb-5">
            {meta.previewSlug && !meta.liveUrl && !meta.githubUrl ? (
              <Link href={href} className="font-body inline-flex items-center gap-[10px] text-[14px] font-medium text-[#17171c] no-underline">
                {labelView}
                <span className="w-7 h-7 rounded-full border border-[#d9d9dd] inline-flex items-center justify-center shrink-0">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </Link>
            ) : (
              <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className="font-body inline-flex items-center gap-[10px] text-[14px] font-medium text-[#17171c] no-underline">
                {labelView}
                <span className="w-7 h-7 rounded-full border border-[#d9d9dd] inline-flex items-center justify-center shrink-0">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </a>
            )}
          </div>
        ) : meta.wip ? (
          <div className="mb-5 inline-flex items-center gap-[10px]">
            <span className="font-body text-[14px] font-medium text-[#93939f]">{labelWip}</span>
            <span className="w-7 h-7 rounded-full border border-[#d9d9dd] inline-flex items-center justify-center shrink-0 text-[#93939f]">
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
          </div>
        ) : (
          <div className="mb-5 inline-flex items-center gap-[10px]">
            <span className="font-body text-[14px] font-medium text-[#17171c]">{labelEnterprise}</span>
            <span className="w-7 h-7 rounded-full border border-[#d9d9dd] inline-flex items-center justify-center shrink-0 text-[#17171c]">
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="font-body text-[12px] leading-[1.4] text-[#17171c] bg-[rgba(23,23,28,0.08)] rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const dict = useDict()
  const p = dict.projects

  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const startIndex = isDesktop ? 1 : 0
  const [selectedIndex, setSelectedIndex] = useState(startIndex)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center', loop: false, skipSnaps: false, dragFree: false, startIndex,
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    setSelectedIndex(mq.matches ? 1 : 0)
    const h = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
      setSelectedIndex(e.matches ? 1 : 0)
    }
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="projects" className="py-12 md:py-28">
      <svg aria-hidden="true" className="absolute w-0 h-0">
        <defs>
          <filter id="grainy" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 1 }}
      >
        <h2 className="font-display font-normal text-text-primary text-[clamp(28px,8vw,48px)] leading-[1.2] tracking-[-0.48px]">
          {p.section_heading}
        </h2>
      </motion.div>

      <motion.div
        key={startIndex}
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <div ref={emblaRef} className="overflow-hidden" aria-label={p.aria_carousel} role="region">
          <div className="flex gap-4">
            {p.items.map((item, i) => (
              <div key={item.title} className="flex-none w-[clamp(300px,80vw,580px)]">
                <ProjectCard
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  tags={item.tags}
                  meta={projectsMeta[i]}
                  index={i}
                  active={i === selectedIndex}
                  reduced={reduced}
                  labelView={p.cta_view}
                  labelWip={p.cta_wip}
                  labelEnterprise={p.cta_enterprise}
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollPrev} disabled={!canPrev} aria-label={p.aria_prev}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 items-center justify-center w-9 h-9 rounded-full border border-[#d9d9dd] bg-transparent text-[#212121] transition-opacity disabled:opacity-20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={scrollNext} disabled={!canNext} aria-label={p.aria_next}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 items-center justify-center w-9 h-9 rounded-full border border-[#d9d9dd] bg-transparent text-[#212121] transition-opacity disabled:opacity-20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </motion.div>

      <div className="flex items-center justify-center gap-[6px] mt-6" role="tablist" aria-label={p.aria_dots}>
        {p.items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`${i + 1}`}
            className={`h-[6px] rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
              i === selectedIndex ? 'w-5 bg-[#17171c]' : 'w-[6px] bg-[#d9d9dd]'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
