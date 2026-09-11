import type { Dict } from './types'

const dictionaries: Record<string, () => Promise<Dict>> = {
  en: () => import('../locales/en.json').then((m) => m.default as Dict),
  it: () => import('../locales/it.json').then((m) => m.default as Dict),
}

export async function getDictionary(lang: string): Promise<Dict> {
  const loader = dictionaries[lang] ?? dictionaries.en
  return loader()
}
