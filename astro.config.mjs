// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
	// TODO: 실제 도메인이 정해지면 site 값을 채워주세요 (sitemap/canonical URL에 사용됨)
	// site: 'https://yourdomain.com',
	integrations: [pagefind()],
});
