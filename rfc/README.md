# The Skopo Specification

The specification of the skopository: what a conforming skopository is, and what a tool
that checks or writes one must do. It is self-contained: anyone can build a checker or a generator
from it without other material.

| Version | Status | Date | Document |
|---|---|---|---|
| 0.1.0 | Draft | 2026-10-21 | [drafts/0.1.0.md](drafts/0.1.0.md) |

No version has been published yet. 0.1.0 is the first, and stays a draft until it is.

## Versions

The specification follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html), as
OpenAPI, TOML and SemVer itself do:

| Increment | Means |
|---|---|
| MAJOR | a conforming skopository or tool may stop conforming |
| MINOR | requirements are added that conforming skopositories already meet, or that only add warnings or optional features |
| PATCH | clarifications and corrections that change no requirement |

Before 1.0.0, a MINOR increment may change anything. A skopository declares the version it follows
in `skopo.json` (`{"specVersion": "0.1.0"}`), and a checker says which versions it accepts.

## Statuses

| Status | Means |
|---|---|
| Draft | open for change; lives in `drafts/` until published |
| Published | final; never edited again |
| Superseded | final, and replaced by a later version named in that version's header |

A published document is never edited. A correction, however small, is a new PATCH version. Every
version is kept, so a skopository that declares an old version can always be read against the text
it was written to.

## Changing the specification

Before a version is published, its draft in `drafts/` is edited directly. After it, a change starts
as a pull request against a draft of the next version in `drafts/<next version>.md`, opened from the
latest published version when the first change for it arrives. A draft is published by moving it to
`versions/`, setting its status and date, marking the version it replaces as Superseded, and adding
an entry to [CHANGELOG.md](CHANGELOG.md).

Changes to the specification and to [the repository's own skopository](../skopo/) are kept in step:
a change may start in either, and the differences between them are found and confirmed by people,
as Skopo asks of every system.

## Citing

Cite a version, never the specification in general: "the Skopo Specification 0.1.0, section 5.2".

## Examples

[`examples/`](examples/) holds conforming skopositories that the reference checker passes. They are
informative; where an example and a specification disagree, the specification is right.

| Example | Follows | Shows |
|---|---|---|
| [lending-library](examples/lending-library/) | 0.1.0 (draft) | appendix C, complete with its lock |

## Licence

The text of the specification is licensed under
[Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)
(CC BY 4.0): anyone may share and adapt it, with credit. The examples are covered by the same
licence. The reference tools are licensed separately, under Apache 2.0 (see `../tools/`).
