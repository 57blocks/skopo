# 2026-10-18 · The tech binding is a design that names no code, and interfaces go by audience

| | |
|---|---|
| Touches | R-qvyhr2, R-p8g5bd, T-3kzeb8, T-cc2njm, R-zekfcg |
| Sources | notes on a pilot that wrote a skopository by hand for a service spread over three repositories |
| Grade | evidenced |
| Recorded | reconstructed 2026-10-21 |

The pilot's first tech bindings mapped every statement to a place in the code. The lead's review
ruled that a tech binding is a technical design and must not depend on where code sits: otherwise
"every refactor would churn the skopo, and the code's details would leak into the layer that is
supposed to guide the code". References now point up only, the refactor test joined the clerk and
counterpart tests, and the coverage check went, "because coverage is a property of the code, not of
the skopo". The pilot's public API sat on the line, and the lead ruled by audience: what consumers
see is product form, what only developers see is design.
