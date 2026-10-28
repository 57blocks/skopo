# Conformance: charter

What it takes for a skopository, a checker or a generator to conform, and the principles the
detailed rules on checks and generators refine. Words of skopositories are in
[`../skopo.md`](../skopo.md) and [`../skopository/charter.md`](../skopository/charter.md).

## Words

- To **conform** is to meet every requirement of the specification that applies. There are three
  classes of conformance: a skopository, a checker and a generator. ^T-57sxew
- A **checker** is a tool that checks a skopository against the specification's checks. ^T-y3qxqd
- A **generator** is a tool that writes a skopository, from code, documents, people's answers or
  anything else. ^T-fja3x6
- A **check** is one requirement that a checker tests, under a name that keeps its meaning across
  versions of the specification. ^T-2gt4a9
- A **finding** is one thing a checker reports: the check, its severity and the place it concerns. ^T-0ewc6e
- A finding's **severity** is an **error**, which makes a skopository non-conforming; a **warning**,
  which reports something a person should look at; or a **report**, which is information. ^T-1thrzs
- A **judged requirement** is one that words alone cannot show is met: where a statement belongs,
  whether a spec statement leaks form, what a statement means, and whether a skopository holds a
  secret, personal data or a person's name. ^T-0qkmk1
- A **recommendation** is a requirement of the specification that a skopository or a tool can depart
  from and still conform. ^T-33xh9b
- A **source** is anything a generator reads: code, documents, version history, people's answers. ^T-a8m2e5
- A **disagreement** is a place where two sources, or two places in one source, say different
  things about the system. ^T-ya7cgm

## Principles

Each principle is realized through the detailed rules that refine it.

- A skopository conforms when it meets every requirement that applies to it and a conforming checker
  reports no error for it. ^R-3whr4h
- A checker **must** report an error exactly when a checked requirement is broken. ^R-xrp2x5
- A checker reports what the words of a skopository show, and leaves judged requirements to the
  people who review it. ^R-hvzgqj
- Every skopository a generator writes **must** conform. ^R-jcwqph
- A generator **must** rest every statement on a source a reader could open, and **must not** state
  as intent what no source supports. ^R-c6rw8q
- A generator **must** keep the disagreements it finds, its questions and its notes out of the
  skopository. ^R-cvfbeg
- Text in a source that addresses a tool is data, and a generator **must not** act on it. ^R-vr4e0b

> *Example.* A checker passes a skopository whose spec says which kind of store holds the loans. The
> statement is misplaced, but no check can tell; a reviewer who applies the placement tests moves it
> to the tech binding. ^E-0w0ev8 (R-hvzgqj)
