'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/navbar'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}
const fadeUpDelayed = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

type Feature = {
  side: 'left' | 'right'
  eyebrow: string
  title: string
  body: string
  pills: string[]
  primaryImage: string
  primaryAlt: string
  secondaryImage?: string
  secondaryAlt?: string
  secondaryPlacement: 'bottom-left' | 'bottom-right' | 'none'
}

const features: Feature[] = [
  {
    side: 'right',
    eyebrow: 'Nutrition',
    title: 'Every meal, every day',
    body: 'Browse your full weekly meal plan day by day. Filter by meal slot — breakfast, lunch, dinner, snack — and see exact quantities at a glance.',
    pills: ['Day selector', 'Slot filter', 'Quantity view'],
    primaryImage: '/vitae/meal-plan.png',
    primaryAlt: 'Weekly meal plan',
    secondaryImage: '/vitae/meal-plan-filter.png',
    secondaryAlt: 'Meal slot filter view',
    secondaryPlacement: 'bottom-left',
  },
  {
    side: 'left',
    eyebrow: 'Training',
    title: 'Your sessions, in detail',
    body: 'Training sessions with full exercise breakdown — sets, reps, rest time, and weight. Slide open any session to see the full program.',
    pills: ['Sets & reps', 'Rest timer', 'Weight log'],
    primaryImage: '/vitae/workouts.png',
    primaryAlt: 'Workout sessions list',
    secondaryImage: '/vitae/workout-detail.png',
    secondaryAlt: 'Exercise detail drawer',
    secondaryPlacement: 'bottom-right',
  },
  {
    side: 'right',
    eyebrow: 'Shopping',
    title: 'Auto-generated shopping list',
    body: "All ingredients from your 7-day meal plan, aggregated and searchable. Each item shows which days it's needed so you never over-buy.",
    pills: ['Shop list', 'Day badges', 'Search'],
    primaryImage: '/vitae/shopping-list.png',
    primaryAlt: 'Shopping list view',
    secondaryPlacement: 'none',
  },
]

const stack = ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui', 'Vercel']

function ScreenshotBlock({ feat }: { feat: Feature }) {
  const hasSecondary = feat.secondaryPlacement !== 'none' && !!feat.secondaryImage
  const isLeft = feat.side === 'left'

  return (
    <div className={`relative ${hasSecondary ? 'pb-20 sm:pb-24' : ''} ${isLeft ? 'lg:order-1' : ''}`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[22px] overflow-hidden border border-gray-200"
      >
        <div className="relative w-full aspect-16/11 bg-card">
          <Image src={feat.primaryImage} alt={feat.primaryAlt}
                 fill
                 sizes="(max-width: 1024px) 100vw, 60vw"
                 className="object-cover object-top"
          />
        </div>
      </motion.div>

      {hasSecondary && feat.secondaryImage && (
        <motion.div
          variants={fadeUpDelayed}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`
            absolute bottom-0 z-10
            ${feat.secondaryPlacement === 'bottom-left' ? 'left-5 sm:left-8' : 'right-5 sm:right-8'}
            w-[58%] sm:w-[54%]
            rounded-2xl overflow-hidden
            border border-white/80
            shadow-md
            
            ring-1 ring-black/5
          `}
        >
          <div className="relative w-full aspect-16/11 bg-card">
            <Image
              src={feat.secondaryImage}
              alt={feat.secondaryAlt ?? ''}
              fill
              sizes="36vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function VitaePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />

      <main className="pt-24 pb-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center gap-2 text-md text-text-secondary font-body mb-10">
          <Link href="/" className="hover:text-text-primary transition flex items-center gap-1">
            <Image src="/icons/arrow-left-logo.svg" alt="" width={12} height={12} />
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-text-primary transition">
            Projects
          </Link>
          <span>/</span>
          <span className="text-accent font-medium">Vitae</span>
        </div>

        <section>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-title leading-tight max-w-3xl">
            Your fitness life,{' '}
            <span className="text-accent">beautifully tracked</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-lg text-text-secondary font-body max-w-xl leading-relaxed">
            Vitae is a web app for managing your weekly workout sessions and
            daily nutrition plan — all in one place.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-8">
            <a href="https://vitae-ochre.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2">
              Open app
            </a>
            <p className="mt-3 text-sm text-text-secondary font-body">
              Test account: <span className="font-medium text-text-primary">test@vitae.app</span> · <span className="font-medium text-text-primary">vitae1234</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 rounded-[22px] overflow-hidden border border-gray-200 squircle">
            <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-gray-200">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 bg-background rounded-md px-3 py-1.5 text-xs text-text-secondary font-body select-none">
                vitae-ochre.vercel.app/dashboard
              </div>
            </div>
            <div className="relative w-full aspect-16/8 bg-card">
              <Image src="/vitae/dashboard.png" alt="Vitae dashboard" fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-top"/>
            </div>
          </motion.div>
        </section>

        <section className="mt-28 flex flex-col gap-32 sm:gap-40">
          {features.map((feat, i) => (
            <div key={i} className={`grid grid-cols-1 gap-12 lg:gap-16 items-center ${feat.side === 'left' ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'}`}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className={feat.side === 'left' ? 'lg:order-2' : ''}>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent font-body mb-4">
                  {feat.eyebrow}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold font-title text-text-primary leading-snug">
                  {feat.title}
                </h2>
                <p className="mt-5 text-text-secondary font-body leading-relaxed text-sm">
                  {feat.body}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {feat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-card border border-gray-200 text-text-secondary font-body"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
              <ScreenshotBlock feat={feat} />
            </div>
          ))}
        </section>

        {/* ── STACK BAR ── */}
        <section className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-2.5">
          <span className="text-sm text-text-secondary font-body mr-1">Built with</span>
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-full bg-card border border-gray-200 text-text-secondary font-body"
            >
              {tech}
            </span>
          ))}
        </section>

      </main>
    </div>
  )
}
