import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const SITE_URL = 'https://lapcoach.racing'

type BuildArgs = {
  locale: string
  namespace: string
  path?: string
}

export async function buildSeoMetadata({
  locale,
  namespace,
  path = '',
}: BuildArgs): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })

  const title = t('title')
  let description: string | undefined
  try {
    description = t('description')
  } catch {
    description = undefined
  }

  const itUrl = `${SITE_URL}${path}`
  const enUrl = `${SITE_URL}/en${path}`
  const canonical = locale === 'en' ? enUrl : itUrl

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'it': itUrl,
        'en': enUrl,
        'x-default': itUrl,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'LapCoach',
      title,
      description,
      url: canonical,
      locale: locale === 'en' ? 'en_US' : 'it_IT',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
