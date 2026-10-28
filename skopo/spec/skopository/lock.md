# Skopository: the lock and declared change

How a skopository records the text people accepted, and how every later change to it is declared.

## The lock

- The **lock** is the record of every statement's accepted text, with its kind and its fingerprint. ^T-z7h51s
- People **accept** a change to a skopository once they have reviewed it. From then on its text is
  the accepted text, and later changes are declared against it. ^A-75dmar
- A **fingerprint** is a short hash of a statement's text, enough to tell whether the text changed. ^T-ywpc7q
- A statement's text, for the lock, is its words without its anchor, its links or its layout:
  reflowing its lines, re-aligning a table or moving a table's rows changes no statement's text. ^R-dmd5jb
- The lock **must** be written when people first accept a skopository, and rewritten after each
  change they accept; rewriting it folds in every current record of change. ^R-ebjvnd (refines R-43tfsd)
- A tool **must not** write the lock on its own: it writes it when people accept the text it
  records, and at no other time. ^R-3p8qs0 (refines R-43tfsd)
- The lock records the text that was accepted, and not who accepted it or when. ^R-n8y0xq
- The version control that holds a skopository records who accepted each change and when. ^W-0g8x5c

> *Example.* A team re-aligns the columns of a table of retention periods and moves one row up. No
> row's text changes, so there is nothing to declare. ^E-0vrfsv (R-dmd5jb)

## Declaring a difference

- A **rationale record** is a dated record of one decision. It declares which statements the
  decision touched, reworded or retired, and it can say why. ^T-kadph6
- A statement is **touched** when its meaning is set or changed, a new statement included;
  **reworded** when its wording changed and its meaning did not; **retired** when it is removed. ^T-t6dt99
- While a lock exists, every difference between the lock and the skopository **must** be declared in
  a rationale record that the lock has not yet folded in. ^R-vcvkc2 (refines R-43tfsd)

How each difference is declared:

| ID | Difference | Declared as |
|---|---|---|
| R-a9qgq4 | a statement the lock does not hold | touched |
| R-nbpxk3 | a statement whose kind differs from the lock | touched |
| R-mnnz2c | a statement whose text and meaning differ from the lock | touched |
| R-1vvwwz | a statement whose text differs from the lock and whose meaning does not | reworded |
| R-n1dpcv | a statement the lock holds that is no longer defined | retired |

> *Example.* An author tightens a rule's wording without changing what it requires, and adds a
> clause to another rule that changes what it permits. The record declares the first reworded and
> the second touched. Once people accept the change, the lock is rewritten and both new texts are the
> accepted ones. ^E-2rh75w (R-vcvkc2, R-ebjvnd)

## Rationale records

- A rationale record **may** be left out unless a difference from the lock needs declaring. ^R-1j6zad
- Every statement **must** be understandable without any rationale record. ^R-fkcf2k
- A rationale record is history, not a layer: it **may** name sources of any kind, code included, and
  **must** name code by file, symbol or commit, never by line. ^R-07h6t7
- A record's **grade** says how its reason is known: **evidenced** when a source states the reason,
  **inferred** when the reason is a reading of several sources. ^T-g2x4kx
