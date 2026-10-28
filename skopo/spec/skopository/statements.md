# Skopository: statements

What a statement is, the kinds of statement, and how one statement points at another. How a
statement binds is in [`force.md`](force.md); how it keeps its identity is in
[`identity.md`](identity.md).

## A statement and its anchor

- An **anchor** is the mark at the end of a statement that gives the statement's ID. ^T-vq9kr8
- **Connective text** is any text of a skopository that is not a statement: headings,
  introductions, explanations. ^T-h3tcsh
- A statement **must** end with exactly one anchor, and an anchor **must not** appear anywhere else
  in it. ^R-9td139
- A list or a table whose parts make sense only together **may** be one statement, under one
  anchor. ^R-ppf538

## Quoting

- **Quoted text** is text a statement mentions rather than uses, such as a piece of a skopository's
  syntax. ^T-1eh4hr
- Quoted text is mentioned, not used: a normative keyword in it gives no force, and an anchor, an ID
  or a placeholder in it defines nothing and cites nothing. ^R-94pabc

## Kinds

- A **kind** is what a statement is. There are seven, each named by a letter. ^T-9fz9tz
- A **term** gives the meaning of a word, and sets off the word it defines. ^T-9rphka
- An **act** is something someone does, and what follows from it. ^T-5964sj
- A **rule** says what must, must not or may happen, or defines a state. ^T-1dzmjd
- An **assumption** is something true of the world that the system relies on and does not enforce. ^T-hgqn2h
- An **example** is a concrete scenario that shows what a rule makes true. ^T-8p0cxj
- A **form decision** is a decision about what a product's consumers see. ^T-804j75
- A **design decision** is a decision about how a product is built. ^T-exy4bk
- The spec **must** hold terms, acts, rules, assumptions and examples, and nothing else. ^R-as7fvr
- A form decision **must** live in a product binding, and a product binding **must** hold form
  decisions alone. ^R-smv02k
- A design decision **must** live in a tech binding, and a tech binding **must** hold design
  decisions alone. ^R-6se4m0

## Links

- A **link** is the ID of another statement, named right after a statement's anchor. ^T-n5x1g7
- An example's links name the statements it checks; a form or design decision's links name the
  statements it serves. ^R-mtktnv
- A rule's links **must** be refinements, and a rule **must** refine rules alone. ^R-90wstv
- A term, an act or an assumption **must not** carry links. ^R-j6maj1
- A **refinement** is a rule that narrows another rule within a scope. ^T-af6by9
- A refining rule applies instead of the rule it refines, within the scope of its file. ^R-nq8tdq

> *Example.* A general rule says that a job's raw build log is deleted once it has served its
> purpose. One operator's file holds a rule that refines it: that operator deletes a raw log seven
> days after the build. For that operator the seven-day rule applies; elsewhere the general rule
> stands. ^E-037896 (R-nq8tdq)

## Recommendations

Recommendations for statements:

| ID | Recommendation |
|---|---|
| R-bnpsxe | a statement holds one thing a reviewer would accept or reject |
| R-6mg8ww | a statement with more than three bold normative keywords is split into several |
