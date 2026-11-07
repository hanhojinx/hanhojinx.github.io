import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";

const root = resolve("dist");
const read = path => readFileSync(join(root, path), "utf8");
const english = read("index.html");
assert.doesNotMatch(english, /publications-heading|Sample Publication Title/);
assert.match(readFileSync("src/data/cv.ts", "utf8"), /Sample Publication Title/);
assert.match(readFileSync("src/pages/index.astro", "utf8"), /publications-heading/);
for (const title of ["Perplexity Campus Partner", "KITRI WhiteHat School 2nd", "KUCC", "Web Hacking Session Mentor", "MIT xPro BlendED Communication Leader"]) assert.ok(english.includes(title));
assert.ok(english.indexOf('id="projects-heading"') < english.indexOf('id="community-heading"'));
assert.ok(english.indexOf('id="community-heading"') < english.indexOf('id="certifications-heading"'));
assert.equal(readFileSync("README.md", "utf8").trim(), "Personal Page Repo");
assert.match(english, /<html lang="en"/);
assert.match(english, /family=IBM\+Plex\+Sans/);
assert.match(english, /family=Literata/);
assert.match(english, /family=Noto\+Sans\+KR/);
assert.match(english, /\/fonts\/iropke-batang\/font.css/);
assert.ok(!existsSync(join(root, "ko")), "KO routes must not be generated");
assert.doesNotMatch(english, /Replace with one or two sentences/);
assert.match(english, /Software Security and Privacy Lab/);
assert.match(read("articles/index.html"), /Research notes, essays, memoirs, or simply just my thoughts/);
assert.match(read("articles/index.html"), /No articles have been published yet/);
for (const slug of ["korean-format-sample", "a-note-on-model-provenance", "understanding-open-source-intelligence"]) {
  assert.match(readFileSync(`src/content/articles/${slug}.md`, "utf8"), /draft: true/);
  assert.ok(!existsSync(join(root, "articles", slug)), "Draft detail must not be generated");
  for (const file of ["articles/index.html", "rss.xml", "sitemap-0.xml"]) assert.ok(!read(file).includes(slug), `Draft leaked in ${file}`);
}
const css = readFileSync("src/styles/global.css", "utf8");
assert.match(css, /"IBM Plex Sans", "Noto Sans KR"/);
assert.match(css, /"Literata", "Iropke Batang"/);
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
      assert.doesNotMatch(html, /language-toggle|href="\/ko\//);
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
console.log("PASS: unified archive and RSS, Korean fonts, no KO routes, links and theme controls");
