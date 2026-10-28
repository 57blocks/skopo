# The specification's versions

How the Skopo Specification changes, and which version a skopository and a checker go by. This small
domain fits in one file.

## Words

- A **version** of the specification is one complete, numbered text of it. ^T-r29cxd
- A version is a **draft** while it is open for change, **published** once it is final, and
  **superseded** once a later published version replaces it. ^T-wt76t9
- The specification's editors **publish** a draft: its text becomes final, and the version it
  replaces becomes superseded. ^A-v7yfad

## Rules

- A published version **must not** be edited; a correction, however small, **must** come as a later
  version. ^R-va7c13
- Every version **must** be kept, so that a skopository that declares an old version can always be
  read against the text it was written to. ^R-ddma16
- A skopository **must** declare the version of the specification it follows. ^R-g7ysee
- A citation of the specification **must** name a version, never the specification in general. ^R-and5hm
- The specification **must** be enough on its own to build a checker or a generator from. ^R-7ees8q
- Where an example that ships with the specification disagrees with it, the specification is right. ^R-s5h1w7

What a change of version means, from version 1.0.0 on:

| ID | Part that changes | Means |
|---|---|---|
| R-rkfwrw | major | a conforming skopository or a conforming tool might stop conforming |
| R-qjmzpq | minor | requirements are added that every conforming skopository already meets, or that add warnings or optional features and nothing else |
| R-ae5yjt | patch | clarifications and corrections that change no requirement |

- Before version 1.0.0, a new minor version **may** change any requirement. ^R-z43fp9
- A checker that implements a version **must** accept a skopository that declares the same major and
  minor version, whatever its patch. ^R-h0bfzd
- From version 1.0.0 on, a checker **must** also accept a skopository that declares an earlier minor
  version of the same major version. ^R-t2436c
- A checker **must** report an error for any other declared version, and for a missing or malformed
  one. ^R-b2ryrq

> *Example.* A skopository written to 0.4.2 is checked by a checker that implements 0.5.0. The
> checker reports an error. The skopository is checked again against 0.5.0, and its lock is
> rewritten. ^E-539wfh (R-z43fp9, R-b2ryrq)

> *Example.* After 1.0.0, a checker that implements 1.3.0 accepts skopositories that declare 1.0.2 or
> 1.3.4, and reports an error for one that declares 1.4.0 or 2.0.0. ^E-5v37zm (R-h0bfzd, R-t2436c)
