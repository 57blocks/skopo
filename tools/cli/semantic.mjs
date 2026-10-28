#!/usr/bin/env node
// Prepares the semantic layer. Writes, to the file given with --out, the pairs a model judges:
//   S1  statements declared "Rewords" whose text changed since the lock: before and after
//   S2  translated statements whose translation or source changed since the lock
// A model judges each pair with semantic-prompt.md and writes a findings file, which lint.mjs reads
// with --semantic. Both files stay outside the skopository.
// Usage: node semantic.mjs <skopository> --out <input.json> [--all-translations]
import { writeFileSync } from 'node:fs';
import { rootOf, sha, lockedStatements, loadDir, loadRecords, loadLock, translationDirs } from './spec.mjs';

const ARGS = process.argv.slice(2);
const OUT = ARGS.includes('--out') ? ARGS[ARGS.indexOf('--out') + 1] : null;
const USAGE = 'semantic.mjs <skopository> --out <input.json> [--all-translations]';
const ROOT = rootOf(ARGS.filter((a) => a !== OUT), USAGE);
if (!OUT) { console.error(`usage: ${USAGE}`); process.exit(2); }
const all = ARGS.includes('--all-translations');
const byKey = new Map(lockedStatements(ROOT).map((s) => [s.key, s]));
const lock = loadLock(ROOT) ?? { records: [], statements: {}, translations: {} };

const fresh = loadRecords(ROOT).filter((r) => !lock.records.includes(r.name));
const s1 = fresh.flatMap((r) => r.rewords.map((x) => ({ r, key: x.key })))
  .filter(({ key }) => byKey.has(key) && lock.statements[key] && lock.statements[key].sha !== sha(byKey.get(key).text))
  .map(({ r, key }) => ({ check: 'S1', id: byKey.get(key).id, record: r.name, before: lock.statements[key].text, after: byKey.get(key).text }));

const s2 = translationDirs(ROOT).flatMap((d) => loadDir(ROOT, d).statements.map((t) => ({ d, t })))
  .filter(({ t }) => byKey.has(t.key))
  .filter(({ d, t }) => {
    if (all) return true;
    const was = lock.translations?.[d]?.[t.key];
    return !was || was.sha !== sha(t.text) || was.source !== sha(byKey.get(t.key).text);
  })
  .map(({ t }) => ({ check: 'S2', id: t.id, lang: t.lang, source: byKey.get(t.key).text, translation: t.text }));

writeFileSync(OUT, `${JSON.stringify([...s1, ...s2], null, 1)}\n`);
console.log(`${OUT}: ${s1.length} S1 pairs · ${s2.length} S2 pairs${all ? ' (all translations)' : ' (changed since the lock)'}`);
