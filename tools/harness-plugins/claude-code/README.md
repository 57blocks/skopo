# Skopo for Claude Code

A Claude Code plugin for skopositories that follow the Skopo Specification 0.1.0.

| Command | Does |
|---|---|
| `/skopo:init` | creates a skopository by recovering it from one or more code repositories: the spec, the product and tech bindings, optional rationale, and a list of questions where the sources disagree; each run is recorded for later analysis |
| `/skopo:lint` | checks a skopository with the reference checker and explains every finding; `--fix` repairs what keeps the meaning and asks about the rest |
| `/skopo:lock` | writes or updates `spec.lock.json` once the content is accepted, after every change is declared |

Version 0.5 creates a skopository from code only, from scratch. It does not update an existing one,
and there is no pull-request hook yet. A recovery writes no lock: what it writes is a proposal, and
the lock is written with `/skopo:lock` once people have reviewed and accepted it.

## Install

The repository root is a Claude Code marketplace named `skopo`:

```bash
claude plugin marketplace add 57blocks/skopo
```

```bash
claude plugin install skopo@skopo
```

From a local clone, pass its path to `marketplace add` instead. For one session only, without installing:

```bash
claude --plugin-dir /path/to/skopo/tools/harness-plugins/claude-code
```

## Create a skopository

Open Claude Code in the repository to describe, or in a directory that holds several repositories
of one system, then:

```
/skopo:init
```

| Argument | Effect |
|---|---|
| paths | repositories, or a directory holding several; none means the current directory |
| `--auto` | run without the checkpoint where the plan is shown before writing |
| `--subagent-model sonnet\|opus\|haiku\|fable` | the model for the research agents; without it they use the session's model |
| `--with-excavator` | pass a fresh `.excavator/` graph to the research agents as a map (off by default) |

Every repository must be on its default branch: a recovery stops, even with `--auto`, when one is
not, and it never switches branches itself. It also stops when a skopository already exists at the
target; example skopositories in the repositories (under `examples/` or `fixtures/`) are read as
documents.

| System | Skopository |
|---|---|
| one repository | `<repo>/skopo/` |
| several repositories in one directory | `<directory>/<directory name>-skopo/`, beside them |

A recovery never changes a file the code repositories track, never commits, and never builds or
runs the project. Only what is in the repositories counts as evidence.

The research agents have no tool that writes files and return their reports to the recovery, which
saves them. Their shell, and the recovery's, are read-only by instruction: Claude Code cannot narrow
a plugin agent's shell to reading commands. The recovery pre-approves only reading git commands;
anything else asks you first, unless your own settings allow it. To enforce more, add deny rules to
your settings or run Claude Code in a sandbox.

## What a run leaves behind

Every run records itself in `.skopo/runs/<run-id>/` in the directory where it started. `.skopo/`
ignores itself in git.

| File | Holds |
|---|---|
| `run.json` | plugin version, start and end, decisions (skopository path, topology, branches, research model, plan approval), the start of each phase, every lint pass |
| `inventory.json` | the survey: repositories, branches, commits, sizes, languages, documents, notable files, Excavator state |
| `research/<lens>.md` | each research agent's report, with evidence |
| `plan.md` | products and consumers, the tree, what was left out |
| `ids.json` | placeholder labels and the IDs they became |
| `lint/NN.txt` | the full output of every lint pass, with the run's own citation check |
| `questions.md` | where sources disagree, by category and in order of consequence, and decisions with no recorded reason |
| `notes.md` | placement doubts, gaps in the guide, tool friction, sources, retro |
| `metrics.json` | statements by kind, words per layer, source size, questions by category, minutes per phase |

`.skopo/sessions.jsonl` records the Claude Code session ID and transcript path of each run, so its
cost can be read from the transcript later.

## Layout

```
.claude-plugin/plugin.json
skills/init/          SKILL.md (the recipe), guide.md (how a skopository is written), examples.md
skills/lint/          SKILL.md
skills/lock/          SKILL.md
agents/researcher.md  one read-only research pass through one lens
hooks/                records the session when /skopo:init starts
scripts/              a copy of ../../cli/, made by ../../sync-harness-plugins.mjs; do not edit here
```
