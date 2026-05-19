import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  author: z.string().default('smartscale Redaktion'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  coverImage: z.string().optional(),
  reviewedBy: z.string().optional(),
  sources: z.array(z.string()).default([]),
  affiliateUrl: z.string().url().optional(),
  affiliateLinks: z.array(z.object({
    url: z.string().url(),
    label: z.string(),
    tool: z.string().optional(),
  })).default([]),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
})

const toolSchema = baseSchema.extend({
  toolName: z.string(),
  officialUrl: z.string().url(),
  pricing: z.enum(['free', 'paid', 'freemium']).default('paid'),
  priceNote: z.string().optional(),
  freePlan: z.boolean().default(false),
  rating: z.number().min(0).max(5).optional(),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  bestFor: z.string().optional(),
  alternatives: z.array(z.string()).default([]),
  affiliateAvailable: z.boolean().default(false),
})

const vergleichSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tool1: z.object({ name: z.string(), slug: z.string(), affiliateUrl: z.string().url().optional() }),
  tool2: z.object({ name: z.string(), slug: z.string(), affiliateUrl: z.string().url().optional() }),
  winner: z.enum(['tool1', 'tool2', 'tie']).optional(),
  verdict: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
})

export const collections = {
  tools: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/tools' }), schema: toolSchema }),
  news: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }), schema: baseSchema }),
  tutorials: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/tutorials' }), schema: baseSchema }),
  vergleiche: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/vergleiche' }), schema: vergleichSchema }),
  agents: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/agents' }), schema: baseSchema }),
  automation: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/automation' }), schema: baseSchema }),
  business: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/business' }), schema: baseSchema }),
  'case-studies': defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }), schema: baseSchema }),
}
