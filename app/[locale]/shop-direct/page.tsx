// HIDDEN PAGE — full purchase flow, activate by swapping with /shop/page.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShopDirectContent from './ShopDirectContent'

export default function ShopDirectPage() {
  return (
    <>
      <Navbar />
      <ShopDirectContent />
      <Footer />
    </>
  )
}
