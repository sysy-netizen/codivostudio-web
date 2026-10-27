# PRD v2.0 — CODIVO STUDIO

Product Requirements Document · 2026.10.27 · Version 2.0

**브랜드:** CODIVO STUDIO  
**도메인:** https://codivostudio.com  
**핵심 메시지:** 데이터를 분석하고, 기술로 해결합니다.  
**서비스:** 자동차 데이터 분석 · AI 활용 개발 · Python 업무 자동화  
**방식:** 브랜드와 도메인을 유지하되 홈페이지를 완전히 새로 구축

## 1. 프로젝트 개요

CODIVO STUDIO는 자동차 데이터 분석과 소프트웨어 개발을 결합해 실무 문제를 해결하는 개인 운영 기술 브랜드다. 기존 사이트를 부분 개편하지 않고 정보 구조, 디자인, 컴포넌트, 콘텐츠를 신규 구축한다.

**목표:** (1) 자동차 데이터 분석 및 프로그램 개발 역량을 실제 작업으로 증명, (2) 기업·개인 고객의 프리랜서 프로젝트 및 협업 의뢰 확보.

| 항목 | 내용 |
|---|---|
| 브랜드 | CODIVO STUDIO |
| 운영 전문가 | 김선유 |
| 핵심 분야 | 자동차 트림·옵션·VIN 분석, 차량 데이터 검증·표준화·통계 |
| 개발 분야 | Python, pandas, Excel/CSV 처리, API 연동, AI 활용 개발, 자동화, 웹 도구 |
| 대상 | 자동차 관련 기업, 데이터 기업, 업무 자동화·프로그램 개발 의뢰자 |
| 언어 | 한국어 |
| 주요 페이지 | HOME / ABOUT / TOOLS / CONTACT |
| 기술 | Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide React |
| 렌더링 | SSG / Static Export |
| 배포 | Vercel 우선 |

### 브랜드 원칙

- 메인에서는 **CODIVO STUDIO**를 우선한다. 실명 **김선유**는 ABOUT 전문가 프로필에 기재한다.
- 실제로 확인되지 않은 고객사, 팀원, 성과, 경력 수치, 연락처, 링크를 만들어 넣지 않는다.
- 자동차 데이터 분야의 전문성을 핵심 차별화 요소로, 소프트웨어 개발·자동화를 확장 가능한 서비스로 표현한다.
- 브랜드 가치: 정확성, 실용성, 효율성, 신뢰성, 지속적인 개선.

### 주요 문구

- 메인: **데이터를 분석하고, 기술로 해결합니다.**
- 서브: **자동차 데이터에 대한 전문적인 분석과 Python·AI 기반 개발 역량으로 복잡한 데이터와 반복 업무를 더 효율적으로 만듭니다.**
- 영문: *Data Intelligence. Practical Solutions.*

## 2. 대상 사용자 및 사용자 흐름

| 사용자 | 관심사 | 권장 동선 |
|---|---|---|
| 자동차 기업 | 트림·옵션·차량 사양 분석 | HOME → ABOUT → CONTACT |
| 자동차 데이터 기업 | 정제·표준화·검증·통계 | ABOUT → TOOLS → CONTACT |
| 기업 실무자 | Excel/CSV 및 반복 업무 자동화 | HOME → TOOLS → CONTACT |
| 개발 의뢰자 | 맞춤형 소프트웨어·웹 도구 | TOOLS → CONTACT |
| 일반 도구 이용자 | 공개 프로그램 이용 | HOME → TOOLS → 외부 서비스 |

핵심 흐름은 **브랜드 이해 → 전문성·결과물 확인 → 프로젝트 문의**다. 공개 도구 사용자는 문의 없이 서비스로 바로 이동할 수 있어야 한다.

## 3. 사이트맵

| 페이지 | URL | 목표 |
|---|---|---|
| HOME | `/` | 브랜드·서비스·대표 프로젝트 안내 |
| ABOUT | `/about` | 전문가·경력·기술·작업 철학 소개 |
| TOOLS | `/tools` | 도구와 개발 프로젝트 목록·필터 |
| TOOL DETAIL | `/tools/[slug]` | 프로젝트별 상세 사례 |
| CONTACT | `/contact` | 의뢰 및 협업 문의 |
| NOT FOUND | 미등록 경로 | 404 안내 및 사이트 복귀 |

