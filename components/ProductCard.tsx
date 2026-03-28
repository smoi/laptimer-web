import Link from 'next/link'
import { Check } from 'lucide-react'

const specs = [
  'GPS 20Hz u-blox M10',
  'Connessione Bluetooth',
  'App iOS & Android gratuita',
  'Analisi AI post-sessione',
  'Rilevamento automatico circuito',
]

export default function ProductCard() {
  return (
    <div className="relative border border-pit-500 bg-pit-800 max-w-md w-full overflow-hidden">
      {/* Amber top accent */}
      <div className="h-1 bg-amber w-full" />

      {/* Device visual */}
      <div className="bg-pit-700 h-52 flex items-center justify-center border-b border-pit-600">
        <DeviceSVG />
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
            <p className="text-data text-xs">IVA inclusa</p>
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
          Acquista ora
        </Link>

        <p className="text-center text-xs text-pit-400 mt-3">
          Spedizione gratuita in Italia · Pagamento sicuro
        </p>
      </div>
    </div>
  )
}

function DeviceSVG() {
  return (
    <svg width="160" height="100" viewBox="0 0 160 100" fill="none" aria-label="LapCoach device">
      {/* Main body */}
      <rect x="30" y="20" width="100" height="60" rx="10" fill="#1e2b1e" stroke="#3d5a3d" strokeWidth="1.5"/>
      {/* Screen */}
      <rect x="42" y="30" width="76" height="40" rx="4" fill="#080d08" stroke="#2a3d2a" strokeWidth="1"/>
      {/* Lap time on screen */}
      <text x="80" y="52" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="900" fill="#4ade80">
        1:23.456
      </text>
      <text x="80" y="62" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#7aae8a" letterSpacing="1">
        LAP 3 · BEST
      </text>
      {/* LED indicator */}
      <circle cx="110" cy="26" r="3" fill="#4ade80" opacity="0.9"/>
      {/* Mount holes */}
      <circle cx="20" cy="50" r="5" fill="none" stroke="#2a3d2a" strokeWidth="1.5"/>
      <circle cx="140" cy="50" r="5" fill="none" stroke="#2a3d2a" strokeWidth="1.5"/>
      {/* USB port */}
      <rect x="73" y="82" width="14" height="4" rx="1" fill="#1e2b1e" stroke="#2a3d2a" strokeWidth="1"/>
      {/* BLE antenna hint */}
      <path d="M 130 22 Q 140 18 145 24 Q 140 28 130 28" stroke="#4ade80" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  )
}
