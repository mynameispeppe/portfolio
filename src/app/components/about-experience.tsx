'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Cake } from 'lucide-react'
import { useDict } from '@/i18n/DictContext'

const spring = { type: 'spring' as const, stiffness: 55, damping: 18, mass: 1 }

const GithubIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export function AboutExperience() {
  const dict = useDict()
  const a = dict.about

  return (
    <section id="experiences" className="py-12 md:py-28">
      <div className="px-6 max-w-7xl mx-auto w-full">

        <motion.h2
          className="font-display font-normal text-text-primary"
          style={{ fontSize: 'clamp(28px, 8vw, 48px)', lineHeight: 1.2, letterSpacing: '-0.48px', marginBottom: 48 }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={spring}
        >
          {a.section_heading}
        </motion.h2>

        <div className="flex flex-col lg:flex-row" style={{ gap: 80, alignItems: 'flex-start' }}>

          {/* LEFT */}
          <motion.div
            className="w-full lg:w-2/5"
            style={{ flexShrink: 0 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ ...spring, delay: 0.05 }}
          >
            <div className="lg:sticky" style={{ top: 64 }}>

              {/* ── MOBILE / TABLET layout (< lg) ── */}
              <div className="lg:hidden flex flex-col" style={{ gap: 16 }}>

                {/* Row 1: avatar */}
                <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 9999, border: '1px solid #f2f2f2', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src="/images/avatar.jpeg" alt={a.avatar_alt} fill className="object-cover" style={{ objectPosition: '50% 35%' }} />
                </div>

                {/* Row 2: name + social icons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className="font-display font-normal text-text-primary" style={{ fontSize: 'clamp(24px, 6vw, 32px)', lineHeight: 1.2, letterSpacing: '-0.32px' }}>
                    {a.name}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <motion.a
                      href="https://github.com/mynameispeppe"
                      target="_blank" rel="noopener noreferrer"
                      aria-label={a.aria_github}
                      style={{ width: 32, height: 32, borderRadius: 9999, border: '1px solid #f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#17171c' }}
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <GithubIcon />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/giuseppe-milazzo-b70236153/"
                      target="_blank" rel="noopener noreferrer"
                      aria-label={a.aria_linkedin}
                      style={{ width: 32, height: 32, borderRadius: 9999, border: '1px solid #f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#17171c' }}
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <LinkedinIcon />
                    </motion.a>
                  </div>
                </div>

                {/* Birthday + location */}
                <div style={{ display: 'flex', gap: 16 }}>
                  <span className="flex items-center font-body" style={{ fontSize: 14, lineHeight: 1.4, color: '#93939f', gap: 6 }}>
                    <Cake size={13} strokeWidth={1.5} />
                    {a.birthday}
                  </span>
                  <span className="flex items-center font-body" style={{ fontSize: 14, lineHeight: 1.4, color: '#93939f', gap: 6 }}>
                    <MapPin size={13} strokeWidth={1.5} />
                    {a.location}
                  </span>
                </div>

                {/* Bio */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {a.bio.map((line, i) => (
                    <p key={i} className="font-body" style={{ fontSize: 16, lineHeight: 1.5, color: '#616161' }}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* CV button — secondary */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body"
                  style={{
                    display: 'inline-block',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#17171c',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    padding: '8px 0',
                  }}
                >
                  {a.cta_cv}
                </a>

              </div>

              {/* ── DESKTOP layout (≥ lg) ── */}
              <div className="hidden lg:block">

                <div className="relative overflow-hidden" style={{ width: 180, height: 240, borderRadius: 16, marginBottom: 20 }}>
                  <Image src="/images/avatar.jpeg" alt={a.avatar_alt} fill className="object-cover" style={{ objectPosition: '50% 10%' }} />
                </div>

                <p className="font-display font-normal text-text-primary" style={{ fontSize: 24, lineHeight: 1.3, letterSpacing: 0 }}>
                  {a.name}
                </p>

                <div className="flex flex-wrap" style={{ gap: 16, marginTop: 6 }}>
                  <span className="flex items-center font-body text-text-muted" style={{ fontSize: 14, lineHeight: 1.4, gap: 6 }}>
                    <Cake size={13} strokeWidth={1.5} />
                    {a.birthday}
                  </span>
                  <span className="flex items-center font-body text-text-muted" style={{ fontSize: 14, lineHeight: 1.4, gap: 6 }}>
                    <MapPin size={13} strokeWidth={1.5} />
                    {a.location}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                  <motion.a
                    href="https://github.com/mynameispeppe"
                    target="_blank" rel="noopener noreferrer"
                    aria-label={a.aria_github}
                    style={{ width: 32, height: 32, borderRadius: 9999, border: '1px solid #f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#17171c' }}
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <GithubIcon />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/giuseppe-milazzo-b70236153/"
                    target="_blank" rel="noopener noreferrer"
                    aria-label={a.aria_linkedin}
                    style={{ width: 32, height: 32, borderRadius: 9999, border: '1px solid #f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#17171c' }}
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <LinkedinIcon />
                  </motion.a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
                  {a.bio.map((line, i) => (
                    <p key={i} className={`font-body ${i === 0 ? 'text-text-primary' : 'text-text-secondary'}`} style={{ fontSize: 16, lineHeight: 1.5 }}>
                      {line}
                    </p>
                  ))}
                </div>

                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body"
                  style={{
                    display: 'inline-block',
                    marginTop: 24,
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#17171c',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    padding: '8px 0',
                  }}
                >
                  {a.cta_cv}
                </a>

              </div>
            </div>
          </motion.div>

          {/* RIGHT — experience list */}
          <div className="w-full lg:w-3/5">
            {a.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ ...spring, delay: i * 0.08 }}
                style={{ padding: '24px 0' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0 24px', alignItems: 'start' }}>
                  <p className="font-body text-text-muted" style={{ fontSize: 12, lineHeight: 1.4, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums', paddingTop: 3 }}>
                    {exp.date}
                  </p>
                  <div>
                    <p className="font-body text-text-primary" style={{ fontSize: 16, lineHeight: 1.5 }}>
                      {exp.role}
                      <span className="text-text-muted" style={{ fontSize: 14, marginLeft: 8 }}>@ {exp.company}</span>
                    </p>
                    <p className="font-body text-text-secondary" style={{ fontSize: 16, lineHeight: 1.5, marginTop: 6 }}>
                      {exp.about}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
