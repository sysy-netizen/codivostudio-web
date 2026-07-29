# CURRENT_TASK.md

# Codivo Studio 프로젝트 - 현재 작업 (Astro / Cloudflare)

최종 업데이트: 2026-07-29

---

# 현재 목표

Codivo Studio 홈페이지를 Astro로 제작 (워드프레스 폐기, [ROADMAP.md](./ROADMAP.md) 참고)

개발 방식

- Astro 정적 사이트, Cloudflare Pages 배포
- 블로그는 Content Collections(Markdown) + Pagefind 검색
- 도구(Tools)는 기존에 배포된 외부 서비스를 iframe으로 페이지별 1개씩 연결
- 워드프레스/Gutenberg/Elementor 사용하지 않음

---

# 현재 진행 상태

## 완료 (2026-07-29)

✔ Astro 프로젝트 생성 완료 — `C:\MECRO\codivostudio-web`
(Google Drive 동기화 폴더에서 `npm install` 실패 경험 후 로컬 경로로 이전, [ROADMAP.md](./ROADMAP.md) 참고)

✔ 기본 골격 구성 완료
- `src/layouts/BaseLayout.astro` — 공통 head/레이아웃
- `src/components/Header.astro` — 네비게이션 (홈/블로그/도구 링크)
- `src/components/Footer.astro`
- `src/pages/index.astro` — 홈페이지 뼈대 (히어로 + 애드센스 placeholder, 실제 카피는 미작성)

✔ 블로그 스켈레톤 완료
- `src/content.config.ts` — blog 컬렉션 정의 (title/description/pubDate/tags)
- `src/content/blog/*.md` — 샘플 글 2개 (동작 확인용, 추후 교체 필요)
- `src/pages/blog/index.astro` — 목록 + Pagefind 검색 UI
- `src/pages/blog/[id]/index.astro` — 상세 페이지

✔ Pagefind 검색 연동 완료
- `astro.config.mjs`에 `astro-pagefind` 통합 추가
- `npm run build` → 인덱스 생성 확인, 로컬 프리뷰에서 한글 검색("샘플") 정상 동작 확인

✔ 빌드/로컬 프리뷰 검증 완료
- `npm run build` 성공 (4페이지)
- `localhost:4321`에서 홈/블로그 목록/블로그 상세/검색 전부 정상 확인

✔ Git 저장소 초기화 완료 (커밋은 아직 안 함 — 사용자 확인 대기 중이었음)

---

# 다음 작업

순서대로 진행 (자세한 배경은 [ROADMAP.md](./ROADMAP.md) "다음 할 일" 참고)

① Git 첫 커밋 + GitHub 저장소 연결

↓

② Cloudflare Pages 배포 연결, `codivostudio.com` 네임서버 이전

↓

③ 홈페이지 실제 콘텐츠 작성 (Hero/Tools 소개/About 요약/CTA — [CONTENT.md](./CONTENT.md) 카피 재사용)

↓

④ `/tools` 페이지 제작 (카드 3개, iframe 없음)

↓

⑤ `/tools/rank-tracker` 페이지 제작 및 iframe 동작 확인 (`https://tools.codivostudio.com/`)

↓

⑥ `/tools/keyword-analysis`, `/tools/invoice-converter` 페이지 제작

↓

⑦ `/about` 페이지 제작 (About 카피 + Contact — 폼 서비스는 별도 결정 필요, WPForms 대체재)

↓

⑧ 컬러 시스템(`#FAFAFA`/`#111827`/`#2563EB`/`#FD7125`) 전체 적용

↓

⑨ 실제 블로그 글로 교체, AdSense 신청/삽입

---

# 프로젝트 구조

```
codivostudio-web/
├── docs/
│   ├── WEBSITE_MASTER.md
│   ├── ROADMAP.md
│   ├── CURRENT_TASK.md
│   └── CONTENT.md
├── src/
│   ├── layouts/BaseLayout.astro
│   ├── components/Header.astro, Footer.astro
│   ├── content.config.ts
│   ├── content/blog/*.md
│   └── pages/
│       ├── index.astro
│       └── blog/index.astro, blog/[id]/index.astro
├── astro.config.mjs
└── .claude/launch.json   (로컬 프리뷰 실행 설정)
```

---

# 작업 원칙

- 한 번에 한 섹션씩 제작
- 워드프레스 문법(Custom HTML 블록 등)은 더 이상 해당 없음 — Astro 컴포넌트로 직접 작성
- 불필요한 의존성/라이브러리 추가 금지
- 실제 콘텐츠 작업 시 [CONTENT.md](./CONTENT.md)의 기존 카피를 최대한 재사용 (새로 쓰지 않음)

---

# Claude 작업 규칙

작업 시작 시 항상 아래 파일을 먼저 읽는다.

- `docs/WEBSITE_MASTER.md`
- `docs/ROADMAP.md`
- `docs/CURRENT_TASK.md` (이 파일)

필요 시 `docs/CONTENT.md`도 함께 확인한다.

파일을 읽은 후

1. 현재 진행 상태 요약
2. 이번 작업 목표
3. 수정 범위

를 먼저 설명한 뒤 작업을 시작한다.
