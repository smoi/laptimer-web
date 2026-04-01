'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('navbar')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/app' as const, label: t('app') },
    { href: '/shop' as const, label: t('betaAccess') },
    { href: '/#come-funziona' as const, label: t('howItWorks') },
  ]

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-pit-900/95 backdrop-blur-sm border-b border-pit-600'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="LapCoach"
            width={240}
            height={116}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-display font-semibold uppercase tracking-wider transition-colors duration-150 ${
                pathname === link.href
                  ? 'text-amber'
                  : 'text-data hover:text-white'
              }`}
              style={{ letterSpacing: '0.1em' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Locale switcher */}
          <div className="hidden md:flex items-center gap-1 text-xs font-display uppercase tracking-widest">
            <button
              onClick={() => switchLocale('it')}
              className={`px-1.5 py-0.5 transition-colors ${
                locale === 'it' ? 'text-amber' : 'text-pit-400 hover:text-data'
              }`}
            >
              IT
            </button>
            <span className="text-pit-600">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={`px-1.5 py-0.5 transition-colors ${
                locale === 'en' ? 'text-amber' : 'text-pit-400 hover:text-data'
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA */}
          <Link href="/shop" className="btn-amber text-xs">
            {t('cta')}
          </Link>
        </div>
      </nav>
    </header>
  )
}
