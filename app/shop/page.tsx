'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check, Lock, Truck, ShieldCheck } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

const specs = [
  ['GPS', 'u-blox M10 · 20Hz · L1 C/A'],
  ['Connettività', 'Bluetooth Low Energy'],
  ['Ricarica', 'USB-C · carica completa 2h'],
  ['Peso', '62g con staffa'],
  ['Montaggio', 'Morsetto universale Ø22-32mm'],
  ['App', 'iOS 15+ · Android 10+ · gratuita'],
  ['Garanzia', '12 mesi · supporto incluso'],
]

type FormData = {
  name: string
  email: string
  address: string
  city: string
  postal: string
  country: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  country: 'IT',
}

export default function ShopPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        setError(`Il campo "${fieldLabel(key as keyof FormData)}" è obbligatorio.`)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Errore durante il pagamento.')
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-pit-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-5 pt-32 pb-20">
          {/* Header */}
          <div className="mb-12">
            <p className="section-label mb-3">Acquista</p>
            <h1
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              LapCoach One
            </h1>
            <p className="text-data/70 text-sm mt-2">Device GPS 20Hz · App gratuita inclusa</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left — product info */}
            <div>
              {/* Device visual */}
              <div className="bg-pit-800 border border-pit-600 h-64 flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1e2b1e 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <DeviceSVGLarge />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-black text-5xl text-amber">€69</span>
                <span className="text-data text-sm">IVA inclusa · spedizione gratuita</span>
              </div>

              {/* Spec table */}
              <div className="mb-6">
                <p className="section-label mb-3">Specifiche tecniche</p>
                <div>
                  {specs.map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="text-pit-400 text-xs font-display uppercase tracking-wider w-32 shrink-0">
                        {key}
                      </span>
                      <span className="text-data text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, text: 'Spedizione gratuita' },
                  { icon: ShieldCheck, text: 'Garanzia 12 mesi' },
                  { icon: Lock, text: 'Pagamento sicuro' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 p-3 border border-pit-600 text-center">
                    <Icon size={16} className="text-lap" />
                    <span className="text-[10px] text-data uppercase tracking-wider font-display leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — order form */}
            <div className="border border-pit-500 bg-pit-800">
              <div className="h-1 bg-amber w-full" />
              <div className="p-6 lg:p-8">
                <h2 className="font-display font-black text-xl text-white uppercase mb-1">
                  Ordina ora
                </h2>
                <p className="text-data text-xs mb-6">
                  Inserisci i tuoi dati e procedi al pagamento sicuro via Stripe
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Nome completo"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Mario Rossi"
                      colSpan="col-span-2"
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="mario@example.com"
                      colSpan="col-span-2"
                    />
                    <FormField
                      label="Indirizzo"
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Via Roma 42"
                      colSpan="col-span-2"
                    />
                    <FormField
                      label="Città"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Milano"
                    />
                    <FormField
                      label="CAP"
                      name="postal"
                      type="text"
                      value={form.postal}
                      onChange={handleChange}
                      placeholder="20100"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
                      Paese
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full bg-pit-700 border border-pit-500 text-white text-sm px-3 py-3 focus:outline-none focus:border-amber transition-colors appearance-none"
                    >
                      <option value="IT">Italia</option>
                      <option value="DE">Germania</option>
                      <option value="FR">Francia</option>
                      <option value="ES">Spagna</option>
                      <option value="CH">Svizzera</option>
                      <option value="AT">Austria</option>
                      <option value="BE">Belgio</option>
                      <option value="NL">Paesi Bassi</option>
                      <option value="PT">Portogallo</option>
                      <option value="GB">Regno Unito</option>
                    </select>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-950/60 border border-red-800 px-4 py-3 text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Order summary */}
                  <div className="bg-pit-700 p-4 border border-pit-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-data">LapCoach One Device</span>
                      <span className="text-sm text-white font-display font-bold">€69,00</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-data">Spedizione</span>
                      <span className="text-sm text-lap font-display font-bold">Gratuita</span>
                    </div>
                    <div className="hr-pit my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-display font-bold text-white uppercase">Totale</span>
                      <span className="text-xl font-display font-black text-amber">€69,00</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-amber w-full text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    {loading ? 'Reindirizzamento...' : 'Procedi al pagamento'}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-pit-400">
                    <Check size={12} className="text-lap" />
                    <span>Pagamento sicuro via Stripe · Dati crittografati</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  colSpan,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  colSpan?: string
}) {
  return (
    <div className={colSpan}>
      <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-pit-700 border border-pit-500 text-white text-sm px-3 py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-pit-400"
      />
    </div>
  )
}

function fieldLabel(key: keyof FormData): string {
  const labels: Record<keyof FormData, string> = {
    name: 'Nome completo',
    email: 'Email',
    address: 'Indirizzo',
    city: 'Città',
    postal: 'CAP',
    country: 'Paese',
  }
  return labels[key]
}

function DeviceSVGLarge() {
  return (
    <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-label="LapCoach device">
      <rect x="40" y="25" width="160" height="100" rx="14" fill="#1e2b1e" stroke="#3d5a3d" strokeWidth="1.5"/>
      <rect x="56" y="38" width="128" height="72" rx="6" fill="#080d08" stroke="#2a3d2a" strokeWidth="1"/>
      <text x="120" y="78" textAnchor="middle" fontFamily="monospace" fontSize="22" fontWeight="900" fill="#4ade80">
        1:23.456
      </text>
      <text x="120" y="96" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#7aae8a" letterSpacing="2">
        LAP 3 · BEST LAP
      </text>
      <circle cx="174" cy="44" r="4" fill="#4ade80" opacity="0.9"/>
      <circle cx="28" cy="75" r="8" fill="none" stroke="#2a3d2a" strokeWidth="1.5"/>
      <circle cx="212" cy="75" r="8" fill="none" stroke="#2a3d2a" strokeWidth="1.5"/>
      <rect x="108" y="128" width="24" height="7" rx="2" fill="#1e2b1e" stroke="#2a3d2a" strokeWidth="1"/>
    </svg>
  )
}
