import type { APIRoute } from 'astro'
import { siteConfig } from '../config/site'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const allContent = [
    ...(await getCollection('tools')),
    ...(await getCollection('news')),
    ...(await getCollection('tutorials')),
    ...(await getCollection('vergleiche')),
  ]

  const urls = allContent
    .filter(item => !item.data.draft)
    .map(item => {
      const collection = item.collection
      const slug = item.slug || item.id
      return `  <url>\n    <loc>${siteConfig.url}/${collection}/${slug}</loc>\n    <lastmod>${item.data.updatedAt || item.data.publishedAt}</lastmod>\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/tools/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/news/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/vergleiche/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/tutorials/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/agents/</loc>
  </url>
  <url>
    <loc>${siteConfig.url}/lexikon/</loc>
  </url>
${urls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
