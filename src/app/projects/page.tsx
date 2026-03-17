'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/navbar'

type Project = {
  title: string
  subtitle: string
  descriptions: string[]
  stack: string
  hasGithub: boolean
  githubUrl?: string
  hasLive: boolean
  liveUrl?: string
}

const projects: Project[] = [
  {
    title: 'GIS Viewer Platform',
    subtitle: 'Angular-based cartographic panel for electrical grid management',
    descriptions: [
      'Contributed to the development of a GIS viewer used to visualize and plan electrical networks across multiple countries within an Agile team.',
      'Implemented lazy-loaded feature modules and optimized rendering performance by refining map-related change detection and minimizing unnecessary re-renders during complex layer interactions.',
      'Participated in code reviews to ensure architectural consistency and code quality.',
    ],
    stack: 'Angular 15 · NgRx · Angular Material · Karma · TSLint',
    hasGithub: false,
    hasLive: false,
  },
  {
    title: 'Project Management Panel',
    subtitle: 'Angular-based platform for project lifecycle management',
    descriptions: [
      'Led the frontend redevelopment within a small Agile team, redesigning the UI from Figma to production using standalone components and NgRx.',
      'Built the application using standalone components, implemented role-based access control and improved performance through lazy loading and refined state management with NgRx.',
      'Collaborated closely with the backend team to define REST API contracts and ensure smooth data integration across all project modules.',
    ],
    stack: 'Angular 15 · Standalone Components · NgRx · Angular Material · Karma · TSLint',
    hasGithub: false,
    hasLive: false,
  },
  {
    title: 'Angular Todo App',
    subtitle: 'Task management app built with Angular 20.2.2',
    descriptions: [
      'Developed a responsive todo list application featuring Auth0 authentication and a mock REST API using json-server.',
      'Implemented add/edit/delete tasks with state management via NgRx and styled the UI using Tailwind CSS and DaisyUI.',
      'Integrated Auth0 login flow with route guards to protect authenticated routes and manage user sessions.',
    ],
    stack: 'Angular 20.2.2 · Auth0 · NgRx · Tailwind CSS · json-server',
    hasGithub: true,
    githubUrl: 'https://github.com/mynameispeppe/Todo',
    hasLive: false,
  },
  {
    title: 'Eurosplendore Website',
    subtitle: 'Corporate website for a local business',
    descriptions: [
      'Built the application using standalone components. Led the end-to-end process from Figma prototype to production deployment.',
      'Translated visual designs into reusable React/Next.js components, integrating responsive layouts and interaction details.',
      'Collaborated with the client to refine UI/UX based on feedback, ensuring brand consistency and accessibility.',
    ],
    stack: 'Next.js · Figma · Responsive Design · Deployment',
    hasGithub: false,
    hasLive: true,
    liveUrl: 'https://www.eurosplendore.it/',
  },
  {
    title: 'B&B iMori Website',
    subtitle: 'Hospitality website for a bed & breakfast',
    descriptions: [
      'Hospitality website developed from Figma prototype to production using semantic HTML and CSS.',
      'Designed and implemented a fully responsive layout, translating visual concepts into clean, maintainable code.',
      'Managed the entire process from UI design to deployment, ensuring cross-browser compatibility and performance optimization.',
    ],
    stack: 'HTML · CSS · Responsive Design · Deployment',
    hasGithub: false,
    hasLive: true,
    liveUrl: 'https://www.bb-imori.it/',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />

      <main className="pt-24 pb-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary font-body mb-10">
          <Link href="/" className="hover:text-text-primary transition flex items-center gap-1">
            <Image src="/icons/arrow-left-logo.svg" alt="" width={12} height={12} />
            Home
          </Link>
          <span>/</span>
          <span className="text-accent font-medium">Projects</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold font-title">
            All <span className="text-accent">Projects</span>
          </h1>
          <p className="mt-3 text-lg text-text-secondary font-body max-w-2xl">
            A comprehensive list of software projects I&apos;ve delivered.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col rounded-[30px] squircle bg-card border border-gray-200 p-8"
            >
              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-title text-text-primary">
                  {project.title}
                </h3>
                <div className="flex gap-2 items-center shrink-0 mt-1">
                  {project.hasGithub && project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition">
                      <Image src="/icons/github.svg" alt="GitHub" width={16} height={16} className="w-4 h-4" />
                    </a>
                  )}
                  {project.hasLive && project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition">
                      <Image src="/icons/share.svg" alt="Live" width={16} height={16} className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Subtitle */}
              <p className="mt-1 text-sm text-text-secondary font-body">
                {project.subtitle}
              </p>

              {/* Descriptions */}
              <div className="mt-5 flex flex-col gap-3">
                {project.descriptions.map((desc, i) => (
                  <p key={i} className="text-sm text-text-secondary leading-relaxed font-body">
                    {desc}
                  </p>
                ))}
              </div>

              {/* Stack */}
              <p className="mt-auto pt-6 text-sm text-accent font-body">
                {project.stack}
              </p>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  )
}
