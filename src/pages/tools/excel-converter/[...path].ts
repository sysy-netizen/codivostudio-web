export const prerender = false;

import type { APIRoute } from 'astro';

const ORIGIN = 'https://excel-merge-five.vercel.app';
const BASE_PATH = '/tools/excel-converter';

// Python(Flask) 함수 2개만 Next.js basePath 적용이 안 돼서 origin에서
// prefix 없이 존재함. 나머지는 Next의 basePath가 이미 다 새겨놨으니
// 1:1 그대로(호스트만 교체) 전달.
const UNPREFIXED_API_PATHS = new Set([
	`${BASE_PATH}/api/naver-logen`,
	`${BASE_PATH}/api/coupang-logen`,
]);

export const ALL: APIRoute = async ({ request, url }) => {
	let targetPath = url.pathname;
	if (UNPREFIXED_API_PATHS.has(targetPath)) {
		targetPath = targetPath.slice(BASE_PATH.length);
	}
	const targetUrl = `${ORIGIN}${targetPath}${url.search}`;
	return fetch(new Request(targetUrl, request));
};
