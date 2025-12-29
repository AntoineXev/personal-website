import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LiquidGlassDefs } from '@/components/LiquidGlass'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <LiquidGlassDefs scale={70} seed={24} stdDeviation={12}/>
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
    </>
  )
}
