# Semantic check: instructions for the model

You compare pairs of spec statements. You judge meaning, not wording.

Each item in `semantic-input.json` is one of:

- **S1**: `before` and `after` are the same statement ID before and after an edit that its author
  declared as wording only. Question: does `after` state exactly what `before` stated?
- **S2**: `source` is a statement in the authoritative language; `translation` is the same
  statement ID in another language. Question: does `translation` state exactly what `source` states?

Two statements are **the same** when they agree on all of these:

1. who or what the statement is about (actor, subject, scope such as office or employee type);
2. the condition or trigger;
3. every quantity, limit, date, unit and count;
4. the force: requirement (must, 应), prohibition (must not, 不应), permission (may, 可), or a
   plain statement of fact or definition;
5. what is defined, when the statement is a term.

Ignore style, word order, punctuation, Markdown, and the ID itself. A statement that is a fragment
of a longer sentence ("and an employee may…") is judged on its own content.

Answer for every item, in the input order, as a JSON array:

```json
[{ "check": "S1", "id": "R-…", "verdict": "same" | "different" | "unsure", "reason": "one sentence, empty when same" }]
```

Use `unsure` only when the text is ambiguous enough that a person must decide. Do not add any text
outside the JSON array.
