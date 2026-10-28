#!/usr/bin/env node
// Copies the harness-neutral tools in tools/cli/ into each harness plugin that ships them, because a
// harness installs a plugin's own directory and nothing outside it. tools/cli/ is the source; never
// edit a plugin's copy.
// Usage: node tools/sync-harness-plugins.mjs [--check]
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const TOOLS = import.meta.dirname;
const SOURCE = join(TOOLS, 'cli');
// Each harness plugin and the directory inside it that receives the tools.
const TARGETS = { 'claude-code': 'scripts' };
const SKIP = new Set(['README.md']);

const check = process.argv.includes('--check');
const sourceFiles = readdirSync(SOURCE).filter((f) => !SKIP.has(f)).sort();
const differences = [];
for (const [plugin, dir] of Object.entries(TARGETS)) {
  const target = join(TOOLS, 'harness-plugins', plugin, dir);
  const present = existsSync(target) ? readdirSync(target).sort() : [];
  for (const f of sourceFiles) {
    const same = present.includes(f) && readFileSync(join(SOURCE, f)).equals(readFileSync(join(target, f)));
    if (same) continue;
    differences.push(`${plugin}/${dir}/${f}`);
    if (!check) { mkdirSync(target, { recursive: true }); copyFileSync(join(SOURCE, f), join(target, f)); }
  }
  for (const f of present.filter((p) => !sourceFiles.includes(p))) {
    differences.push(`${plugin}/${dir}/${f} (not in tools/cli)`);
    if (!check) rmSync(join(target, f));
  }
}
if (check && differences.length) {
  console.error(`out of sync with tools/cli:\n  ${differences.join('\n  ')}\nrun: node tools/sync-harness-plugins.mjs`);
  process.exit(1);
}
console.log(check ? 'harness plugins are in sync with tools/cli' : `${differences.length} files synced`);
