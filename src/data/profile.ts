export const profile = {
  name: "김선유",
  role: "Automotive Data Analyst / Freelance Developer",
  areas: ["자동차 데이터 분석", "Python 개발", "데이터 처리", "업무 자동화"],
  // TODO: 확인된 경력·이력만 추가 (임의의 연차·성과 금지)
  history: [] as { period: string; title: string; description?: string }[],
  // TODO: 프로필 사진이 준비되면 /images/profile/ 에 두고 경로 지정
  photo: undefined as string | undefined,
  intro:
    "CODIVO STUDIO는 데이터 분석과 소프트웨어 개발을 통해 복잡하고 반복적인 실무를 더 단순하고 효율적으로 만드는 기술 스튜디오입니다. 자동차 데이터 분야의 전문성을 바탕으로 다양한 업무의 데이터 처리와 프로그램 제작 문제를 해결합니다.",
};

export const automotiveExpertise = [
  "국내 시판 차량의 모델·트림별 사양 비교",
  "제조사 공장 출고 옵션 코드·설명 분석",
  "VIN 기반 차량 정보 분석",
  "엔진·원동기 형식 및 차량 속성 분석",
  "데이터 정제·검증·표준화",
  "대량 데이터의 통계·품질 분석",
];

export const dataNotice =
  "차량 데이터는 출처와 품질에 따라 정확성이 달라질 수 있습니다. 분석 결과에는 데이터의 한계를 함께 명시하며, 회사 내부 자료와 고객 비공개 데이터는 게시하지 않습니다.";

export const philosophy = [
  { title: "정확성", description: "데이터 검증과 품질을 가장 먼저 확인합니다." },
  { title: "실용성", description: "실제로 사용할 수 있는 기능을 우선합니다." },
  { title: "효율성", description: "반복 작업과 불필요한 과정을 최소화합니다." },
];
