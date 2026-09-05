export type Link = { label: string; href: string };

export type CVEntry = {
  period: string;
  organization: string;
  organizationUrl?: string;
  detail: string;
  location?: string;
  description?: string;
  links?: Link[];
  placeholder?: boolean;
};

export type Publication = {
  year: string;
  title: string;
  authors: string;
  venue: string;
  status?: "Published" | "Accepted" | "Preprint" | "Under Review";
  links?: Link[];
  placeholder?: boolean;
};

export type Project = {
  name: string;
  description: string;
  links?: Link[];
  placeholder?: boolean;
};

export const about = [
  "Hojin is a researcher interested in the fields of cybersecurity, software systems, and CSAI. SHORT BIOGRAPHY with a concise account of current questions, methods, and AFFILIATIONS.",
  "This site separates a conventional academic record from longer notes and articles written down. All biographical and CV details left blank below are deliberately left so until replaced.",
];

export const researchInterests = [
  "LLM Provenance & Fingerprinting",
  "Security for AI & AI for Security",
  "OSINT(Open-Source Intelligence)",
  "Software Security",
];

export const education: CVEntry[] = [
  {
    period: "2022 — 2027",
    organization: "Korea University",
    organizationUrl: "https://www.korea.ac.kr/sites/ko/index.do",
    detail: "Bachelor of Science in Computer Science and Engineering",
    location: "Seoul, Republic of Korea",
  },
  {
    period: "2018 — 2021",
    organization: "Qingdao Galaxy International School",
    organizationUrl: "https://www.linkedin.com/school/qdgis/",
    detail: "",
    location: "Shandong, China",
  },
];

export const experience: CVEntry[] = [
  {
    period: "2025 — Present",
    organization: "Software Security and Privacy Lab",
    detail: "Undergraduate RA",
    description:
      "Replace with one or two sentences describing the scope of the work and its research contribution.",
  },
];

export const publications: Publication[] = [
  {
    year: "20XX",
    title: "Sample Publication Title",
    authors: "Author One, Hojin Han, Author Three",
    venue: "Sample venue or preprint archive",
    status: "Preprint",
    placeholder: true,
  },
];

export const projects: Project[] = [
  {
    name: "LLM Integrated Web Hacking",
    description:
      "An educational project exploring security risks in LLM-integrated web applications through a deliberately vulnerable chatbot. Demonstrates prompt-driven command execution, SQL injection, insecure output handling, and indirect prompt injection in a controlled environment.",
  },
];

export const certifications: { name: string; description?: string; descriptionLang?: string }[] = [
  {
    name: "Information Processing Engineer Certificate",
  },
  {
    name: "TOEIC (990)",
  },
];

export const awards: CVEntry[] = [];
