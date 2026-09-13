export interface Program {
	key: string;
	label: string;
	href: string;
	status?: 'live' | 'coming-soon';
	/** true면 사이트 밖 주소로 새 탭에서 열림 (자체 페이지 없음) */
	external?: boolean;
}

// Seller Tools 플랫폼의 프로그램 목록.
// 새 프로그램을 추가하려면 이 배열에 항목을 추가하면 Header 메뉴에 자동 반영됩니다.
export const programs: Program[] = [
	{ key: 'all-tools', label: '전체도구', href: '/tools/all-tools/', status: 'live' },
	{ key: 'excel-converter', label: '엑셀변환기', href: '/tools/excel-converter/', status: 'live' },
];
