# 워드프레스 계획 원본 참고 (2026-07-29 보존)

`G:\내 드라이브\Projects\seller_dealer` 폴더 삭제 전에 옮겨온 원본 HTML입니다.
Astro 컴포넌트로 이미 이식된 `home.html`/`about.html`은 그대로 참고용으로만 보관하고,
아직 반영 안 된 더 상세한 버전이 있는 `tools.html`/`rank-tracker.html`은
현재 사이트 페이지를 개선할 때 참고하세요.

## 아직 반영 안 된 개선 아이디어

- **`tools.html`** — 현재 [`/tools` 페이지](../../src/pages/tools/index.astro)보다 카드 정보가 풍부함:
  - 카드별 부제(예: "네이버 검색 순위 확인 도구"), 대상(예: "온라인 셀러를 위한 도구"), "이용 가능" 상태 점(dot) 표시
  - 하단 안내 문구: "필요한 도구가 목록에 없나요? 문의해주세요 →" (`/about#contact` 연결)
- **`rank-tracker.html`** — 현재 [`/tools/rank-tracker` 페이지](../../src/pages/tools/rank-tracker/index.astro)보다 상세함:
  - 상단에 "조회 결과는 검색 시점과 네이버 검색 환경에 따라 달라질 수 있습니다" 같은 보조 안내 문구
  - iframe 아래 "프로그램이 정상적으로 표시되지 않으면 새 창에서 열어주세요" + 새 창 열기 버튼(폴백)
  - 하단 "다른 도구 보기"(`/tools`) / "문의하기"(`/about#contact`) 링크
  - iframe에 `allow="clipboard-read; clipboard-write"`, `referrerpolicy="strict-origin-when-cross-origin"` 속성
  - 반응형 높이: 데스크톱 `max(900px, 80vh)`, 태블릿 850px, 모바일 800px (현재는 고정 800px)
  - keyword-analysis/invoice-converter 페이지에도 동일한 패턴 적용 여지 있음 (원본은 rank-tracker만 존재)

## 이미 반영 완료 (참고용 보관)

- `home.html`, `about.html` — 카피/구조 전부 Astro로 이식 완료 ([index.astro](../../src/pages/index.astro), [about/index.astro](../../src/pages/about/index.astro))
