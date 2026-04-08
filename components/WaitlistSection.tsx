'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function WaitlistSection() {
  const t = useTranslations('home.waitlist')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // mostra successo comunque — l'email non deve bloccare l'UX
    }
    setSubmitted(true)
  }

  return (
    <section className="py-20 bg-pit-800 border-t border-pit-600">
      <div className="max-w-6xl mx-auto px-5 flex justify-center">
        <div className="w-full max-w-[480px]">
          <p className="section-label mb-3 text-center">{t('label')}</p>
          <h2
            className="font-display font-black uppercase text-white text-center mb-2"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
          >
            {t('title')}
          </h2>
          <p className="text-data/70 text-sm text-center mb-6 mt-2">
            {t('description')}
          </p>

          {submitted ? (
            <div className="border border-lap/40 bg-lap/5 px-6 py-4 text-center">
              <p className="text-lap font-display font-bold text-sm uppercase tracking-wider">
                {t('successTitle')}
              </p>
              <p className="text-data/70 text-xs mt-1">
                {t('successBody')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                className="flex-1 bg-pit-700 border border-pit-500 text-white text-sm px-4 py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-pit-400"
              />
              <button type="submit" className="btn-amber shrink-0 text-sm">
                {t('button')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
