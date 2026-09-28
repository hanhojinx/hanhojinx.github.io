import * as en from "./cv";
export const about = [
  "한호진은 사이버보안, 소프트웨어 시스템, 컴퓨터과학과 인공지능에 관심을 두고 연구합니다. 기술적인 글과 문학적인 글을 모두 즐겨 쓰며, 새로운 시스템을 만드는 일과 기존 시스템을 개선하는 일에서 동등한 즐거움을 느낍니다. 현재는 보다 효율적이고 자원을 적게 사용하는 방식으로 오픈소스 LLM 생태계의 투명성을 유지할 수 있는 방법을 탐구하고 있습니다. 특별한 용건이 있든 없든, 어떤 연락이든 환영합니다.",
  "이 페이지는 학술 이력과 긴 단상 및 아티클을 구분해 담고 있으며, 아직 완전히 완성되지는 않았습니다. 아래 소개 및 이력에서 비워 둔 부분은 새로운 내용으로 채우기 전까지 의도적으로 남겨 둔 것입니다.",
];
export const researchInterests = [
  "LLM 출처 추적 및 핑거프린팅",
  "AI를 위한 보안 및 보안을 위한 AI",
  "공개출처정보(OSINT)",
  "소프트웨어 보안",
];
export const education: en.CVEntry[] = [
  { ...en.education[0], organization: "고려대학교", detail: "컴퓨터학과 이학사 취득 예정", location: "대한민국 서울" },
  { ...en.education[1], organization: "칭다오 갤럭시 국제학교", location: "중국 산둥성" },
];
export const experience: en.CVEntry[] = [
  { ...en.experience[0], period: "2025 — 현재", organization: "소프트웨어 보안 및 프라이버시 연구실", detail: "학부 연구생", description: "업무 범위와 연구 기여를 설명하는 한두 문장으로 교체할 예정입니다." },
];
export const publications: en.Publication[] = [
  { ...en.publications[0], title: "샘플 논문 제목", authors: "저자 1, 한호진, 저자 3", venue: "학술대회 또는 프리프린트 저장소 예시" },
];
export const projects: en.Project[] = [
  { ...en.projects[0], description: "의도적으로 취약하게 설계한 챗봇을 통해 LLM 통합 웹 애플리케이션의 보안 위험을 탐구하는 교육 프로젝트입니다. 통제된 환경에서 프롬프트 기반 명령 실행, SQL 인젝션, 안전하지 않은 출력 처리, 간접 프롬프트 인젝션을 시연합니다." },
  { ...en.projects[1], name: "인공지능 단일법 제정의 방향성 — 유럽연합, 미국과의 비교를 중심으로", subtitle: en.projects[1].name, subtitleLang: "en", description: "유럽연합과 미국의 AI 거버넌스를 국내 법제 및 제22대 국회에 발의된 AI 관련 법안과 함께 비교한 연구입니다. 유연한 규제, 규제 샌드박스, 국제 기준과의 정합성, 정부와 산업계의 지속적인 협력을 통해 혁신과 위험 완화의 균형을 이루는 국내 인공지능 단일법의 방향을 제안합니다." },
];
export const certifications: typeof en.certifications = [{ name: "정보처리기사" }, { name: "TOEIC (990)" }];
export const awards = en.awards;
