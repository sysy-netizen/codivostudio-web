# 재사용 콘텐츠 모음

> 워드프레스 계획(`seller_dealer/docs/wordpress-content.md`, `CURRENT_TASK.md`)에서
> 이미 확정됐던 카피/구조/URL을 그대로 옮겨온 것. Astro 컴포넌트 작성 시 이 내용을 그대로 사용.
> 워드프레스 전용 지시(Custom HTML 블록 붙여넣기, HTML anchor 설정 등)는 해당 없어 제외함.

---

## 1. 도구별 iframe 소스 주소 (이미 배포됨, 그대로 사용)

| 페이지 | iframe src |
|---|---|
| `/tools/rank-tracker` (실시간 랭킹추적) | `https://tools.codivostudio.com/` |
| `/tools/keyword-analysis` (연관 키워드 분석) | `https://tools.codivostudio.com/keyword` |
| `/tools/invoice-converter` (대량발송 엑셀변환기) | `https://invoice-merge-hi9x7xuzmxwreckiq4vnr6.streamlit.app/` |

Astro에서는 각 페이지에 `<iframe>`을 컴포넌트 내에 직접 작성하면 됨 (워드프레스처럼 블록에
붙여넣을 필요 없이 그냥 `.astro` 파일에 마크업으로 존재).

height는 실제로 열어보고 스크롤 생기면 조정. 참고 값(워드프레스 계획 당시 기준):
rank-tracker/keyword-analysis 800px, invoice-converter 900px.

Streamlit(invoice-converter) 쪽은 CORS/XSRF로 iframe이 비어 보일 수 있어 실제 임베드 후
브라우저 콘솔 에러 확인 필요 (아직 미검증).

---

## 2. `/tools` 페이지 — 도구 카드 3개 (iframe 없음, 링크만)

**Heading**: 도구

**본문**: 온라인 셀러를 위해 만든 실전 도구입니다. 아래에서 필요한 도구를 선택해 바로 사용해 보세요.

**카드 1**
- 제목: 실시간 랭킹추적
- 설명: 키워드 검색 시 내 상품이 몇 위에 노출되는지 실시간으로 확인합니다.
- 링크: `/tools/rank-tracker`

**카드 2**
- 제목: 연관 키워드 분석
- 설명: 연관 키워드의 검색량과 경쟁강도를 한 번에 분석합니다.
- 링크: `/tools/keyword-analysis`

**카드 3**
- 제목: 대량발송 엑셀변환기
- 설명: 네이버·쿠팡 주문 파일과 택배 송장 파일을 자동으로 매칭해 하나로 합쳐줍니다.
- 링크: `/tools/invoice-converter`

(워드프레스 계획 기준: 카드 전체가 아니라 "자세히 보기" 링크만 클릭 가능하게 구성했음 — Astro에서도
동일하게 카드 전체를 `<a>`로 감싸지 않고 링크 텍스트만 클릭 영역으로 두는 것 유지)

---

## 3. `/about` 페이지 — 소개 + 문의 통합

**소개 원문**
```
Codivo Studio는
'Code'와 'Vivo(살아있다)'를 합친 이름입니다.
코딩이 개발자만의 언어가 아니라,
우리 일상 속에서 살아 숨 쉬게 만드는 것을 목표로 합니다.
어렵고 딱딱한 코딩이 아니라, 오늘 당장 업무에 사용할수 있는 실용적인 코딩.
그것이 저희가 믿는 방향입니다.
반복되는 업무를 자동화하고 싶은 직장인,
코딩을 배우고 싶지만 막막한 비전공자,
AI를 업무에 도입하고 싶은 모든 분들을 위해 가장 쉬운 방식으로 다가갑니다.
AI 시대, 모두가 AI를 쉽게 활용할수 있도록 돕는 다리가 되겠습니다.

다루는 주제: #업무자동화 #엑셀·코딩 #AI활용법
```

**Who We Build For (워드프레스 계획 About 페이지에 있던 섹션)**
- 온라인 셀러
- 자동차 실무자

**Philosophy (워드프레스 계획 About 페이지에 있던 섹션, 4개 항목)**
- 단순함
- 실용성
- 유지보수
- 자동화

**Contact 섹션**
```
자유롭게 문의해주세요

궁금한 점이나 제안하고 싶은 아이디어가 있다면 언제든 편하게 남겨주세요. 확인 후 빠르게 답변드리겠습니다.
```

이메일: `contact@codivostudio.com` (mailto 버튼)

**미해결 사항**: 워드프레스 계획에서는 WPForms 위젯을 그대로 복사해서 썼으나, 정적 사이트는
서버가 없어 폼 제출을 처리할 백엔드가 필요함. Formspree 같은 무료 폼 서비스 연동 여부 결정 필요
(mailto 버튼만으로 충분한지, 또는 실제 폼이 필요한지 사용자 확인 필요).

---

## 4. Home 페이지 CTA 문의 섹션 (워드프레스 계획 기준)

- 배경: 짙은 색(`#111827`)
- 버튼 1: "도구 둘러보기" → `/tools`
- 버튼 2: "문의하기" → `/about#contact`

---

## 5. 메뉴 구조

```
홈 / 도구 / 블로그 / 소개
```

---

## 6. 컬러 시스템

| 용도 | 값 |
|---|---|
| Background | `#FAFAFA` |
| Text | `#111827` |
| Primary | `#2563EB` |
| Accent | `#FD7125` |

현재 `BaseLayout.astro`의 CSS 변수(`--color-bg`, `--color-text`, `--color-accent` 등)에
이 값을 반영하는 작업 아직 미완료 (Accent `#FD7125` 미적용 상태) — [CURRENT_TASK.md](./CURRENT_TASK.md) 참고.
