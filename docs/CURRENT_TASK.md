# CURRENT_TASK.md

> 이 문서는 **지금 진행 중인 작업의 스냅샷**만 기록한다 — 완료 이력, 상세 배경, 우선순위 전체 목록은
> [ROADMAP.md](./ROADMAP.md)가 기준 문서다. 여기서는 현재 진행 중인 작업 / 이번 작업 목표 /
> 수정 대상 / 완료 조건 / 다음 작업만 기록한다.

**최종 업데이트**: 2026-07-29

---

## 완료된 작업

ROADMAP.md 기준 1~9번 작업 완료 (Git/GitHub/Cloudflare 배포, 홈·도구·소개 페이지 제작, 컬러 시스템 적용).
자세한 완료 이력은 [ROADMAP.md](./ROADMAP.md) "완료된 작업" 참고.

---

## 현재 작업

**ROADMAP.md 10번 — 실제 블로그 글 작성**

- 목표: 기존 샘플 글 2개를 실제 글로 교체, 최소 10개 글 작성
- 카테고리: AI / 업무 자동화 / 자동차 데이터 / 온라인 셀러 / Codivo Studio 개발기
- 수정 대상: `src/content/blog/*.md`
- 완료 조건: 샘플 글 2개 교체 완료 + 실제 글 최소 10개 게시 + `npm run build` 성공

---

## 다음 작업 (10번 이후)

11. SEO 기본 설정
12. Google Search Console 등록
13. Google Analytics 4 연결
14. Google AdSense 신청 (콘텐츠 + SEO 완료 후 진행)

세부 체크리스트는 [ROADMAP.md](./ROADMAP.md) "다음 작업" / "SEO 완료 체크리스트" 참고.

---

## 프로젝트 구조

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
│       ├── about/index.astro
│       ├── blog/index.astro, blog/[id]/index.astro
│       └── tools/index.astro, tools/rank-tracker|keyword-analysis|invoice-converter/index.astro
├── astro.config.mjs
└── .claude/launch.json   (로컬 프리뷰 실행 설정)
```

---

## 작업 원칙

- 한 번에 한 섹션씩 제작
- 불필요한 의존성/라이브러리 추가 금지
- 콘텐츠 작업 시 [CONTENT.md](./CONTENT.md)의 기존 카피 재사용

---

## Claude 작업 규칙

읽는 순서: `WEBSITE_MASTER.md` → `ROADMAP.md` → `CURRENT_TASK.md`(이 파일) → 필요 시 `CONTENT.md`.

작업 시작 전 / 완료 후 보고 항목은 [ROADMAP.md](./ROADMAP.md) "Claude 작업 규칙" 참고 (여기서 중복 기록하지 않음).
