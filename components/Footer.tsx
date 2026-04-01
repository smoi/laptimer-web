import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer id="site-footer" className="bg-pit-950 border-t border-pit-600 mt-0">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logo.png"
                alt="LapCoach"
                width={130}
                height={63}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-data text-sm leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-4">{t('product')}</p>
            <ul className="space-y-2">
              {[
                { href: '/app' as const,           label: t('links.app') },
                { href: '/shop' as const,           label: t('links.betaAccess') },
                { href: '/#funzionalita' as const,  label: t('links.features') },
                { href: '/#come-funziona' as const, label: t('links.howItWorks') },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-data text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs at a glance */}
          <div>
            <p className="section-label mb-4">{t('specs')}</p>
            <ul className="space-y-1 text-sm text-data font-body">
              <li className="flex gap-2">
                <span className="text-pit-400 w-24 shrink-0">GPS</span>
                <span>{t('specsData.gps')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pit-400 w-24 shrink-0">BLE</span>
                <span>{t('specsData.connectivity')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-pit-400 w-24 shrink-0">€</span>
                <span>{t('specsData.price')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Slot for the iubenda widget — dangerouslySetInnerHTML tells React
            to never reconcile this div's children, so moving the widget here
            via DOM manipulation never causes removeChild errors. */}
        <div id="iubenda-slot" dangerouslySetInnerHTML={{ __html: '' }} />

        <div className="hr-pit mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pit-400">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/termini" className="hover:text-data transition-colors">
              {t('terms')}
            </Link>
            <a
              href="https://www.iubenda.com/privacy-policy/98995300"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-data transition-colors"
            >
              {t('privacy')}
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/98995300/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-data transition-colors"
            >
              {t('cookie')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
