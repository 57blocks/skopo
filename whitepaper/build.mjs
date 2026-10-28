#!/usr/bin/env node
// Builds self-contained copies of the whitepaper: index.html with the Markdown embedded, so it opens
// from disk, can be sent to anyone, and prints to PDF. Fonts still load from Google Fonts when
// online; offline they fall back to the system's.
// Usage:
//   node whitepaper/build.mjs [zh|en] …   one file per language in dist/ (default: every <lang>.md present)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = import.meta.dirname;
const args = process.argv.slice(2);
const asked = args.filter((a) => !a.startsWith('--'));
const langs = asked.length ? asked : ['zh', 'en'].filter((l) => existsSync(join(DIR, `${l}.md`)));
const template = readFileSync(join(DIR, 'index.html'), 'utf8');
const SLOT = /<script id="skopo-md">[\s\S]*?<\/script>/;
if (!SLOT.test(template)) { console.error('build: index.html has no <script id="skopo-md"> slot'); process.exit(1); }

const markdown = Object.fromEntries(langs.map((lang) => {
  const mdPath = join(DIR, `${lang}.md`);
  if (!existsSync(mdPath)) { console.error(`build: no ${lang}.md`); process.exit(1); }
  return [lang, readFileSync(mdPath, 'utf8')];
}));
// JSON is valid JavaScript; escaping "<" keeps "</script>" in the text from closing the tag.
const embed = (data, lang) => template.replace(SLOT, () =>
  `<script id="skopo-md">window.SKOPO_MD = ${JSON.stringify(data).replace(/</g, '\\u003c')};${lang ? ` window.SKOPO_LANG = ${JSON.stringify(lang)};` : ''}</script>`);

mkdirSync(join(DIR, 'dist'), { recursive: true });
for (const lang of langs) {
  const out = join(DIR, 'dist', `skopo-whitepaper.${lang}.html`);
  writeFileSync(out, embed({ [lang]: markdown[lang] }, lang));
  console.log(`built ${out}`);
}
