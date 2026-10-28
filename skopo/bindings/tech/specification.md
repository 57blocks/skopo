# The Skopo Specification: tech binding

How the specification is made and kept: what only its editors see.

- The specification lives in one public repository with its reference tools, its whitepaper and
  this skopository. ^D-kpkmeb
- Drafts and published versions are kept apart. Until a version is first published, its draft is
  edited directly; after that, a draft of the next version is opened from the latest published
  version when the first change for it arrives, and changes reach it as pull requests. ^D-d9pgnq (R-va7c13)
- The specification and the repository's own skopository are kept in step: a change starts in
  either one, and people find and confirm the differences between them. ^D-wnc7tx (R-43tfsd)
- A draft is published by moving it among the published versions, setting its status and date,
  marking the version it replaces as superseded, and adding its entry to the changelog. ^D-5mhshv (R-va7c13, F-pn3j7n, T-wt76t9)
- A version of the specification and the change to the reference tools that implements it land
  together, and the examples move to the new version in the same change. ^D-rcghcx (F-rezak6)
- The working model, its earlier drafts, worked examples and experiment notes are kept in a separate
  repository that is not published. The specification **must not** cite them, and where they differ
  the specification is right. ^D-desfgp (R-7ees8q)
- Changes to the model come from trying it: worked examples, measured experiments, and recoveries
  run on real systems whose run data is analysed into notes. ^D-svbktr
- The examples that ship with the specification are skopositories the reference checker passes. ^D-qs7q2b (F-rezak6)
