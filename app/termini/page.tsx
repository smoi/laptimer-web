import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Termini e Condizioni — LapCoach',
}

export default function TerminiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pit-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 pt-32 pb-20">
          <p className="section-label mb-4">Legale</p>
          <h1
            className="font-display font-black uppercase text-white leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            Termini e Condizioni
          </h1>
          <div className="border border-pit-600 bg-pit-800 p-8">
            <p className="text-data/80 text-sm leading-relaxed mb-4">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long' })}
            </p>
            <div className="hr-pit mb-6" />
            <p className="text-amber font-display font-bold text-sm uppercase tracking-wider mb-2">
              Pagina in aggiornamento
            </p>
            <p className="text-data/80 text-sm leading-relaxed">
              I termini e condizioni completi saranno disponibili a breve. Per qualsiasi domanda,
              contattaci a{' '}
              <a href="mailto:info@lapcoach.it" className="text-lap hover:underline">
                info@lapcoach.it
              </a>
              .
            </p>
          </div>
          <div className="mt-8">
            <Link href="/" className="btn-outline text-sm inline-flex items-center gap-2">
              ← Torna alla home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
