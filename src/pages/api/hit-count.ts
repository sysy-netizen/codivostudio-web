export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async ({ url }) => {
	const kv = env.VISITOR_COUNT;
	const shouldIncrement = url.searchParams.get('increment') === '1';

	let count = parseInt((await kv.get('total')) ?? '0', 10);
	if (shouldIncrement) {
		count += 1;
		await kv.put('total', String(count));
	}

	return new Response(JSON.stringify({ count }), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
		},
	});
};