공통 헤더에는 브랜드 로고와 HOME / ABOUT / TOOLS / CONTACT 메뉴, 공통 Footer에는 사이트 링크·브랜드·연락 경로를 둔다. 모바일 메뉴·현재 페이지 표시·키보드 탐색을 지원한다.

## 4. HOME 상세 요구사항

구성: **Header → Hero → Expertise → Solutions → Featured Projects → Work Approach → Contact CTA → Footer**.

### Hero

- Eyebrow: `AUTOMOTIVE DATA · PYTHON · AI DEVELOPMENT`
- 제목: `데이터를 분석하고, 기술로 해결합니다.`
- 설명: `자동차 데이터 분석부터 Python 기반 업무 자동화와 소프트웨어 개발까지. 실무의 문제를 이해하고, 실제로 작동하는 솔루션을 만듭니다.`
- CTA 1: `프로젝트 보기` → `/tools`
- CTA 2: `프로젝트 문의` → `/contact`
- 브랜드는 헤더에서 강하게 노출하되, 실명 노출은 HOME에 필수가 아니다.

### Expertise

1. **Automotive Data Intelligence:** 국내 시판 차량 모델·트림, 공장 출고 옵션 코드·설명, VIN, 제원, 원동기 형식, 데이터 통계·표준화.
2. **Software & Automation:** Python, AI 활용 개발, Excel·CSV 처리, API 연동, 반복 업무 자동화, 실무용 웹 애플리케이션.

### Solutions

문제 해결 중심 카드 4개: 차량 데이터 분석 / 데이터 처리 및 표준화 / 업무 자동화 / 맞춤형 웹 도구.

### Featured Projects

`published: true`이고 `featured: true`인 프로젝트를 최대 3개 노출한다. 각 카드에 실제 이름, 설명, 상태, 기술, 선택적 스크린샷, 상세 링크가 있어야 한다. `모든 프로젝트 보기` → `/tools`.

### Work Approach

`문제 이해 → 데이터 및 요구사항 분석 → 솔루션 개발 → 검증과 개선` 단계와 간결한 설명을 제공한다.

### Contact CTA

타이틀: `반복되는 업무, 복잡한 데이터. 함께 해결할 방법을 찾아보세요.`  
버튼: `프로젝트 문의하기` → `/contact`.

## 5. ABOUT 상세 요구사항

**목적:** 개인 운영 기술 브랜드의 실제 전문가와 전문성을 확인한다.

### 브랜드 소개

CODIVO STUDIO는 데이터 분석과 소프트웨어 개발을 통해 복잡하고 반복적인 실무를 더 단순하고 효율적으로 만드는 기술 스튜디오다. 자동차 데이터 분야의 전문성을 바탕으로 다양한 업무의 데이터 처리와 프로그램 제작 문제를 해결한다.

### 전문가 프로필

- 이름: **김선유**
- 역할: Automotive Data Analyst / Freelance Developer
- 전문 영역: 자동차 데이터 분석, Python 개발, 데이터 처리, 업무 자동화
- 사진: 선택 사항
- 경력 및 이력: 확인된 사실만 기재하며 임의의 연차·성과를 추가하지 않는다.

### 자동차 데이터 전문 분야

1. 국내 시판 차량의 모델·트림별 사양 비교
2. 제조사 공장 출고 옵션 코드·설명 분석
3. VIN 기반 차량 정보 분석
4. 엔진·원동기 형식 및 차량 속성 분석
5. 데이터 정제·검증·표준화
6. 대량 데이터의 통계·품질 분석

출처와 품질에 따라 데이터 정확성이 달라지는 분야에서 분석 한계를 과장하지 않는다. 회사 내부 자료 및 고객 비공개 데이터는 게시하지 않는다.

### 소프트웨어 개발 전문 분야

Python, pandas, Excel/CSV, REST API, JSON, 업무 자동화, AI 코딩 도구를 활용한 개발, Next.js 기반 웹 도구 제작. 사용 기술은 `실무 활용 / 프로젝트 활용 / 학습 중`으로 구분할 수 있도록 구성하며 근거 없는 숙련도 퍼센트는 표시하지 않는다.

### 작업 철학

- 정확성: 데이터 검증과 품질 우선
- 실용성: 실제로 사용할 수 있는 기능 우선
- 효율성: 반복 작업 및 불필요한 과정 최소화

마지막에 `/tools`, `/contact` CTA를 제공한다.

## 6. TOOLS 상세 요구사항

**목적:** 실제 결과물로 역량을 입증하고, 공개 프로그램에 접근할 수 있게 한다.

### 두 가지 유형

