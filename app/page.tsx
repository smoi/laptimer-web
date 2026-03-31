import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import TimerDisplay from '@/components/TimerDisplay'
import WaitlistSection from '@/components/WaitlistSection'
import { Apple, Bluetooth, Brain, ChevronRight, Satellite, Smartphone } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-pit-900">
          {/* Dot grid background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #1e2b1e 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Amber vertical stripe — left */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-amber to-transparent opacity-60" />

          {/* Ambient glow top-right */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-lap/5 blur-[120px] pointer-events-none" />

          {/* Track SVG — decorative background element */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none hidden lg:block">
            <CircuitSVG />
          </div>

          <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div>
                {/* Beta badge */}
                <div
                  className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 px-3 py-1 mb-4 animate-fade-up opacity-0"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
                  <span className="text-amber text-xs font-display font-bold uppercase tracking-widest">
                    Beta privata — posti limitati
                  </span>
                </div>
                <p
                  className="section-label mb-4 animate-fade-up opacity-0"
                  style={{ animationFillMode: 'forwards', animationDelay: '50ms' }}
                >
                  GPS Lap Timer per Auto e Moto da Pista
                </p>
                <h1
                  className="font-display font-black uppercase leading-none text-white mb-6 animate-fade-up opacity-0 delay-100"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                    animationFillMode: 'forwards',
                  }}
                >
                  Lap<span className="text-amber">Coach</span>
                </h1>
                <p
                  className="font-display font-semibold uppercase tracking-widest text-data text-lg mb-4 animate-fade-up opacity-0 delay-200"
                  style={{ animationFillMode: 'forwards' }}
                >
                  Il tuo coach in pista
                </p>
                <p
                  className="text-data/80 text-base leading-relaxed max-w-md mb-6 animate-fade-up opacity-0 delay-300"
                  style={{ animationFillMode: 'forwards' }}
                >
                  App gratuita per iOS e Android. Usala subito con il GPS del tuo telefono,
                  oppure abbinala al device LapCoach per GPS 20Hz professionale e massima precisione.
                </p>

                {/* Comparison table */}
                <div
                  className="mb-8 animate-fade-up opacity-0 delay-300"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-pit-600">
                        <th className="text-left pb-2 text-pit-400 font-display font-bold text-xs uppercase tracking-wider w-1/3"></th>
                        <th className="pb-2 text-center text-lap font-display font-bold text-xs uppercase tracking-wider">
                          App gratuita
                        </th>
                        <th className="pb-2 text-center text-amber font-display font-bold text-xs uppercase tracking-wider">
                          App + Device
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['GPS',       'Telefono ~1Hz', '20Hz dedicato'],
                        ['Precisione','~5m',           '<1m'],
                        ['Batteria',  'Telefono',      'Autonoma'],
                        ['Prezzo',    'Gratis',        '€59'],
                      ].map(([label, free, paid], i) => (
                        <tr key={label} className={`${i < 3 ? 'border-b border-pit-700/50' : ''}`}>
                          <td className="py-2 text-pit-400 font-display text-xs uppercase tracking-wider">{label}</td>
                          <td className="py-2 text-center text-data/70 text-xs">{free}</td>
                          <td className="py-2 text-center text-white text-xs font-medium">{paid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className="flex flex-wrap gap-3 animate-fade-up opacity-0 delay-400"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <a href="#download" className="btn-amber">
                    Scarica l&apos;app — Gratis
                  </a>
                  <a href="/shop" className="btn-outline">
                    Richiedi accesso beta
                  </a>
                </div>
              </div>

              {/* Right — iPhone mockup with app GIF */}
              <div
                className="flex flex-col items-center lg:items-end gap-4 animate-fade-up opacity-0 delay-300"
                style={{ animationFillMode: 'forwards' }}
              >
                {/* iPhone mockup */}
                <div className="relative mx-auto" style={{ width: 260 }}>
                  {/* Phone shell */}
                  <div className="relative rounded-[44px] border-[8px] border-pit-500 bg-black shadow-2xl overflow-hidden"
                    style={{ aspectRatio: '9/19.5' }}>
                    {/* Dynamic island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10" />
                    {/* Screen — video (no LCP penalty, no alt needed) */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      preload="none"
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    >
                      <source src="/screen-timer.mp4" type="video/mp4" />
                    </video>
                  </div>
                  {/* Side buttons */}
                  <div className="absolute -left-[10px] top-20 w-[4px] h-8 rounded-l-sm bg-pit-500" />
                  <div className="absolute -left-[10px] top-32 w-[4px] h-10 rounded-l-sm bg-pit-500" />
                  <div className="absolute -left-[10px] top-44 w-[4px] h-10 rounded-l-sm bg-pit-500" />
                  <div className="absolute -right-[10px] top-28 w-[4px] h-14 rounded-r-sm bg-pit-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
            <span className="text-[10px] font-display uppercase tracking-widest text-data">Scorri</span>
            <div className="w-px h-8 bg-gradient-to-b from-data to-transparent" />
          </div>
        </section>

        {/* ══════════════════════ SPECS STRIP ══════════════════════ */}
        <div className="bg-pit-950 border-y border-pit-600">
          <div className="max-w-6xl mx-auto px-5 py-4">
            <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-0">
              {[
                ['20 Hz', 'GPS del device'],
                ['Bluetooth', 'connessione stabile'],
                ['€59', 'device opzionale'],
                ['Free', 'app iOS & Android'],
              ].map(([val, label]) => (
                <div key={val} className="flex items-center gap-3 px-4 border-l border-pit-600 first:border-l-0">
                  <span className="font-display font-black text-xl text-amber">{val}</span>
                  <span className="text-xs text-pit-400 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════ FEATURES ══════════════════════ */}
        <section id="funzionalita" className="py-24 bg-pit-900">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-16">
              <p className="section-label mb-3">Funzionalità</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                Tutto quello che serve
                <br />
                <span className="text-lap">in pista</span>
              </h2>
            </div>

            {/* Feature 1 — GPS */}
            <div className="grid lg:grid-cols-2 gap-0 mb-1 border border-pit-600">
              <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-pit-600">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-lap/40 flex items-center justify-center bg-lap/10">
                    <Satellite size={22} className="text-lap" />
                  </div>
                  <div>
                    <p className="section-label mb-2">Precisione assoluta</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      GPS 20Hz
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed">
                      Il modulo u-blox M10 campiona la posizione 20 volte al secondo, garantendo una
                      risoluzione temporale di 50ms per giro — abbondantemente sufficiente per distinguere
                      centesimi di secondo tra sessioni diverse.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        ['50ms', 'risoluzione'],
                        ['u-blox M10', 'chip GPS'],
                        ['20×', 'vs GPS telefono'],
                        ['L1 C/A', 'segnale'],
                      ].map(([v, l]) => (
                        <div key={v} className="bg-pit-800 px-3 py-2">
                          <p className="font-display font-bold text-lg text-amber">{v}</p>
                          <p className="text-[10px] text-pit-400 uppercase tracking-wider">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-lap/40 flex items-center justify-center bg-lap/10">
                    <Bluetooth size={22} className="text-lap" />
                  </div>
                  <div>
                    <p className="section-label mb-2">Connessione istantanea</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      BLE Real-Time
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed">
                      Bluetooth Low Energy 5.0 garantisce latenza minima e una connessione stabile
                      anche in condizioni di vibrazione. I dati GPS fluiscono verso l&apos;app in tempo reale:
                      velocità, posizione, tempi parziali.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <div className="bg-pit-800 px-3 py-2 flex-1">
                        <p className="font-display font-bold text-lg text-amber">&lt;15ms</p>
                        <p className="text-[10px] text-pit-400 uppercase tracking-wider">latenza BLE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 — AI */}
            <div className="border border-pit-600 border-t-0 p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 border border-amber/40 flex items-center justify-center bg-amber/10">
                      <Brain size={22} className="text-amber" />
                    </div>
                    <div>
                      <p className="section-label mb-2">Analisi intelligente</p>
                      <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                        AI Coach
                      </h3>
                      <p className="text-data/80 text-sm leading-relaxed max-w-lg">
                        Al termine di ogni sessione, l&apos;AI analizza i tuoi giri e identifica dove stai
                        perdendo tempo: frenate tardive, traiettorie non ottimali, punti di corda sbagliati.
                        Feedback concreto, non solo numeri.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-pit-800 p-4 border border-pit-600">
                  <p className="text-xs font-display uppercase tracking-widest text-amber mb-3">
                    Esempio analisi AI
                  </p>
                  {[
                    { sector: 'Lesmo 1', delta: '-0.3s', note: 'Frenata migliorabile' },
                    { sector: 'Parabolica', delta: '+0.1s', note: 'Traiettoria ottimale' },
                    { sector: 'Ascari', delta: '-0.5s', note: 'Punto di corda da anticipare' },
                  ].map((item) => (
                    <div key={item.sector} className="spec-row">
                      <span className="font-display font-bold text-white">{item.sector}</span>
                      <span className={`font-display font-bold text-sm ${
                        item.delta.startsWith('-') ? 'text-amber' : 'text-lap'
                      }`}>{item.delta}</span>
                      <span className="text-xs text-data hidden sm:block">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
        <section id="come-funziona" className="py-24 bg-pit-800">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-16">
              <p className="section-label mb-3">Processo</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                Come funziona
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0">
              {[
                {
                  n: '01',
                  title: 'Monta LapCoach',
                  body: 'Fissa il device sul manubrio o sul codone con velcro o fascette. Nessun cablaggio, nessuna configurazione hardware.',
                  note: '< 2 min setup',
                },
                {
                  n: '02',
                  title: 'Connetti via Bluetooth',
                  body: "Apri l'app, premi connetti. Il device viene rilevato in automatico. La connessione BLE rimane stabile anche in corsa.",
                  note: 'pairing automatico',
                },
                {
                  n: '03',
                  title: 'Analizza in tempo reale',
                  body: "Durante la sessione vedi giri, velocità e parziali in diretta. Dopo la giornata, l'AI elabora i dati e ti fornisce il briefing.",
                  note: 'AI report post-sessione',
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className={`p-8 lg:p-10 border border-pit-600 ${i > 0 ? '-mt-px md:mt-0 md:-ml-px' : ''}`}
                >
                  <p className="font-display font-black text-[5rem] leading-none text-pit-600 mb-4 select-none">
                    {step.n}
                  </p>
                  <h3 className="font-display font-black text-xl text-white uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-data/80 text-sm leading-relaxed mb-4">{step.body}</p>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={12} className="text-amber" />
                    <span className="text-xs font-display uppercase tracking-wider text-amber">{step.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ SHOP ══════════════════════ */}
        <section id="shop" className="py-24 bg-pit-900">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-16">
              <p className="section-label mb-3">Il device</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                LapCoach One
              </h2>
              <p className="text-data/70 text-sm mt-3 max-w-md">
                GPS 20Hz professionale. In beta privata — accesso su invito per i primi track day enthusiast.
              </p>
            </div>

            <div className="flex justify-center">
              <ProductCard />
            </div>
          </div>
        </section>

        {/* ══════════════════════ DOWNLOAD ══════════════════════ */}
        <section id="download" className="py-24 bg-pit-800 border-t border-pit-600">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="section-label mb-4">App gratuita</p>
            <h2
              className="font-display font-black uppercase text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
            >
              Disponibile su
              <br />
              <span className="text-lap">iOS & Android</span>
            </h2>
            <p className="text-data/80 text-sm max-w-md mx-auto mb-10">
              Scarica l&apos;app gratuitamente. Funziona subito con il GPS del telefono.
              Abbinala al device LapCoach per prestazioni professionali.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppBadge store="apple" />
              <AppBadge store="google" />
            </div>
          </div>
        </section>

        {/* ══════════════════════ FAQ ══════════════════════ */}
        <section className="py-24 bg-pit-900 border-t border-pit-600">
          <div className="max-w-3xl mx-auto px-5">
            <div className="mb-14">
              <p className="section-label mb-3">FAQ</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                Domande frequenti
              </h2>
            </div>

            <div>
              {[
                {
                  q: 'Come funziona l\'accesso beta?',
                  a: 'Compila il form di richiesta. Valutiamo ogni candidatura in base al profilo di utilizzo e contatteremo i selezionati entro 48 ore. I beta tester ricevono il device a prezzo speciale in cambio di feedback strutturato.',
                },
                {
                  q: 'Ho bisogno del device per usare l\'app?',
                  a: 'No. L\'app funziona con il GPS integrato del tuo telefono. Il device LapCoach migliora significativamente la precisione portando la frequenza GPS da ~1Hz a 20Hz — la differenza tra ~5m e meno di 1m di accuratezza posizionale.',
                },
                {
                  q: 'Quali auto e moto da pista sono supportate?',
                  a: 'LapCoach funziona con qualsiasi veicolo. Non richiede installazione elettrica — si monta con velcro o fascette in qualsiasi posizione.',
                },
                {
                  q: 'Quali circuiti sono supportati?',
                  a: 'Al lancio includiamo i principali circuiti mondiali: Monza, Mugello, Imola, Misano, Vallelunga, Franciacorta, Adria. Altri circuiti vengono aggiunti con gli aggiornamenti dell\'app. Ma se mancano dei circuiti potrai aggiungerli tu manualmente tramite l\'app.',
                },
                {
                  q: 'Come si aggiorna il firmware del device?',
                  a: 'Tramite l\'app via WiFi diretto — nessun computer necessario. L\'app ti avvisa automaticamente quando è disponibile un aggiornamento.',
                },
                {
                  q: 'Dove viene spedito?',
                  a: 'Al momento spediamo in Italia. Spedizione gratuita sopra €59.',
                },
              ].map((item, i, arr) => (
                <div key={i} className={`py-6 ${i < arr.length - 1 ? 'border-b border-pit-600' : ''}`}>
                  <p className="font-display font-bold text-white text-lg mb-2">{item.q}</p>
                  <p className="text-data/80 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ WAITLIST ══════════════════════ */}
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}

function AppBadge({ store }: { store: 'apple' | 'google' }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 border border-pit-500 bg-pit-800 hover:border-lap hover:bg-pit-700 transition-all duration-200 px-6 py-4 group"
    >
      {store === 'apple' ? (
        <Apple size={28} className="text-white" />
      ) : (
        <Smartphone size={28} className="text-white" />
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

function CircuitSVG() {
  return (
    <svg width="700" height="600" viewBox="0 0 700 600" fill="none" aria-hidden="true">
      {/* A simplified generic circuit outline inspired by track shapes */}
      <path
        className="track-path"
        d="
          M 350 80
          C 450 80, 560 100, 590 160
          C 620 220, 600 300, 570 350
          C 540 400, 510 420, 500 460
          C 490 500, 510 540, 480 560
          C 450 580, 380 570, 340 550
          C 300 530, 260 500, 240 460
          C 220 420, 230 380, 210 340
          C 190 300, 150 280, 140 240
          C 130 200, 150 150, 200 120
          C 250 90, 300 80, 350 80
          Z
        "
        stroke="#4ade80"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Start/finish line */}
      <line x1="350" y1="72" x2="350" y2="90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      {/* Sector markers */}
      <circle cx="570" cy="350" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="240" cy="460" r="5" fill="#F59E0B" opacity="0.7"/>
    </svg>
  )
}
