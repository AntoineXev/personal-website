export async function GET() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aher.vet</loc>
    <priority>1</priority>
  </url>
</urlset>
`
    return new Response(sitemap, {
        status: 200,
        headers: {
            'content-type': 'text/xml',
        },
    })
}
