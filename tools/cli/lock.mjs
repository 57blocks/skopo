#!/usr/bin/env node
// Writes spec.lock.json: the text and fingerprint of every statement in spec/, every form decision in
// bindings/product/ and every design decision in bindings/tech/, the fingerprint of every translated
// statement, and the rationale records already folded in. It records text people accepted (§10.4), so
// it is written when they accept a change, never by a recovery on its own.
// Usage: node lock.mjs <skopository>
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { rootOf, sha, lockedStatements, loadDir, loadRecords, translationDirs, LOCK } from './spec.mjs';

const ROOT = rootOf(process.argv.slice(2), 'lock.mjs <skopository>');
const sorted = lockedStatements(ROOT).sort((a, b) => a.key.localeCompare(b.key));
const entry = (s) => ({ kind: s.kind, where: s.where, sha: sha(s.text), text: s.text });
const shaOf = new Map(sorted.map((s) => [s.key, sha(s.text)]));
const translations = Object.fromEntries(translationDirs(ROOT).map((d) => [d, Object.fromEntries(
  loadDir(ROOT, d).statements.map((t) => [t.key, { sha: sha(t.text), source: shaOf.get(t.key) ?? null }]),
)]));
const records = loadRecords(ROOT).map((r) => r.name);

// A JS object puts all-digit keys ("988915") first whatever the insertion order, so the statements
// are written out by hand in key order: the lock then diffs cleanly.
const nest = (value) => JSON.stringify(value, null, 1).split('\n').join('\n  ');
const body = sorted.map((s) => `  ${JSON.stringify(s.key)}: ${nest(entry(s))}`).join(',\n');
const text = `{\n "records": ${nest(records).replace(/\n {2}/g, '\n ')},\n "statements": {\n${body}\n },\n "translations": ${JSON.stringify(translations, null, 1).split('\n').join('\n ')}\n}\n`;
JSON.parse(text); // never write a lock that does not parse
writeFileSync(join(ROOT, LOCK), text);
console.log(`${LOCK}: ${sorted.length} statements · ${Object.values(translations).reduce((n, t) => n + Object.keys(t).length, 0)} translated · ${records.length} rationale records`);
