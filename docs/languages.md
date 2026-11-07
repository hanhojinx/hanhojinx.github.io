# Unified site and Korean typography

- CV: `/`; all articles: `/articles/`; shared feed: `/rss.xml`.
- There is no KO version, language switch, or `/ko/` route.
- English and Korean Markdown files live together in `src/content/articles/`.
- Use `language: ko` for Korean article content semantics; it does not create a separate route or archive.
- All published articles use `/articles/<file-id>/`. Drafts remain excluded.
- Latin sans-serif: IBM Plex Sans. Korean sans-serif fallback: Noto Sans KR.
- Latin serif: Literata. Korean serif fallback: Iropke Batang.
- Existing CV/sidebar sans-serif and article serif scopes are preserved.
- The Korean sample is preserved at `/articles/korean-format-sample/`.
- Removed KO pages and CV copy remain recoverable in Git history.
