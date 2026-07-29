# Codivo Studio Website Project (Astro / Cloudflare)

> Last Updated: 2026-07-29
> 이 프로젝트는 `G:\내 드라이브\Projects\seller_dealer\docs\` 의 워드프레스 기반 계획을
> **전면 대체**합니다. 2026-07-29부로 워드프레스는 사용하지 않기로 확정했습니다.
> (이전 워드프레스 계획은 seller_dealer/docs에 기록으로만 남아있고, 진행은 이 프로젝트에서만 합니다.)

## 프로젝트 개요

Codivo Studio는 AI 및 업무 자동화를 위한 웹 도구를 제공하는 사이트입니다.

### 목표

- 웹 프로그램(도구) 제공
- 블로그 운영
- SEO
- Google AdSense 수익화 (1차 목표)
- 추후 회원제 (보류)

### 왜 워드프레스를 폐기했는가

- 목표가 "콘텐츠 관리 편의성"이 아니라 "애드센스 수익화 + 무료 운영"이라 판단
- 정적 사이트(Astro)가 워드프레스보다 로딩 속도가 빨라 SEO/애드센스에 유리
- 호스팅비가 완전히 무료(Cloudflare Pages)로 가능 — 워드프레스는 PHP+MySQL 유료 호스팅 필요
- 블로그 검색/목록/태그 등 필요한 기능은 정적 사이트에서도 Pagefind 등으로 동일하게 구현 가능

---

## 기술 스택

| 항목 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | **Astro** (v7) | 정적 사이트 생성, 조코딩(jocoding.net) 사이트도 동일 스택 |
| 호스팅 | **Cloudflare Pages** | 무료, 무료 SSL 자동, GitHub 연동 자동배포 |
| 도메인 | **codivostudio.com** (가비아 등록 유지, 네임서버만 Cloudflare로 이전) | 등록은 가비아, DNS/호스팅은 Cloudflare |
| 블로그 | Astro Content Collections (Markdown) | 워드프레스 미사용, 클로드가 글 파일 생성 |
| 검색 | **Pagefind** | 빌드 시 인덱스 생성, 클라이언트 사이드 검색, 서버 불필요 |
| 배포 방식 | GitHub 저장소 → Cloudflare Pages 자동 배포 | `npm run build` 결과물 배포 |

### 사용하지 않음
- WordPress / Gutenberg / Elementor
- 유료 호스팅 (가비아 웹호스팅 등)
- 유료 SSL 인증서 (Cloudflare 무료 SSL로 대체)

---

## 사이트 구조

```text
codivostudio.com (Astro, Cloudflare Pages)
├── / (Home)
├── /tools (도구 소개, 카드만, iframe 없음)
│   ├── /tools/rank-tracker       ← iframe: 실시간 랭킹추적
│   ├── /tools/keyword-analysis   ← iframe: 연관 키워드 분석
│   └── /tools/invoice-converter  ← iframe: 대량발송 엑셀 변환기
├── /blog (Astro Content Collections + Pagefind 검색)
└── /about (소개 + 문의 통합)

연동 서비스 (기존 자산, 그대로 재활용)
tools.codivostudio.com          ← Next.js, Vercel 배포 (랭킹추적 `/`, 키워드분석 `/keyword`)
invoice-merge-....streamlit.app ← Streamlit, 대량발송 엑셀변환기
```

**메뉴**: 홈 / 도구 / 블로그 / 소개 (4개, seller_dealer 계획과 동일하게 유지)

**중요**: `tools.codivostudio.com`의 CSP(`frame-ancestors 'self' codivostudio.com`)가
이미 `codivostudio.com`을 허용하고 있으므로, 이 사이트가 codivostudio.com 도메인으로
배포되면 **iframe 삽입에 서버 설정 변경이 필요 없음**.

---

## 컬러 시스템 (seller_dealer 워드프레스 계획에서 그대로 재사용)

| 용도 | 값 |
|---|---|
| Background | `#FAFAFA` |
| Text | `#111827` |
| Primary | `#2563EB` |
| Accent | `#FD7125` |

(현재 스켈레톤은 `--color-accent: #2563eb`만 적용된 임시 상태. Accent 컬러 `#FD7125` 등
나머지는 실제 콘텐츠 작업 시 반영 예정 — [CURRENT_TASK.md](./CURRENT_TASK.md) 참고)

---

## 프로젝트 원칙

- 단순하게, 빠르게, 유지보수 쉽게
- 디자인보다 완성과 운영을 우선한다
- 한 번에 한 섹션씩 제작 (Hero → Tools → About → CTA 순서 등)
- 불필요한 라이브러리/의존성 추가 금지

---

## Claude 작업 규칙 (다른 환경에서 이어서 진행할 때)

작업 시작 시 항상 아래 순서로 읽는다.

1. `docs/WEBSITE_MASTER.md` (이 파일 — 전체 방향)
2. `docs/ROADMAP.md` (진행 이력 + 다음 할 일)
3. `docs/CURRENT_TASK.md` (지금 당장 할 작업)

필요 시 `docs/CONTENT.md` (재사용 가능한 카피/URL 모음)도 함께 확인한다.

파일을 읽은 후 다음을 먼저 설명하고 작업을 시작한다.
1. 현재 진행 상태 요약
2. 이번 작업 목표
3. 수정 범위
