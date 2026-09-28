# Language versions

- English home: `/`; Korean home: `/ko/`.
- Article archives and RSS feeds are separate: `/articles/`, `/ko/articles/`, `/rss.xml`, `/ko/rss.xml`.
- Existing articles default to English. Add `language: ko` to the frontmatter of a new Markdown file in `src/content/articles/` to publish a Korean article. Use a unique filename.
- Korean articles build at `/ko/articles/<file-id>/` and never appear in the English archive/feed. `draft: true` excludes either language from publication.
- Articles are independent, not translation pairs. Switching languages while reading goes to the other language's archive.
- Home copy: `src/data/cv.ts` (English), `src/data/cv.ko.ts` (Korean).
- WHITE/BLACK is stored under `color-theme` in localStorage; default is WHITE. It still works for the current page if storage is unavailable.
- English typography: IBM Plex Sans (sans-serif), Literata (serif), loaded from Google Fonts.
- Korean typography: locally installed Sandoll GothicNeo1 / Apple SD Gothic Neo (sans-serif), self-hosted Iropke Batang (serif). Sandoll is not redistributed: a licensed webfont or provider embed is required for consistent rendering on devices without it. Those devices currently use the system Korean sans-serif fallback.
- The existing article serif scope, sidebar sans-serif scope, and monospace code fonts are unchanged.

Example Korean article frontmatter:

```yaml
---
title: "글 제목"
description: "글에 대한 짧은 소개"
language: ko
publishedAt: 2026-09-28
tags: ["Research"]
draft: true
---
```
