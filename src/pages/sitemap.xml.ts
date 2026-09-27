import type { APIRoute } from 'astro';

const paths = [
	'/',
	'/tools/',
	'/tools/excel-converter/',
	'/about/',
];

export const GET: APIRoute = async ({ site }) => {
	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${new URL(path, site)}</loc>\n\t</url>`)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' },
	});
};
