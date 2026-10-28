# Skopo command-line tools

Harness-neutral scripts for skopositories. Node.js 22 or later, no dependencies. Every script takes
absolute paths, and every script that reads or writes a skopository is given its path: none
guesses one.

| Script | Does |
|---|---|
| `lint.mjs <skopository> [--semantic <findings.json>]` | checks a skopository: the L checks, one line per finding with its severity, and S1 and S2 findings from a model's findings file |
| `lock.mjs <skopository>` | writes `spec.lock.json`, once people accept the skopository's content |
| `newid.mjs <kind> [count] [skopository]` | prints new statement IDs that the skopository does not use |
| `assign-ids.mjs <skopository> [--map <file>] [--also <file>]…` | replaces placeholder IDs (`R-@label`) with new ones |
| `semantic.mjs <skopository> --out <input.json>` | prepares the pairs a model judges for S1 and S2, with `semantic-prompt.md`; no command runs it yet |
| `inventory.mjs [--out <file>] <root>…` | surveys repositories before a recovery: branches, sizes, languages, documents |
| `run.mjs start\|set\|phase\|lint\|finish …` | records a recovery run under `.skopo/runs/` |

`spec.mjs` is the shared parser. `keywords.json` is the default keyword dictionary: a skopository's
own `keywords.json` names its languages, and a member an entry lacks comes from the default.

These files are copied into each harness plugin by `../sync-harness-plugins.mjs`.
