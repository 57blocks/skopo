# Conformance: generators

What a generator guarantees about what it writes and how it treats its sources.

## What a generator writes

- A generator **recovers** a skopository when it reads a system's code and documents and writes the
  intent they show. What it writes is a proposal until people accept it. ^A-7gfbj2
- A generator **must** give every skopository it writes a declared version of the specification, a
  keyword dictionary and a README, and **must not** leave a placeholder in it. ^R-jdx0a1 (refines R-jcwqph)
- A generator **must not** change any file its sources track; it writes only the skopository and its
  own report. ^R-655cwd
- A generator **must not** write the lock: what it writes is a proposal until people accept it. ^R-3t2k9z (refines R-3p8qs0)
- A generator **must** state, in its report outside the skopository, which revision of each
  version-controlled source it read. ^R-4vhze1

## Weighing sources

- A **pattern** is what a system does the same way everywhere; a **departure** is one place that
  does differently from the rest. ^T-215hmd
- Sources rank from most to least deliberate: a promise to an outside party, such as terms, a
  contract or a published standard; a recorded decision; a design document or a specification; the
  code; a comment. Between two sources of the same rank, the later one is the more deliberate. ^R-1twmhq
- The ranking of sources is a heuristic, not a test of truth. ^R-kdef31

Recommendations for generators:

| ID | Recommendation |
|---|---|
| R-a58za9 | a generator reports its disagreements, questions and notes to the people it works for, and treats that report as confidential |
| R-8whnhe | where sources disagree, a generator writes the statement as the most deliberate source states it, and reports which source it followed |
| R-5hq1jw | a generator writes as a design decision what the system does consistently or what a document states, and leaves out and reports a departure |
| R-jjntc2 | a generator reads the default branch of each version-controlled source |

- The disagreements a generator finds can show weaknesses in the system it reads, such as a path
  that skips a check every other path makes, or a promise a deployment does not keep. ^W-er1g2j
- A skopository travels further than a generator's report: it is shared with more people. ^W-x78m85

> *Example.* Terms of service promise that raw build logs are deleted after seven days; the
> deployment keeps them for ever. The generator writes the seven-day rule as the terms state it, and
> tells the people it works for about the deployment, outside the skopository. ^E-5kaf2s (R-1twmhq, R-cvfbeg)

> *Example.* A generator recovers a skopository and hands it over with no lock. Reviewers correct two
> rules and accept the result; only then is the first lock written, and it records the corrected
> text. ^E-3w7k8j (R-3t2k9z, R-ebjvnd)

> *Example.* Every inbound path of a service requires a credential except one. The generator writes
> the credential requirement as a design decision, and raises the one path as a question instead of
> writing it down. ^E-5vsryw (R-5hq1jw)
