# Codivo Studio Website Project (Astro / Cloudflare)

> Last Updated: 2026-07-29
> 이 프로젝트는 `G:\내 드라이브\Projects\seller_dealer\docs\` 의 워드프레스 기반 계획을
> **전면 대체**합니다. 2026-07-29부로 워드프레스는 사용하지 않기로 확정했습니다.
> (이전 워드프레스 계획은 seller_dealer/docs에 기록으로만 남아있고, 진행은 이 프로젝트에서만 합니다.)

## 문서 목적

이 문서는 Codivo Studio 웹사이트 프로젝트의 **장기 기준 문서**다. 프로젝트 목적, 방향, 기술 구조,
디자인 기준, 콘텐츠 원칙, 운영 원칙, 문서별 역할, Claude 작업 원칙을 정의한다.
작업 이력이나 진행 상황의 세부 사항은 다루지 않는다 — [ROADMAP.md](./ROADMAP.md),
[CURRENT_TASK.md](./CURRENT_TASK.md)를 참고할 것.

---

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

## 현재 프로젝트 상태

- Astro 기본 구조 완료
- Cloudflare Pages 배포 완료
- 주요 페이지(홈/도구/소개) 구현 완료
- 도구 페이지 연결 완료 (iframe 3개)
- 블로그 기본 구조 완료, 샘플 블로그 글 2개 존재
- Pagefind 검색 기능 적용 완료
- 기본 디자인 및 컬러 시스템 적용 완료
- 현재 작업은 실제 블로그 글 작성 단계 (ROADMAP.md 10번)

세부 완료 로그와 다음 작업 우선순위는 [ROADMAP.md](./ROADMAP.md)를 참고.

---

## 기술 구조

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

## 사이트 구성

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

## 디자인 시스템

컬러 시스템 (seller_dealer 워드프레스 계획에서 그대로 재사용):

| 용도 | 값 |
|---|---|
| Background | `#FAFAFA` |
| Text | `#111827` |
| Primary | `#2563EB` |
| Accent | `#FD7125` |

`BaseLayout.astro` CSS 변수(`--color-text`, `--color-accent`, `--color-highlight` 등)에
전체 적용 완료 — 세부 내용은 [ROADMAP.md](./ROADMAP.md) 9번 항목 참고.

---

## 콘텐츠 방향

**주요 콘텐츠 분야**
- AI
- 업무 자동화
- 자동차 데이터
- 온라인 셀러
- Codivo Studio 개발기

**콘텐츠 원칙**
- 실제 문제 해결 사례 중심
- 비개발자도 이해할 수 있는 설명
- 과장된 홍보 문구 지양
- 확인되지 않은 기능이나 수치를 단정하지 않음
- Codivo Studio 도구와 자연스럽게 연결
- 검색 유입만을 위한 저품질 글을 만들지 않음

구체적인 글 제목과 작성 현황은 [ROADMAP.md](./ROADMAP.md)에서 관리한다. 이 문서에는 방향만 기록한다.

---

## SEO 및 운영 방향

SEO와 AdSense는 프로젝트의 장기 운영 단계로 다룬다.

- 콘텐츠 작성이 우선이다.
- SEO 기본 설정은 실제 콘텐츠와 함께 진행한다.
- Google Search Console은 SEO 설정 이후 연결한다.
- Google Analytics 4는 방문자와 콘텐츠 성과 분석 목적으로 사용한다.
- Google AdSense는 충분한 실제 콘텐츠와 SEO 기본 설정이 완료된 이후 신청한다.
- AdSense 승인을 위해 저품질 또는 반복 콘텐츠를 대량 생산하지 않는다.

구체적인 체크리스트와 완료 상태는 [ROADMAP.md](./ROADMAP.md)를 참고한다.

---

## 프로젝트 운영 원칙

- 단순하게, 빠르게, 유지보수 쉽게
- 기능 추가보다 현재 단계의 완성을 우선한다
- 한 번에 하나의 작업 단위만 진행한다 (Hero → Tools → About → CTA 처럼 섹션 단위로)
- 기존 구조를 최대한 유지하고, 불필요한 리팩토링은 하지 않는다
- 변경 범위는 최소화한다
- 새로운 의존성/라이브러리는 명확한 필요가 있을 때만 추가한다
- 모든 변경은 검증 가능한 상태로 마무리한다
- 완료된 기능을 다시 만들지 않는다
- ROADMAP.md의 우선순위를 따른다
- 사용자의 요청 없이 프로젝트 방향을 확장하지 않는다

### 문서 수정 원칙

- 완료된 작업 기록은 삭제하지 않는다
- 기존 작업 번호는 변경하지 않는다
- 기존 날짜와 URL은 임의로 수정하지 않는다
- 프로젝트 구조를 크게 변경할 때는 먼저 설명한다
- 문서 간 중복 기록을 피한다
- 실제 코드 상태와 문서 상태가 다르면 확인 후 문서를 갱신한다
- 추측으로 완료 상태를 기록하지 않는다
- 작업 완료 후 관련 문서만 필요한 범위에서 갱신한다

---

## 문서별 역할

문서 간 같은 내용을 중복 기록하지 않는다. 각 문서는 아래 역할만 담당한다.

| 문서 | 역할 |
|---|---|
| **WEBSITE_MASTER.md** (이 문서) | 장기 기준 문서 — 프로젝트 목적/방향, 기술 구조, 디자인 기준, 콘텐츠 원칙, 운영 원칙 |
| **ROADMAP.md** | 완료된 작업 이력, 다음 작업 우선순위, 작업별 완료 조건, 세부 진행 로그 |
| **CURRENT_TASK.md** | 현재 세션에서 진행할 작업, 이번 작업 목표, 수정 범위, 완료 조건, 다음 작업 |
| **CONTENT.md** | 확정된 카피, 도구 URL, 소개 문구, CTA, 메뉴명, 색상 값 등 재사용 가능한 콘텐츠 자료 |

---

## Claude 작업 원칙

작업 시작 전 반드시 아래 순서로 읽는다.

1. `docs/WEBSITE_MASTER.md` (이 파일 — 전체 방향)
2. `docs/ROADMAP.md` (진행 이력 + 다음 할 일)
3. `docs/CURRENT_TASK.md` (지금 당장 할 작업)
4. 필요한 경우 `docs/CONTENT.md` (재사용 가능한 카피/URL 모음)

**작업 시작 전 보고**
- 현재 상태
- 이번 작업 목표
- 수정 범위
- 예상 영향 범위

**작업 완료 후 보고**
- 수정한 파일
- 변경 내용
- 변경 이유
- 검증 방법과 결과
- 남은 TODO
- 다음 추천 작업

**추가 원칙**
- 먼저 설명한 뒤 수정한다.
- 요청 범위를 벗어난 파일은 수정하지 않는다.
- 여러 작업을 한 번에 진행하지 않는다.
- 코드 변경 후에는 적절한 검증을 수행한다.
- 문서만 수정한 경우 불필요한 빌드 검증은 하지 않는다.
- 실제로 검증하지 않은 내용을 검증 완료라고 보고하지 않는다.
- 오류가 있으면 숨기지 말고 정확히 보고한다.

---

## 참고 자료

- 재사용 가능한 카피/URL/색상 값: [CONTENT.md](./CONTENT.md)
- 완료 이력, 다음 작업 우선순위, SEO 체크리스트: [ROADMAP.md](./ROADMAP.md)
- 폐기된 이전 계획: `G:\내 드라이브\Projects\seller_dealer\docs\` 전체 (워드프레스+Gutenberg 기반,
  2026-07-29부로 이 Astro 프로젝트로 대체됨)
