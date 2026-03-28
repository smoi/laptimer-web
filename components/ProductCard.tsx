import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

const specs = [
  'GPS 20Hz u-blox M10',
  'Connessione Bluetooth',
  'App iOS & Android gratuita',
  'Analisi AI post-sessione',
  'Rilevamento automatico circuito',
]

// Beta framing — swap href and label back to "Acquista ora" + /shop when going live

export default function ProductCard() {
  return (
    <div className="relative border border-pit-500 bg-pit-800 max-w-md w-full overflow-hidden">
      {/* Amber top accent */}
      <div className="h-1 bg-amber w-full" />

      {/* Device photo */}
      <div className="relative h-64 overflow-hidden bg-pit-900 border-b border-pit-600">
        <Image
          src="/device.png"
          alt="LapCoach One device"
          fill
          className="object-cover object-center"
          sizes="448px"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="section-label mb-1">Hardware Device</p>
            <h3 className="font-display font-black text-2xl text-white uppercase">
              LapCoach One
            </h3>
          </div>
          <div className="text-right">
            <p className="font-display font-black text-4xl text-amber">€89</p>
            <p className="text-data text-xs">Disponibile su invito</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {specs.map((s) => (
            <li key={s} className="flex items-center gap-2.5 text-sm text-data">
              <Check size={14} className="text-lap shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <Link href="/shop" className="btn-amber block text-center w-full text-sm">
          Richiedi accesso beta
        </Link>

        <p className="text-center text-xs text-pit-400 mt-3">
          Il device è in beta privata. L&apos;app è gratuita e funziona subito con il GPS del telefono.
        </p>
      </div>
    </div>
  )
}
