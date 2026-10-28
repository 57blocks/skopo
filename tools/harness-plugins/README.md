# Harness plugins

Adapters that let an agent harness recover and check a skopository. Each directory is a complete
plugin for one harness, installable on its own.

| Harness | Directory | Commands |
|---|---|---|
| Claude Code | [`claude-code/`](claude-code/) | `/skopo:init`, `/skopo:lint`, `/skopo:lock` |

A plugin for another harness keeps the same split: its own instructions and agent definitions, and
a copy of [`../cli/`](../cli/) for everything mechanical. Register it in `TARGETS` in
`../sync-harness-plugins.mjs`. The recovery's writing guide (`claude-code/skills/init/guide.md`)
is the part most worth reusing; it holds no Claude Code specifics.
