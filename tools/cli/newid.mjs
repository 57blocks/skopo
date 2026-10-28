#!/usr/bin/env node
// Prints new statement IDs that no statement, lock entry or retired ID of the skopository uses.
// Usage: node newid.mjs <T|A|R|W|E|F|D> [count] [skopository]
// Without a skopository the IDs are random but checked against nothing, and it says so.
import { randomInt } from 'node:crypto';
import { ALPHABET, lockedStatements, loadRecords, loadLock } from './spec.mjs';

const [kind, count = '1', ROOT] = process.argv.slice(2);
if (!/^[TAWREFD]$/.test(kind ?? '') || !/^\d+$/.test(count)) {
  console.error('usage: newid.mjs <T|A|R|W|E|F|D> [count] [skopository]');
  process.exit(2);
}
if (!ROOT) console.error('no skopository given: these IDs are checked against nothing');
const taken = new Set(ROOT ? [
  ...lockedStatements(ROOT).map((s) => s.key),
  ...Object.keys(loadLock(ROOT)?.statements ?? {}),
  ...loadRecords(ROOT).flatMap((r) => r.retires.map((x) => x.key)),
] : []);
for (let i = 0; i < Number(count); i += 1) {
  let key;
  do key = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
  while (taken.has(key));
  taken.add(key);
  console.log(`${kind}-${key}`);
}
