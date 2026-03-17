"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const prefix = isHome ? "" : "/";
  const navLinks = [
    { href: `${prefix}#projects`, label: "Projects" },
    { href: `${prefix}#experiences`, label: "Experiences" },
    { href: `${prefix}#about`, label: "About me" },
    { href: `${prefix}#contacts`, label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-md" : ""
      }`}
    >
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mx-auto">
        <div className="flex items-center justify-between h-16 md:py-2 lg:py-2">

          <div className="flex items-center text-text-primary font-bold">
            <Image
              src="/icons/arrow-left-logo.svg"
              alt="arrow"
              width={16}
              height={16}
            />
            <h1 className="text-xl font-title">Giuseppe Milazzo</h1>
            <Image
              className="mt-1"
              src="/icons/arrow-right-logo.svg"
              alt="arrow"
              width={16}
              height={16}
            />
          </div>

          <div className="items-center space-x-8 hidden md:block font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  relative text-xl font-medium transition-colors duration-300 font-body
                  after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0
                  text-text-primary/70
                  after:bg-accent after:transition-all after:duration-300 hover:after:w-full
                  hover:text-text-primary
                "
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </motion.nav>
  );
}