import { BreadcrumbList, Graph, Thing } from "schema-dts";

function generateBreadCrumbs(slug: string) {
    const pathList = slug.split('/')
    let previousPaths: string[] = []
    const breadCrumbs: BreadcrumbList = {
        "@type": "BreadcrumbList",
        "itemListElement": pathList.map((path, index) => {
            const item = {
                "@type": "ListItem",
                "position": index,
                "name": "Antoine Hervet",
                "item": `https://aher.vet${previousPaths.reduce((slug, path) => `${slug}${path}/`, '')}${path}`
            } as Thing
            previousPaths.push(path)
            return item
        })
    }
    return breadCrumbs
}
export function Schema({things, slug}: {things: Thing[], slug?: string}) {
    let breadcrumbs;
    if (slug) {
        breadcrumbs = generateBreadCrumbs(slug)
    }
    const graph: Graph = {
        "@context": "https://schema.org",
        "@graph": breadcrumbs ? [...things, breadcrumbs] : things
    }
    return (
        <script
            type='application/ld+json'
            key={"product-jsonld-"+slug}
            dangerouslySetInnerHTML={{__html: JSON.stringify(graph)}}/>
    )
}
