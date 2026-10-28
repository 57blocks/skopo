# 2026-10-21 · The page renders only Markdown it can trust

| | |
|---|---|
| Touches | F-nvjbz0, F-d8pmdm, F-wqdfjy, D-55x7k4, D-23nnec |
| Sources | notes on the recovery of this skopository (a question about the page) |
| Grade | evidenced |
| Recorded | 2026-10-21 |

The page took a Markdown address from anyone and passed link targets through, "so a crafted address
could put a javascript: link on the published page". The address now works only on the reader's own
machine or from disk, and a link keeps its target only if it is relative, http, https or mailto.
