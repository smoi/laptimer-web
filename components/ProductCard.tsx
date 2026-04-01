import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Check } from 'lucide-react'

export default async function ProductCard() {
  const t = await getTranslations('productCard')
  const specs = t.raw('specs') as string[]

  return (
    <div className="relative border border-pit-500 bg-pit-800 max-w-md w-full overflow-hidden">
      {/* Amber top accent */}
      <div className="h-1 bg-amber w-full" />

      {/* Device photo */}
      <div className="relative h-64 overflow-hidden bg-pit-900 border-b border-pit-600">
        <Image
          src="/device.png"
          alt="LapCoach One device"
          fill
          className="object-cover object-center"
          sizes="448px"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="section-label mb-1">{t('label')}</p>
            <h3 className="font-display font-black text-2xl text-white uppercase">
              LapCoach One
            </h3>
          </div>
          <div className="text-right">
            <p className="font-display font-black text-4xl text-amber">€59</p>
            <p className="text-data text-xs">{t('availability')}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {specs.map((s) => (
            <li key={s} className="flex items-center gap-2.5 text-sm text-data">
              <Check size={14} className="text-lap shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <Link href="/shop" className="btn-amber block text-center w-full text-sm">
          {t('cta')}
        </Link>

        <p className="text-center text-xs text-pit-400 mt-3">
          {t('note')}
        </p>
      </div>
    </div>
  )
}
