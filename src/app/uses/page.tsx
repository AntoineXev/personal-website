import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Schema } from "@/components/Schema";

function ToolsSection ({
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

function Tool ({
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
    title: 'Mes outils',
    description: 'Je suis souvent interrogé sur les outils que j\'utilise pour développer des logiciels et rester productif. Voici une liste non exhaustive de mes outils favoris.',
    alternates: {
        canonical: '/uses'
    },
}

export default function Uses () {
    return (
        <>
            <Schema things={[]} slug={'/uses'}/>
            <SimpleLayout
                title="Ce que j'utilise au quotidien"
                intro="Je suis souvent interrogé sur les outils que j'utilise pour développer des logiciels et rester productif. Voici une liste exhaustive de mes équipements préférés, choisissez ce dont vous avez besoin :"
            >
                <div className="space-y-20">
                    <ToolsSection title="Poste de travail">
                        <Tool title="MacBook Pro 13 pouces, M1, 16 Go de RAM (2020)">
                            C'est la version avec la puce M1, incroyable. Elle peut être chargée avec un chargeur de
                            téléphone et dure plus de 10 heures. 16 Go sont nécessaires, mais actuellement, vous pouvez
                            trouver cette machine pour moins de 700€.
                        </Tool>
                        <Tool title="Huawei Mateview 34 pouces (Écran ultra-large)">
                            Un grand écran est meilleur que deux petits à mon avis. Celui-ci est vraiment agréable à
                            utiliser. Cependant, il est préférable de ne pas utiliser la barre de son.
                        </Tool>
                        <Tool title="Roccat Kone Aimo">
                            Roccat est le meilleur fabricant de souris sur le marché à mon avis. Si vous n'avez pas
                            besoin d'une souris sans fil, la Kone Aimo fera un travail incroyable. Les configurations
                            personnalisées sont incroyable pour la productivité.
                        </Tool>
                        <Tool title="Sony WH-1000XM4 (Casque à réduction de bruit)">
                            J'ai essayé plusieurs casques (j'ai été DJ quand j'étais jeune), celui-ci offre le meilleur
                            rapport qualité-prix sur le marché. Pour moins de 250€, vous aurez une fonction de réduction
                            de bruit incroyable, des gestes, et plus de 20 heures d'autonomie. </Tool>
                        <Tool title="Tasse à café connectée Ember">
                            Commencer la journée sans café est impensable pour moi. Mais garder le café chaud et pouvoir
                            en boire toute la journée, c'était un problème par le passé. Maintenant, c'est réglé, la
                            tasse Ember garde mon café chaud toute la journée.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Outils pour le developpement web">
                        <Tool title="Webstorm">
                            J'ai commencé à utiliser Webstorm quand j'ai débuté en développement web. Depuis, je n'ai
                            jamais eu besoin d'un autre IDE. J'ai essayé VSCode, mais pour le rendre aussi puissant que
                            Webstorm, il vous faudra des tonnes de plugins...
                        </Tool>
                        <Tool title="IntelIJ Idea">
                            Tout comme pour Webstorm, j'ai commencé le développement Java sur IntelliJ et je n'ai jamais
                            changé depuis. J'ai essayé Eclipse une fois, il m'a fallu trois semaines de vacances pour
                            m'en remettre.
                        </Tool>
                    </ToolsSection>
                    <ToolsSection title="Productivity">
                        <Tool title="Sunsama">
                            J'ai essayé des dizaines de listes de tâches et d'organisateurs quotidiens... Peut-être à
                            cause de mes symptômes de TDAH, mais aucun n'a fonctionné, sauf Sunsama. C'est le meilleur
                            organisateur jamais créé. Vous avez vos tâches pour la semaine, vous planifiez vos jours, et
                            vous ne perdez jamais le fil de vos tâches personnelles grâce à un backlog facile à
                            utiliser.
                        </Tool>
                        <Tool title="Spark">
                            De tout ce que j'ai testé, Spark est le meilleur lecteur d'e-mails sur le marché. Il me
                            permet de maintenir ma boîte de réception à zéro chaque jour, avec un concept d'e-mails
                            traités et reportés. Dommage que je ne puisse pas déplacer les e-mails directement dans
                            Sunsama avec une automatisation.
                        </Tool>
                        <Tool title="Arc Browser">
                            Tout le monde connaît Arc. C'est la révélation de 2023. Il n'a pas complètement changé ma
                            façon de naviguer sur Internet, mais il m'aide à garder mes onglets et mon processus de
                            navigation propres tout au long de la journée, ce qui est plutôt cool si vous êtes
                            désordonné avec les onglets comme moi.
                        </Tool>
                        <Tool title="Raycast">
                            J'ai découvert Raycast ce mois-ci. J'utilisais Alfred, mais Raycast est Alfred sous
                            stéroïdes. Un changement de jeu pour la productivité sur Mac, je fais pratiquement tout avec
                            mon clavier maintenant. Même le raccourci Command + T d'Arc peut être intégré, donc je fais
                            toute ma navigation à partir de là maintenant.
                        </Tool>
                    </ToolsSection>
                </div>
            </SimpleLayout>
        </>

    )
}
