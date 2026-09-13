'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'
import { useDict } from '@/i18n/DictContext'

const stackIconMap: Record<string, string> = {
  'Angular':         '/images/devicons/angular-colored.svg',
  'Angular 15':      '/images/devicons/angular-colored.svg',
  'Angular 20':      '/images/devicons/angular-colored.svg',
  'TypeScript':      '/images/devicons/typescript.svg',
  'Next.js':         '/images/devicons/nextjs.svg',
  'Next.js 14':      '/images/devicons/nextjs.svg',
  'Tailwind':        '/images/devicons/tailwindcss.svg',
  'Tailwind CSS':    '/images/devicons/tailwindcss.svg',
  'Figma':           '/images/devicons/figma-colored.svg',
  'HTML':            '/images/devicons/html5.svg',
  'HTML5':           '/images/devicons/html5.svg',
  'CSS':             '/images/devicons/css3.svg',
  'CSS3':            '/images/devicons/css3.svg',
  'Karma':           '/images/devicons/karma.svg',
  'React':           '/images/devicons/react.svg',
  'Sass':            '/images/devicons/sass.svg',
  'GitHub':          '/images/devicons/github.svg',
  'npm':             '/images/devicons/npm.svg',
  'Cypress':         '/images/devicons/cypress.svg',
  'ESLint':          '/images/devicons/eslint.svg',
  'Supabase':        '/images/devicons/supabase.svg',
  'NgRx':            '/images/devicons/ngrx.svg',
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
  { stack: ['Next.js 14', 'TypeScript', 'Supabase'], wip: true },
  { stack: ['Angular 15', 'NgRx', 'Material', 'Karma'] },
  { stack: ['Angular 15', 'Standalone', 'NgRx', 'Material'] },
  { stack: ['Angular 20', 'Auth0', 'NgRx', 'Tailwind'], githubUrl: 'https://github.com/mynameispeppe/Todo' },
  { stack: ['Next.js', 'Figma', 'Responsive Design'], liveUrl: 'https://www.eurosplendore.it/' },
  { stack: ['HTML', 'CSS', 'Responsive Design'], liveUrl: 'https://www.bb-imori.it/' },
]

function StackIcons({ stack, invert = false }: { stack: string[]; invert?: boolean }) {
  const icons = stack.map(s => stackIconMap[s]).filter(Boolean).slice(0, 4)
  if (icons.length === 0) return null
  return (
    <div className="flex items-center">
      {icons.map((icon, i) => (
        <div key={i} className={`w-8 h-8 rounded-full border ${invert ? 'border-white/20 bg-[#FAFAF9]' : 'border-[#d9d9dd] bg-[#FAFAF9]'} flex items-center justify-center p-1 -ml-2 first:ml-0`}>
          <Image src={icon} alt="" width={14} height={14} className="brightness-0" />
        </div>
      ))}
    </div>
  )
}

function CtaNode({ meta, labelView, labelWip, labelEnterprise, dark = false }: {
  meta: ProjectMeta
  labelView: string
  labelWip: string
  labelEnterprise: string
  dark?: boolean
}) {
  const textClass = dark ? 'text-white' : 'text-[#17171c]'
  const mutedClass = dark ? 'text-white/50' : 'text-[#616161]'
  const linkClass = `font-body inline-block text-[14px] font-medium ${textClass} underline underline-offset-[3px]`
  const href = meta.liveUrl ?? meta.githubUrl ?? (meta.previewSlug ? `/projects/${meta.previewSlug}` : '#')

  if (meta.liveUrl || meta.githubUrl) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{labelView}</a>
  }
  if (meta.previewSlug) {
    return <Link href={href} className={linkClass}>{labelView}</Link>
  }
  if (meta.wip) {
    return <span className={`font-body text-[14px] font-medium ${mutedClass}`}>{labelWip}</span>
  }
  return <span className={`font-body text-[14px] font-medium ${mutedClass}`}>{labelEnterprise}</span>
}

