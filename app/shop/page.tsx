'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check, Satellite, Bluetooth, ShieldCheck, Clock } from 'lucide-react'

const specs = [
  ['GPS', 'u-blox M10 · 20Hz · L1 C/A'],
  ['Connettività', 'Bluetooth Low Energy'],
  ['Ricarica', 'USB-C · carica completa 2h'],
  ['Peso', '62g con staffa'],
  ['Montaggio', 'Velcro / fascette — nessun cablaggio'],
  ['App', 'iOS 15+ · Android 10+ · gratuita'],
  ['Garanzia', '12 mesi · supporto incluso'],
]

type BetaForm = {
  name: string
  email: string
  vehicle_type: string
  vehicle_model: string
  circuits: string
  has_timer: string
  how_found: string
}

const initialForm: BetaForm = {
  name: '',
  email: '',
  vehicle_type: '',
  vehicle_model: '',
  circuits: '',
  has_timer: '',
  how_found: '',
}

export default function BetaAccessPage() {
  const [form, setForm] = useState<BetaForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const required: Array<keyof BetaForm> = ['name', 'email', 'vehicle_type', 'vehicle_model', 'circuits', 'has_timer']
    for (const key of required) {
      if (!form[key].trim()) {
        setError(`Il campo "${fieldLabel(key)}" è obbligatorio.`)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/beta-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Errore nell\'invio.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nell\'invio. Riprova o scrivi a support@lapcoach.racing.')
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
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
              <span className="text-amber text-xs font-display font-bold uppercase tracking-widest">
                Beta privata · posti limitati
              </span>
            </div>
            <h1
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Richiedi accesso
              <br />
              <span className="text-amber">alla beta</span>
            </h1>
            <p className="text-data/70 text-sm mt-3 max-w-lg leading-relaxed">
              Stiamo selezionando i primi tester tra gli appassionati di track day.
              Compila il form — ti contatteremo entro 48 ore.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Left — product info */}
            <div>
              {/* Device photo */}
              <div className="bg-pit-900 border border-pit-600 h-64 mb-6 relative overflow-hidden">
                <Image
                  src="/device.png"
                  alt="LapCoach One device"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Price + status */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-black text-5xl text-amber">€59</span>
                <span className="text-data text-sm">IVA inclusa · spedizione gratuita</span>
              </div>
              <p className="text-xs text-pit-400 mb-6 font-display uppercase tracking-wider">
                Disponibile su invito · Beta tester: prezzo speciale
              </p>

              {/* What beta testers get */}
              <div className="bg-pit-800 border border-pit-600 p-5 mb-6">
                <p className="section-label mb-3">Cosa ottieni come beta tester</p>
                <ul className="space-y-2.5">
                  {[
                    'Device LapCoach One a prezzo riservato',
                    'Accesso prioritario alle nuove funzionalità',
                    'Canale diretto con il team di sviluppo',
                    'Il tuo feedback plasma il prodotto finale',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-data">
                      <Check size={14} className="text-lap shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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

              {/* Badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, text: 'Risposta 48h' },
                  { icon: ShieldCheck, text: 'Garanzia 12 mesi' },
                  { icon: Satellite, text: 'GPS 20Hz' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 p-3 border border-pit-600 text-center">
                    <Icon size={16} className="text-lap" />
                    <span className="text-[10px] text-data uppercase tracking-wider font-display leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — beta request form */}
            <div className="border border-pit-500 bg-pit-800">
              <div className="h-1 bg-amber w-full" />
              <div className="p-6 lg:p-8">

                {submitted ? (
                  /* ── Success state ── */
                  <div className="py-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-lap/10 border border-lap/30 flex items-center justify-center shrink-0">
                        <Check size={18} className="text-lap" />
                      </div>
                      <h2 className="font-display font-black text-xl text-white uppercase">
                        Richiesta ricevuta
                      </h2>
                    </div>
                    <p className="text-data text-sm leading-relaxed mb-4">
                      Ti contatteremo entro 48 ore all&apos;indirizzo{' '}
                      <span className="text-white font-medium">{form.email}</span>.
                    </p>
                    <div className="bg-pit-700 border border-pit-600 p-4">
                      <p className="text-xs text-data/70 leading-relaxed">
                        Nel frattempo, scarica l&apos;app gratuita e inizia a usarla con il GPS del telefono —
                        funziona subito, senza device.
                      </p>
                      <a href="#download" className="btn-amber inline-flex mt-4 text-xs">
                        Scarica l&apos;app — Gratis
                      </a>
                    </div>
                  </div>
                ) : (
                  /* ── Form ── */
                  <>
                    <h2 className="font-display font-black text-xl text-white uppercase mb-1">
                      Candidatura beta
                    </h2>
                    <p className="text-data text-xs mb-6">
                      Valutiamo ogni candidatura in base al profilo d&apos;utilizzo. Nessun acquisto richiesto ora.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Name */}
                      <FormField
                        label="Nome e cognome"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Mario Rossi"
                        required
                      />

                      {/* Email */}
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="mario@example.com"
                        required
                      />

                      {/* Vehicle type */}
                      <SelectField
                        label="Veicolo che usi in pista"
                        name="vehicle_type"
                        value={form.vehicle_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Seleziona...</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                        <option value="entrambi">Entrambi</option>
                      </SelectField>

                      {/* Vehicle model */}
                      <FormField
                        label="Modello del veicolo"
                        name="vehicle_model"
                        type="text"
                        value={form.vehicle_model}
                        onChange={handleChange}
                        placeholder="es. Porsche 911, BMW M3, Yamaha R1"
                        required
                      />

                      {/* Circuits */}
                      <FormField
                        label="Circuiti che frequenti"
                        name="circuits"
                        type="text"
                        value={form.circuits}
                        onChange={handleChange}
                        placeholder="es. Monza, Mugello, Misano"
                        required
                      />

                      {/* Has timer */}
                      <SelectField
                        label="Hai già un lap timer?"
                        name="has_timer"
                        value={form.has_timer}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Seleziona...</option>
                        <option value="no">No, mai usato</option>
                        <option value="app">Sì, app sul telefono</option>
                        <option value="device">Sì, device dedicato — quale?</option>
                      </SelectField>

                      {/* How found — optional */}
                      <FormField
                        label="Come hai scoperto LapCoach?"
                        name="how_found"
                        type="text"
                        value={form.how_found}
                        onChange={handleChange}
                        placeholder="Opzionale"
                        required={false}
                      />

                      {/* Error */}
                      {error && (
                        <div className="bg-red-950/60 border border-red-800 px-4 py-3 text-red-300 text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-amber w-full text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? 'Invio in corso...' : 'Invia richiesta'}
                      </button>

                      <p className="text-center text-xs text-pit-400 leading-relaxed">
                        Nessun obbligo di acquisto · Ti risponderemo entro 48 ore
                      </p>
                    </form>
                  </>
                )}
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
  required = true,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
        {label}{required && <span className="text-amber ml-1">*</span>}
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

function SelectField({
  label,
  name,
  value,
  onChange,
  required = true,
  children,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
        {label}{required && <span className="text-amber ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-pit-700 border border-pit-500 text-white text-sm px-3 py-3 focus:outline-none focus:border-amber transition-colors appearance-none"
      >
        {children}
      </select>
    </div>
  )
}

function fieldLabel(key: keyof BetaForm): string {
  const labels: Record<keyof BetaForm, string> = {
    name: 'Nome e cognome',
    email: 'Email',
    vehicle_type: 'Veicolo che usi in pista',
    vehicle_model: 'Modello del veicolo',
    circuits: 'Circuiti che frequenti',
    has_timer: 'Hai già un lap timer?',
    how_found: 'Come hai scoperto LapCoach?',
  }
  return labels[key]
}
