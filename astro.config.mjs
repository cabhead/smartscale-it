import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://smartscale.it',
  integrations: [mdx(), sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
})
