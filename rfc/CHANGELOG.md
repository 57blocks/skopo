# Changelog

Changes to the Skopo Specification, newest first. The format follows Keep a Changelog.

## 0.1.0 · unreleased

The first version, still a draft.

- Three layers (spec, product binding, tech binding) with placement tests, and references that
  point up. Placement and leaks of form are judged, not checked.
- Statements as Markdown elements with one trailing anchor; seven kinds (T, A, R, W, E, F, D) and
  where each lives. A table stem, ending with `:` or `：`, is part of every row's statement; a row's
  text is its stem and its cells after the ID. Text in a code span is quoted: it carries no force
  and cites nothing.
- Random, permanent IDs whose key is the identity; kinds may change with the layer.
- Bold normative keywords from a per-language dictionary, form conditions, hidden-force words.
- `skopo.json` declares the specification version; `keywords.json` and `README.md` are required.
- Rationale records, the lock with SHA-256 fingerprints, and declared differences. The lock records
  accepted text, not who accepted it; a tool writes it only when people accept.
- Views are documents generated for a kind of reader; translations, of the spec and the bindings,
  are the only views a skopository stores.
- Checks L0 to L11 (L6 unused) with severities, applied to translations too, and optional semantic
  checks S1 to S3. A checker may stop after errors that make later findings meaningless.
- Requirements on generators, including that they write no lock and change no file their sources
  track; versioning rules; security and privacy considerations.
- Appendix D lists the known gaps of this version.
