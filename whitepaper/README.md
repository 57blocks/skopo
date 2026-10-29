# Whitepaper

*Agent 写代码，我们写什么？* / *When agents write the code, what do we write?*, in Chinese
(`zh.md`) and English (`en.md`). The Markdown is the source; `index.html` renders it in the layout
designed in Claude Design. The Chinese text is written first; keep the English in step with it.

| Path | Holds |
|---|---|
| `zh.md`, `en.md` | the text, the only files to edit for wording |
| `index.html` | the renderer: reads `<lang>.md` next to it and lays it out, figures included |
| `build.mjs` | writes `dist/skopo-whitepaper.<lang>.html`, a self-contained copy with the Markdown embedded; with `--pdf`, prints each to `dist/skopo-whitepaper.<lang>.pdf` |
| `design/` | the Claude Design export the renderer reproduces, kept as the reference; not committed, since it bundles the brand's fonts |

## Read it

Over http, while editing (refresh after each change):

```bash
python3 -m http.server 8765 --directory whitepaper
```

Then open `http://localhost:8765/`. Add `?lang=zh` or `?lang=en` to pick a language, and
`theme=dark` for the dark theme.

The page opens in the language of `?lang`, else the reader's last choice on the page, else the first
Chinese or English language in the browser's settings, else English. The button beside the theme
switch changes language in place and remembers the choice; it appears only when the page can load
the other language (a single-language build has none).

`index.html` takes the Markdown from the first of these that works: the copy a build embeds; the
file next to it when served over http (what you are editing); the copy on the repository's `main`
branch on GitHub. The last one works even when `index.html` is opened from disk, and it shows what
was last pushed, not local edits. To read local edits from disk, build a copy:

```bash
node whitepaper/build.mjs zh
```

The built file opens from disk, can be sent as is, and prints to PDF from the browser (each section
on a new page). To get the PDFs directly, A4, content only, figures included:

```bash
node whitepaper/build.mjs --pdf
```

It prints each language with headless Chrome, found in its usual place or given as `CHROME=<path>`.

## Skopo samples

A fenced block with the language `skopo` shows excerpts of skopository files. Each excerpt starts
with a line naming its layer and path, `<layer> · <path>`, where the layer is `spec`,
`product binding`, `tech binding`, `rationale` or `view`; the lines after it are the file's
Markdown as it would be in the skopository:

````
```skopo
spec · spec/leave/approval.md
- 请假时长不少于 40 小时的申请，**应**依次经项目负责人、L2 经理和 L3 经理审批。 ^R-wwab73
```
````

The page renders each excerpt (lists, quotes, tables, headings; bold keywords, anchors and link
groups styled) under a label with its layer and path, and the **Raw** switch on each block, when lit,
shows the Markdown source instead. Print shows the rendered view.

## What the figures read from the Markdown

Each `> [!FIGURE] fig-<id> · <title>` block is drawn by the renderer. Its words come from the
Markdown, so wording can change freely; the structure each figure expects is below.

| Figure | Takes its words from |
|---|---|
| fig-ladder | the table just before it, which the figure replaces on the page: one row per rung from the bottom up, the last row being the rung being built; columns are rung, freed from, translator. The broken rungs are the list after the colon in the spec line that mentions 横档 |
| fig-spectrum | the table just before it, which the figure replaces on the page: one row per kind of document, ✓ and ✗ per column, any other text as a dash; the row naming skopo is drawn apart. The two ends of the spectrum come from 从 … 到 … 的顺序; the skopo row's subtitle comes from the spec line with 这一行 |
| fig-law | the spec line with `↔`: pairs separated by `；`, a note in parentheses or after `，`; the column heads are the two quoted words in the first spec line |
| fig-layers | the layer list in the same section (the bullets starting **spec**, **product binding**, **tech binding**), and the six labels quoted after 标 in the spec, in order: code note, three gates, upward arrow, crossed arrow |
| fig-statement | the two code spans in the spec (the statement, and the example starting `> *例*：` or `> *Example.*`), the labels listed after 标出：, and the quoted label after 括号里是 |
| fig-loop | the spec line with `→` for the steps (a note in parentheses; a step starting with 人 is marked as the people's step), 左边是 … 右边是 … for the two boxes, the quoted labels in the 上方 line (a second label adds a thinner arrow), and, optionally, the quoted labels in a line about a dashed step |
| fig-lifespan | the quoted words of the spec in order: today, long term, the fading band and its marker, the lasting band, the code band, its marker, its far end |

A figure whose id is not in this table shows a placeholder.
