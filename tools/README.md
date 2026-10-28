# Tools

Software that works with skopositories. Nothing here is needed to write or read one: the
specification in [`../rfc/`](../rfc/) is enough to build other tools.

| Directory | Holds |
|---|---|
| [`cli/`](cli/) | harness-neutral scripts: the checker (`lint.mjs`), the lock writer, ID tools, and the helpers a recovery uses. Node.js 22 or later, no dependencies |
| [`harness-plugins/`](harness-plugins/) | adapters that let an agent harness recover and check a skopository, one directory per harness |

A harness installs only its plugin's own directory, so each harness plugin carries a copy of
`cli/`. Edit `cli/`, then run:

```bash
node tools/sync-harness-plugins.mjs
```

`--check` reports any plugin whose copy has drifted, without changing it.
