'use client'

import { useEffect } from 'react'

// Carica gli script iubenda una volta sola per sessione.
// useEffect con [] non ri-esegue mai ad ogni navigazione client-side Next.js,
// a differenza di next/script strategy="afterInteractive" nel layout.
export default function IubendaLoader() {
  useEffect(() => {
    // Guard: se gli script sono già nel DOM non fare nulla
    if (document.querySelector('script[src*="embeds.iubenda.com"]')) return

    // Script principale: cookie banner + preference widget
    const banner = document.createElement('script')
    banner.src = 'https://embeds.iubenda.com/widgets/07ce5aa9-11f5-4d4c-8075-184fd806e198.js'
    banner.async = true
    document.head.appendChild(banner)

    // Script badge: stila i link Privacy Policy / Cookie Policy nel footer
    const badges = document.createElement('script')
    badges.src = 'https://cdn.iubenda.com/iubenda.js'
    badges.async = true
    document.body.appendChild(badges)
  }, []) // [] = mai ri-eseguito su navigazione

  return null
}
