import type { APIRoute } from 'astro'
import { siteConfig } from '../config/site'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const news = (await getCollection('news'))
    .filter(n => !n.data.draft)
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime())
    .slice(0, 20)

  const items = news.map(item => {
    const link = `${siteConfig.url}/news/${item.slug || item.id}`
    const date = new Date(item.data.publishedAt).toUTCString()
    return `
    <item>
      <title><![CDATA[${item.data.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${item.data.description}]]></description>
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type:': 'application/rss+xml' },
  })
}
