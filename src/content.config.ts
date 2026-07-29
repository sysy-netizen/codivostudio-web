import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(['AI', '업무 자동화', '자동차 데이터', '온라인 셀러', 'Codivo Studio 개발기']),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog };
