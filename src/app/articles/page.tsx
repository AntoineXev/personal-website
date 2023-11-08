import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default function Articles() {
  return (
    <SimpleLayout
      title="Writing on software and product design, company building, and productivity."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
           <p>I'll write my stuff here, but it's currently empty for now</p>
        </div>
      </div>
    </SimpleLayout>
  )
}
