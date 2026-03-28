'use client'

import { useState } from 'react'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: connect to Mailchimp / Resend
    // await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) })
    setSubmitted(true)
  }

  return (
    <section className="py-20 bg-pit-800 border-t border-pit-600">
      <div className="max-w-6xl mx-auto px-5 flex justify-center">
        <div className="w-full max-w-[480px]">
          <p className="section-label mb-3 text-center">Notifiche</p>
          <h2
            className="font-display font-black uppercase text-white text-center mb-2"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
          >
            Vuoi sapere quando
            <br />LapCoach è disponibile?
          </h2>
          <p className="text-data/70 text-sm text-center mb-6 mt-2">
            Lascia la tua email — ti avvisiamo al lancio. Zero spam.
          </p>

          {submitted ? (
            <div className="border border-lap/40 bg-lap/5 px-6 py-4 text-center">
              <p className="text-lap font-display font-bold text-sm uppercase tracking-wider">
                Perfetto — ti avvisiamo!
              </p>
              <p className="text-data/70 text-xs mt-1">
                Riceverai una email non appena LapCoach sarà disponibile.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la.tua@email.com"
                className="flex-1 bg-pit-700 border border-pit-500 text-white text-sm px-4 py-3 focus:outline-none focus:border-amber transition-colors placeholder:text-pit-400"
              />
              <button type="submit" className="btn-amber shrink-0 text-sm">
                Avvisami
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
