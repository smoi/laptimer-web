import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import HtmlLang from '@/components/HtmlLang'
import IubendaLoader from '@/components/IubendaLoader'
import { routing } from '@/i18n/routing'
import { buildSeoMetadata, SITE_URL } from '@/i18n/seo'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = await buildSeoMetadata({
    locale: params.locale,
    namespace: 'metadata.home',
  })
  return {
    metadataBase: new URL(SITE_URL),
    ...seo,
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <>
      <HtmlLang lang={locale} />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R4J5L2JF4G"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R4J5L2JF4G');
        `}
      </Script>

      {/* iubenda */}
      <Script
        src="https://embeds.iubenda.com/widgets/07ce5aa9-11f5-4d4c-8075-184fd806e198.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.iubenda.com/iubenda.js"
        strategy="afterInteractive"
      />
      <IubendaLoader />
    </>
  )
}
