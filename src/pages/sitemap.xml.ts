import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORY_SLUGS } from '../lib/blogCategories';

const staticPaths = [
	'/',
	'/tools/',
	'/tools/rank-tracker/',
	'/tools/keyword-analysis/',
	'/blog/',
	'/about/',
];

const categoryPaths = Object.values(CATEGORY_SLUGS).map((slug) => `/blog/category/${slug}/`);

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection('blog');
	const postPaths = posts.map((post) => `/blog/${post.id}/`);
	const paths = [...staticPaths, ...categoryPaths, ...postPaths];

	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${new URL(path, site)}</loc>\n\t</url>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' },
	});
};
