import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import TimerDisplay from '@/components/TimerDisplay'
import { Satellite, Bluetooth, Brain, ChevronRight, Smartphone, Apple } from 'lucide-react'

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
                <p
                  className="section-label mb-4 animate-fade-up opacity-0"
                  style={{ animationFillMode: 'forwards' }}
                >
                  GPS Lap Timer per Auto e Moto
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
                  className="text-data/80 text-base leading-relaxed max-w-md mb-10 animate-fade-up opacity-0 delay-300"
                  style={{ animationFillMode: 'forwards' }}
                >
                  Precisione professionale a ogni giro. Il device GPS 20Hz si monta in secondi sulla tua auto o moto e
                  comunica in tempo reale con l&apos;app tramite Bluetooth. Analisi AI inclusa.
                </p>

                <div
                  className="flex flex-wrap gap-3 animate-fade-up opacity-0 delay-400"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <a href="#download" className="btn-amber">
                    Scarica l&apos;app
                  </a>
                  <a href="#shop" className="btn-outline">
                    Acquista il device
                  </a>
                </div>

                {/* Trust bar */}
                <div
                  className="flex gap-6 mt-10 animate-fade-up opacity-0 delay-500"
                  style={{ animationFillMode: 'forwards' }}
                >
                  {[
                    ['€69', 'device completo'],
                    ['Free', 'app iOS & Android'],
                    ['20Hz', 'GPS precision'],
                  ].map(([val, label]) => (
                    <div key={val} className="text-center">
                      <p className="font-display font-black text-2xl text-amber">{val}</p>
                      <p className="text-xs text-pit-400 uppercase tracking-wider mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — live timer */}
              <div
                className="flex flex-col items-center lg:items-end gap-4 animate-fade-up opacity-0 delay-300"
                style={{ animationFillMode: 'forwards' }}
              >
                {/* Timer card */}
                <div className="border border-pit-500 bg-pit-800/80 p-8 w-full max-w-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-lap animate-pulse-dot" />
                    <span className="text-xs font-display font-bold uppercase tracking-widest text-data">
                      Live · Giro 3
                    </span>
                  </div>
                  <TimerDisplay />
                  <div className="mt-4 pt-4 border-t border-pit-600 grid grid-cols-3 gap-3">
                    {[
                      ['Best', '1:23.456'],
                      ['Speed', '187 km/h'],
                      ['GPS', '20 sats'],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-[10px] text-pit-400 uppercase tracking-wider font-display">{label}</p>
                        <p className="text-sm font-display font-bold text-white mt-0.5">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-pit-400 text-center">Simulazione in tempo reale</p>
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
                ['20 Hz', 'frequenza GPS'],
                ['Bluetooth', 'connessione stabile'],
                ['€69', 'device completo'],
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
                        ['±0.5m', 'accuratezza'],
                        ['18+ sats', 'lock tipico'],
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
                      {[
                        ['&lt;15ms', 'latenza BLE'],
                        ['50m+', 'range'],
                      ].map(([v, l]) => (
                        <div key={l} className="bg-pit-800 px-3 py-2 flex-1">
                          <p
                            className="font-display font-bold text-lg text-amber"
                            dangerouslySetInnerHTML={{ __html: v }}
                          />
                          <p className="text-[10px] text-pit-400 uppercase tracking-wider">{l}</p>
                        </div>
                      ))}
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
                    { sector: 'T1–T3', delta: '-0.3s', note: 'Frenata migliorabile' },
                    { sector: 'T4–T6', delta: '+0.1s', note: 'Traiettoria ottimale' },
                    { sector: 'T7–T9', delta: '-0.5s', note: 'Punto di corda da anticipare' },
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
                  body: 'Fissa il device sul manubrio o sul codone. Morsetto universale incluso. Nessun cablaggio, nessuna configurazione hardware.',
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
              <p className="section-label mb-3">Acquista</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                Inizia oggi
              </h2>
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
              Scarica l&apos;app gratuitamente. Funziona con il device LapCoach via BLE
              oppure con il GPS del telefono in modalità standalone.
            </p>

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
