'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export function About() {
  return (
    <section id="about" className="w-full min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-title text-text-primary">
          About <span className="text-accent">me</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-text-secondary font-body">
          I care about clarity before speed
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-xs sm:max-w-md lg:max-w-4xl xl:max-w-5xl sm:mt-16 lg:mt-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className={`
          absolute z-10 shadow-lg overflow-hidden squircle
          w-24 h-24 rounded-full -translate-x-1/2 left-1/2 top-0 -translate-y-1/2
          sm:w-40 sm:h-52 sm:rounded-[20px] sm:left-1/2 sm:-translate-x-1/2 sm:top-0 sm:-translate-y-1/2
          lg:w-60 lg:h-80 lg:rounded-3xl lg:left-0 lg:top-1/2 lg:-translate-x-1/3 lg:-translate-y-1/2
          xl:w-64 xl:h-88
        `}>
          <Image src="/images/about.webp" fill alt="Giuseppe Milazzo" className="object-cover object-top scale-150"/>
        </div>
        <div className="bg-card rounded-[30px] squircle border border-gray-200 pt-16 pb-8 px-8 sm:pt-32 sm:pb-10 sm:px-10 lg:pt-14 lg:pb-14 lg:pl-56 lg:pr-14 xl:pl-64 xl:pr-16 lg:min-h-90 xl:min-h-100 flex flex-col text-center sm:text-center lg:text-left">
          <h3 className="text-2xl lg:text-3xl font-bold font-title text-text-primary">
            Giuseppe Milazzo
          </h3>
          <div className="flex items-center justify-center lg:justify-start mt-2">
            <div className="flex items-center">
              <Image
                src="/icons/cake.svg"
                alt="GitHub repository"
                width={16}
                height={16}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              />
              <p className="text-sm text-text-secondary font-body ml-1">
                31/07/1992
              </p>
            </div>
            <div className="flex items-center ml-4">
              <Image
                src="/icons/location.svg"
                alt="GitHub repository"
                width={16}
                height={16}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              />
              <p className="text-sm text-text-secondary font-body ml-1">
                Pescara, Italy
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-text-secondary text-base sm:text-lg leading-relaxed font-body">
            <p>I care a lot about making things that look good and feel right for everyone, not just some users.</p>
            <p>I&apos;m always curious and love learning from the people and places around me.</p>
            <p>Gaming, traveling and sport keep me going the rest of the time.</p>
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
            {['Gaming', 'Traveling', 'Sport', 'Film', 'Inspiration'].map((interest) => (
              <span
                key={interest}
                className="rounded-full squircle bg-accent/15 text-accent text-sm font-medium font-body px-4 py-1.5"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr className="mt-6 border-text-primary/10" />

          {/* Quote */}
          <p className="mt-5 text-text-secondary text-base sm:text-lg leading-relaxed font-title">
            &ldquo;I always want to learn and push myself, not just in games but in real life. One day I want to build something millions of people will use.&rdquo;
          </p>
        </div>
      </motion.div>
    </section>
  );
}