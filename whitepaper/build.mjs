#!/usr/bin/env node
// Builds self-contained copies of the whitepaper: index.html with the Markdown embedded, so it opens
// from disk, can be sent to anyone, and prints to PDF. Fonts still load from Google Fonts when
// online; offline they fall back to the system's.
// Usage:
//   node whitepaper/build.mjs [zh|en] …   one file per language in dist/ (default: every <lang>.md present)
//   node whitepaper/build.mjs --pdf [zh|en] …   also prints each file to dist/skopo-whitepaper.<lang>.pdf
//                                         with headless Chrome (set CHROME if it is somewhere else)
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIR = import.meta.dirname;
const args = process.argv.slice(2);
const pdf = args.includes('--pdf');
const CHROME_PATHS = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'];
// Time the page gets to load its fonts and draw the figures before it is printed.
const RENDER_BUDGET_MS = 15000;
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
  if (pdf) printPdf(out, join(DIR, 'dist', `skopo-whitepaper.${lang}.pdf`));
}

// The page's print styles drop the navigation and buttons; Chrome prints what they leave.
function printPdf(html, out) {
  const chrome = process.env.CHROME || CHROME_PATHS.find((p) => existsSync(p));
  if (!chrome) { console.error('build: Chrome not found; set CHROME to its path'); process.exit(1); }
  rmSync(out, { force: true });
  spawnSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--virtual-time-budget=${RENDER_BUDGET_MS}`, `--print-to-pdf=${out}`, pathToFileURL(html).href], { stdio: 'ignore' });
  if (!existsSync(out)) { console.error(`build: Chrome did not write ${out}`); process.exit(1); }
  console.log(`printed ${out}`);
}
