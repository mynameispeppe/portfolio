import Navbar from '@/app/components/navbar'
import MobileNav from '@/app/components/mobileNav'
import { Hero } from '@/app/components/hero'
import { Projects } from '@/app/components/projects'
import { AboutExperience } from '@/app/components/about-experience'
import { Contacts } from '@/app/components/contacts'
import { Footer } from '@/app/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <Hero />
        <Projects />
      </main>
      <AboutExperience />
      <Contacts />
      <Footer />
    </>
  )
}
