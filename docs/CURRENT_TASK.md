# CURRENT_TASK.md

> 이 문서는 **지금 진행 중인 작업의 스냅샷**만 기록한다 — 완료 이력, 상세 배경, 우선순위 전체 목록은
> [ROADMAP.md](./ROADMAP.md)가 기준 문서다. 여기서는 현재 진행 중인 작업 / 이번 작업 목표 /
> 수정 대상 / 완료 조건 / 다음 작업만 기록한다.

**최종 업데이트**: 2026-07-31

---

## 완료된 작업

ROADMAP.md 기준 1~23번 작업 완료. 최근 내용 요약:
- Git/GitHub/Cloudflare 배포, 홈·도구·소개 페이지, 컬러 시스템, 블로그 10편, SEO 기본 설정, Search Console 등록 (1~12번)
- 헤더를 Seller Tools 도구 탭 내비로 리팩터링, `ProgramLayout`/`ProgramNav`/`programs.ts` 데이터 기반 메뉴 구조 (13~16번)
- Excel Converter(invoice-converter) iframe 포기 → 외부 링크(새 탭) 전환, 해당 라우트 삭제 (17번)
- 가격계산기 도구 완전 삭제 (18번)
- 블로그 카테고리 분류 기능 (19번)
- **GA4(Google Analytics 4) 연결** — codivostudio-web + codivo-tools(랭킹추적/키워드분석) 양쪽 (20번)
- **방문자 수 카운터**(Cloudflare KV) + **Cloudflare adapter(SSR) 전환** + **배포 명령 변경**(`npm run deploy`) (21번)
- `/tools` 페이지 "누적 사용 횟수" 배지 (수동 입력값, 자동 집계 아님) (22번)
- Rank Tracker Enter키 검색, 예시 문구 변경, Excel Converter의 GA4/Vercel 배포 불가 사유 조사 (23번)

자세한 완료 이력은 [ROADMAP.md](./ROADMAP.md) "완료된 작업" 참고.

---

## ⚠️ 다음 세션 시작 시 먼저 확인할 것

- **git 저장소가 로컬에 없음** (`.git` 폴더 없음, `git status` → not a git repository). 오늘(20~23번) 변경사항은
  git에 커밋되지 않은 상태 — GitHub과 동기화되어 있다고 가정하지 말 것. 자세한 내용/대응은
  [ROADMAP.md "다른 환경에서 이어서 진행하는 법"](./ROADMAP.md#다른-환경에서-이어서-진행하는-법) 참고.
- **배포 명령이 바뀜**: `npx wrangler deploy` 단독 실행이 아니라 **`npm run deploy`** 사용 (카운터 API가 SSR로
  전환되면서 `astro build && wrangler deploy --config dist/server/wrangler.json`으로 변경됨).

---

## 현재 작업

**대기 중 — 사용자 확인 필요**

24번(Excel Converter를 Next.js 앱으로 재구축)을 사용자가 "추후진행"으로 보류함. 다음 세션 시작 시
이 작업을 진행할지 먼저 확인할 것. 그 전까지는 새로 지시받는 작업을 우선 진행.

---

## 다음 작업 (24번 이후)

24. [ ] Excel Converter를 Next.js 앱으로 재구축 (보류 중, 진행 여부 확인 필요)
25. [ ] Google AdSense 신청 (콘텐츠 + SEO 완료 후 진행)

세부 체크리스트는 [ROADMAP.md](./ROADMAP.md) "다음 작업" 참고.

---

## 프로젝트 구조

```
codivostudio-web/
├── docs/
│   ├── WEBSITE_MASTER.md
│   ├── ROADMAP.md
│   ├── CURRENT_TASK.md
│   ├── CONTENT.md
│   └── 웹사이트_구축로직_설명(쉬운버전).txt   ← 비개발자용 쉬운 설명 (2026-07-31 추가)
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       (공통 head/Header/Footer, GA4 스니펫 포함)
│   │   └── ProgramLayout.astro    (도구 페이지 전용 — 제목/설명/관련글 자동 생성)
│   ├── components/
│   │   ├── Header.astro, Footer.astro   (사이트 메인 메뉴: 홈/도구/블로그/소개)
│   │   └── ProgramNav.astro             (도구 탭 내비 — ProgramLayout에서만 렌더링)
│   ├── data/programs.ts           (도구 목록 데이터 — 메뉴 자동 생성 기준)
│   ├── content.config.ts
│   ├── content/blog/*.md
│   └── pages/
│       ├── index.astro            (홈 — 방문자 수 카운터 포함)
│       ├── about/index.astro
│       ├── blog/index.astro, blog/[id]/index.astro, blog/category/[slug]/index.astro
│       ├── tools/index.astro, tools/rank-tracker/, tools/keyword-analysis/
│       │   (invoice-converter·price-calculator 라우트는 삭제됨 — 외부 링크로 대체)
│       └── api/hit-count.ts       (방문자 수 카운터 API, Cloudflare KV 사용)
├── astro.config.mjs               (@astrojs/cloudflare 어댑터 적용됨)
├── wrangler.jsonc                 (kv_namespaces: VISITOR_COUNT, SESSION)
└── .claude/launch.json            (로컬 프리뷰 실행 설정)
```

### 연동된 별도 저장소 (이 프로젝트 폴더 밖에 있음)

- 랭킹추적/키워드분석: `https://github.com/sysy-netizen/codivo-tools` (Next.js, Vercel 배포)
- 엑셀변환기: `https://github.com/sysy-netizen/invoice-merge` (Streamlit, Streamlit Community Cloud 배포)

---

## 작업 원칙

- 한 번에 한 섹션씩 제작
- 불필요한 의존성/라이브러리 추가 금지
- 콘텐츠 작업 시 [CONTENT.md](./CONTENT.md)의 기존 카피 재사용

---

## Claude 작업 규칙

읽는 순서: `WEBSITE_MASTER.md` → `ROADMAP.md` → `CURRENT_TASK.md`(이 파일) → 필요 시 `CONTENT.md`.

작업 시작 전 / 완료 후 보고 항목은 [ROADMAP.md](./ROADMAP.md) "Claude 작업 규칙" 참고 (여기서 중복 기록하지 않음).
