import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['en', 'it']
const DEFAULT_LOCALE = 'it'

function getLocale(req: NextRequest): string {
  const cookie = req.cookies.get('locale')?.value
  if (cookie && LOCALES.includes(cookie)) return cookie

  const accept = req.headers.get('accept-language') ?? ''
  const preferred = accept.split(',')[0]?.split('-')[0]?.toLowerCase()
  if (preferred && LOCALES.includes(preferred)) return preferred

  return DEFAULT_LOCALE
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const locale = getLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|fonts).*)'],
}
