'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useDict } from '@/i18n/DictContext'
import { Skills } from '@/app/components/skills'

const TYPING_SPEED = 75
const DELETING_SPEED = 40
const PAUSE_AFTER_TYPE = 1600
const PAUSE_AFTER_DELETE = 400

export function Hero() {
  const dict = useDict()
  const phrases = dict.hero.typewriter

  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = phrases[phraseIndex]
    if (!isDeleting && displayed === current) {
      timeout.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return
    }
    if (isDeleting && displayed === '') {
      timeout.current = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }, PAUSE_AFTER_DELETE)
      return
    }
    timeout.current = setTimeout(() => {
      setDisplayed(isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      )
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED)
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [displayed, isDeleting, phraseIndex, phrases])

  return (
    <section id="hero" className="pt-6 pb-10 md:pb-20">
      <div className="relative w-full overflow-hidden rounded-[22px] h-[clamp(420px,70vw,580px)] bg-[#0d0d0d]">
        <Image
          src="/images/hero.jpg"
          alt={dict.hero.name}
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.2)_50%,transparent_100%)]" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col sm:flex-row sm:items-end sm:justify-between px-6 pb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 1, delay: 0.15 }}
          >
            <h1 className="font-display font-normal leading-[1.2] tracking-[-0.48px] text-white text-[clamp(28px,8vw,48px)]">
              {dict.hero.name}
            </h1>

            <div className="mt-1.5 flex items-center h-6">
              <span
                className="font-body text-[16px] leading-[1.5] text-white/75"
                aria-live="polite"
                aria-atomic="true"
              >
                {displayed}
                <span className="typewriter-cursor" aria-hidden="true" />
              </span>
            </div>

            <p className="font-body text-[14px] leading-[1.4] text-white/75 max-w-[38ch] mt-[6px]">
              {dict.hero.caption}
            </p>
          </motion.div>

          <motion.a
            href="mailto:giuseppemilazzo.92@outlook.it"
            className="inline-flex self-start sm:self-end items-center font-body shrink-0 sm:ml-4 text-[14px] font-medium leading-[1.71] bg-white text-[#17171c] rounded-[32px] px-5 py-[10px] no-underline"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              default: { type: 'spring', stiffness: 400, damping: 20 },
              opacity: { type: 'spring', stiffness: 55, damping: 18, mass: 1, delay: 0.3 },
              y: { type: 'spring', stiffness: 55, damping: 18, mass: 1, delay: 0.3 },
            }}
            whileHover={{ scale: 1.04, y: -1, boxShadow: '0 6px 20px rgba(23,23,28,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            {dict.nav.cta}
          </motion.a>
        </div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Skills aria={dict.hero.skills_aria} />
      </motion.div>
    </section>
  )
}