function BottomSheet({ open, onClose, title, subtitle, description, meta, labelView, labelWip, labelEnterprise, triggerRef }: {
  open: boolean
  onClose: () => void
  title: string
  subtitle: string
  description: string
  meta: ProjectMeta
  labelView: string
  labelWip: string
  labelEnterprise: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      document.body.style.overflow = 'hidden'
      setTimeout(() => sheetRef.current?.focus(), 50)
    } else {
      if (!wasOpenRef.current) return
      wasOpenRef.current = false
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 380)
      document.body.style.overflow = ''
      triggerRef.current?.focus()
      return () => clearTimeout(t)
    }
  }, [open, triggerRef])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab') {
        const focusable = sheetRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40 bg-[#17171c]"
        style={{ opacity: visible ? 0.5 : 0, transition: 'opacity 350ms cubic-bezier(0.32,0.72,0,1)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#17171c] rounded-t-[24px] max-h-[80vh] flex flex-col outline-none overflow-hidden"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 350ms cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,rgba(33,33,33,0.8)_0%,rgba(23,23,28,0)_70%)]" />
        <div className="flex justify-center pt-3 pb-1 shrink-0 relative z-[1]">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
        <div className="overflow-y-auto flex-1 px-6 pb-4 pt-4 relative z-[1]">
          <div className="flex items-start justify-between gap-3 mb-[6px]">
            <p className="font-display font-normal text-white text-[24px] leading-[1.2] tracking-[-0.32px]">
              {title}
            </p>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/20 inline-flex items-center justify-center shrink-0 text-white/70"
              aria-label="Chiudi"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <p className="font-body text-[16px] leading-[1.5] text-white/50 mt-[6px]">
            {subtitle}
          </p>
          <p className="font-body text-[16px] leading-[1.5] text-white/70 mt-6">
            {description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <CtaNode meta={meta} labelView={labelView} labelWip={labelWip} labelEnterprise={labelEnterprise} dark />
            <StackIcons stack={meta.stack} invert />
          </div>
        </div>
        <div className="pb-8 shrink-0" />
      </div>
    </>,
    document.body
  )
}

function ProjectCard({
  title, subtitle, description, meta, active, reduced, isDesktop,
  labelView, labelWip, labelEnterprise, labelReadMore,
}: {
  title: string; subtitle: string; description: string
  meta: ProjectMeta; active: boolean; reduced: boolean; isDesktop: boolean
  labelView: string; labelWip: string; labelEnterprise: string
  labelReadMore: string
}) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const applyEffect = isDesktop && !reduced
  const scale = applyEffect ? (active ? 1 : 0.9) : 1
  const opacity = applyEffect ? (active ? 1 : 0.45) : 1

  return (
    <>
      <div
        className="rounded-[22px] overflow-hidden h-full flex flex-col bg-[#17171c] border border-[#212121] relative"
        style={{
          transform: applyEffect ? `scale(${scale})` : 'none',
          opacity,
          transition: applyEffect ? 'transform 0.35s ease, opacity 0.35s ease' : 'none',
          transformOrigin: 'center center',
          pointerEvents: active ? 'auto' : 'none',
        }}
        aria-hidden={active ? undefined : true}
        tabIndex={active ? 0 : -1}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[22px] z-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,rgba(33,33,33,0.8)_0%,rgba(23,23,28,0)_70%)]"
        />
        <div className="px-8 py-6 flex flex-col flex-1 relative z-[1]">
          <p className="font-display font-normal text-white text-[24px] lg:text-[32px] leading-[1.2] tracking-[-0.32px] mb-[6px]">
            {title}
          </p>
          <p className="font-body text-[16px] leading-[1.5] text-white/50 mb-4">
            {subtitle}
          </p>

          <div className="hidden sm:block overflow-y-auto flex-1 min-h-0">
            <p className="font-body text-white/70 text-[16px] leading-[1.5]">
              {description}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 sm:hidden">
            <button
              ref={triggerRef}
              onClick={() => setSheetOpen(true)}
              className="font-body text-[14px] font-medium text-white"
            >
              {labelReadMore}
            </button>
            <StackIcons stack={meta.stack} />
          </div>

          <div className="hidden sm:flex mt-auto items-center justify-between pt-4">
            <CtaNode meta={meta} labelView={labelView} labelWip={labelWip} labelEnterprise={labelEnterprise} dark />
            <StackIcons stack={meta.stack} invert />
          </div>
        </div>
      </div>

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={title}
        subtitle={subtitle}
        description={description}
        meta={meta}
        labelView={labelView}
        labelWip={labelWip}
        labelEnterprise={labelEnterprise}
        triggerRef={triggerRef}
      />
    </>
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
              <div key={item.title} className="flex-none w-[clamp(300px,80vw,580px)] h-56 sm:h-80">
                <ProjectCard
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  meta={projectsMeta[i]}
                  active={i === selectedIndex}
                  reduced={reduced}
                  isDesktop={isDesktop}
                  labelView={p.cta_view}
                  labelWip={p.cta_wip}
                  labelEnterprise={p.cta_enterprise}
                  labelReadMore={p.cta_read_more}
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
