'use client'

import { useDict } from '@/i18n/DictContext'

export function Footer() {
  const dict = useDict()
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="px-6 max-w-7xl mx-auto py-8 flex justify-center">
        <p className="font-body text-text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
          &copy; {currentYear} {dict.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
