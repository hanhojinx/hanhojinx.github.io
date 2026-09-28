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
assert.match(korean, /한호진은 사이버보안/);
assert.match(korean, /href="\/ko\/articles\/"/);
assert.match(read("ko/articles/index.html"), /아직 등록된 한글 아티클이 없습니다/);
assert.doesNotMatch(read("ko/articles/index.html"), /A Note on Model Provenance/);
assert.match(read("articles/index.html"), /A Note on Model Provenance/);
assert.doesNotMatch(read("ko/rss.xml"), /<item>/);
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
      assert.match(html, /data-theme-choice="light"/);
      assert.match(html, /data-theme-choice="dark"/);
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
console.log("PASS: locales, archives, RSS isolation, all local links, theme defaults and blocked storage");
