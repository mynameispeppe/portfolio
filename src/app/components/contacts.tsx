'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useDict } from '@/i18n/DictContext'

const email = 'giuseppemilazzo.92@outlook.it'

export function Contacts() {
  const dict = useDict()
  const c = dict.contact

  return (
    <section id="contacts" className="pt-12 pb-10 md:pt-28 md:pb-10">
      <div className="px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ type: 'spring', stiffness: 55, damping: 18, mass: 1 }}
          className="relative w-full overflow-hidden rounded-[22px] h-[clamp(420px,70vw,580px)]"
        >
          <Image src="/images/contact-test.jpg" alt={c.image_alt} fill className="object-cover object-top" />

          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_50%,transparent_100%)]" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col sm:flex-row sm:items-end sm:justify-between px-6 pb-8 gap-6">
            <div>
              <h2 className="font-display font-normal text-white text-[clamp(28px,8vw,48px)] leading-[1.2] tracking-[-0.48px]">
                {c.heading_line1}<br />{c.heading_line2}
              </h2>
            </div>

            <motion.a
              href={`mailto:${email}`}
              className="inline-flex self-start sm:self-end items-center font-body shrink-0 sm:ml-6 text-[14px] font-medium leading-[1.71] bg-white text-[#17171c] rounded-[32px] px-5 py-2 no-underline"
              whileHover={{ scale: 1.04, y: -1, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {c.cta_email}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
