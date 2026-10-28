# 2026-10-19 · Each harness plugin carries a copy of the tools

| | |
|---|---|
| Touches | D-18qv5k, D-pjaxvr |
| Sources | tools/README.md; tools/sync-harness-plugins.mjs (header) |
| Grade | evidenced |
| Recorded | reconstructed 2026-10-21 |

The harness-neutral tools are kept once and copied into each harness plugin by a sync step, because
a harness installs only its plugin's own directory and nothing outside it.
