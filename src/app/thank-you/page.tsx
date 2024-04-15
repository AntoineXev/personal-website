import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Merci !',
  description: 'Merci pour votre inscription',
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Merci"
      intro="Nous allons rester en contact"
    />
  )
}
