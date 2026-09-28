import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../../config/site";
import { localizedPath } from "../../lib/i18n";
export async function GET(context: { site?: URL }) {
  const articles = (await getCollection("articles", ({ data }) => !data.draft && data.language === "ko"))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: "한호진 — 아티클",
    description: "보안, 인공지능, 소프트웨어 시스템에 관한 연구 노트와 에세이.",
    site: context.site ?? siteConfig.siteUrl,
    items: articles.map(article => ({
      title: article.data.title, description: article.data.description,
      pubDate: article.data.publishedAt, categories: article.data.tags,
      link: localizedPath(`/articles/${article.id}/`, "ko"),
    })),
    customData: "<language>ko-kr</language>",
  });
}
