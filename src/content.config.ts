import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const feed = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/feed' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    link: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const collections = { articles, feed };
