import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PhoneMockup from '@/components/PhoneMockup'
import { Apple, Bluetooth, Brain, Gauge, MapPin, Smartphone, Timer, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Timer,
    title: 'Cronometro preciso',
    body: 'Tempi sul giro aggiornati in tempo reale a 20Hz. Risoluzione al millisecondo.',
  },
  {
    icon: TrendingUp,
    title: 'Best lap tracking',
    body: "L'app confronta ogni giro con il miglior tempo della sessione e dello storico.",
  },
  {
    icon: Gauge,
    title: 'Velocità & dati',
    body: 'Velocità istantanea, massima, media. Grafico velocità sul tracciato.',
  },
  {
    icon: Brain,
    title: 'AI Coach',
    body: 'Analisi post-sessione con identificazione automatica dei settori critici.',
  },
  {
    icon: Bluetooth,
    title: 'Sync con device BLE',
    body: 'Connessione automatica al LapCoach One via Bluetooth Low Energy 5.0.',
  },
  {
    icon: MapPin,
    title: 'Rilevamento circuito',
    body: 'Riconosce automaticamente il circuito al momento del lancio della sessione.',
  },
]

const screenshots = [
  { src: '/screenshots/screen-timing.png',    label: 'In pista' },
  { src: '/screenshots/screen-sessione.png',  label: 'Sessione' }, 
  { src: '/screenshots/screen-giro.png',      label: 'Dettaglio Giro' },   
  { src: '/screenshots/screen-sessioni.png',  label: 'Sessioni' },  
  { src: '/screenshots/screen-circuiti.png',  label: 'Circuiti' },
  { src: '/screenshots/screen-home.png',      label: 'Home' },
]

export default function AppPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section className="relative pt-32 pb-20 bg-pit-900 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #1e2b1e 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-amber/5 blur-[100px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-5">
            <div className="max-w-2xl">
              <p className="section-label mb-4">App iOS & Android</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                L&apos;app che
                <br />
                trasforma ogni
                <br />
                <span className="text-amber">giro</span>
              </h1>
              <p className="text-data/80 text-base leading-relaxed max-w-lg mb-10">
                Dati GPS in tempo reale, analisi AI post-sessione, cronometro al millisecondo.
                Funziona con il device LapCoach One via Bluetooth o in modalità standalone con il GPS del telefono.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <AppBadge store="apple" />
                <AppBadge store="google" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ FEATURES ══════════════════════ */}
        <section className="py-24 bg-pit-800">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-14">
              <p className="section-label mb-3">Cosa puoi fare</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                Funzionalità principali
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className={`p-7 border border-pit-600 ${i > 0 ? '-mt-px md:mt-0 md:-ml-px lg:-ml-0' : ''} ${
                      i % 3 !== 0 ? 'lg:-ml-px' : ''
                    } ${i >= 3 ? '-mt-px' : ''}`}
                  >
                    <div className="w-10 h-10 border border-lap/30 flex items-center justify-center bg-lap/5 mb-4">
                      <Icon size={18} className="text-lap" />
                    </div>
                    <h3 className="font-display font-black text-lg text-white uppercase mb-2">{f.title}</h3>
                    <p className="text-data/80 text-sm leading-relaxed">{f.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════ SCREENSHOTS ══════════════════════ */}
        <section className="py-24 bg-pit-900">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-14 text-center">
              <p className="section-label mb-3">Schermate</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                Progettata per la pista
              </h2>
              <p className="text-data/70 text-sm mt-3 max-w-md mx-auto">
                UI ad alto contrasto, leggibile anche con il casco abbassato e alla luce solare diretta.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {screenshots.map((s) => (
                <PhoneMockup key={s.label} src={s.src} alt={s.label} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section className="py-20 bg-pit-800 border-t border-pit-600">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="section-label mb-4">Gratis</p>
            <h2
              className="font-display font-black uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
            >
              Scarica ora
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppBadge store="apple" />
              <AppBadge store="google" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function AppBadge({ store }: { store: 'apple' | 'google' }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 border border-pit-500 bg-pit-800 hover:border-lap hover:bg-pit-700 transition-all duration-200 px-6 py-4"
    >
      {store === 'apple' ? (
        <Apple size={26} className="text-white" />
      ) : (
        <Smartphone size={26} className="text-white" />
      )}
      <div className="text-left">
        <p className="text-[10px] text-data uppercase tracking-wider">
          {store === 'apple' ? 'Download on the' : 'Get it on'}
        </p>
        <p className="text-white font-display font-bold text-lg leading-tight">
          {store === 'apple' ? 'App Store' : 'Google Play'}
        </p>
      </div>
    </a>
  )
}
