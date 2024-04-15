import { ArticleLayout } from '@/components/ArticleLayout'

// @ts-ignore
export const article = {
    author: 'Antoine Hervet',
    date: '2024-04-14',
    title: 'Pourquoi j\'ai créé Xev.',
    slug: 'pourquoi-j-ai-cree-xev',
    description:
        'J\'ai fondé Xev. pour offrir aux PME et ETI des solutions personnalisées grâce au low-code, permettant une intégration et une évolution technologique adaptées à leurs besoins uniques, sans les contraintes.',
}

export const metadata = {
    title: article.title,
    description: article.description,
}

export default function ArticlePage () {
    return (
        <ArticleLayout article={article}>
            <p>Depuis mon plus jeune âge, je suis fasciné par le potentiel des technologies à transformer notre vie
                quoti3>dienne. Ce n'est pas simplement la technologie en elle-même qui m'intéresse, mais ce que nous
                pouvons en faire. En grandissant et en explorant le monde du développement et de l'entrepreneuriat, j'ai
                rapidement compris que les PME et les ETI étaient souvent laissées pour compte dans cette révolution
                technologique rapide.</p>
            <h2 className="font-normal">
                Mon constat sur la technologie et les PME
            </h2>
            <p>J'ai observé que malgré l'évolution rapide des technologies, de nombreuses petites et moyennes
                entreprises ne parvenaient pas à en bénéficier pleinement. Elles étaient soit entravées par des
                solutions trop génériques qui ne correspondaient pas à leurs besoins spécifiques, soit par un manque de
                ressources pour développer des outils personnalisés. C'est ici que j'ai vu une opportunité non seulement
                de servir ces entreprises mais aussi de faire ce que j'aime le plus : innover.

            </p>
            <h2 className="font-normal">
                Le défi du no-code versus le low-code
            </h2>
            <p>
                J'ai été particulièrement attiré par le potentiel du low-code, une technologie que je considère comme
                révolutionnaire comparée au no-code. Le no-code peut certes ouvrir la porte à la technologie pour ceux
                qui n'ont pas de compétences en programmation, mais il enferme aussi les utilisateurs dans des limites
                rigides imposées par les plateformes, les rendant dépendants d'un fournisseur externe. En revanche, le
                low-code permet une personnalisation poussée et donne le contrôle aux entreprises, leur permettant de
                modifier et d'optimiser leur outillage au fur et à mesure que leurs besoins évoluent.
            </p>
            <h2 className="font-normal">
                Pourquoi Xev. embrasse le low-code
            </h2>
            <p>
                C'est pour cela que j'ai créé Xev. : pour aider les PME et les ETI à tirer parti de ces technologies
                avancées. Grâce au low-code, nous pouvons développer rapidement des applications métier sur mesure qui
                s'intègrent parfaitement aux processus uniques de chaque entreprise. Cette approche ne se contente pas
                d'ajouter de la valeur; elle transforme les opérations internes, alignant étroitement les technologies
                avec les stratégies d'affaires de nos clients.
            </p>
            <h2>
                L'impact de nos solutions personnalisées
            </h2>
            <p>
                En proposant ces solutions sur mesure, j'ai vu des entreprises se métamorphoser, devenant plus
                efficaces, agiles, et prêtes à affronter les défis de leur marché. Pour moi, Xev. n'est pas juste une
                entreprise de développement logiciel ; c'est un partenaire stratégique qui participe activement à
                l'essor de ses clients.

            </p>
            <h2 className="font-normal">
                En somme
            </h2>
            <p>
                Créer Xev. était pour moi une évidence, une façon de conjuguer ma passion pour la technologie avec mon
                désir d'avoir un impact réel sur le monde des affaires. Si vous êtes une PME ou une ETI et que vous
                voulez que la technologie travaille pour vous et non l'inverse, je vous invite à nous contacter.
                Ensemble, explorons comment nos solutions personnalisées peuvent vous aider à transformer votre
                entreprise.
            </p>
        </ArticleLayout>
    )
}
