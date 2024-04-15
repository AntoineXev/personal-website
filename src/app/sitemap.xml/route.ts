import { ArticleWithSlug, getAllArticles } from "@/lib/articles";

const EXTERNAL_DATA_URL = 'https://aher.vet/articles';

function generateSiteMap(posts: ArticleWithSlug[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://aher.vet</loc>
       <priority>1</priority>
     </url>
     <url>
       <loc>https://aher.vet/about</loc>
       <priority>0.8</priority>
     </url>
      <url>
       <loc>https://aher.vet/articles</loc>
       <priority>0.8</priority>
     </url>
      <url>
       <loc>https://aher.vet/projects</loc>
       <priority>0.8</priority>
     </url>
      <url>
       <loc>https://aher.vet/uses</loc>
       <priority>0.8</priority>
     </url>
     ${posts
        .map(({ slug }) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <priority>1</priority>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
}


export async function GET(req: Request) {
    const posts: ArticleWithSlug[] = await getAllArticles();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);
    return new Response(sitemap, {
        status: 200,
        headers: {
            'content-type': 'text/xml'
        },
    })
}
