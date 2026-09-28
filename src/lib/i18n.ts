import { withBase } from "./format";

export type Language = "en" | "ko";
export function languageFromPath(path: string): Language {
  return pathWithoutBase(path).startsWith("/ko/") || pathWithoutBase(path) === "/ko" ? "ko" : "en";
}
function pathWithoutBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base && path.startsWith(base + "/") ? path.slice(base.length) : path;
}
export function localizedPath(path: string, language: Language): string {
  const clean = pathWithoutBase(path).replace(/^\/ko(?=\/|$)/, "") || "/";
  return withBase(language === "ko" ? "/ko" + clean : clean);
}
// Articles are independent publications, not presumed translations.
export function languageSwitchPath(path: string, language: Language): string {
  if (languageFromPath(path) === language) return path;
  const clean = pathWithoutBase(path).replace(/^\/ko(?=\/|$)/, "") || "/";
  return localizedPath(clean.startsWith("/articles/") ? "/articles/" : clean, language);
}
