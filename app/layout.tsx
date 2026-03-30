import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LapCoach — Il tuo coach in pista',
  description:
    'App gratuita per cronometrare i tuoi giri in pista su auto e moto. GPS 20Hz con il device opzionale LapCoach, o standalone con il GPS del telefono. iOS e Android.',
  keywords: ['lap timer', 'pista', 'GPS', 'tempi sul giro', 'track day', 'moto', 'auto'],
  openGraph: {
    title: 'LapCoach — Il tuo coach in pista',
    description:
      'GPS lap timer ad alta precisione per auto e moto da pista. 20Hz, AI Coach.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        {children}
        {/* iubenda — cookie banner */}
        <Script
          src="https://embeds.iubenda.com/widgets/07ce5aa9-11f5-4d4c-8075-184fd806e198.js"
          strategy="afterInteractive"
        />
        {/* iubenda — privacy/cookie policy button renderer */}
        <Script
          src="https://cdn.iubenda.com/iubenda.js"
          strategy="afterInteractive"
        />
      </body>
    </html>    
  )
}
