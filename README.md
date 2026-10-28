# Skopo

Intent documentation one level of abstraction above the code.

When agents write most of the code, what people still write down is intent: what must be true about
a system, what form it takes for the people who use it, and how it is designed. Skopo is a rulebook
for writing that intent so that people can read it, agents can work from it, and tools can check it.
A system's intent, written to the rulebook, is its **skopository**, informally its **skopo**.

A skopo is plain Markdown in ordinary language. A few rules make it checkable:

```markdown
- **Leave length** counts working time only: working hours on working days, 8 hours a day, weekends
  and public holidays excluded. ^T-1e3wfx
- A leave request of 40 hours or more **must** be approved by the project lead, the L2 manager and
  the L3 manager, in that order. ^R-wwab73

> *Example*: an employee takes leave from Friday afternoon to the next Friday morning: two half
> days of 4 hours and four working days of 8, 40 hours in all. The request goes to all three
> approvers. ^E-jqc9df (R-wwab73, T-1e3wfx)
```

- Every statement is one Markdown element with a permanent ID (`^R-wwab73`).
- Only a bold keyword (**must**, **must not**, **may**) carries force.
- Statements live in three layers: the **spec** (what must be true in the world the system serves),
  **product bindings** (what its users see) and **tech bindings** (how it is designed). References
  point up only, and a skopo never cites code.
- A lock records the text people accepted; every later change declares whether it changed the
  meaning or only the wording.

The name is from Greek σκοπός, aim or intent.

## Status

Early. The [Skopo Specification](rfc/) is at **0.1.0, a draft**: the core (layers, statements and
their keys, bold keywords, the lock and declared differences) is expected to hold, and the rest may
change as skopositories are written and used. Its appendix D lists the known gaps. The tools are a
reference implementation.

We have tried the format on a few real systems: a legacy system whose requirements document was
seven years out of date, a service spread over three repositories, a large financial platform, and
this specification itself. Those runs shaped the rules. One showed that a tech binding which points
at code churns on every refactor, so a skopo now never cites code; another, that an agent writes
obligations as plain statements of fact ("is refused"), so the checker now flags force that carries
no keyword. Whether Skopo is useful beyond that is something we want to find out with the people
who try it.

## Try it

With [Claude Code](https://claude.com/claude-code):

```bash
claude plugin marketplace add 57blocks/skopo
```

```bash
claude plugin install skopo@skopo
```

Then, in the repository to describe:

| Command | Does |
|---|---|
| `/skopo:init` | reads the code and documents and writes a draft skopo, with a list of questions where they disagree |
| `/skopo:lint` | checks a skopo against the specification and explains each finding |
| `/skopo:lock` | records the text once people have reviewed and accepted it |

A recovery only proposes: it changes no file your repositories track and writes no lock. Details
are in [`tools/harness-plugins/claude-code/`](tools/harness-plugins/claude-code/).

The checker also runs on its own, with Node.js 22 or later and no dependencies:

```bash
node tools/cli/lint.mjs /absolute/path/to/skopository
```

## What is here

| Directory | Holds |
|---|---|
| [`rfc/`](rfc/) | the Skopo Specification: what a conforming skopository is, and what a tool that checks or writes one must do; and a complete example skopository |
| [`tools/`](tools/) | the reference tools: a harness-neutral checker and helpers in `cli/`, and the Claude Code plugin |
| [`skopo/`](skopo/) | Skopo's own skopository: the format and its tools described in their own terms |
| [`whitepaper/`](whitepaper/) | an introduction to Skopo, in Chinese and English, and the page that renders it |

Start with the [specification](rfc/drafts/0.1.0.md) if you want the rules.
[`rfc/examples/lending-library/`](rfc/examples/lending-library/) is a small skopository that passes
the checker; [`skopo/`](skopo/) is a full one, recovered by the plugin from this project.

## Taking part

Try it on a system you know, and tell us which rule does not work and where the text is unclear.
See [CONTRIBUTING.md](CONTRIBUTING.md). To report a security problem, see [SECURITY.md](SECURITY.md).

## Licences

| Part | Licence |
|---|---|
| `rfc/`, `skopo/`, the whitepaper's text | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `tools/`, the whitepaper's renderer | [Apache 2.0](tools/LICENSE) |

Skopo is made by [57Blocks](https://57blocks.com).
