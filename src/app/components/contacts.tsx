'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

const email = 'giuseppemilazzo.92@outlook.it';

export function Contacts() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="contacts" className="w-full min-h-screen  flex flex-col bg-background px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12">
      <div className="relative flex-1 max-h-8/12  rounded-[30px] squircle overflow-hidden flex items-center justify-center">
        <Image
          src="/images/contact.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority={false}
        />

        {/* Glass container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12 sm:px-12 sm:py-16 rounded-3xl squircle text-center"
        >
          <motion.h2
            variants={variants}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-title text-text-primary"
          >
            Let&apos;s build something <span className="text-accent">solid.</span>
          </motion.h2>

          <motion.p
            variants={variants}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg sm:text-xl text-text-secondary font-body"
          >
            I&apos;m currently open to new opportunities and collaborations
          </motion.p>

          <motion.div
            variants={variants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`mailto:${email}`}
              className="btn-primary"
            >
              Start a conversation
            </a>
            <a
              href="https://www.linkedin.com/in/giuseppe-milazzo-/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Join me on Linkedin
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
