import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-pit-950 border-t border-pit-600 mt-0">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-lap" />
              <span className="font-display font-black text-lg tracking-tight text-white uppercase">
                Lap<span className="text-amber">Coach</span>
              </span>
            </div>
            <p className="text-data text-sm leading-relaxed max-w-xs">
              Lap timer GPS per auto e moto da pista. App gratuita, device opzionale per GPS 20Hz professionale.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-4">Prodotto</p>
            <ul className="space-y-2">
              {[
                { href: '/app', label: "L'App" },
                { href: '/shop', label: 'Acquista il device' },
                { href: '/#funzionalita', label: 'Funzionalità' },
                { href: '/#come-funziona', label: 'Come funziona' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-data text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs at a glance */}
          <div>
            <p className="section-label mb-4">Specs</p>
            <ul className="space-y-1 text-sm text-data font-body">
              {[
                ['GPS', '20 Hz · u-blox M10'],
                ['Connettività', 'Bluetooth Low Energy'],
                ['Prezzo', '€89 — app gratuita'],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-2">
                  <span className="text-pit-400 w-24 shrink-0">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hr-pit mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pit-400">
          <p>© {new Date().getFullYear()} LapCoach. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-data transition-colors">Privacy</Link>
            <Link href="/termini" className="hover:text-data transition-colors">Termini</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
