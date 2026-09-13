export type Dict = {
  meta: {
    title: string
    description: string
    keywords: string[]
    og_title: string
    og_description: string
    twitter_title: string
    twitter_description: string
  }
  nav: {
    logo: string
    links: { projects: string; experience: string; contact: string }
    cta: string
  }
  mobile_nav: {
    home: string
    projects: string
    experience: string
    about: string
    contact: string
  }
  hero: {
    name: string
    typewriter: string[]
    caption: string
    cta_cv: string
    skills_aria: string
  }
  projects: {
    section_heading: string
    aria_carousel: string
    aria_prev: string
    aria_next: string
    aria_dots: string
    cta_view: string
    cta_wip: string
    cta_enterprise: string
    cta_read_more: string
    cta_close: string
    items: Array<{
      title: string
      subtitle: string
      description: string
      tags: string[]
    }>
  }
  about: {
    section_heading: string
    avatar_alt: string
    name: string
    birthday: string
    location: string
    aria_github: string
    aria_linkedin: string
    cta_cv: string
    cv_href: string
    bio: string[]
    interests: string[]
    experience: Array<{
      date: string
      role: string
      company: string
      about: string
      stack: string
    }>
  }
  contact: {
    heading_line1: string
    heading_line2: string
    image_alt: string
    cta_email: string
  }
  footer: {
    copyright: string
  }
}
