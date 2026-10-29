export type Article = {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  slug: string
  /** 본문 문단 목록. 없으면 상세 페이지에서 기본 안내 문구를 보여준다. */
  content?: string[]
}

export const articles: Article[] = [
  {
    title: '잘 만든 인터페이스가 가진 조용한 힘',
    excerpt: '좋은 디지털 제품이 사람들이 생각하고, 선택하고, 자신 있게 움직일 여백을 만드는 이유',
    category: '디자인',
    date: 'October 24, 2026',
    readTime: '6분 읽기',
    slug: 'quiet-power-interface',
  },
  {
    title: '더 느리고 선명한 창작 습관 만들기',
    excerpt: '집중을 지키고 호기심을 위한 여백을 남겨 더 나은 결과물을 만드는 작은 안내서',
    category: '프로세스',
    date: 'October 12, 2026',
    readTime: '4분 읽기',
    slug: 'slower-sharper-practice',
  },
  {
    title: '캔버스 가장자리에서 얻은 기록',
    excerpt: '여백, 뚜렷한 관점, 그리고 시각 시스템을 인간적으로 만드는 디테일에 대하여',
    category: '스튜디오 노트',
    date: 'September 28, 2026',
    readTime: '8분 읽기',
    slug: 'edge-of-the-canvas',
  },
  {
    title: '작은 시스템이 만드는 의미 있는 진전',
    excerpt: '간단한 루틴이 흩어진 아이디어를 방향성 있는 작업으로 바꾸는 방법',
    category: '프로세스',
    date: 'September 09, 2026',
    readTime: '5분 읽기',
    slug: 'small-systems-momentum',
  },
  {
    title: '사이의 순간을 디자인하기',
    excerpt: '첫 클릭부터 마지막 디테일까지 경험의 감정을 좌우하는, 쉽게 지나치는 전환들',
    category: '디자인',
    date: 'August 21, 2026',
    readTime: '7분 읽기',
    slug: 'in-between-moments',
  },
]
