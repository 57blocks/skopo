#!/usr/bin/env node
// Appends the session ID and transcript path to <project>/.skopo/sessions.jsonl when a Skopo recovery
// starts. Fires on the /skopo:init expansion and on a Skill call; any other Skill call is ignored.
// Never fails the session: every error exits 0.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

try {
  const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
  const skill = input.tool_input?.skill ?? input.tool_input?.command ?? '';
  const isRecovery = input.hook_event_name === 'UserPromptExpansion' || /\bskopo:init\b/.test(skill);
  if (isRecovery && input.session_id) {
    const base = join(input.cwd ?? process.env.CLAUDE_PROJECT_DIR ?? process.cwd(), '.skopo');
    mkdirSync(base, { recursive: true });
    if (!existsSync(join(base, '.gitignore'))) writeFileSync(join(base, '.gitignore'), '# Skopo run data: kept for analysis, never committed.\n*\n');
    const entry = { at: new Date().toISOString(), event: input.hook_event_name, session_id: input.session_id, transcript_path: input.transcript_path ?? null };
    appendFileSync(join(base, 'sessions.jsonl'), `${JSON.stringify(entry)}\n`);
  }
} catch {
  // Recording is best effort; a recovery must never stop because of it.
}
process.exit(0);
