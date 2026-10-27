export type SkillLevel = "practice" | "project" | "learning";

export const skillLevelLabels: Record<SkillLevel, string> = {
  practice: "실무 활용",
  project: "프로젝트 활용",
  learning: "학습 중",
};

// TODO: 숙련 구분은 본인 확인 후 조정. 숙련도 퍼센트는 표시하지 않는다.
export const skills: { name: string; level: SkillLevel }[] = [
  { name: "Python", level: "practice" },
  { name: "pandas", level: "practice" },
  { name: "Excel / CSV 처리", level: "practice" },
  { name: "REST API · JSON", level: "project" },
  { name: "업무 자동화", level: "practice" },
  { name: "AI 코딩 도구 활용 개발", level: "practice" },
  { name: "Next.js 웹 도구 제작", level: "project" },
];
