import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ site }) => {
  const sitemapUrl = new URL('/sitemap.xml', site).toString()

  return new Response(
    `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapUrl}
`,
    { headers: { 'Content-Type': 'text/plain' } }
  )
}
