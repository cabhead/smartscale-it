import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// ── Base schema shared across collections ──────────────────────────
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
  // E-E-A-T
  reviewedBy: z.string().optional(),
  sources: z.array(z.string()).default([]),
  // Affiliate
  affiliateUrl: z.string().url().optional(),
  affiliateLinks: z.array(z.object({
    url: z.string().url(),
    label: z.string(),
    tool: z.string().optional(),
  })).default([]),
  // FAQ for AI visibility + FAQPage Schema
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
})

// ── Tool Review ────────────────────────────────────────────────────
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

// ── Vergleich ──────────────────────────────────────────────────────
const vergleichSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tool1: z.object({
    name: z.string(),
    slug: z.string(),
    affiliateUrl: z.string().url().optional(),
  }),
  tool2: z.object({
    name: z.string(),
    slug: z.string(),
    affiliateUrl: z.string().url().optional(),
  }),
  winner: z.enum(['tool1', 'tool2', 'tie']).optional(),
  verdict: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
})

// ── Lexikon ────────────────────────────────────────────────────────
const lexikonSchema = z.object({
  term: z.string(),
  abbreviation: z.string().optional(),
  short: z.string(),
  category: z.enum(['Modelle', 'Technik', 'Konzepte', 'Tools', 'Agenten', 'Business']),
  related: z.array(z.string()).default([]),
  publishedAt: z.coerce.date().optional(),
})

// ── Collections ────────────────────────────────────────────────────
export const collections = {
  tools: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
    schema: toolSchema,
  }),
  news: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
    schema: baseSchema,
  }),
  tutorials: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
    schema: baseSchema,
  }),
  vergleiche: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/vergleiche' }),
    schema: vergleichSchema,
  }),
  lexikon: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lexikon' }),
    schema: lexikonSchema,
  }),
  agents: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/agents' }),
    schema: baseSchema,
  }),
  automation: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/automation' }),
    schema: baseSchema,
  }),
  business: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/business' }),
    schema: baseSchema,
  }),
  'case-studies': defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
    schema: baseSchema,
  }),
}

// Helper types
export type ToolEntry = typeof toolSchema._type
export type VergleichEntry = typeof vergleichSchema._type
export type ArticleEntry = typeof baseSchema._type
