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
      style={{
        transform: reduced ? 'none' : `scale(${scale})`,
        opacity,
        transition: reduced ? 'none' : 'transform 0.35s ease, opacity 0.35s ease',
        transformOrigin: 'center center',
        borderRadius: 22,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        border: '1px solid #f2f2f2',
        position: 'relative',
        pointerEvents: active ? 'auto' : 'none',
      }}
      aria-hidden={active ? undefined : true}
      tabIndex={active ? 0 : -1}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, borderRadius: 22,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(238,236,231,0.9) 0%, rgba(241,245,255,0.4) 50%, rgba(255,255,255,0) 80%)',
          filter: 'url(#grainy)', zIndex: 0, pointerEvents: 'none',
        }}
      />

      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>

        <p className="font-display font-normal text-text-primary" style={{ fontSize: 32, lineHeight: 1.2, letterSpacing: '-0.32px', marginBottom: 6 }}>
          {title}
        </p>
        <p className="font-body" style={{ fontSize: 16, lineHeight: 1.5, color: '#616161', marginBottom: 16 }}>
          {subtitle}
        </p>
        <p className="font-body text-text-secondary" style={{ fontSize: 16, lineHeight: 1.5, flex: 1, marginBottom: 24 }}>
          {description}
        </p>

        {/* CTA */}
        {hasLink ? (
          <div style={{ marginBottom: 20 }}>
            {meta.previewSlug && !meta.liveUrl && !meta.githubUrl ? (
              <Link href={href} className="font-body" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, color: '#17171c', textDecoration: 'none' }}>
                {labelView}
                <span style={{ width: 28, height: 28, borderRadius: 9999, border: '1px solid #d9d9dd', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </Link>
            ) : (
              <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className="font-body" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, color: '#17171c', textDecoration: 'none' }}>
                {labelView}
                <span style={{ width: 28, height: 28, borderRadius: 9999, border: '1px solid #d9d9dd', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </a>
            )}
          </div>
        ) : meta.wip ? (
          <div style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span className="font-body" style={{ fontSize: 14, fontWeight: 500, color: '#93939f' }}>{labelWip}</span>
            <span style={{ width: 28, height: 28, borderRadius: 9999, border: '1px solid #d9d9dd', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#93939f' }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
          </div>
        ) : (
          <div style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span className="font-body" style={{ fontSize: 14, fontWeight: 500, color: '#17171c' }}>{labelEnterprise}</span>
            <span style={{ width: 28, height: 28, borderRadius: 9999, border: '1px solid #d9d9dd', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#17171c' }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((tag) => (
            <span key={tag} className="font-body" style={{ fontSize: 12, lineHeight: 1.4, color: '#17171c', background: 'rgba(23,23,28,0.08)', borderRadius: 9999, padding: '4px 12px' }}>
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
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
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
        style={{ marginBottom: 32 }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 1 }}
      >
        <h2 className="font-display font-normal text-text-primary" style={{ fontSize: 'clamp(28px, 8vw, 48px)', lineHeight: 1.2, letterSpacing: '-0.48px' }}>
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
          <div className="flex" style={{ gap: 16 }}>
            {p.items.map((item, i) => (
              <div key={item.title} className="flex-none" style={{ width: 'clamp(300px, 80vw, 580px)' }}>
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
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 items-center justify-center w-9 h-9 rounded-full transition-opacity disabled:opacity-20"
          style={{ border: '1px solid #d9d9dd', background: 'transparent', color: '#212121' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={scrollNext} disabled={!canNext} aria-label={p.aria_next}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 items-center justify-center w-9 h-9 rounded-full transition-opacity disabled:opacity-20"
          style={{ border: '1px solid #d9d9dd', background: 'transparent', color: '#212121' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24 }} role="tablist" aria-label={p.aria_dots}>
        {p.items.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} role="tab"
            aria-selected={i === selectedIndex} aria-label={`${i + 1}`}
            style={{ width: i === selectedIndex ? 20 : 6, height: 6, borderRadius: 9999, background: i === selectedIndex ? '#17171c' : '#d9d9dd', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
          />
        ))}
      </div>
    </section>
  )
}
