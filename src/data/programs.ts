export interface Program {
	key: string;
	label: string;
	href: string;
	status?: 'live' | 'coming-soon';
	/** 'iframe': 외부 앱을 iframe으로 렌더링, 'native': 이 프로젝트 안에서 직접 렌더링 */
	mode?: 'iframe' | 'native';
	/** true면 사이트 밖 주소로 새 탭에서 열림 (자체 페이지 없음) */
	external?: boolean;
}

// Seller Tools 플랫폼의 프로그램 목록.
// 새 프로그램을 추가하려면 이 배열에 항목을 추가하면 Header 메뉴에 자동 반영됩니다.
export const programs: Program[] = [
	{ key: 'all-tools', label: '전체도구', href: '/tools/', status: 'live' },
	{ key: 'rank-tracker', label: '랭킹추적기', href: '/tools/rank-tracker/', status: 'live', mode: 'iframe' },
	{ key: 'keyword-analysis', label: '키워드분석', href: '/tools/keyword-analysis/', status: 'live', mode: 'iframe' },
	{
		key: 'excel-converter',
		label: '엑셀변환기',
		href: 'https://invoice-merge-codivo.streamlit.app/',
		status: 'live',
		external: true,
	},
];
