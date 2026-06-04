'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from "next/link";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string;
  hasGithub: boolean;
  githubUrl?: string;
  hasLive: boolean;
  liveUrl?: string;
  hasPreview?: boolean;
  previewSlug?: string;
};
const projects: Project[] = [
  {
    title: "Vitae",
    subtitle: "Personal fitness & nutrition tracker",
    description: "Designed and built a full-stack web app for tracking weekly workout sessions and daily meal plans — handling UI design, UX flows, frontend architecture, and Supabase integration from scratch to production.\n\nTest account: test@vitae.app · vitae1234",
    stack: "Next.js 14 · TypeScript · Supabase",
    hasGithub: false,
    hasLive: true,
    liveUrl: "https://vitae-ochre.vercel.app/",
    hasPreview: true,
    previewSlug: "vitae",
  },
  {
    title: "GIS Viewer Platform",
    subtitle: "Angular-based cartographic panel for electrical grid management",
    description: "Contributed to the development of a GIS viewer used to visualize and plan electrical networks across multiple countries within an Agile team.",
    stack: "Angular 15 · NgRx · Material · Karma · TSLint",
    hasGithub: false,
    hasLive: false
  },
  {
    title: "Project Management Panel",
    subtitle: "Angular-based platform for project lifecycle management",
    description: "Led the frontend redevelopment within a small Agile team, redesigning the UI from Figma to production using standalone components and NgRx.",
    stack: "Angular 15 · Standalone · NgRx · Material · Karma · TSLint",
    hasGithub: false,
    hasLive: false
  },
  {
    title: "Angular Todo App",
    subtitle: "Task management app built with Angular 20",
    description: "Developed a responsive todo list application featuring Auth0 authentication and a mock REST API using json-server.",
    stack: "Angular 20 · Auth0 · NgRx · Tailwind CSS · json-server",
    hasGithub: true,
    githubUrl: "https://github.com/mynameispeppe/Todo",
    hasLive: false
  }
];

export function Projects() {
  const ref = useRef(null);
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const linkVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <div id="projects"   className="relative  bg-background py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mx-auto text-text-primary">
        <div ref={ref} className="flex items-center justify-between">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl  lg:text-5xl font-bold text-text-primary font-title">
            Selected <span className="text-accent">Projects</span>
          </motion.h1>

          <motion.div
            variants={linkVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex"
          >
            <Link href="/projects" className="text-accent/80 hover:text-accent transition font-medium text-sm sm:text-base">
              <p>View all projects</p>
            </Link>
          </motion.div>
        </div>

        <motion.p
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 font-medium text-xl text-text-secondary max-w-3xl font-body">
          Angular focused applications and frontend systems I've contributed to.
        </motion.p>

        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 lg:hidden"
        >
          <Link href="/projects" className="text-accent/80 hover:text-accent transition  font-medium text-sm sm:text-base">
            <p>View all projects</p>
          </Link>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col rounded-[30px] squircle bg-card px-8 py-4 min-h-70 border border-gray-200">
              <div className="flex items-center justify-between mb-1 gap-3">
                <p className="text-xl sm:text-2xl font-title text-text-primary mt-2 sm:mt-3">
                  {project.title}
                </p>
                <div className="flex gap-2 sm:gap-3 items-center shrink-0">
                  {project.hasGithub && project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition cursor-pointer"
                    >
                      <Image
                        src="/icons/github.svg"
                        alt="GitHub repository"
                        width={16}
                        height={16}
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                      />
                    </a>
                  )}

                  {project.hasLive && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition cursor-pointer"
                    >
                      <Image
                        src="/icons/share.svg"
                        alt="Live project"
                        width={16}
                        height={16}
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                      />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-text-secondary text-sm sm:text-base mt-1 font-body">
                {project.subtitle}
              </p>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mt-4 sm:mt-6 whitespace-pre-line font-body">
                {project.description}
              </p>

              {/* Stack + Preview */}
              <div className="mt-auto pt-5 border-t border-gray-200 flex items-center justify-between gap-3">
                <p className="text-accent text-sm sm:text-base font-body">
                  {project.stack}
                </p>
                {project.hasPreview && project.previewSlug && (
                  <Link
                    href={`/projects/${project.previewSlug}`}
                    className="shrink-0 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition font-body"
                  >
                    Preview
                  </Link>
                )}
              </div>

            </div>
          ))}
        </motion.div>
      </div>
  );
}