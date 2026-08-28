import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    thumbnails: z.array(z.string()).default([]),
    summary: z.string(),
    github: z.string().url().default(''),
    live: z.string().url().default(''),
    tags: z.array(z.string()).default([]),
    kind: z.enum(['personal project', 'university coursework']).optional(),
    id: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { portfolio, blog };
