# Codivo Studio 사이트 구축 로드맵 (Astro / Cloudflare)

> 목표: codivostudio.com을 **Astro 정적 사이트 + Cloudflare Pages**로 구축.
> 메뉴는 `홈 / 도구 / 블로그 / 소개` 4개. 도구는 각각 **별도 페이지에서 iframe 1개씩** 실행
> (한 페이지에서 여러 iframe 동시 로드 금지 — 이 원칙은 워드프레스 계획에서 그대로 승계).
> 애드센스 수익화가 1차 목표. 호스팅/도메인 비용 최대한 무료로 운영.

---

## 이전 계획(워드프레스) 대비 승계 사항

`G:\내 드라이브\Projects\seller_dealer\docs\` 에 있던 워드프레스 계획에서 **그대로 재사용하는 것**:

- 사이트 구조(홈/도구/블로그/소개), 도구 3개(랭킹추적/키워드분석/대량발송 엑셀변환기)
- 도구별 별도 페이지 + iframe 1개씩 원칙
- 컬러 시스템 (`#FAFAFA` / `#111827` / `#2563EB` / `#FD7125`)
- About/Contact 카피 원문
- **이미 배포 완료된 도구 자산** (아래 "완료 — 도구 자체 배포" 참고, 재작업 불필요)

**폐기하는 것**: 워드프레스, Gutenberg, Elementor, 워드프레스 유료 호스팅/SSL 계획 전체.

---

## 진행 상황 (2026-07-29 기준)

**완료 — 도구 자체 배포 (워드프레스 계획 때 이미 끝낸 작업, 그대로 유효)**
- [x] `naver_rank_tracker` GitHub 업로드 → `https://github.com/sysy-netizen/codivo-tools.git` (main)
- [x] Vercel 배포 → `https://tools.codivostudio.com/` (커스텀 도메인 연결, 200 OK 확인, CNAME 가비아 DNS 등록)
- [x] `next.config.ts`에 iframe 허용(CSP `frame-ancestors: codivostudio.com`) 설정 완료
- [x] `invoice-merge`(Streamlit, 대량발송 엑셀변환기) GitHub(`sysy-netizen/invoice-merge`) main에 배포, Streamlit Cloud 자동 재배포
- [x] Streamlit 앱 iframe 차단 헤더(X-Frame-Options/CSP) 없음을 curl로 확인

**완료 — Astro 사이트 스켈레톤 (2026-07-29, 이 프로젝트에서 신규 진행)**
- [x] Astro 프로젝트 생성 (`C:\MECRO\codivostudio-web`, Google Drive 동기화 폴더 피해서 로컬 경로에 생성)
  - 주의: Google Drive 동기화 폴더(`G:\내 드라이브\...`)에서 `npm install` 시 EPERM/EBADF 에러로 설치 실패함.
    반드시 로컬 드라이브(`C:\...`)에 생성할 것.
- [x] `BaseLayout.astro` / `Header.astro`(홈·블로그·도구 링크) / `Footer.astro` 작성
- [x] 홈페이지 뼈대 (`src/pages/index.astro`) — 히어로 + 애드센스 placeholder
- [x] 블로그 Content Collection 설정 (`src/content.config.ts`) + 샘플 글 2개
- [x] 블로그 목록(`src/pages/blog/index.astro`) / 상세(`src/pages/blog/[id]/index.astro`) 페이지
- [x] Pagefind 검색 연동 및 동작 확인 (`npm run build` 후 로컬 프리뷰에서 검색 테스트 완료)
- [x] `npm run build` 성공 확인, Git 초기화 완료 (커밋은 아직 — 사용자 확인 후 진행)

---

## 다음 할 일 (실행 순서)

