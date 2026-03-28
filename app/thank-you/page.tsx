import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle2, ChevronRight } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pit-900 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-5 py-24">
          <div className="text-center max-w-lg">
            {/* Animated check */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-lap/10 animate-ping" style={{ animationDuration: '2s' }} />
                <CheckCircle2 size={80} className="text-lap relative z-10" strokeWidth={1.5} />
              </div>
            </div>

            <p className="section-label mb-4">Ordine confermato</p>
            <h1
              className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
            >
              Grazie per
              <br />
              il tuo ordine!
            </h1>
            <p className="text-data/80 text-base leading-relaxed mb-6">
              Il tuo LapCoach One è in lavorazione. Riceverai un&apos;email di conferma con i dettagli
              dell&apos;ordine e il tracking della spedizione.
            </p>

            {/* Order summary box */}
            <div className="bg-pit-800 border border-pit-600 p-6 mb-8 text-left">
              <p className="section-label mb-4">Riepilogo ordine</p>
              <div className="spec-row">
                <span className="text-data text-sm">Prodotto</span>
                <span className="text-white text-sm font-display font-bold">LapCoach One</span>
              </div>
              <div className="spec-row">
                <span className="text-data text-sm">Totale</span>
                <span className="text-amber text-sm font-display font-bold">€89,00</span>
              </div>
              <div className="spec-row">
                <span className="text-data text-sm">Spedizione</span>
                <span className="text-lap text-sm font-display font-bold">Gratuita · 3-5 giorni</span>
              </div>
              <div className="spec-row">
                <span className="text-data text-sm">App inclusa</span>
                <span className="text-white text-sm">iOS & Android — gratuita</span>
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-pit-800 border border-amber/30 p-5 mb-8 text-left">
              <p className="text-xs font-display uppercase tracking-widest text-amber mb-3">
                Prossimi passi
              </p>
              {[
                'Controlla la tua email per la conferma d\'ordine',
                'Scarica l\'app LapCoach (iOS o Android)',
                'Attendi il device — arriva in 3-5 giorni lavorativi',
                'Monta il device e inizia la tua prima sessione',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                  <span className="font-display font-black text-xs text-amber mt-0.5 w-4 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-data text-sm">{step}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-amber text-sm flex items-center justify-center gap-2">
                Torna alla home
                <ChevronRight size={14} />
              </Link>
              <Link href="/app" className="btn-outline text-sm flex items-center justify-center gap-2">
                Scarica l&apos;app
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
