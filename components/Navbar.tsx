'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/app', label: "L'App" },
  { href: '/shop', label: 'Beta Access' },
  { href: '/#come-funziona', label: 'Come funziona' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-lap animate-pulse-dot" />
          <span className="font-display font-black text-xl tracking-tight text-white uppercase">
            Lap<span className="text-amber">Coach</span>
          </span>
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

        {/* CTA */}
        <Link
          href="/shop"
          className="btn-amber text-xs"
        >
          Accesso beta
        </Link>
      </nav>
    </header>
  )
}
