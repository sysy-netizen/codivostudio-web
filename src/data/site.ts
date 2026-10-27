export const site = {
  name: "CODIVO STUDIO",
  url: "https://codivostudio.com",
  tagline: "데이터를 분석하고, 기술로 해결합니다.",
  taglineEn: "Data Intelligence. Practical Solutions.",
  description:
    "자동차 데이터에 대한 전문적인 분석과 Python·AI 기반 개발 역량으로 복잡한 데이터와 반복 업무를 더 효율적으로 만듭니다.",
  // TODO: 실제 수신 가능한 주소인지 확인 필요 (기존 사이트 contact 페이지에서 가져온 값)
  email: "contact@codivostudio.com",
  // TODO: 실제 계정이 확정되면 추가 (가짜 링크 금지)
  profileLinks: [] as { label: string; href: string }[],
  nav: [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "TOOLS", href: "/tools" },
    { label: "CONTACT", href: "/contact" },
  ],
};
