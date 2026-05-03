import { LiquidGlassDefs } from '@/components/LiquidGlass'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidGlassDefs scale={70} seed={24} stdDeviation={12} />
      <main className="flex-auto">{children}</main>
    </>
  )
}
