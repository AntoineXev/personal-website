import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Daily tools and hardware that I use and recommend for productivity.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Daily tools and hardware that I use and recommend for productivity."
      intro="I get asked a lot about the things I use to build software, stay productive. Here’s a big list of all of my favorite stuff, pick what you need from there"
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="13”3 MacBook Pro, M1, 16GB RAM (2020)">
            This is the chip version of the macbook. But the M1 chip is incredible.
            It can be charged with a phone charger, and last more than 10 hours.
            16GB is required tho, but right now you can find that machine for less than 700€.
          </Tool>
          <Tool title="Huawei Mateview #4-inch (Ultra-wide screen)">
            Large screen is better than 2 small screens imo. I found this one really cool to work with.
            Soundbar is not to be used tho.
          </Tool>
          <Tool title="Roccat Kone Aimo">
            Roccat is the best mouse manufacturer on the market imo.
            If you don't need a wireless mouse, the kone Aimo will make an incredible job.
            Should it be for work or gaming, the custom setups will make you unstopable !
          </Tool>
          <Tool title="Sony WH-1000XM4 (Noise Canceller Headset)">
            I've tried a few headsets (I've been a DJ when I was young),
            this one has the best cost effectiveness on the market.
            For less that 250€, you'll have an incredible noise cancellation feature, gestures, and more than 20hours of battery.
          </Tool>
          <Tool title="Ember connected coffee cup">
            Starting the day without a coffee is definitly a no go for me.
            But keeping the coffee warm, and beeing able to drink it around the whole day, is something I struggled about by the past.
            Well, now it's over, ember cup is keeping my coffee warm all day long.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Webstorm">
            I started using webstorm when I started web development. Since then, I never had any needs for another IDE.
            Tried VSCode, but to make it as powerfull as webstorm, you'lle need tons of plugins ...
          </Tool>
          <Tool title="IntelIJ Idea">
            Same as webstorm, started Java dev on intelIj, never moved away since. Tried Eclipse once, need a 3 weeks holiday to get past it.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Sunsama">
            I tried dozen's of to do list and daily planners... it's maybe because of my adhd symptoms,
            but I never had any of them working. Except Sunsama. This is the best planner ever made.
            You'll have your tasks for the week, you'll plan your days, and never loose track of your personal tasks
            with an easy to use backlog.
          </Tool>
          <Tool title="Spark">
            From all that I have tested, Spark is the best email reader on the market.
            It allows me to keep inbox 0 every day, with concept of processed and reported emails.
            So bad I can't move mails directly into Sunsama with an automation.
          </Tool>
          <Tool title="Arc Browser">
            Everyone knows Arc. It's the reveal of 2023.
            It did not completely changed the way I browsed internet,
            but it helps me keeping my tabs and browsing process clean along the day,
            which is pretty cool if you are pretty messy with tabs like I am.
          </Tool>
          <Tool title="Raycast">
            Discovered Raycast this month. Was using alfred, but Raycast is Alfred on steroids.
            A game changer for mac productivity, I do basically everything with my keyboard right not.
            Even arc Command + T shortcut can be integrated, so I do any browsing from their now on.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
