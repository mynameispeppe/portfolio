"use client";
import Navbar from "@/app/components/navbar";
import {Hero} from "@/app/components/hero";
import {Projects} from "@/app/components/projects";
import {Skills} from "@/app/components/skills";
import {Experience} from "@/app/components/experience";
import {About} from "@/app/components/about";
import {Contacts} from "@/app/components/contacts";
import MobileNav from "@/app/components/mobileNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileNav />
        <main>
          <Hero />
          <Projects />
          <Experience/>
          <About />
          <Contacts/>
        </main>
    </>
  );
}
