import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";

const root = resolve("dist");
const read = path => readFileSync(join(root, path), "utf8");
const english = read("index.html");
const korean = read("ko/index.html");
assert.match(english, /<html lang="en"/);
assert.match(korean, /<html lang="ko"/);
assert.match(english, /family=IBM\+Plex\+Sans/);
assert.match(english, /family=Literata/);
assert.doesNotMatch(english, /Crimson\+Pro/);
assert.match(korean, /\/fonts\/iropke-batang\/font.css/);
assert.match(korean, /family=Noto\+Sans\+KR/);
assert.match(read("ko/articles/index.html"), /family=Noto\+Sans\+KR/);
assert.doesNotMatch(english, /family=Noto\+Sans\+KR/);
assert.ok(existsSync(join(root, "fonts/iropke-batang/IropkeBatangM.woff")));
assert.match(english, /Hojin is a researcher/);
assert.match(korean, /정보보안, 소프트웨어보안, 컴퓨터과학과 인공지능 등에 관심이 있습니다/);
assert.match(korean, /관심분야/);
assert.match(korean, /AI for Security &amp; Security for AI/);
assert.match(korean, /컴퓨터 및 소프트웨어보안/);
assert.match(korean, /정보대학 컴퓨터학과/);
assert.match(korean, /QDGIS/);
assert.match(korean, /Shandong, China/);
assert.match(korean, /작품/);
assert.doesNotMatch(korean, /LLM 출처 추적 및 핑거프린팅|연구 관심 분야|서지 목록|컴퓨터학과 이학사 취득 예정/);
assert.match(korean, /href="\/ko\/articles\/"/);
assert.match(read("ko/articles/index.html"), /생각을 기록하는 방법 — 한글 서식 샘플/);
assert.doesNotMatch(read("ko/articles/index.html"), /아직 등록된 한글 게시글이 없습니다/);
assert.match(read("ko/articles/index.html"), /게시글 — 한호진/);
assert.match(read("ko/articles/index.html"), /장르나 분류 상관없이 그때그때 쓰고 싶은 글들을 끄적입니다/);
assert.doesNotMatch(read("ko/articles/index.html"), /A Note on Model Provenance/);
assert.match(read("articles/index.html"), /A Note on Model Provenance/);
assert.match(read("ko/rss.xml"), /korean-format-sample/);
assert.doesNotMatch(read("rss.xml"), /korean-format-sample/);
assert.doesNotMatch(read("articles/index.html"), /korean-format-sample/);
const sample = read("ko/articles/korean-format-sample/index.html");
for (const pattern of [/<html lang="ko"/, /목차/, /읽는 시간/, /수정일/, /<table/, /astro-code/, /katex/, /<figure/, /<figcaption/, /footnotes/, /<h4/, /<del>/]) {
  assert.match(sample, pattern);
}
assert.match(read("rss.xml"), /<item>/);
assert.ok(existsSync(join(root, "unified-ai-act.pdf")));

const init = english.match(/<script>([\s\S]*?color-theme[\s\S]*?)<\/script>/)?.[1];
assert.ok(init, "Theme initialization is rendered in head");
for (const stored of [null, "light", "dark", "invalid"]) {
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(init, { document, localStorage: { getItem: () => stored } });
  assert.equal(document.documentElement.dataset.theme, stored === "dark" ? "dark" : "light");
}
const document = { documentElement: { dataset: {} } };
vm.runInNewContext(init, { document, localStorage: { getItem() { throw Error("Storage blocked"); } } });
assert.equal(document.documentElement.dataset.theme, "light");

function verifyLinks(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) verifyLinks(path);
    else if (entry.name.endsWith(".html")) {
      const html = readFileSync(path, "utf8");
      assert.match(html, /round-control theme-toggle/);
      assert.match(html, /moon-icon/);
      assert.match(html, /sun-icon/);
      assert.doesNotMatch(html, /toggle-track|toggle-thumb|role="switch"/);
      assert.match(html, /language-toggle/);
      for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
        const link = decodeURI(match[1].split(/[?#]/)[0]);
        if (link.startsWith("//")) continue;
        const target = join(root, link);
        assert.ok(existsSync(target) || existsSync(join(target, "index.html")), `Broken local link: ${link} in ${path}`);
      }
    }
  }
}
verifyLinks(root);
// Exercise the control's actual event handlers, including unavailable storage.
const controlSource = readFileSync("src/components/SiteControls.astro", "utf8");
const controlScript = controlSource.match(/<script>([\s\S]*?)<\/script>/)[1].replace("<HTMLButtonElement>", "");
for (const lang of ["ko", "en"]) {
  for (const storageBlocked of [false, true]) {
    const attributes = {};
    const events = {};
    let click;
    let stored;
    const element = {
      setAttribute: (key, value) => { attributes[key] = value; },
      addEventListener: (_, handler) => { click = handler; },
    };
    const document = { documentElement: { lang, dataset: { theme: "light" } }, querySelector: () => element };
    vm.runInNewContext(controlScript, {
      document,
      window: { addEventListener: (key, handler) => { events[key] = handler; } },
      localStorage: { setItem: (_, value) => { if (storageBlocked) throw Error("blocked"); stored = value; } },
    });
    click();
    assert.equal(document.documentElement.dataset.theme, "dark");
    assert.equal(attributes["aria-label"], lang === "ko" ? "라이트 모드로 전환" : "Switch to light mode");
    assert.equal(attributes.title, attributes["aria-label"]);
    if (!storageBlocked) assert.equal(stored, "dark");
    click();
    assert.equal(document.documentElement.dataset.theme, "light");
    events.storage({ key: "color-theme", newValue: "dark" });
    assert.equal(document.documentElement.dataset.theme, "dark");
    events.storage({ key: null, newValue: null });
    assert.equal(document.documentElement.dataset.theme, "light");
  }
}
console.log("PASS: locales, archives, RSS isolation, all local links, theme defaults and blocked storage");
