import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
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
    'GPS lap timer ad alta precisione per auto e moto da pista. 20Hz di frequenza, analisi AI. Dispositivo hardware + app gratuita per iOS e Android.',
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
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
