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
          className="font-display font-normal text-text-primary text-[clamp(28px,8vw,48px)] leading-[1.2] tracking-[-0.48px] mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={spring}
        >
          {a.section_heading}
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-[80px] items-start">

          {/* LEFT */}
          <motion.div
            className="w-full lg:w-2/5 shrink-0"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ ...spring, delay: 0.05 }}
          >
            <div className="lg:sticky top-16">

              {/* ── MOBILE / TABLET layout (< lg) ── */}
              <div className="lg:hidden flex flex-col gap-4">

                {/* Row 1: avatar */}
                <div className="relative w-24 h-24 rounded-full border border-[#f2f2f2] overflow-hidden shrink-0">
                  <Image src="/images/avatar.jpeg" alt={a.avatar_alt} fill className="object-cover object-[50%_35%]" />
                </div>

                {/* Row 2: name + social icons */}
                <div className="flex items-center justify-between">
                  <p className="font-display font-normal text-text-primary text-[clamp(24px,6vw,32px)] leading-[1.2] tracking-[-0.32px]">
                    {a.name}
                  </p>
                  <div className="flex gap-2">
                    <motion.a
                      href="https://github.com/mynameispeppe"
                      target="_blank" rel="noopener noreferrer"
                      aria-label={a.aria_github}
                      className="w-8 h-8 rounded-full border border-[#f2f2f2] flex items-center justify-center text-[#17171c]"
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <GithubIcon />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/giuseppe-milazzo-b70236153/"
                      target="_blank" rel="noopener noreferrer"
                      aria-label={a.aria_linkedin}
                      className="w-8 h-8 rounded-full border border-[#f2f2f2] flex items-center justify-center text-[#17171c]"
                      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <LinkedinIcon />
                    </motion.a>
                  </div>
                </div>

                {/* Birthday + location */}
                <div className="flex gap-4">
                  <span className="flex items-center gap-[6px] font-body text-[14px] leading-[1.4] text-[#93939f]">
                    <Cake size={13} strokeWidth={1.5} />
                    {a.birthday}
                  </span>
                  <span className="flex items-center gap-[6px] font-body text-[14px] leading-[1.4] text-[#93939f]">
                    <MapPin size={13} strokeWidth={1.5} />
                    {a.location}
                  </span>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-2">
                  {a.bio.map((line, i) => (
                    <p key={i} className="font-body text-[16px] leading-[1.5] text-[#616161]">
                      {line}
                    </p>
                  ))}
                </div>

                {/* CV button */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body inline-block text-[14px] font-medium text-[#17171c] underline underline-offset-[3px] py-2"
                >
                  {a.cta_cv}
                </a>

              </div>

              {/* ── DESKTOP layout (≥ lg) ── */}
              <div className="hidden lg:block">

                <div className="relative overflow-hidden w-[180px] h-[240px] rounded-[16px] mb-5">
                  <Image src="/images/avatar.jpeg" alt={a.avatar_alt} fill className="object-cover object-[50%_10%]" />
                </div>

                <p className="font-display font-normal text-text-primary text-[24px] leading-[1.3]">
                  {a.name}
                </p>

                <div className="flex flex-wrap gap-4 mt-[6px]">
                  <span className="flex items-center gap-[6px] font-body text-text-muted text-[14px] leading-[1.4]">
                    <Cake size={13} strokeWidth={1.5} />
                    {a.birthday}
                  </span>
                  <span className="flex items-center gap-[6px] font-body text-text-muted text-[14px] leading-[1.4]">
                    <MapPin size={13} strokeWidth={1.5} />
                    {a.location}
                  </span>
                </div>

                <div className="flex gap-2 mt-5">
                  <motion.a
                    href="https://github.com/mynameispeppe"
                    target="_blank" rel="noopener noreferrer"
                    aria-label={a.aria_github}
                    className="w-8 h-8 rounded-full border border-[#f2f2f2] flex items-center justify-center text-[#17171c]"
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <GithubIcon />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/giuseppe-milazzo-b70236153/"
                    target="_blank" rel="noopener noreferrer"
                    aria-label={a.aria_linkedin}
                    className="w-8 h-8 rounded-full border border-[#f2f2f2] flex items-center justify-center text-[#17171c]"
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <LinkedinIcon />
                  </motion.a>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  {a.bio.map((line, i) => (
                    <p key={i} className={`font-body text-[16px] leading-[1.5] ${i === 0 ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {line}
                    </p>
                  ))}
                </div>

                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body inline-block mt-6 text-[14px] font-medium text-[#17171c] underline underline-offset-[3px] py-2"
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
                className="py-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ ...spring, delay: i * 0.08 }}
              >
                <div className="grid grid-cols-[110px_1fr] gap-x-6 items-start">
                  <p className="font-body text-text-muted text-[12px] leading-[1.4] tracking-[0.06em] tabular-nums pt-[3px]">
                    {exp.date}
                  </p>
                  <div>
                    <p className="font-body text-text-primary text-[16px] leading-[1.5]">
                      {exp.role}
                      <span className="text-text-muted text-[14px] ml-2">@ {exp.company}</span>
                    </p>
                    <p className="font-body text-text-secondary text-[16px] leading-[1.5] mt-[6px]">
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
