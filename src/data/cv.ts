export type Link = { label: string; href: string };

export type CVEntry = {
  period: string;
  organization: string;
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
  "Hojin Han is a researcher working across security, artificial intelligence, and software systems. Replace this short biography with a concise account of current questions, methods, and affiliations.",
  "This site separates a conventional academic record from longer research notes. All biographical and CV details below are deliberately marked as sample content until replaced.",
];

export const researchInterests = [
  "LLM provenance",
  "AI security",
  "Software security",
  "OSINT / CTI",
];

export const education: CVEntry[] = [
  {
    period: "2022 — 2027",
    organization: "Korea University",
    detail: "Bachelor of Science in Computer Science and Engineering",
    location: "Seoul, Republic of Korea",
  },
  {
    period: "2018 — 2021",
    organization: "Qingdao Galaxy International School",
    detail: "",
    location: "Shandong, China",
  },
];

export const experience: CVEntry[] = [
  {
    period: "20XX — Present",
    organization: "Research group or organization",
    detail: "Sample research or engineering role",
    description:
      "Replace with one or two sentences describing the scope of the work and its research contribution.",
    placeholder: true,
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
    name: "Sample Research Project",
    description:
      "A brief placeholder summary describing the research question, method, or engineering artifact.",
    placeholder: true,
  },
];

export const certifications: { name: string; description?: string; descriptionLang?: string }[] = [
  {
    name: "Information Processing Engineer Certificate",
    description: "정보처리기사",
    descriptionLang: "ko",
  },
  {
    name: "TOEIC — 990",
  },
];

export const awards: CVEntry[] = [];
