import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PhoneMockup from '@/components/PhoneMockup'
import { Apple, Archive, BarChart2, Bluetooth, Brain, Film, Gauge, Map, MapPin, Smartphone, Timer, TrendingUp, Volume2, Zap } from 'lucide-react'

const featureIcons = [Timer, TrendingUp, BarChart2, Gauge, Brain, Film, Bluetooth, MapPin, Zap, Volume2, Map, Archive]

const screenshots = [
  { src: '/screenshots/screen-timing.png',   labelKey: 0 },
  { src: '/screenshots/screen-sessione.png', labelKey: 1 },
  { src: '/screenshots/screen-giro.png',     labelKey: 2 },
  { src: '/screenshots/screen-sessioni.png', labelKey: 3 },
  { src: '/screenshots/screen-circuiti.png', labelKey: 4 },
  { src: '/screenshots/screen-home.png',     labelKey: 5 },
]

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'metadata.app' })
  return { title: t('title'), description: t('description') }
}

export default async function AppPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('appPage')
  const tBadge = await getTranslations('appBadge')

  const features = t.raw('features.items') as { title: string; body: string }[]
  const screenshotLabels = t.raw('screenshots.labels') as string[]

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
              <p className="section-label mb-4">{t('hero.label')}</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                {t('hero.title1')}
                <br />
                {t('hero.title2')}
                <br />
                <span className="text-amber">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-data/80 text-base leading-relaxed max-w-lg mb-10">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
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
          </div>
        </section>

        {/* ══════════════════════ FEATURES ══════════════════════ */}
        <section className="py-24 bg-pit-800">
          <div className="max-w-6xl mx-auto px-5">
            <div className="mb-14">
              <p className="section-label mb-3">{t('features.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                {t('features.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              {features.map((f, i) => {
                const Icon = featureIcons[i]
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
              <p className="section-label mb-3">{t('screenshots.label')}</p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                {t('screenshots.title')}
              </h2>
              <p className="text-data/70 text-sm mt-3 max-w-md mx-auto">
                {t('screenshots.description')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {screenshots.map((s, i) => (
                <PhoneMockup
                  key={s.src}
                  src={s.src}
                  alt={screenshotLabels[i]}
                  label={screenshotLabels[i]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════ CTA ══════════════════════ */}
        <section className="py-20 bg-pit-800 border-t border-pit-600">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="section-label mb-4">{t('cta.label')}</p>
            <h2
              className="font-display font-black uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
            >
              {t('cta.title')}
            </h2>
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
        <p className="text-[10px] text-data uppercase tracking-wider">{label}</p>
        <p className="text-white font-display font-bold text-lg leading-tight">{storeName}</p>
      </div>
    </a>
  )
}
