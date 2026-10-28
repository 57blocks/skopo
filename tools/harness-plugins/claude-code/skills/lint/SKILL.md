---
name: lint
description: "Skopo: check a skopository against the Skopo Specification with the reference checker, and explain every finding with its fix. Use when the user asks to lint, check or validate a skopo or skopository, or runs /skopo:lint."
argument-hint: "[skopository path] [--fix]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Edit
  - AskUserQuestion
  - Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/lint.mjs" *)
  - Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/assign-ids.mjs" *)
  - Bash(ls *)
---

# Skopo lint

- Arguments: $ARGUMENTS

Checks a skopository with the reference checker, which implements the Skopo Specification 0.1.0,
and explains what it finds. It changes nothing unless the arguments say `--fix` or the user asks.

## Steps

1. **Find the skopository.** The path in the arguments; otherwise the current directory if it holds
   `skopo.json`; otherwise `skopo/` inside it; otherwise the one directory inside it, or else beside
   it, whose name ends in `-skopo` (where a recovery of several repositories puts it). If none or
   several fit, ask which. Use its absolute path.
2. **Check it:** `node "${CLAUDE_PLUGIN_ROOT}/scripts/lint.mjs" "<skopository>"`. Each finding is one line:
   `error` or `warning`, the check (L0 to L11), the file and line, and what to do.
3. **Report**, in the user's language:
   - the summary line (statements by kind) and the totals;
   - errors first, grouped by check, then warnings, each with what it means and how to fix it. The
     table *Common lint failures* in [the writing guide](${CLAUDE_PLUGIN_ROOT}/skills/init/guide.md)
     gives the usual causes;
   - for many findings of one kind, the pattern and three examples, not every line.
   A skopository with errors does not conform; one with only warnings does.
4. **Fix**, only with `--fix` or when the user asks:
   - Placeholders (`R-@label`): run `assign-ids.mjs` on the skopository.
   - Mechanical fixes that keep the meaning (bolding a keyword that is plainly normative, adding a
     missing stem colon, removing a code path from a binding): make them, then list them.
   - Anything that changes meaning or placement (moving a statement to another layer, rewording a
     rule, turning a hidden-force rule into a definition): propose each and ask before changing it.
   - Differences from the lock (L10): never rewrite the lock to silence them. Each needs a rationale
     record that declares it, and the lock is rewritten only when the change is accepted
     (`/skopo:lock`).
   Then check again and report what is left.
