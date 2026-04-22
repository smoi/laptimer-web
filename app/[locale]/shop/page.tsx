import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { buildSeoMetadata } from '@/i18n/seo'
import ShopContent from './ShopContent'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return buildSeoMetadata({
    locale: params.locale,
    namespace: 'metadata.shop',
    path: '/shop',
  })
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <ShopContent />
      <Footer />
    </>
  )
}
