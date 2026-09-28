export function formatDate(date: Date, language = "en"): string {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function estimateReadingTime(body: string): number {
  const prose = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#[\]()*_>`~|-]/g, " ");
  const latinWords = prose.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const koreanCharacters = prose.match(/[가-힣]/g)?.length ?? 0;
  return Math.max(1, Math.ceil((latinWords + koreanCharacters / 2.5) / 220));
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, "");
  return `${base}${cleanPath}`.replace(/\/{2,}/g, "/");
}
