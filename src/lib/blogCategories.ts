export const CATEGORY_SLUGS: Record<string, string> = {
	AI: 'ai',
	'업무 자동화': 'automation',
	'자동차 데이터': 'car-data',
	'온라인 셀러': 'online-seller',
	'Codivo Studio 개발기': 'dev-log',
};

export function categoryHref(category: string): string {
	const slug = CATEGORY_SLUGS[category];
	return slug ? `/blog/category/${slug}/` : '/blog/';
}
