import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { profile } from "../config/profile";
import { siteConfig } from "../config/site";
import { basePath } from "../../site.config.mjs";

export async function GET(context: { site?: URL }) {
  const articles = (await getCollection("articles", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${profile.name} — Articles`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `${basePath === "/" ? "" : basePath}/articles/${article.id}/`,
      categories: article.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
}
