'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Check, Satellite, Bluetooth, ShieldCheck, Clock } from 'lucide-react'

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

export default function ShopContent() {
  const t = useTranslations('shopPage')
  const [form, setForm] = useState<BetaForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const specs = t.raw('specs') as string[][]
  const benefits = t.raw('benefits') as string[]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const required: Array<keyof BetaForm> = ['name', 'email', 'vehicle_type', 'vehicle_model', 'circuits', 'has_timer']
    for (const key of required) {
      if (!form[key].trim()) {
        const fieldLabels = t.raw('fieldLabels') as Record<string, string>
        setError(t('form.requiredError', { field: fieldLabels[key] }))
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
        throw new Error(data.error ?? t('form.genericError'))
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.genericError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-pit-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-5 pt-32 pb-20">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
            <span className="text-amber text-xs font-display font-bold uppercase tracking-widest">
              {t('badge')}
            </span>
          </div>
          <h1
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            {t('title1')}
            <br />
            <span className="text-amber">{t('titleHighlight')}</span>
          </h1>
          <p className="text-data/70 text-sm mt-3 max-w-lg leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — product info */}
          <div>
            <div className="bg-pit-900 border border-pit-600 h-64 mb-6 relative overflow-hidden">
              <Image
                src="/device.png"
                alt="LapCoach One device"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display font-black text-5xl text-amber">€59</span>
              <span className="text-data text-sm">{t('priceLabel')}</span>
            </div>
            <p className="text-xs text-pit-400 mb-6 font-display uppercase tracking-wider">
              {t('availabilityLabel')}
            </p>

            <div className="bg-pit-800 border border-pit-600 p-5 mb-6">
              <p className="section-label mb-3">{t('benefitsTitle')}</p>
              <ul className="space-y-2.5">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-data">
                    <Check size={14} className="text-lap shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <p className="section-label mb-3">{t('specsTitle')}</p>
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

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, text: t('badges.response') },
                { icon: ShieldCheck, text: t('badges.warranty') },
                { icon: Satellite, text: t('badges.gps') },
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
                <div className="py-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-lap/10 border border-lap/30 flex items-center justify-center shrink-0">
                      <Check size={18} className="text-lap" />
                    </div>
                    <h2 className="font-display font-black text-xl text-white uppercase">
                      {t('success.title')}
                    </h2>
                  </div>
                  <p className="text-data text-sm leading-relaxed mb-4">
                    {t('success.body')}{' '}
                    <span className="text-white font-medium">{form.email}</span>.
                  </p>
                  <div className="bg-pit-700 border border-pit-600 p-4">
                    <p className="text-xs text-data/70 leading-relaxed">
                      {t('success.appNote')}
                    </p>
                    <a href="#download" className="btn-amber inline-flex mt-4 text-xs">
                      {t('success.appCta')}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-black text-xl text-white uppercase mb-1">
                    {t('form.title')}
                  </h2>
                  <p className="text-data text-xs mb-6">
                    {t('form.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">

                    <FormField
                      label={t('form.name')}
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('form.namePlaceholder')}
                      required
                    />

                    <FormField
                      label={t('form.email')}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('form.emailPlaceholder')}
                      required
                    />

                    <SelectField
                      label={t('form.vehicleType')}
                      name="vehicle_type"
                      value={form.vehicle_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>{t('form.vehicleTypePlaceholder')}</option>
                      <option value="auto">{t('form.vehicleTypeCar')}</option>
                      <option value="moto">{t('form.vehicleTypeMoto')}</option>
                      <option value="entrambi">{t('form.vehicleTypeBoth')}</option>
                    </SelectField>

                    <FormField
                      label={t('form.vehicleModel')}
                      name="vehicle_model"
                      type="text"
                      value={form.vehicle_model}
                      onChange={handleChange}
                      placeholder={t('form.vehicleModelPlaceholder')}
                      required
                    />

                    <FormField
                      label={t('form.circuits')}
                      name="circuits"
                      type="text"
                      value={form.circuits}
                      onChange={handleChange}
                      placeholder={t('form.circuitsPlaceholder')}
                      required
                    />

                    <SelectField
                      label={t('form.hasTimer')}
                      name="has_timer"
                      value={form.has_timer}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>{t('form.vehicleTypePlaceholder')}</option>
                      <option value="no">{t('form.hasTimerNo')}</option>
                      <option value="app">{t('form.hasTimerApp')}</option>
                      <option value="device">{t('form.hasTimerDevice')}</option>
                    </SelectField>

                    <FormField
                      label={t('form.howFound')}
                      name="how_found"
                      type="text"
                      value={form.how_found}
                      onChange={handleChange}
                      placeholder={t('form.howFoundPlaceholder')}
                      required={false}
                    />

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
                      {loading ? t('form.submitting') : t('form.submit')}
                    </button>

                    <p className="text-center text-xs text-pit-400 leading-relaxed">
                      {t('form.disclaimer')}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function FormField({
  label, name, type, value, onChange, placeholder, required = true,
}: {
  label: string; name: string; type: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
        {label}{required && <span className="text-amber ml-1">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-pit-700 border border-pit-500 text-white text-sm px-3 py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-pit-400"
      />
    </div>
  )
}

function SelectField({
  label, name, value, onChange, required = true, children,
}: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-data mb-1.5">
        {label}{required && <span className="text-amber ml-1">*</span>}
      </label>
      <select
        name={name} value={value} onChange={onChange}
        className="w-full bg-pit-700 border border-pit-500 text-white text-sm px-3 py-3 focus:outline-none focus:border-amber transition-colors appearance-none"
      >
        {children}
      </select>
    </div>
  )
}
