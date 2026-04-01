// HIDDEN PAGE — noindex to keep this out of search engines
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ShopDirectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
