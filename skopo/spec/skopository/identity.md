# Skopository: identity

How a statement keeps its identity through moves, rewordings and removal.

## IDs and keys

- An **ID** names a statement by its kind and its key. ^T-2fqbse
- A **key** is the random part of an ID, and the statement's identity. ^T-yckb98
- A tool that assigns a key **must** draw it at random, uniformly from every possible key, and **must
  not** derive it from the statement's text, its place or its kind. ^R-5tbe88 (refines R-v1ggdj)
- Before assigning a key, a tool **must** check that no statement, no entry of the lock and no
  retired key already uses it. ^R-3re74m (refines R-v1ggdj)
- A key **must** be defined at most once across the spec and the bindings. ^R-vrhbbj (refines R-v1ggdj)
- When a statement moves to another layer, its kind changes and its key stays, and every citation of
  it **must** use its new kind. ^R-3mkbrd (refines R-v1ggdj)
- Every ID that a skopository cites **must** name a statement the skopository defines, with the kind
  that statement has now; IDs that a record of change retires are the exception. ^R-2n1p99

> *Example.* A form decision turns out to be something only developers see, and moves to the tech
> binding. Its letter changes from the one for form decisions to the one for design decisions; its
> six random characters stay, and every statement that cited it now cites it with the new letter. ^E-r5hwk6 (R-3mkbrd)

## Retirement

- A **retired key** is the key of a statement that a declared change removed. ^T-91mwth
- A change **retires** a statement when it removes it, and lists the statement's key as retired in
  its rationale record. ^A-mvt2t4
- A retired key **must not** be defined again, for any statement. ^R-p6d0nj (refines R-v1ggdj)
- Removing a statement that the lock holds **must** be declared by retiring its key. ^R-sgyhk1 (refines R-43tfsd)

> *Example.* A rule is dropped, and its key is retired in the record of that change. Months later a
> tool happens to draw the same key for a new statement; it sees the key among the retired ones and
> draws again. ^E-4133hj (R-p6d0nj, R-3re74m)

## Placeholders

- A **placeholder** is a temporary label that a generator gives a statement while writing, before
  the statement has a key. ^T-ddf7x8
- A conforming skopository **must not** hold a placeholder. ^R-m5tbkj