1. [x] Git 첫 커밋 생성 (2026-07-29, `2dfeeac`)
2. [x] GitHub 저장소 생성 및 push (2026-07-29) → https://github.com/sysy-netizen/codivostudio-web (main)
3. [x] Cloudflare 계정 생성, 가비아 도메인(`codivostudio.com`) 네임서버를 Cloudflare로 이전 (2026-07-29)
   - 가비아 네임서버 → `leland.ns.cloudflare.com` / `savanna.ns.cloudflare.com` 변경 완료 (전파 대기 중)
   - `tools.codivostudio.com` CNAME(`cname.vercel-dns.com`, DNS only)을 Cloudflare DNS에 추가 완료 — 스캔 누락분, 수동 추가함
   - 기존 Hiworks 메일 MX/TXT(SPF) 레코드는 Cloudflare DNS로 그대로 이전됨
4. [ ] Cloudflare Pages 프로젝트 생성 → GitHub 저장소 연동 → 자동 배포 확인
5. [ ] 홈페이지 실제 콘텐츠 작성 (seller_dealer의 `home.html` 카피/구조를 Astro 컴포넌트로 이식)
   - Hero, Tools 소개 카드 3개, About 요약, CTA 문의 섹션 — [CONTENT.md](./CONTENT.md) 참고
6. [ ] `/tools` 페이지 제작 (카드 3개, 링크만, iframe 없음)
7. [ ] `/tools/rank-tracker`, `/tools/keyword-analysis`, `/tools/invoice-converter` 페이지 제작 (iframe 각 1개)
   - iframe 소스 주소는 [CONTENT.md](./CONTENT.md) 참고 (이미 배포된 URL 그대로 사용)
8. [ ] `/about` 페이지 제작 (About 카피 + Contact 섹션)
   - 기존 WPForms 대신 정적 사이트용 폼 서비스 필요 (예: Formspree 무료 티어) — 방식 결정 필요
9. [ ] 컬러 시스템 전체 적용 (`#FAFAFA`/`#111827`/`#2563EB`/`#FD7125`)
10. [ ] 실제 블로그 글 채우기 (샘플 글 2개 교체/추가)
11. [ ] Google AdSense 신청 및 스크립트 삽입 (콘텐츠 어느 정도 쌓인 후 신청)
12. [ ] SEO 기본 설정 (sitemap, `astro.config.mjs`의 `site` 값 설정 — 현재 TODO로 남겨둠)

---

## 다른 환경에서 이어서 진행하는 법

1. 이 프로젝트는 **Google Drive 동기화 폴더가 아닌 로컬 경로**(`C:\MECRO\codivostudio-web`)에 있음.
   다른 컴퓨터에서 이어서 하려면 **Git/GitHub으로 동기화**해야 함 (Google Drive 동기화 방식 아님).
2. 새 환경에서 `git clone`으로 이 저장소를 받은 뒤, Claude Code를 그 폴더 경로로 열고
   "docs/ROADMAP.md 확인하고 이어서 진행해줘"라고 하면 이어서 진행 가능.
3. `docs/` 폴더의 `WEBSITE_MASTER.md` → `ROADMAP.md` → `CURRENT_TASK.md` 순서로 읽을 것.
4. 로컬 프리뷰 실행: `npm install` → `npm run dev` (또는 `.claude/launch.json`의 `codivostudio-web` 설정 사용)
5. **워드프레스 관련 작업 지시가 나오면 이 문서를 우선한다** — `seller_dealer/docs`는 폐기된 이전 계획임.

---

## 참고 자료

### iframe 소스 주소 (기존 배포 그대로 재사용)
- 랭킹추적: `https://tools.codivostudio.com/`
- 키워드분석: `https://tools.codivostudio.com/keyword`
- 송장변환기: `https://invoice-merge-hi9x7xuzmxwreckiq4vnr6.streamlit.app/`

### 폐기된 이전 계획
`G:\내 드라이브\Projects\seller_dealer\docs\` 전체 (WEBSITE_MASTER.md, ROADMAP.md, CURRENT_TASK.md,
wordpress-content.md) — 워드프레스+Gutenberg 기반 계획, 2026-07-29부로 이 Astro 프로젝트로 대체됨.
카피/URL 등 재사용 가능한 내용만 [CONTENT.md](./CONTENT.md)로 옮겨왔음.
