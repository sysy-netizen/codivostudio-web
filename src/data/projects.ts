import type { Project } from "@/types/project";

/**
 * 프로젝트 단일 소스. 새 항목을 추가하면 목록·상세·sitemap이 자동 반영된다.
 * published: false 는 모든 공개 목록/상세에서 제외된다.
 * 실제로 존재하는 링크만 입력할 것.
 */
export const projects: Project[] = [
  {
    id: "excel-converter",
    slug: "bulk-shipping-excel-converter",
    title: "대량발송 엑셀변환기",
    summary: "네이버·쿠팡 주문 파일과 택배 송장 파일을 자동으로 매칭해 하나로 합쳐줍니다.",
    description:
      "온라인 셀러가 주문 엑셀과 송장 엑셀을 수작업으로 대조하던 과정을 자동화한 웹 도구입니다.",
    type: "tool",
    category: "smartstore",
    status: "live",
    // TODO: 실제 사용 기술 확인 후 수정
    technologies: ["Python", "Excel", "Next.js"],
    problem: "주문 파일과 송장 파일을 사람이 직접 대조·병합하는 반복 작업이 필요했습니다.",
    solution: "주문 파일과 송장 파일을 업로드하면 자동으로 매칭해 하나의 파일로 병합합니다.",
    features: ["네이버·쿠팡 주문 파일 지원", "택배 송장 파일 자동 매칭", "병합된 엑셀 파일 다운로드"],
    // TODO: 스크린샷을 /public/images/projects/ 에 추가하고 thumbnail/screenshots 지정
    publicUrl: "https://excel.codivostudio.com/tools/excel-converter",
    featured: true,
    published: true,
    publishedAt: "2026-10-27",
  },
  {
    id: "margin-calculator",
    slug: "margin-calculator",
    title: "마진/정산 계산기",
    summary: "원가와 비용을 넣어 판매가를 정하거나, 정한 판매가의 예상 마진을 확인합니다.",
    description:
      "네이버 스마트스토어 셀러가 상품 등록 전에 판매가와 마진을 계산할 수 있는 웹 도구입니다. 일반과세자 기준으로 부가세와 수수료를 반영합니다.",
    type: "tool",
    category: "smartstore",
    status: "live",
    technologies: ["Next.js", "TypeScript"],
    problem: "상품을 등록하기 전에 수수료, 부가세, 택배비까지 감안한 판매가와 마진을 일일이 계산해야 했습니다.",
    solution: "원가와 비용을 입력하면 목표 마진에 맞는 판매가를, 판매가를 입력하면 예상 마진을 바로 계산합니다.",
    features: [
      "목표 마진율 또는 목표 순이익에서 판매가 계산",
      "판매가에서 예상 마진 계산",
      "부가세·택배비·결제/판매 수수료율 반영",
      "판매가 올림 단위 설정",
    ],
    publicUrl: "https://margin-calculator-lime.vercel.app/tools/margin-calculator",
    featured: true,
    published: true,
    publishedAt: "2026-10-28",
  },
];
