# Skopo: shared words

The words every part of this spec uses. What a skopository holds and how its statements work is in
[`skopository/`](skopository/charter.md); what a tool that checks or writes one owes is in
[`conformance/`](conformance/charter.md); how the specification itself is versioned is in
[`versions.md`](versions.md).

- A **system** is a piece of software together with the world it serves: the people, rules and
  outside parties it answers to. ^T-809yma
- **Intent** is what must be true about a system, what form it takes for the people who use it, and
  how it is designed, as distinct from what its code happens to do. ^T-0xhnjd
- A **skopository** is the record of one system's intent, kept beside the system's code for as long
  as the code lives and written one level of abstraction above it. Day to day it is the system's
  **skopo**. ^T-tcrx8w
- A **statement** is the smallest part of a skopository that has an identity: one passage that
  people review, accept or reject on its own, and that tools check. ^T-vakxkr
- The **Skopo Specification** is the text that says what a conforming skopository is and what a tool
  that checks or writes one owes. ^T-q2vv90
- A **tool** is software that works with skopositories: a checker, a generator, or both. ^T-ckwqkx
- An **agent** is software that reads and writes on a person's behalf. People and agents read and
  write skopositories alike. ^T-1rrzsx
- The **makers** of a system are the people who build it and decide what it is for. ^T-2q7jj1

## Assumptions

- Language models will soon read a mid-size code base in one session. What code does then becomes
  cheap to work out again from the code; what people decided does not. ^W-p8sd5a
- Agents that turn intent into code, or code into intent, misread and leave things out; a written
  record that people confirm is what catches it. ^W-wtjkf7