- **Available Tools:** 방문자가 직접 사용할 수 있는 공개 서비스.
- **Development Projects:** 개발 과정·기술·해결한 문제를 설명하는 사례.

### 화면 구성

페이지 소개 → 유형 필터(전체/사용 가능한 도구/개발 프로젝트) → 카테고리 필터(Automotive Data/Data Processing/Automation/Web Application/Other) → 반응형 카드 → 문의 CTA.

프로젝트 카드에는 이름, 한 줄 설명, 유형, 분류, 기술, 운영 상태, 선택적 스크린샷 및 상세 링크를 제공한다. 필터는 클라이언트에서 즉시 작동하며, 결과가 없으면 안내 문구와 전체 보기 동작을 제공한다.

### 상세 페이지 `/tools/[slug]`

1. 프로젝트명·요약
2. 개발 배경과 문제
3. 해결 방식과 핵심 기능
4. 사용 기술
5. 실제 프로그램 스크린샷
6. 확인 가능한 결과·개선 사항
7. 공개 서비스·GitHub 링크(실제 존재하는 경우)
8. 관련 프로젝트·문의 CTA

수치와 성과는 측정 근거가 있을 때만 기재한다.

### 프로젝트 관리

- `src/data/projects.ts` 단일 소스로 목록과 정적 상세 페이지 생성.
- `published: false` 항목은 모든 공개 목록과 상세 경로에서 제외.
- `featured: true`로 HOME 노출 제어.
- slug 중복 방지, 허위 링크 생성 금지.
- 현 운영 도구인 대량발송 엑셀변환기는 실제 사용 가능 여부와 URL을 확인한 후 등록/연결을 검토한다.
- 기존 서비스에 백엔드/API가 있다면 정적 사이트 코드로 무작정 이전하지 않고 별도 서비스로 연계한다.

### TypeScript 데이터 타입

```ts
export type ProjectType = "tool" | "project";
export type ProjectCategory = "automotive" | "data" | "automation" | "web" | "other";
export type ProjectStatus = "live" | "completed" | "in-progress";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  type: ProjectType;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  thumbnail?: string;
  screenshots?: string[];
  problem?: string;
  solution?: string;
  features?: string[];
  outcome?: string;
  publicUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  publishedAt?: string;
}
```

## 7. CONTACT 상세 요구사항

제목: `Have a project in mind?`  
설명: 자동차 데이터 분석, 데이터 처리, Python 업무 자동화, 맞춤형 프로그램 및 웹 도구 개발 협업을 환영한다.

문의 범위: 자동차 데이터 분석 / Python·Excel 자동화 / 데이터 처리·API 연동 / 맞춤형 프로그램 / 기타 협업.

**MVP:** 검증된 실제 이메일 주소를 표시하고 복사 버튼과 `mailto:` 문의 버튼을 제공한다. 실제 주소가 없으면 임의 생성하지 않는다. 전문 프로필 링크도 실제 계정만 표시한다.

**향후 확장:** 이름·회사, 이메일, 문의 유형, 프로젝트 설명, 개인정보 동의를 포함하는 문의 폼. 순수 SSG에는 수신 서버가 없으므로 외부 폼 서비스나 별도 백엔드와 스팸 방지·오류 처리가 필요하다.

## 8. 디자인 시스템

방향: **Modern Technical Studio — Minimal / Professional / Technical / Clean / Data-Oriented**.

| 역할 | 색상 |
|---|---|
| Background | `#FAFAFA` |
| Surface | `#FFFFFF` |
| Primary Text | `#18181B` |
| Muted Text | `#71717A` |
| Accent Blue | `#2563EB` |
| Border | `#E4E4E7` |

- 라이트 모드 기본. 블루는 링크·포커스·CTA 등에 제한적으로 사용.
- 한글 Pretendard, 영문 Inter.
- 데스크톱 Hero 44~64px, 모바일 32~40px, 본문 15~17px.
- 최대 콘텐츠 폭 약 1200px. 모바일 좌우 여백 20~24px.
- 카드 10~12px 라운드, 단정한 보더, 과한 그림자·그라디언트 배제.
- 프로젝트 카드: 모바일 1열, 태블릿 2열, 데스크톱 3열.
- 실제 UI 스크린샷 우선; 저작권 불명 자동차 이미지와 허위 고객 로고 사용 금지.
- Hover 및 짧은 상태 피드백만 사용. `prefers-reduced-motion` 지원.
- 버튼·필터·메뉴는 가짜 장식이 아닌 실제 동작을 해야 한다.

