import { LiquidGlassFilter } from '@/components/LiquidGlass'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidGlassFilter />
      <main className="flex-auto">{children}</main>
    </>
  )
}
