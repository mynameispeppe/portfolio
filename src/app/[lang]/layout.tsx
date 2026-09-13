import type { Metadata } from 'next'
import { getDictionary } from '@/i18n/getDictionary'
import { DictProvider } from '@/i18n/DictContext'

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: 'Giuseppe Milazzo' }],
    openGraph: {
      title: dict.meta.og_title,
      description: dict.meta.og_description,
      url: 'https://gmilazzo.vercel.app/',
      siteName: dict.meta.title,
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: dict.meta.twitter_title,
      description: dict.meta.twitter_description,
    },
  }
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

export default async function LangLayout({ params, children }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (
    <DictProvider dict={dict}>
      {children}
    </DictProvider>
  )
}