## 9. 기술 요구사항

- Next.js 14 **App Router**, React, TypeScript
- Tailwind CSS, shadcn/ui, Lucide React
- Static Site Generation, `output: 'export'`
- 프로젝트 데이터는 로컬 TS/JSON 사용, 초기 데이터베이스·관리자 페이지 없음
- `generateStaticParams()`로 공개 상세 slug를 빌드 시 생성
- 동적 필터·모바일 메뉴 등만 Client Component로 작성
- Next.js 14와 호환되는 의존성 버전 고정, 보안 지원 상태 점검
- 서버 런타임이 필요한 기능은 초기 범위에서 제외하거나 독립 서비스로 연결

```js
// next.config.mjs
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
```

`npm run build`로 `out/` 폴더에 정적 파일이 만들어져야 한다. Static Export에서 서버 전용 API, 동적 요청 기반 기능, ISR, Next.js 설정 기반 redirects 등의 호환성을 주의한다.

### 권장 디렉터리

```text
codivo-studio/
├── public/
│   ├── images/{brand,projects,profile}/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── tools/page.tsx
│   │   ├── tools/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── about/
│   │   ├── tools/
│   │   ├── contact/
│   │   ├── shared/
│   │   └── ui/
│   ├── data/{site,profile,services,skills,projects}.ts
│   ├── lib/{metadata,projects,utils}.ts
│   └── types/project.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 10. SEO 전략

키워드 그룹: 자동차 데이터 분석 / 트림 분석 / 공장 출고 옵션 / VIN 데이터 / 차량 데이터 정제·표준화 / Python 업무 자동화 / Excel 자동화 / 맞춤형 프로그램 개발 / CODIVO STUDIO.

| 페이지 | SEO Title 예시 |
|---|---|
| HOME | CODIVO STUDIO \| 데이터 분석 & 소프트웨어 개발 |
| ABOUT | 소개 \| CODIVO STUDIO |
| TOOLS | 개발 도구 및 프로젝트 \| CODIVO STUDIO |
| CONTACT | 프로젝트 문의 \| CODIVO STUDIO |
| DETAIL | {프로젝트명} \| CODIVO STUDIO |

- 페이지별 고유 Title, Description, Canonical URL
- Open Graph 및 Twitter Card
- `sitemap.xml`, `robots.txt`, 한국어 `<html lang="ko">`
- 올바른 H1~H3 및 시맨틱 마크업
- 이미지 alt, 내부 링크, 모바일 성능 최적화
- 사실관계에 맞는 WebSite 및 Person 등 JSON-LD
- Google Search Console 등록 지원
- 프로젝트 상세 페이지를 Sitemap에 공개 여부에 따라 반영

**기존 도메인 이전:** 기존 URL과 검색 유입 페이지 조사, 중요 경로 보존, 변경 경로의 301 리디렉션(호스팅 설정) 검토. 순수 정적 Export에서 Next.js `redirects()` 기능에 의존하지 않는다.

## 11. 비기능 요구사항

| 항목 | 목표 |
|---|---|
| Lighthouse Performance | 모바일 90+ 목표 |
| Lighthouse SEO | 95+ 목표 |
| Lighthouse Accessibility | 90+ 목표 |
| Lighthouse Best Practices | 95+ 목표 |
| LCP | 2.5초 이하 목표 |
| CLS | 0.1 이하 목표 |
| INP | 200ms 이하 목표 |
| 반응형 | 320px 이상에서 주요 콘텐츠 가로 스크롤 없음 |
| 브라우저 | 최신 Chrome, Edge, Firefox, Safari |
| 접근성 | WCAG 2.2 AA 지향 |
| 기술 품질 | TypeScript 및 빌드 오류 0 |

- 키보드 접근, 명확한 포커스, 텍스트 대비, 모바일 메뉴 접근성 확보.
- 비공개 차량·고객 데이터와 API 키를 공개 코드, 번들 및 저장소에 포함하지 않는다.
- `.env`와 비밀값 Git 커밋 금지. 외부 링크·의존성의 안전성 확인.
- 모든 성능 점수는 측정 환경에 따라 달라지므로 보장값이 아닌 목표값이다.

## 12. 운영 사이트 이전 및 배포

1. 기존 운영 사이트의 URL·도구·백엔드 의존성 목록 작성.
2. 별도 프로젝트 또는 브랜치에서 신규 웹사이트 개발.
3. 실콘텐츠 등록, 정적 빌드, 반응형·SEO·접근성 검증.
4. Vercel Preview 등 테스트 환경에 배포.
5. 기존 중요 링크·도구의 연속성을 검증하고 필요한 라우팅·리디렉션 준비.
6. 운영 도메인 전환 후 HTTPS·404·링크·검색 색인 확인.
7. 장애 발생 시 이전 배포본으로 롤백할 수 있도록 준비.

**중요:** 기존 공개 도구가 백엔드와 API를 사용하는 경우에는 정적 페이지로 단순 복사하지 않는다. 필요하면 독립 서비스로 유지하고 새 사이트에서 연결한다. 기존 사이트는 준비 및 검증이 끝나기 전까지 중단하지 않는다.

## 13. 구현 우선순위

| 단계 | 작업 | 등급 |
|---|---|---|
| 1 | 프로젝트 환경 및 디자인 시스템 | P0 |
| 2 | 공통 헤더·Footer·반응형 내비게이션 | P0 |
| 3 | HOME / ABOUT | P0 |
| 4 | TOOLS 목록·필터·정적 상세 | P0 |
| 5 | CONTACT 이메일 문의 | P0 |
| 6 | 실제 프로젝트 콘텐츠 및 이미지 | P0 |
| 7 | SEO·정적 빌드·접근성 | P0 |
| 8 | 기존 서비스 이전 점검 및 배포 | P0 |
| 9 | 이용 분석 | P1 |
| 10 | 다크 모드·영문 페이지·문의 폼 | P2 |

**초기 제외:** 로그인, 결제, 관리자, DB, 실시간 사용자 대시보드, 신규 VIN API 서비스, 자체 문의 수신 서버, 블로그, 다국어, 과도한 애니메이션.

## 14. 완료·검수 기준

- [ ] HOME, ABOUT, TOOLS, CONTACT와 공개된 TOOLS 상세 페이지 정상 접속
- [ ] 로고·내비게이션·Footer·CTA 링크 정상 동작
- [ ] 모바일 메뉴와 키보드 탐색 정상 동작
- [ ] 유형·카테고리 필터 정확한 동작
- [ ] 새 프로젝트 데이터만 등록해도 목록·상세·Sitemap 갱신
- [ ] 비공개 프로젝트 미노출, 없는 slug에서 404 처리
- [ ] 외부 서비스 링크·이메일 문의·복사 정상 동작
- [ ] 320px~데스크톱 화면에서 UI 잘림·불필요한 가로 스크롤 없음
- [ ] 실제 이미지 정상 로딩, 허위 경력·고객·성과·링크 없음
- [ ] `npm run build` 성공, `out/` 정적 HTML 출력
- [ ] SEO Title·Description·Canonical·OG·Sitemap·Robots 확인
- [ ] 민감 정보 및 내부 업무 데이터 공개 없음
- [ ] 기존 공개 도구 및 주요 URL 접근성 보존
- [ ] 운영 도메인 HTTPS·404·배포 롤백 계획 확인

## 15. VS Code Claude Code 구현 지침

이 문서 `RPD.MD`를 요구사항의 **단일 기준 문서**로 사용한다.

1. 현재 프로젝트 구조를 먼저 조사하고, 파일을 임의로 덮어쓰거나 운영 사이트를 손상시키지 않는다.
2. Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, SSG를 기준으로 신규 코드를 구성한다.
3. 공통 컴포넌트와 콘텐츠 데이터를 분리하여 확장이 쉽도록 만든다.
4. HOME → ABOUT → TOOLS → CONTACT → SEO·접근성·배포 검증 순서로 구현한다.
5. 모바일·태블릿·데스크톱을 함께 검토한다.
6. 프로젝트·기술·경력·연락처 등 실제로 제공되지 않은 사실을 만들어 넣지 않는다.
7. 아직 미정인 값은 중앙 데이터 파일에 식별 가능한 TODO로 남기고, 가짜 외부 링크를 만들지 않는다.
8. 필터, 버튼, 메뉴, 링크, 404 등 사용자 동작을 직접 확인한다.
9. Static Export 호환성을 검증하고 `npm run build`의 오류를 수정한다.
10. 최종적으로 구현된 기능, 미완성 항목, 추가 설정이 필요한 값, 빌드 검증 결과를 요약한다.

**완료 조건:** 본 PRD의 P0 요구사항이 구현되어 있고, 신규 정적 사이트가 기존 운영 서비스에 영향을 주지 않는 상태에서 배포 가능한 결과물을 제공한다.
