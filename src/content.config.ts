import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			category: z.string(),
			excerpt: z.string(),
			cover: image(),
			coverAlt: z.string(),
			orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const books = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string(),
			yearRead: z.number().int(),
			completedDate: z.coerce.date().optional(),
			status: z.enum(['lido', 'lendo']),
			category: z.string().optional(),
			pages: z.number().int().optional(),
			favorite: z.boolean().default(false),
			rating: z.string().optional(),
			excerpt: z.string(),
			cover: image(),
			coverAlt: z.string(),
			quote: z.string().optional(),
			quotes: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(),
			year: z.number().int(),
			category: z.string(),
			excerpt: z.string(),
			stack: z.array(z.string()).default([]),
			repoUrl: z.string().url().optional(),
			demoUrl: z.string().url().optional(),
			cover: image(),
			coverAlt: z.string(),
			orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
			draft: z.boolean().default(false),
		}),
});

const gallery = defineCollection({
	loader: file('./src/content/gallery/items.json'),
	schema: ({ image }) =>
		z.object({
			id: z.string(),
			image: image(),
			orientation: z.enum(['horizontal', 'vertical']),
			titlePt: z.string(),
			titleEn: z.string(),
			locationPt: z.string().optional(),
			locationEn: z.string().optional(),
			date: z.string(),
			camera: z.string().optional(),
		}),
});

export const collections = {
	posts,
	books,
	projects,
	gallery,
};
