// Writes a tiny redirect page for every short link, so each tool gets a stable
// address (https://<site>/<slug>/) that is safe to paste into Canvas.
// GitHub Pages has no redirect rules, so each short link is a folder holding an
// index.html that forwards the browser. The Pages workflow runs this inside a copy
// of the site (_site) on every push (see .github/workflows/pages.yml), so the
// generated folders never land in the repo.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const { tools } = JSON.parse(readFileSync("tools.json", "utf8"));
const made = new Set();

function page(dir, target, name) {
  if (existsSync(dir) && ![...made].some(d => dir === d || dir.startsWith(d + "/"))) {
    throw new Error(`Short link /${dir}/ would overwrite a real folder. Pick another slug.`);
  }
  made.add(dir);
  mkdirSync(dir, { recursive: true });
  const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  writeFileSync(`${dir}/index.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(name)}</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<link rel="canonical" href="${esc(target)}">
<script>location.replace(${JSON.stringify(target)} + location.hash);</script>
</head>
<body>
<p>Opening <a href="${esc(target)}">${esc(name)}</a>…</p>
</body>
</html>
`);
}

// Targets inside this site are relative to the short-link folder.
for (const t of tools) {
  if (t.path) page(t.slug, `../${t.path}`, t.name);
  else if (t.url) page(t.slug, t.url, t.name);
  else page(t.slug, "../", t.name);
  if (t.guide) page(`${t.slug}/guide`, `../../${t.guide}`, `Guide to ${t.name}`);
}
page("sources", "../citations/", "Sources and citations");

console.log(`Wrote short links for ${tools.length} tools.`);
