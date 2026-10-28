# Contributing to Skopo

Skopo is early, and the most useful contribution is experience: write a skopository for a system you
know, by hand or with the plugin, and tell us what happened.

## Reporting what you found

Open an issue for:

- a rule of the specification that does not fit a real system, or that two readers read differently;
- a place where the specification, the tools and the whitepaper disagree;
- a checker finding that is wrong, or a problem the checker misses;
- a recovery that misplaced statements, missed intent or asked the wrong questions.

Quote the section of the specification (for example "0.1.0, section 5.3") or the check (`L8`) the
issue is about, and include the smallest skopository or statement that shows it. Leave out anything
private from the system you tried it on: code, client names, people's names, credentials.

## Changing the specification

The specification lives in [`rfc/`](rfc/); its README says how versions and drafts work. Until 0.1.0
is published, a change is a pull request against [`rfc/drafts/0.1.0.md`](rfc/drafts/0.1.0.md). A
change to a requirement should say what problem it solves, and ideally which skopository showed it.

This repository describes itself in [`skopo/`](skopo/). A change to the specification or the tools
may leave that skopo behind; the pull request can update it too, or say that it does not. Either way
the differences are found and reviewed, as Skopo asks of every system.

## Changing the tools

The canonical scripts are in [`tools/cli/`](tools/cli/). The Claude Code plugin carries copies; after
changing a script, run:

```bash
node tools/sync-harness-plugins.mjs
```

Check that the example and the project's own skopository still pass:

```bash
node tools/cli/lint.mjs "$PWD/rfc/examples/lending-library"
```

```bash
node tools/cli/lint.mjs "$PWD/skopo"
```

Keep the tools free of dependencies. A plugin for another agent harness belongs beside the Claude
Code one in [`tools/harness-plugins/`](tools/harness-plugins/), and should use the scripts in
`tools/cli/` rather than its own.

## Licences

By contributing you agree that your contribution is licensed as the part of the repository it
changes: CC BY 4.0 for `rfc/`, `skopo/` and the whitepaper's text, Apache 2.0 for `tools/` and the
whitepaper's renderer.
