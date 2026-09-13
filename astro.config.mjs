// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://codivostudio.com',
	prefetch: true,
	integrations: [pagefind()],
	adapter: cloudflare({ imageService: 'passthrough' }),
});
