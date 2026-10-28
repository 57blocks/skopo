---
name: lock
description: "Skopo: write or update a skopository's lock (spec.lock.json) once its content is accepted, after checking it and declaring every change. Use when the user asks to lock, relock or confirm a skopo or skopository, or runs /skopo:lock."
argument-hint: "[skopository path]"
allowed-tools:
  - Read
  - Write
  - Glob
  - AskUserQuestion
  - Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/lint.mjs" *)
  - Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/lock.mjs" *)
  - Bash(ls *)
---

# Skopo lock

- Arguments: $ARGUMENTS

The lock records the text and fingerprint of every statement as accepted. Writing it is the act of
acceptance: after it, any change shows as a difference that must be declared. In a team, the lock is
rewritten when a change is accepted, which is usually when it is merged; this command does it by
hand.

## Steps

1. **Find the skopository** as `/skopo:lint` does: the path in the arguments, the current directory
   if it holds `skopo.json`, `skopo/` inside it, or the one `*-skopo` directory inside it or beside
   it. Ask if that is ambiguous.
2. **Check it:** `node "${CLAUDE_PLUGIN_ROOT}/scripts/lint.mjs" "<skopository>"`.
   - Errors other than L10 (lines starting `error`, with a check other than L10): stop and report
     them. Only a conforming skopository is locked.
   - L10 errors are undeclared differences from the lock. Each needs a rationale record
     (`rationale/<YYYY-MM-DD>-<slug>.md`, format in section 9 of the specification) that lists the
     IDs under `Touches` (new statements, or a change of meaning), `Rewords` (wording only) or
     `Retires` (removed statements). Offer to draft one: show which IDs differ, ask the user which
     changes are rewordings and which change meaning, and ask for the reason if they want one
     recorded. Write the record only after they confirm, then check again.
3. **Show what the lock will take in**, from the lint's `lock:` line: statements added, changed,
   reworded and removed, and the records folded in. For a first lock, the number of statements.
4. **Ask once** with AskUserQuestion: "Lock these changes?", options "Lock (Recommended)", "Stop".
5. **Lock:** `node "${CLAUDE_PLUGIN_ROOT}/scripts/lock.mjs" "<skopository>"`, then check again; the
   lint should now report no difference from the lock.
6. **Tell the user** that `spec.lock.json` (and any new record) should be committed with the change.
   This command never commits.
