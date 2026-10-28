# Skopo: the skopository

Intent documentation for Skopo: what must be true about it, written above the code and the products
that realize it. It follows the Skopo Specification 0.1.0, still a draft.

Skopo is itself a format and its tools: a specification of what a skopository is, reference tools
that check and recover one, and a whitepaper that introduces the idea. This skopository is a companion of the repository it sits in. It
was recovered on 2026-10-21 by the Claude Code plugin from the repository where Skopo was then
developed: the specification, its changelog and examples, the working model and its experiment
notes, the whitepaper, the tools' code and documents, and the git history. It was later brought in step with the
specification by reporting the differences and editing what they showed. Nobody has accepted it
yet, so it has no lock. It is licensed under CC BY 4.0, as the specification
is.

## How to read it

Start with [`spec/skopository/charter.md`](spec/skopository/charter.md), then
[`spec/conformance/charter.md`](spec/conformance/charter.md).

```
skopo.json, keywords.json        the version followed, and the keyword dictionary
spec/
  skopo.md                       shared words: system, intent, skopository, statement, tool
  skopository/
    charter.md                   words of the model, and its six principles
    layers.md                    which layer a statement goes in; products; references point up
    statements.md                anchors, kinds, links, refinement
    force.md                     normative keywords, definitions, hidden force, form conditions
    identity.md                  IDs and keys, moves, retirement, placeholders
    lock.md                      the lock, fingerprints, declared differences, rationale records
    contents.md                  what a skopository leaves out; translations
  conformance/
    charter.md                   conforming skopositories, checkers and generators
    checks.md                    every check, its name and severity; semantic checks; reporting
    generators.md                what a generator writes, and how it weighs its sources
  versions.md                    how the specification is versioned, and which versions a checker accepts
bindings/
  product/specification.md       the published document, and the files and syntax it defines
  product/reference-cli.md       the checker, lock writer, ID tools and recovery helpers
  product/claude-code-plugin.md  /skopo:init, /skopo:lint and /skopo:lock
  product/whitepaper.md          the whitepaper page
  tech/<the same four>.md        how each of those is built and kept
rationale/                       why some decisions were made, where a source says so
```

The spec holds the model of a skopository and the duties of the tools that check and write one, in
words that hold whatever the files look like; the specification's product binding holds the files
and syntax that encode that model. Each statement ends with an anchor whose letter is its kind:
T term, A act, R rule, W assumption, E example, F form decision, D design decision. Only a bold
keyword (must, must not, may) gives force; a rule without one defines a word or a state. A rule
marked `refines` narrows another and applies instead of it within its file. The spec passes the
clerk test (it would stay true with a clerk and a paper ledger in place of the tools), the product
bindings hold what each product's consumers would notice, and the tech bindings hold the design
that any refactor keeping it would leave alone. References point up only: a binding cites the spec,
a tech binding cites its product binding, and nothing here cites code. The tables headed
"Recommendations" hold what the specification recommends without requiring.

## What is not here

- Status, plans and open questions: the repository's pull requests; the questions this recovery
  raised are in its run data, outside this skopository.
- The full text of the specification, its syntax summary and its complete example: `rfc/`.
- The working model, its drafts, worked examples and experiment notes, including ideas the
  specification has not adopted (a pull-request hook, a lock that records who confirmed a
  statement): kept in a separate repository that is not published.
- How to write or recover a skopository, step by step: the Claude Code plugin's writing guide, in
  `tools/harness-plugins/claude-code/skills/init/`.
- The argument for Skopo: `whitepaper/`.
- Coding conventions: the code under `tools/` and `whitepaper/`.
