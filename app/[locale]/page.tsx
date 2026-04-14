import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import WaitlistSection from '@/components/WaitlistSection'
import { Apple, Bluetooth, Brain, Check, ChevronRight, Film, Map, Satellite, Smartphone, Volume2, Zap } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })
  return { title: t('title'), description: t('description') }
}

export default async function Home() {
  const t = await getTranslations('home')
  const tBadge = await getTranslations('appBadge')

  const heroRows = t.raw('hero.tableRows') as string[][]
  const specs = t.raw('specs') as string[][]
  const steps = t.raw('howItWorks.steps') as { n: string; title: string; body: string; note: string }[]
  const faqItems = t.raw('faq.items') as { q: string; a: string }[]
  const gpsStats = t.raw('features.gps.stats') as string[][]
  const aiSectors = t.raw('features.ai.sectors') as { sector: string; delta: string; note: string }[]
  const videoPoints = t.raw('features.video.points') as string[]
  const accelMilestones = t.raw('features.accel.milestones') as string[]
  const mapPoints = t.raw('features.mapHeatmap.points') as string[]
  const voiceExamples = t.raw('features.voice.examples') as string[]
  const pricingTiers = t.raw('pricing.tiers') as { name: string; price: string; sub: string; cta: string; ctaHref: string; features: string[] }[]

  return (
    <>
      <Navbar />
      <main>
        {/* ══════════════════════ HERO ══════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-pit-900">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #1e2b1e 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-amber to-transparent opacity-60" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-lap/5 blur-[120px] pointer-events-none" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none hidden lg:block">
            <CircuitSVG />
          </div>

          <div className="relative max-w-6xl mx-auto px-5 pt-28 pb-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <div>
                <div
                  className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 px-3 py-1 mb-4 animate-fade-up opacity-0"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
                  <span className="text-amber text-xs font-display font-bold uppercase tracking-widest">
                    {t('hero.badge')}
                  </span>
                </div>
                <p
                  className="section-label mb-4 animate-fade-up opacity-0"
                  style={{ animationFillMode: 'forwards', animationDelay: '50ms' }}
                >
                  {t('hero.label')}
                </p>
                <h1
                  className="font-display font-black uppercase leading-none text-white mb-6 animate-fade-up opacity-0 delay-100"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', animationFillMode: 'forwards' }}
                >
                  Lap<span className="text-amber">Coach</span>
                </h1>
                <p
                  className="font-display font-semibold uppercase tracking-widest text-data text-lg mb-4 animate-fade-up opacity-0 delay-200"
                  style={{ animationFillMode: 'forwards' }}
                >
                  {t('hero.tagline')}
                </p>
                <p
                  className="text-data/80 text-base leading-relaxed max-w-md mb-6 animate-fade-up opacity-0 delay-300"
                  style={{ animationFillMode: 'forwards' }}
                >
                  {t('hero.description')}
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
                          {t('hero.tableAppFree')}
                        </th>
                        <th className="pb-2 text-center text-amber font-display font-bold text-xs uppercase tracking-wider">
                          {t('hero.tableAppDevice')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {heroRows.map(([label, free, paid], i) => (
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
                    {t('hero.downloadCta')}
                  </a>
                  <a href="/shop" className="btn-outline">
                    {t('hero.betaCta')}
                  </a>
                </div>
              </div>

              {/* Right — iPhone mockup */}
              <div
                className="flex flex-col items-center lg:items-end gap-4 animate-fade-up opacity-0 delay-300"
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="relative mx-auto" style={{ width: 260 }}>
                  <div className="relative rounded-[44px] border-[8px] border-pit-500 bg-black shadow-2xl overflow-hidden"
                    style={{ aspectRatio: '9/19.5' }}>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10" />
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
            <span className="text-[10px] font-display uppercase tracking-widest text-data">{t('hero.scroll')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-data to-transparent" />
          </div>
        </section>

        {/* ══════════════════════ SPECS STRIP ══════════════════════ */}
        <div className="bg-pit-950 border-y border-pit-600">
          <div className="max-w-6xl mx-auto px-5 py-4">
            <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-0">
              {specs.map(([val, label]) => (
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
              <p className="section-label mb-3">{t('features.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {t('features.title')}
                <br />
                <span className="text-lap">{t('features.titleHighlight')}</span>
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
                    <p className="section-label mb-2">{t('features.gps.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.gps.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed">
                      {t('features.gps.body')}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {gpsStats.map(([v, l]) => (
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
                    <p className="section-label mb-2">{t('features.ble.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.ble.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed">
                      {t('features.ble.body')}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <div className="bg-pit-800 px-3 py-2 flex-1">
                        <p className="font-display font-bold text-lg text-amber">
                          {(t.raw('features.ble.latency') as string[])[0]}
                        </p>
                        <p className="text-[10px] text-pit-400 uppercase tracking-wider">
                          {(t.raw('features.ble.latency') as string[])[1]}
                        </p>
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
                      <p className="section-label mb-2">{t('features.ai.label')}</p>
                      <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                        {t('features.ai.title')}
                      </h3>
                      <p className="text-data/80 text-sm leading-relaxed max-w-lg">
                        {t('features.ai.body')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-pit-800 p-4 border border-pit-600">
                  <p className="text-xs font-display uppercase tracking-widest text-amber mb-3">
                    {t('features.ai.exampleLabel')}
                  </p>
                  {aiSectors.map((item) => (
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

            {/* Feature 4 — Video + Accel */}
            <div className="grid lg:grid-cols-2 gap-0 border border-pit-600 border-t-0">
              <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-pit-600">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-amber/40 flex items-center justify-center bg-amber/10">
                    <Film size={22} className="text-amber" />
                  </div>
                  <div>
                    <p className="section-label mb-2">{t('features.video.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.video.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed mb-4">
                      {t('features.video.body')}
                    </p>
                    <ul className="space-y-1.5">
                      {videoPoints.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs text-data/70">
                          <Check size={12} className="text-lap shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-lap/40 flex items-center justify-center bg-lap/10">
                    <Zap size={22} className="text-lap" />
                  </div>
                  <div>
                    <p className="section-label mb-2">{t('features.accel.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.accel.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed mb-4">
                      {t('features.accel.body')}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {accelMilestones.map((m) => (
                        <div key={m} className="bg-pit-800 px-3 py-2">
                          <p className="font-display font-bold text-sm text-lap">{m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5 — Map + Voice */}
            <div className="grid lg:grid-cols-2 gap-0 border border-pit-600 border-t-0">
              <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-pit-600">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-lap/40 flex items-center justify-center bg-lap/10">
                    <Map size={22} className="text-lap" />
                  </div>
                  <div>
                    <p className="section-label mb-2">{t('features.mapHeatmap.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.mapHeatmap.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed mb-4">
                      {t('features.mapHeatmap.body')}
                    </p>
                    <ul className="space-y-1.5">
                      {mapPoints.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs text-data/70">
                          <Check size={12} className="text-lap shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 border border-amber/40 flex items-center justify-center bg-amber/10">
                    <Volume2 size={22} className="text-amber" />
                  </div>
                  <div>
                    <p className="section-label mb-2">{t('features.voice.label')}</p>
                    <h3 className="font-display font-black text-3xl text-white uppercase mb-3">
                      {t('features.voice.title')}
                    </h3>
                    <p className="text-data/80 text-sm leading-relaxed mb-4">
                      {t('features.voice.body')}
                    </p>
                    <div className="space-y-2">
                      {voiceExamples.map((e) => (
                        <div key={e} className="bg-pit-800 px-3 py-2 flex items-center gap-2">
                          <Volume2 size={11} className="text-amber shrink-0" />
                          <p className="text-xs font-display text-data">{e}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════ PRICING ══════════════════════ */}
        <section className="py-24 bg-pit-800 border-t border-pit-600">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-16">
              <p className="section-label mb-3">{t('pricing.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {t('pricing.title')}
                <br />
                <span className="text-lap">{t('pricing.titleHighlight')}</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0">
              {pricingTiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`p-8 border border-pit-600 relative flex flex-col ${i > 0 ? 'md:-ml-px' : ''} ${i === 1 ? '-mt-px md:mt-0 border-amber/50' : ''}`}
                >
                  {i === 1 && <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber" />}
                  <p className="font-display font-black text-4xl text-white mb-1">{tier.price}</p>
                  <p className="font-display font-bold text-xl text-white uppercase">{tier.name}</p>
                  <p className="text-xs text-pit-400 uppercase tracking-wider mb-6">{tier.sub}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-data/80">
                        <Check size={14} className="text-lap shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.ctaHref}
                    className={`block text-center text-sm font-display font-bold uppercase tracking-wider py-3 px-4 transition-colors ${
                      i === 1
                        ? 'bg-amber text-black hover:bg-amber/90'
                        : 'border border-pit-500 text-data hover:border-lap hover:text-white'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
        <section id="come-funziona" className="py-24 bg-pit-800">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-16">
              <p className="section-label mb-3">{t('howItWorks.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {t('howItWorks.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0">
              {steps.map((step, i) => (
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
              <p className="section-label mb-3">{t('device.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {t('device.title')}
              </h2>
              <p className="text-data/70 text-sm mt-3 max-w-md">
                {t('device.description')}
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
            <p className="section-label mb-4">{t('download.label')}</p>
            <h2
              className="font-display font-black uppercase text-white mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
            >
              {t('download.title')}
              <br />
              <span className="text-lap">{t('download.titleHighlight')}</span>
            </h2>
            <p className="text-data/80 text-sm max-w-md mx-auto mb-10">
              {t('download.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppBadge
                store="apple"
                label={tBadge('appleLabel')}
                storeName={tBadge('appleStore')}
              />
              <AppBadge
                store="google"
                label={tBadge('googleLabel')}
                storeName={tBadge('googleStore')}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════ FAQ ══════════════════════ */}
        <section className="py-24 bg-pit-900 border-t border-pit-600">
          <div className="max-w-3xl mx-auto px-5">
            <div className="mb-14">
              <p className="section-label mb-3">{t('faq.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                {t('faq.title')}
              </h2>
            </div>

            <div>
              {faqItems.map((item, i, arr) => (
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

function AppBadge({
  store,
  label,
  storeName,
}: {
  store: 'apple' | 'google'
  label: string
  storeName: string
}) {
  const href = store === 'apple'
    ? 'https://apps.apple.com/it/app/lapcoach-gps-lap-timer/id6761366145'
    : 'https://play.google.com/store/apps/details?id=com.lapcoach.app'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border border-pit-500 bg-pit-800 hover:border-lap hover:bg-pit-700 transition-all duration-200 px-6 py-4 group"
    >
      {store === 'apple' ? (
        <Apple size={28} className="text-white" />
      ) : (
        <Smartphone size={28} className="text-white" />
      )}
      <div className="text-left">
        <p className="text-[10px] text-data uppercase tracking-wider">{label}</p>
        <p className="text-white font-display font-bold text-lg leading-tight">{storeName}</p>
      </div>
    </a>
  )
}

function CircuitSVG() {
  return (
    <svg width="700" height="600" viewBox="0 0 700 600" fill="none" aria-hidden="true">
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
      <line x1="350" y1="72" x2="350" y2="90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="570" cy="350" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="240" cy="460" r="5" fill="#F59E0B" opacity="0.7"/>
    </svg>
  )
}
