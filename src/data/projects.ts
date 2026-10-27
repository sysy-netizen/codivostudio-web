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
    category: "automation",
    status: "live",
    // TODO: 실제 사용 기술 확인 후 수정
    technologies: ["Python", "Excel", "Next.js"],
    problem: "주문 파일과 송장 파일을 사람이 직접 대조·병합하는 반복 작업이 필요했습니다.",
    solution: "주문 파일과 송장 파일을 업로드하면 자동으로 매칭해 하나의 파일로 병합합니다.",
    features: ["네이버·쿠팡 주문 파일 지원", "택배 송장 파일 자동 매칭", "병합된 엑셀 파일 다운로드"],
    // TODO: 스크린샷을 /public/images/projects/ 에 추가하고 thumbnail/screenshots 지정
    // TODO: 운영 URL 접속 가능 여부 확인 (기존 사이트의 /tools/excel-converter 경로)
    publicUrl: "https://codivostudio.com/tools/excel-converter",
    featured: true,
    published: true,
    publishedAt: "2026-10-27",
  },
];
