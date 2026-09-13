# Codivo Studio 사이트 구축 로드맵 (Astro / Cloudflare)

> 목표: codivostudio.com을 **Astro 정적 사이트 + Cloudflare Pages**로 구축.
> 메뉴는 `홈 / 도구 / 블로그 / 소개` 4개. 도구는 각각 **별도 페이지에서 iframe 1개씩** 실행
> (한 페이지에서 여러 iframe 동시 로드 금지 — 이 원칙은 워드프레스 계획에서 그대로 승계).
> 애드센스 수익화가 1차 목표. 호스팅/도메인 비용 최대한 무료로 운영.

---

## 목차

1. [이전 계획(워드프레스) 대비 승계 사항](#이전-계획워드프레스-대비-승계-사항)
2. [✅ 완료된 작업](#-완료된-작업)
3. [🔜 다음 작업 (우선순위 순)](#-다음-작업-우선순위-순)
4. [SEO 완료 체크리스트](#seo-완료-체크리스트)
5. [블로그 목표](#블로그-목표)
6. [다른 환경에서 이어서 진행하는 법](#다른-환경에서-이어서-진행하는-법)
7. [참고 자료](#참고-자료)
8. [Claude 작업 규칙](#claude-작업-규칙)

---

## 이전 계획(워드프레스) 대비 승계 사항

`G:\내 드라이브\Projects\seller_dealer\docs\` 에 있던 워드프레스 계획에서 **그대로 재사용하는 것**:

- 사이트 구조(홈/도구/블로그/소개), 도구 3개(랭킹추적/키워드분석/대량발송 엑셀변환기)
- 도구별 별도 페이지 + iframe 1개씩 원칙
- 컬러 시스템 (`#FAFAFA` / `#111827` / `#2563EB` / `#FD7125`)
- About/Contact 카피 원문
- **이미 배포 완료된 도구 자산** (아래 "완료된 작업 > 도구 자체 배포" 참고, 재작업 불필요)

**폐기하는 것**: 워드프레스, Gutenberg, Elementor, 워드프레스 유료 호스팅/SSL 계획 전체.

---

## ✅ 완료된 작업

### A. 도구 자체 배포 (워드프레스 계획 때 이미 끝낸 작업, 그대로 유효)

- [x] `naver_rank_tracker` GitHub 업로드 → `https://github.com/sysy-netizen/codivo-tools.git` (main)
- [x] Vercel 배포 → `https://tools.codivostudio.com/` (커스텀 도메인 연결, 200 OK 확인, CNAME 가비아 DNS 등록)
- [x] `next.config.ts`에 iframe 허용(CSP `frame-ancestors: codivostudio.com`) 설정 완료
- [x] `invoice-merge`(Streamlit, 대량발송 엑셀변환기) GitHub(`sysy-netizen/invoice-merge`) main에 배포, Streamlit Cloud 자동 재배포
- [x] Streamlit 앱 iframe 차단 헤더(X-Frame-Options/CSP) 없음을 curl로 확인

### B. Astro 사이트 스캐폴딩 (2026-07-29, 이 프로젝트에서 신규 진행)

- [x] Astro 프로젝트 생성 (`C:\MECRO\codivostudio-web`, Google Drive 동기화 폴더 피해서 로컬 경로에 생성)
  - 주의: Google Drive 동기화 폴더(`G:\내 드라이브\...`)에서 `npm install` 시 EPERM/EBADF 에러로 설치 실패함.
    반드시 로컬 드라이브(`C:\...`)에 생성할 것.
- [x] `BaseLayout.astro` / `Header.astro`(홈·블로그·도구 링크) / `Footer.astro` 작성
- [x] 홈페이지 뼈대 (`src/pages/index.astro`) — 히어로 + 애드센스 placeholder
- [x] 블로그 Content Collection 설정 (`src/content.config.ts`) + 샘플 글 2개
- [x] 블로그 목록(`src/pages/blog/index.astro`) / 상세(`src/pages/blog/[id]/index.astro`) 페이지
- [x] Pagefind 검색 연동 및 동작 확인 (`npm run build` 후 로컬 프리뷰에서 검색 테스트 완료)
- [x] `npm run build` 성공 확인, Git 초기화 완료 (커밋은 아직 — 사용자 확인 후 진행)

### C. 배포 및 콘텐츠 (실행 순서 1~12)

1. [x] Git 첫 커밋 생성 (2026-07-29, `2dfeeac`)
2. [x] GitHub 저장소 생성 및 push (2026-07-29) → https://github.com/sysy-netizen/codivostudio-web (main)
3. [x] Cloudflare 계정 생성, 가비아 도메인(`codivostudio.com`) 네임서버를 Cloudflare로 이전 (2026-07-29)
   - 가비아 네임서버 → `leland.ns.cloudflare.com` / `savanna.ns.cloudflare.com` 변경 완료 (전파 대기 중)
   - `tools.codivostudio.com` CNAME(`cname.vercel-dns.com`, DNS only)을 Cloudflare DNS에 추가 완료 — 스캔 누락분, 수동 추가함
   - 기존 Hiworks 메일 MX/TXT(SPF) 레코드는 Cloudflare DNS로 그대로 이전됨
   - **전파 확인 완료** (2026-07-29, 8번 항목에서 이어서 확인): `nslookup -type=NS codivostudio.com` → Cloudflare 네임서버(`leland`/`savanna`)로 정상 응답
4. [x] Cloudflare Pages 프로젝트 생성 → GitHub 저장소 연동 → 자동 배포 확인 (2026-07-29)
   - Cloudflare 계정 이메일 인증 완료, GitHub OAuth 연동(리포지토리 `codivostudio-web`만 권한 허용)
   - 신형 Workers 통합 배포 방식이라 `wrangler.jsonc`(정적 자산 `./dist`) 추가 필요 — 저장소에 커밋/푸시 완료
   - 프로젝트명 `codivostudio-web`, Build command `npm run build`, Deploy command `npx wrangler deploy`
   - 배포 성공 확인: https://codivostudio-web.gkms1216.workers.dev
   - 커스텀 도메인 연결: `codivostudio.com`, `www.codivostudio.com` (기존 가비아 파킹 A레코드 삭제 후 연결)
   - `https://codivostudio.com` 실제 접속 확인 완료 (네임서버 전파 완료된 상태)
5. [x] 홈페이지 실제 콘텐츠 작성 (seller_dealer의 `home.html` 카피/구조를 Astro 컴포넌트로 이식) (2026-07-29)
   - Hero, Tools 소개 카드 3개, About 요약, CTA 문의 섹션 반영 완료
   - 컬러 시스템 변수 `--color-bg-alt`(#FAFAFA), `--color-highlight`(#FD7125) BaseLayout에 추가
   - 풀블리드(전체 폭) 배경 섹션 구현, 가로 스크롤 버그 수정 후 로컬 프리뷰로 데스크톱/모바일 확인 완료
6. [x] `/tools` 페이지 제작 (카드 3개, 링크만, iframe 없음) (2026-07-29)
7. [x] `/tools/rank-tracker`, `/tools/keyword-analysis`, `/tools/invoice-converter` 페이지 제작 (iframe 각 1개) (2026-07-29)
   - 헤더 네비게이션 "도구"를 외부 새탭 링크 대신 내부 `/tools/`로 변경
   - `tools.codivostudio.com`은 CSP `frame-ancestors`가 codivostudio.com만 허용 — 로컬(localhost) 프리뷰에서는 iframe이 정상적으로 안 보이는 게 의도된 동작(배포 도메인에서만 임베드 확인 가능)
   - curl로 프로덕션 HTML의 iframe src 3개 모두 정상 삽입 확인. 브라우저 프리뷰 도구 오류로 실제 렌더링 스크린샷 재확인은 못함 — 실사용 시 육안 확인 권장
8. [x] `/about` 페이지 제작 (About 카피 + Contact 섹션) (2026-07-29)
   - Mission / Who We Build For / Philosophy(4개) / Contact 섹션 모두 반영
   - Contact는 사용자 확인 후 mailto 버튼만 사용하기로 결정 (Formspree 등 폼 서비스 연동 안 함)
   - 헤더 네비게이션에 "소개" 링크 추가
9. [x] 컬러 시스템 전체 적용 (`#FAFAFA`/`#111827`/`#2563EB`/`#FD7125`) (2026-07-29)
   - Primary(`#2563EB`)/Accent(`#FD7125`)는 이미 대부분 페이지에 적용된 상태였음, 점검 결과 두 가지 불일치만 발견
   - `--color-text`를 `#1a1a1a` → `#111827`(스펙값)로 수정 (BaseLayout.astro)
   - `.eyebrow--light`(CTA/Contact 섹션 "CONTACT" 라벨)에 팔레트에 없는 `#4f8cff`가 하드코딩되어 있던 것을
     다른 다크 섹션 강조색과 동일하게 `var(--color-highlight)`(#FD7125)로 통일 (index.astro, about/index.astro)
   - Background(`#FAFAFA`)는 `--color-bg-alt`로 섹션/카드 배경에 이미 폭넓게 적용되어 있어 유지
     (본문 기본 배경은 흰색 유지 — 섹션 간 명암 대비를 위한 의도된 구조, seller_dealer 계획과 동일한 결과물)
   - `npm run build` 성공(9 페이지), 로컬 프리뷰에서 컴퓨티드 스타일로 값 확인 완료
10. [x] 실제 블로그 글 작성 (2026-07-29)
    - 샘플 글 2개(`welcome-to-the-blog.md`, `sample-second-post.md`) 삭제, 실제 글 10편으로 교체 완료
    - 5개 카테고리(AI/업무자동화/자동차데이터/온라인셀러/개발기) 목표대로 작성, 최소 10개 목표 달성
    - 각 글마다 title/description/slug/tags(SEO 메타데이터) 작성, 가능한 경우 실제 도구(랭킹추적/키워드분석/송장변환기) 페이지로 자연스럽게 내부 링크 연결 — 3개 도구 모두 전용 글 확보
    - `npm run build` 성공(17페이지), 로컬 프리뷰에서 10편 전체 렌더링 및 `/blog/` 목록 노출 확인
    - **주의**: "자동차 실무자가 매일 반복하는 차량 정보 조회, 자동화가 필요한 이유" 글은 실제 소스(외부 서비스명, 실사용 경험) 없이 테스트용으로 작성됨 — 실제 발행 전 재검토 필요
11. [x] SEO 기본 설정 (2026-07-29)
    - `astro.config.mjs`에 `site: 'https://codivostudio.com'`, `prefetch: true` 추가
    - `BaseLayout.astro`에 canonical/robots/author/keywords(선택)/Open Graph/Twitter Card/WebSite+Organization JSON-LD 전체 추가
    - `src/pages/sitemap.xml.ts`(직접 구현, 라이브러리 미사용), `public/robots.txt`, `src/pages/404.astro` 신규 작성
    - RSS는 Astro 공식 `@astrojs/rss` 설치 후 `src/pages/rss.xml.ts`로 구현 (유일하게 추가한 의존성)
    - 블로그 글 스키마에 `category` enum(5개 카테고리) 추가, 기존 글 10편 frontmatter 전부 반영
    - 블로그 상세 페이지에 BlogPosting JSON-LD 추가, 도구 서브페이지 3개 + 블로그 글 10편(카테고리 쌍)에 내부 링크 보강
    - `public/og-default.svg` 기본 OG 이미지 추가 — **SVG 임시본**, 일부 SNS 플랫폼 호환성 문제 있어 추후 PNG/JPG(1200×630)로 교체 필요
    - 이미지 SEO(alt/width/height)는 사이트에 `<img>` 태그가 전무해 적용 대상 없음 — 실제 이미지 추가 시 반영 필요
    - `npm run build` 성공(18페이지), 로컬 프리뷰에서 sitemap.xml/robots.txt/rss.xml/404/OG 이미지/JSON-LD 렌더링 확인
12. [x] Google Search Console 등록 (2026-07-29)
    - 속성 유형: URL 접두어(`https://codivostudio.com`), 소유권 확인: HTML 태그 방식
    - 최초 시도한 HTML 파일 업로드 방식은 실패 — Cloudflare 정적 자산 호스팅이 `.html` 요청을 확장자 없는 경로로 307 리다이렉트해 Google 인증에 실패함. `html_handling` 전역 설정 변경은 사이트 전체 트레일링 슬래시 라우팅(`/about/` 등)을 깨뜨릴 위험이 있어, HTML 태그 방식(`BaseLayout.astro`에 `google-site-verification` 메타 태그 추가)으로 전환해 해결
    - 소유권 확인 완료 → 사이트맵(`sitemap.xml`) 제출 → "성공"(URL 17개) 확인
    - URL 검사에서 홈페이지가 이미 색인 생성돼 있음을 확인, 최신 버전 재크롤링을 위해 색인 생성 요청 진행
    - curl로 Googlebot User-Agent 시뮬레이션하여 `sitemap.xml`이 Cloudflare에 의해 차단되지 않음을 별도 확인
13. [x] `tools.codivostudio.com` DNS 장애 대응 (2026-07-29)
    - 증상: `/tools/rank-tracker/` 등 도구 서브페이지의 iframe이 로드되지 않고 에러처럼 보임
    - 원인: `tools.codivostudio.com` CNAME 레코드가 Cloudflare DNS에서 사라져 NXDOMAIN 상태였음 (Google/Cloudflare 공용 DNS로 교차 확인)
    - 조치: 사용자가 Cloudflare 대시보드에서 CNAME(`tools` → `cname.vercel-dns.com`, DNS only) 재추가 → 전파 확인, `tools.codivostudio.com` 200 OK 및 `frame-ancestors` CSP 정상 확인
14. [x] 도구 서브페이지 iframe 풀블리드(화면 전체 폭) 적용 (2026-07-29)
    - 랭킹추적/키워드분석/송장변환기 3개 페이지의 `.tool-page__frame`에 홈페이지와 동일한 풀블리드 기법(`100vw` + 음수 마진) 적용, 제목/설명 텍스트는 기존 정렬 폭 유지
    - `npm run build` 성공, Playwright로 로컬 스크린샷 촬영해 iframe 박스가 화면 좌우 끝까지 확장되는지 확인 (iframe 내부 콘텐츠는 로컬 CSP 제약으로 배포 도메인에서만 최종 확인 가능)
15. [x] 도구 서브페이지 텍스트/여백 다듬기 + 도구 전환 버튼 추가 + 송장변환기 재배포 (2026-07-29)
    - 설명 문구(`.tool-page__desc`) 한 줄 표시되도록 `max-width: 52ch` 제한 제거, "관련 글" 줄은 `.tool-page__related`로 분리해 더 작은 글씨(0.85rem)로 조정
    - 헤더~제목 사이 상단 여백을 `.tool-page` 패딩/음수 마진으로 절반가량 축소
    - 3개 도구 페이지 모두에 "다른 도구로 이동" 버튼형 내비게이션(`.tool-switcher`) 추가 — 관련 글 아래, iframe 위에 배치, 현재 페이지는 강조 표시
    - `codivo-tools`(랭킹추적/키워드분석 Next.js 앱, 별도 저장소) `NavBar.tsx`에서 "송장 변환기" 외부 링크 탭 제거 (송장변환기는 별도 프로그램이라 자체 페이지에서만 접근하도록 정리)
    - **송장변환기 Streamlit 앱 재배포**: 기존 앱(`invoice-merge-hi9x7xuzmxwreckiq4vnr6.streamlit.app`)이 Streamlit Cloud 인증 리다이렉트 무한 루프(`ERR_TOO_MANY_REDIRECTS`) 버그에 빠져 서비스 불가 상태가 됨 — Hugging Face Spaces 이전을 시도했으나 신규 계정이 이메일 인증 전이라 Streamlit/Gradio/Docker SDK가 잠겨있어(Static만 무료) 보류, 대신 같은 GitHub 저장소(`sysy-netizen/invoice-merge`)로 Streamlit Cloud에 새 이름(`invoice-merge-codivo.streamlit.app`)으로 재배포해 정상화 확인 후 iframe `src` 갱신
    - `npm run build` 성공, 로컬 프리뷰 및 Playwright 스크린샷으로 3개 페이지 레이아웃/전환 버튼 확인, 신규 Streamlit URL은 curl(차단 헤더 없음)과 Playwright(정상 로드, 무한루프 없음)로 검증
    - **⚠️ 배포 후 재확인 결과 미해결**: 새 앱을 직접 새 탭으로 열면 정상 작동하지만, `codivostudio.com` 안에 iframe으로 넣으면 동일한 인증 리다이렉트 무한 루프(`ERR_TOO_MANY_REDIRECTS`)가 다시 발생함. Playwright로 직접 접속 vs iframe 임베드를 나란히 비교해 확인 — **앱 상태 문제가 아니라 Streamlit Community Cloud가 최근 추가한 인증/분석 절차가 크로스도메인 iframe 안에서 세션 쿠키 핸드셰이크를 못 끝내는 플랫폼 차원의 구조적 문제**로 결론. 재배포로는 해결 안 됨
16. [x] 다른 환경 작업분 반영(Seller Tools 프로그램 내비게이션 리팩터링) + 내비 버그 수정 (2026-07-30)
    - 다른 환경에서 이미 `.git` 없이 진행돼 있던 작업(헤더를 "Seller Tools" 도구 탭 내비로 교체, 공용 도구 페이지/설명/관련글 마크업을 `ProgramLayout.astro`로 추출, `src/data/programs.ts` 데이터 기반 메뉴, 가격계산기 Coming Soon 페이지 추가)을 GitHub(`origin/main`) 위 새 커밋으로 반영 — `git init` 후 로컬 `main`을 `origin/main`에 연결하고 새 작업을 그 위 커밋으로 만들어 히스토리 보존
    - **버그 1**: 도구 탭 내비가 전역 `Header.astro`에 있어서 홈/블로그/소개 등 모든 페이지에서 사이트 메인 메뉴(홈/도구/블로그/소개) 대신 도구 탭이 뜨는 문제 발견 → `Header.astro`는 원래 메인 메뉴로 복원, 도구 탭 내비는 `ProgramLayout`에서만 렌더링하도록 이동
    - **버그 2**: `keyword-analysis`/`invoice-converter`/`price-calculator` 페이지가 아직 예전 `BaseLayout`을 직접 쓰고 있어 도구 탭 자체가 없어서 페이지마다 메뉴가 달라 보이는 문제 → 전부 `ProgramLayout` 기반으로 통일, 내비 마크업은 `src/components/ProgramNav.astro`로 공용 컴포넌트화
    - **버그 3**: "전체도구" 탭이 `/tools/`가 모든 하위 경로의 접두사라서 모든 도구 페이지에서 항상 활성 표시되던 것 수정
17. [x] 송장변환기 iframe 임베드 포기 → 외부 링크(새 탭)로 전환, `/tools/invoice-converter/` 페이지 삭제 (2026-07-30)
    - 16번(2026-07-29)에서 결론 내린 구조적 문제(Streamlit Cloud 인증이 크로스도메인 iframe 안에서 무한 루프)에 대한 최종 결정: iframe 유지 시도를 접고, 도구 자체를 외부(`https://invoice-merge-codivo.streamlit.app/`) 링크로 전환
    - `src/pages/tools/invoice-converter/` 라우트 삭제, 참조하던 6곳 모두 외부 링크로 교체: `programs.ts`(도구 탭, `external: true` 플래그 추가), `tools/index.astro`·`index.astro`의 도구 카드, `sitemap.xml.ts`의 정적 경로 목록, 블로그 글 2편(`naver-coupang-order-invoice-merge-automation.md`, `excel-macro-automation-without-coding.md`) 본문 내부링크
    - `ProgramNav.astro`에 `external` 프로그램은 `target="_blank" rel="noopener noreferrer"`로 열리고 활성 탭 표시 로직에서 제외되도록 처리
    - `npm run build` 성공(18페이지), 로컬 프리뷰로 도구 목록/홈페이지 카드/탭 내비 확인
    - **참고**: 기존에 Google Search Console에 색인된 `/tools/invoice-converter/` URL은 리다이렉트 없이 그대로 404 처리됨 (같은 사이트 내 대체 페이지가 없어 리다이렉트 대상이 마땅치 않음 — 검색 콘솔에서 자연 소멸 예정)
18. [x] 가격계산기(price-calculator) 도구 삭제 (2026-07-30)
    - 아직 Coming Soon placeholder 상태였던 도구를 프로젝트에서 완전히 제거하기로 결정
    - `programs.ts`에서 nav 항목 삭제, `src/pages/tools/price-calculator/` 라우트 삭제, 그 페이지에서만 쓰이던 `ComingSoon.astro` 컴포넌트(+빈 `components/ui/` 디렉터리)도 함께 삭제
    - `npm run build` 성공(17페이지)
19. [x] 블로그 카테고리 분류 기능 추가 (2026-07-30)
    - 기존 `content.config.ts`에 이미 있던 `category` 필드(5개 고정값)를 화면에 처음으로 노출 — 그동안 데이터만 있고 UI에서는 전혀 안 쓰이고 있었음
    - `src/lib/blogCategories.ts`: 카테고리명 ↔ URL slug 매핑(`AI→ai`, `업무 자동화→automation`, `자동차 데이터→car-data`, `온라인 셀러→online-seller`, `Codivo Studio 개발기→dev-log`)
    - `src/pages/blog/category/[slug]/index.astro` 신규: 카테고리별 전용 페이지(`getStaticPaths`로 5개 정적 생성), 해당 카테고리 글만 필터링
    - `BlogCategoryNav.astro`(전체+5개 카테고리 필터 탭), `BlogPostList.astro`(글 목록, 카테고리 배지 포함) 공용 컴포넌트로 추출해 `/blog/`와 카테고리 페이지에서 재사용
    - 글 상세 페이지(`blog/[id]/index.astro`)에도 카테고리 배지 추가, 클릭하면 해당 카테고리 페이지로 이동
    - `sitemap.xml.ts`에 카테고리 페이지 5개 URL 추가
    - `npm run build` 성공(22페이지), 로컬 프리뷰로 목록/카테고리 필터/상세 페이지 모두 확인

20. [x] Google Analytics(GA4) 연결 (2026-07-31)
    - GA4 속성 생성(측정 ID `G-QB214MSPH9`)은 사용자가 직접 만들어 알려줌
    - `codivostudio-web`: `BaseLayout.astro`의 `<head>`에 gtag.js 스니펫 추가 (Astro가 그대로 출력하도록 `is:inline` 지시자 사용)
    - `codivo-tools`(Next.js, 별도 저장소 `sysy-netizen/codivo-tools`): `src/app/layout.tsx`(루트 레이아웃)에 동일 측정 ID로 `next/script` 추가 — 랭킹추적(`/`)과 키워드분석(`/keyword`) 둘 다 이 레이아웃을 공유해서 한 번에 적용됨
    - **버그 발견 및 수정**: `/keyword` 라우트에 자체 `metadata`가 없어서 루트 레이아웃의 title("실시간 랭킹추적")을 그대로 물려받고 있었음 → GA4에서 두 페이지 방문이 타이틀 기준으로 하나로 뭉뚱그려 집계되는 문제. `page.tsx`가 클라이언트 컴포넌트라 `metadata`를 직접 export 할 수 없어, `src/app/keyword/layout.tsx`를 새로 만들어 `title: "연관 키워드 분석"` 지정. 빌드 후 두 라우트의 `<title>`이 각각 다르게 나오는 것 확인.
    - 참고: `codivo-tools` 커밋(`fe237c4`) 메시지 첫 줄이 `/keyword`로 시작해서 Git Bash(MSYS) 경로 자동변환 버그로 `C:/Program Files/Git/keyword...`로 깨져서 기록됨 — 코드 내용은 정상, 커밋 메시지 텍스트만 지저분함(이미 push된 뒤라 강제 push까지 해서 고치는 건 得失이 안 맞아 그대로 둠)
    - Excel Converter(Streamlit)는 GA4 연결 시도 안 함 — 아래 23번 참고 (플랫폼 제약으로 보류 결정)
    - 검증: 두 프로젝트 모두 `npm run build` 성공, 빌드 산출물에서 `G-QB214MSPH9` 스크립트 및 라우트별 고유 `<title>` 확인. `codivostudio.com` 배포 후 curl로 스크립트 태그 라이브 확인.
21. [x] 방문자 수 카운터 추가 + Cloudflare adapter(SSR) 전환 + 배포 명령 변경 (2026-07-31)
    - 홈페이지 히어로에 "누적 방문자 수" 실시간 카운터 추가 — Cloudflare Workers KV(`VISITOR_COUNT` 네임스페이스) 기반
    - `/api/hit-count` API 라우트(`src/pages/api/hit-count.ts`) 신규 — GET 요청 시 KV에서 현재 카운트 조회, `?increment=1`일 때만 +1 저장
    - 클라이언트 측: `sessionStorage`로 브라우저 세션당 1회만 increment 요청을 보내 새로고침 남용으로 인한 중복 집계 방지
    - 이 API 라우트 때문에 사이트가 순수 정적(static)에서 부분 SSR로 전환됨 — `astro.config.mjs`에 `@astrojs/cloudflare` 어댑터 추가(`imageService: 'passthrough'`)
    - `wrangler.jsonc` 구조 변경: `assets.directory`가 `./dist` → `./dist/client`로 변경, `kv_namespaces`에 `VISITOR_COUNT`(기존 ID 유지) + `SESSION`(Astro 세션 기능용, id 없이 선언 → 첫 배포 시 Wrangler가 자동 프로비저닝해 `codivostudio-web-session` 신규 생성함)
    - **배포 명령이 바뀜**: 기존에는 `npx wrangler deploy` 단독 실행이었으나, 이제 `package.json`에 `"deploy": "astro build && wrangler deploy --config dist/server/wrangler.json"` 스크립트를 추가함 — **앞으로는 `npm run deploy` 로 배포해야 카운터 API까지 함께 배포됨** (구 명령으로는 정적 파일만 배포되고 API 라우트가 누락될 수 있음)
    - 검증: `npm run deploy` 성공, `https://codivostudio.com/api/hit-count`가 curl로 `{"count":0}` 정상 응답, 홈페이지 방문자 카운터 마크업/스크립트 정상 렌더링 확인
22. [x] `/tools` 페이지 "누적 사용 횟수" 배지 추가 (2026-07-31)
    - 각 도구 카드에 "누적 사용 N회" 배지 추가 (`tools/index.astro`)
    - **자동 집계 아님** — 실사용 트래킹 인프라가 아직 없어서 각 도구 항목에 `uses: 0`으로 값만 넣어둔 상태. 나중에 실제 숫자를 파악하면 코드에서 그 값만 수동으로 바꿔서 재배포하는 방식
    - (도구별 실사용 자동 집계가 어려운 이유는 23번 항목 및 Excel Converter/Rank Tracker가 서로 다른 배포처에 있다는 구조적 제약 때문 — 방문자 수 집계와는 별개 문제)
23. [x] Rank Tracker Enter키 검색 추가 + 예시 문구 변경 + Excel Converter 재배포 가능성 조사 (2026-07-31)
    - `codivo-tools`: 랭킹추적기 키워드/스토어명 입력창에 Enter키로 조회 실행되도록 추가 (키워드분석 페이지에는 이미 있던 동작, 랭킹추적기에는 없어서 통일)
    - `codivo-tools`: 검색창 예시 placeholder를 실제적인 예시로 변경 (키워드: "종합비타민"→"3인치 다운라이트", 스토어명: "비타플랜"→"불빛조명"+실제 네이버 스마트스토어 상품 URL)
    - **Excel Converter(Streamlit) 관련 조사 및 결정**:
      - GA4 연결 시도: Streamlit이 `st.markdown`으로 삽입한 `<script>` 태그를 브라우저가 실행하지 않음(innerHTML 삽입 방식의 브라우저 표준 동작) + 커뮤니티 조사 결과 "유일하게 확실한 방법은 Docker 빌드 시점에 Streamlit 정적 HTML을 `sed`로 패치"뿐인데, 현재 배포처인 Streamlit Community Cloud는 커스텀 Dockerfile을 지원하지 않음 → **GA4 연결 보류**
      - Vercel 배포 가능 여부 조사: Streamlit은 세션마다 상시 구동되는 Python 프로세스 + WebSocket이 필요한데, Vercel은 서버리스 함수 기반 플랫폼(2026-06 WebSocket 베타 추가됐지만 인스턴스 고정/브로드캐스트 불가 등 제약 큼) → **구조적으로 배포 불가**. Vercel 공식 자료도 "Streamlit/Flask 미지원, 백엔드를 서버리스 함수로 재작성 필요"라고 명시
      - **결론/결정**: 위 문제(GA4, Vercel, 헤더 링크 이슈 등)를 근본적으로 해결하려면 Excel Converter를 Rank Tracker/Keyword Analysis처럼 **Next.js 앱으로 재구축**(기존 Python 변환 로직 `file_reader`/`key_builder`/`matcher`/`writer`/`coupang_logen`은 API 라우트로 그대로 이식)하는 것이 정공법 — 사용자가 **"추후진행"으로 결정, 지금은 보류**
    - 헤더 링크 새 창/같은 창 이슈: `invoice-merge` 저장소 `app.py`에 codivostudio-web과 겉모양만 동일하게 복제한 헤더(코드 공유 아님, HTML/CSS 복제)를 넣었으나, Streamlit이 markdown 안 `<a>` 클릭을 자체적으로 가로채는 문제(z-index, stopPropagation, href 제거+JS 강제이동 등 여러 방법 시도)로도 해결 안 돼 최종적으로 `target="_blank"`(새 창) 방식으로 결정 — 관련 커밋 다수(`invoice-merge` 저장소 `6cc1bba` ~ `cfdffaa`)

---

## 🔜 다음 작업 (우선순위 순)

24. [ ] Excel Converter를 Next.js 앱으로 재구축
    - 23번에서 결정한 대로 Python 변환 로직을 API 라우트로 이식, 화면(업로드/진행상태/다운로드)을 Next.js로 새로 제작
    - 완료되면: Vercel 배포 가능, GA4 연결 가능, codivostudio-web 헤더와 완전히 동일한 헤더 적용 가능(현재는 겉모양만 복제한 상태)
    - **사용자가 "추후진행"으로 보류 결정 — 다음 세션에서 먼저 진행 여부를 확인할 것**
25. [ ] Google AdSense 신청 및 스크립트 삽입
    - **콘텐츠(블로그 글 작성)와 SEO 기본 설정이 끝난 뒤에 진행한다.** 콘텐츠 없이 먼저 신청하지 않음.

---

## SEO 완료 체크리스트

11번 항목("SEO 기본 설정")의 완료 기준 — **완료 (2026-07-29)**.

- [x] `site` 설정 (`astro.config.mjs`)
- [x] sitemap
- [x] robots.txt
- [x] canonical
- [x] Open Graph
- [x] Twitter Card
- [x] JSON-LD
- [x] RSS
- [x] favicon
- [x] 404 페이지

---

## 블로그 목표

10번 항목("실제 블로그 글 작성")의 목표 — **완료 (2026-07-29, 10편 작성)**.

**목표**: 최소 10개의 실제 글 작성

**다루는 카테고리**
- AI
- 업무 자동화
- 자동차 데이터
- 온라인 셀러
- Codivo Studio 개발기

---

## 다른 환경에서 이어서 진행하는 법

> ⚠️ **2026-07-31 기준 중요 정정**: 이 프로젝트(`C:\MECRO\codivostudio-web`)에는 **현재 로컬에 `.git` 폴더가 없음**
> (`git status` → `not a git repository`). 과거 항목(1, 2, 16번)에서 GitHub(`sysy-netizen/codivostudio-web`)에
> 커밋/push했다는 기록이 있지만, 그 이후 어느 시점에 로컬 git 추적이 사라진 것으로 보이고, 오늘(20~23번) 작업한
> GA4/방문자 카운터/SSR 전환 등은 전부 **git에 커밋되지 않은 상태**다. 즉 지금은 GitHub 저장소와 동기화되어
> 있다고 가정하면 안 된다. 실제로 오늘 사용한 이어가기 방법은 아래 2번(폴더 복사)이다.

1. **현재 실제로 쓰고 있는 방법 — 폴더 통째로 복사**
   - `node_modules/`, `.astro/`, `dist/` (재생성 가능한 것들)만 제외하고 프로젝트 폴더 전체를 복사
   - 예: `C:\MECRO\codivostudio-web_업로드용` 폴더를 만들어 구글 드라이브에 업로드 → 다른 PC에서 다운받아 이어서 작업
   - 새 환경에서 받은 뒤 `npm install` 한 번 실행하면 `node_modules` 복원됨
2. **(권장, 아직 안 함) git 추적을 다시 살리는 것을 고려할 것**
   - 폴더 복사 방식은 변경 이력이 안 남고 되돌리기도 어려움 — 다음에 시간 날 때 `git init` 또는 기존 GitHub 저장소와 다시 연결하는 걸 검토 권장
3. 새 환경(또는 같은 환경 새 세션)에서 Claude Code를 이 폴더 경로로 열고
   "docs/ROADMAP.md 확인하고 이어서 진행해줘"라고 하면 이어서 진행 가능.
4. `docs/` 폴더의 `WEBSITE_MASTER.md` → `ROADMAP.md` → `CURRENT_TASK.md` 순서로 읽을 것.
5. 로컬 프리뷰 실행: `npm install` → `npm run dev` (또는 `.claude/launch.json`의 `codivostudio-web` 설정 사용)
6. **배포는 `npm run deploy`** (21번 항목 참고 — 예전 `npx wrangler deploy` 단독 실행이 아님). `npx wrangler whoami`로
   Cloudflare 로그인 상태 확인 필요, 로그인 안 돼 있으면 `npx wrangler login`으로 브라우저 인증 먼저 진행.
7. **워드프레스 관련 작업 지시가 나오면 이 문서를 우선한다** — `seller_dealer/docs`는 폐기된 이전 계획임.

### 연동된 별도 저장소 (이 프로젝트와 별개로 clone 필요)

이 사이트가 iframe/외부 링크로 연결하는 두 프로그램은 **완전히 다른 저장소·배포처**에 있다. 그쪽 작업까지
이어서 하려면 아래를 각각 별도로 clone해야 한다 (이번 세션에서는 임시 스크래치패드 폴더에 clone해서 작업함).

| 프로그램 | 저장소 | 배포처 | 기술 스택 |
|---|---|---|---|
| 랭킹추적기 / 키워드분석 | `https://github.com/sysy-netizen/codivo-tools` | Vercel (`tools.codivostudio.com`) | Next.js (App Router) |
| 엑셀변환기 | `https://github.com/sysy-netizen/invoice-merge` | Streamlit Community Cloud (`invoice-merge-codivo.streamlit.app`) | Python / Streamlit |

---

## 참고 자료

### iframe 소스 주소 (기존 배포 그대로 재사용)
- 랭킹추적: `https://tools.codivostudio.com/`
- 키워드분석: `https://tools.codivostudio.com/keyword`
- 송장변환기: `https://invoice-merge-codivo.streamlit.app/` (2026-07-29 재배포, 아래 15번 참고)

### 폐기된 이전 계획
`G:\내 드라이브\Projects\seller_dealer\docs\` 전체 (WEBSITE_MASTER.md, ROADMAP.md, CURRENT_TASK.md,
wordpress-content.md) — 워드프레스+Gutenberg 기반 계획, 2026-07-29부로 이 Astro 프로젝트로 대체됨.
카피/URL 등 재사용 가능한 내용만 [CONTENT.md](./CONTENT.md)로 옮겨왔음.

---

## Claude 작업 규칙

### 작업 시작 전

다음 네 가지를 먼저 설명한 뒤 작업을 시작한다.

- 현재 진행 상태
- 이번 작업 목표
- 수정 범위
- 예상 영향 범위

### 작업 완료 후

다음 여섯 가지를 보고한다.

- 수정한 파일
- 변경 내용
- 변경 이유
- 검증 방법
- 남은 TODO
- 다음 추천 작업
