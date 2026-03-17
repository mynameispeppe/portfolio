"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skills } from "@/app/components/skills";

export function Hero() {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="hero"
      className="flex flex-col min-h-screen bg-background text-background px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-20 pb-6"
    >
      <div className="relative flex-1 rounded-[30px] squircle overflow-hidden flex items-center">
        <Image
          src="/images/hero.jpg"
          fill
          priority
          alt="Hero Background"
          className="object-cover object-center"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 sm:px-12 lg:px-16"
        >
          <div className="max-w-3xl">
            <motion.h1
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold font-title text-text-primary"
            >
              Hello<span className="text-accent">.</span>
            </motion.h1>

            <motion.h1
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="mt-2 text-3xl sm:text-4xl md:text-5xl font-title text-text-primary"
            >
              I&apos;m <span className="text-accent">Angular</span> web developer
            </motion.h1>

            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-body"
            >
              I build scalable and maintainable Angular applications, collaborating with product and engineering teams to deliver reliable digital solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link href="#projects" className="btn-primary font-body">
                View Projects
              </Link>

              <Link href="/cv.pdf" className="btn-secondary font-body">
                Download CV
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
      <div className="mt-4">
        <Skills />
      </div>
    </section>
  );
}