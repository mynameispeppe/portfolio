'use client';

import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';

type Experience = {
  date: string;
  role: string;
  company: string;
  about: string;
  stack: string;
};

const experiences: Experience[] = [
  {
    date: '2022 - Present',
    role: 'Angular Consultant',
    company: 'INDRA ITALIA',
    about:
      'Contributed to the frontend design and development of an Angular-based GIS platform to manage and map electrical networks across multiple countries.\n\nFocused on scalable architecture, reactive state management and performance optimization within an Agile environment.',
    stack: 'Angular · TypeScript · NgRx · RxJS · Angular Material · Figma · Scrum · Kanban',
  },
    {
        date: '2021 - 2022',
        role: 'Angular Consultant',
        company: 'HERZUM SOFTWARE',
        about:
          'Led the complete UX/UI redesign of of an enterprise management platform, modernizing the interface and restructuring the frontend architecture.\n\nRefactored core modules to improve maintainability, scalability and overall code quality within an Agile Scrum environment.',
        stack: 'Angular · TypeScript · NgRx · RxJS · Angular Material · Figma · Scrum',
    },
    {
        date: '2020 - 2021',
        role: 'Frontend Developer',
        company: 'NET SERVICE',
        about:
          'Developed and maintained a back-office system supporting data management across multiple mobile applications, enabling administrators to manage user accounts, roles and permissions.\n\nContributed to frontend architecture and state management, ensuring consistency and scalability.',
        stack: 'Angular · TypeScript · NgRx · RxJS · Angular Material · Waterfall',
    },
    {
        date: '2019 - 2020',
        role: 'Frontend Developer',
        company: 'SMARTOURISM',
        about:
          'Contributed to the frontend development of a web application for the tourism industry, implementing interactive UI components and integrating REST APIs.\n\nWorked within a Waterfall process, focusing on modular Angular components and responsive layouts.',
        stack: 'Angular · TypeScript · RxJS · Angular Material · Waterfall',
    }
];

const cardVariants = {
  hidden: (x: number) => ({ opacity: 0, x }),
  visible: { opacity: 1, x: 0 },
};

export function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="experiences"
      className="relative  bg-background py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20"
    >
      {/* Title */}
      <motion.div
        className="mb-16 text-left lg:text-center"
        initial={{ opacity: 0, x: isMobile ? -40 : 0, y: isMobile ? 0 : -40 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-title text-text-primary">
          Professional <span className="text-accent">Experiences</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-text-secondary font-body">
          A timeline of my professional work experience.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 w-px bg-card lg:-translate-x-1/2" />

        {experiences.map((exp, i) => {
          const isEven = i % 2 === 0;
          const xDir = isMobile ? 60 : isEven ? -60 : 60;

          return (
            <div key={i} className="relative flex items-start mb-10 lg:mb-14">

              {/* Dot */}
              <motion.div
                className="absolute left-3 lg:left-1/2 top-6 w-3 h-3 rounded-full bg-accent -translate-x-1/2 z-10 ring-4 ring-background"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />

              {/* Card */}
              <motion.div
                custom={xDir}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={[
                  'ml-10 w-full lg:ml-0 lg:w-[calc(50%-2.5rem)]',
                  isEven ? 'lg:mr-auto lg:pr-6' : 'lg:ml-auto lg:pl-6',
                ].join(' ')}
              >
                <div className="bg-card rounded-[30px] squircle border border-gray-200 p-6 sm:p-8 flex flex-col">
                  <p className="text-xs sm:text-sm text-text-secondary/60 font-title">
                    {exp.date}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-title text-text-primary mt-2">
                    {exp.role}
                  </h3>
                  <p className="text-accent text-xs sm:text-sm mt-1 font-body font-medium">
                    {exp.company}
                  </p>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mt-4 whitespace-pre-line font-body">
                    {exp.about}
                  </p>
                  <p className="text-accent/70 text-xs sm:text-sm mt-4 font-body">
                    {exp.stack}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
