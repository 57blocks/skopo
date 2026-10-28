# The Claude Code plugin: product binding

The plugin as Claude Code users meet it: three commands that recover, check and accept a
skopository. Its consumers are people who try Skopo on their own systems.

## Install and commands

- The plugin is installed from a Claude Code marketplace named skopo, which is the specification's
  own repository. The plugin is
  licensed under the Apache License 2.0. ^F-4aqm0m
- The plugin offers three commands: `/skopo:init` recovers a skopository from code, `/skopo:lint`
  checks one, and `/skopo:lock` accepts one. ^F-ym8jsv
- The plugin follows the Skopo Specification 0.1.0, and checks with the reference checker. ^F-n82x8q (F-rfvjdf)
- `/skopo:lint` and `/skopo:lock` act on the skopository their arguments name; without one they try
  the current directory, its `skopo/` folder, then the one folder inside or beside it whose name
  ends in `-skopo`, and ask when none or several fit. ^F-8nvay3 (F-4x7zpr)

## Recovering a skopository

- `/skopo:init` takes the paths of repositories, or of a directory that holds several, and the
  current directory when given none. Its options are `--auto`, which skips the plan checkpoint,
  `--subagent-model`, which picks the model of the research agents, and `--with-excavator`, which
  passes a fresh code map to them. ^F-mzxqh9
- One repository's skopository is written in `skopo/` inside it; several repositories' in a
  standalone folder beside them, named after their directory with the suffix `-skopo`. ^F-4x7zpr (F-15byd4)
- A recovery creates a skopository from scratch and updates none: it stops when its target already
  holds a skopository or is not empty. Example skopositories in the repositories, under an examples
  or fixtures folder, are read as documents, and a skopository elsewhere in them is named at the
  plan checkpoint; neither stops the recovery. ^F-e618pb
- A recovery **must not** change a file the repositories track, commit, push, create a repository,
  or build, install or run the project. ^F-wgj20y (R-655cwd)
- A recovery pre-approves only git commands that read; any other command it runs asks the user
  first, unless the user's own settings allow it. ^F-58bv8d (F-wgj20y)
- A recovery reads each repository's default branch. It stops, even with `--auto`, when a repository
  is on another branch or its default branch is unknown, and it never switches branches. ^F-v0fje9 (R-jjntc2)
- A recovery takes its evidence from the repositories alone: memory and earlier conversations are
  not sources, and work on an unmerged branch **may** shape a question, never a statement. ^F-vysd02 (R-c6rw8q)
- A recovery asks the user at most twice: once to approve, adjust or stop its plan, and once when a
  problem blocks it. ^F-npjf2p
- A recovery writes the skopository in English unless its plan says otherwise, with five to seven
  principles per charter, topic files of under about 800 words, and examples where a rule could be
  misread. ^F-ysw3wy
- A recovery reports the disagreements it finds as neutral questions outside the skopository, each
  in one category (security, money, regulation, promise, behaviour, documentation), ordered with what
  could hurt someone or lose money first. ^F-fnmz13 (R-cvfbeg, R-a58za9)
- A recovered skopository is a proposal: nothing in it is accepted until people review it and lock
  it with `/skopo:lock`. ^F-c99y7w
- A recovery **must not** write the lock. ^F-q0cy2k (R-3t2k9z)
- A recovery ends by reporting to the user, in their language and in under 300 words: where the
  skopository is, the commit of each repository it read, its size, the most consequential
  questions, its doubts, that nothing is locked yet and how to accept it, and where the run data
  is. ^F-b86qg1 (R-4vhze1, F-q0cy2k)
- A recovery leaves its run data (survey, research reports, plan, every lint pass, questions, notes
  and metrics) under `.skopo/runs/` in the directory where it started, ignored by git, and records
  the session there so its cost can be read later. ^F-5z12dt (F-njt9vm)

## Checking and accepting

- `/skopo:lint` finds the skopository, checks it, and explains every finding with its fix. With
  `--fix` it makes the fixes that keep the meaning and asks before any change of meaning or placement. ^F-y3ctab
- `/skopo:lint` **must not** rewrite the lock to silence an undeclared difference. ^F-2n9z6f (R-vcvkc2)
- `/skopo:lock` refuses a skopository with errors other than undeclared differences, asks the user
  which differences are rewordings and which change meaning, writes the rationale record once they
  confirm, and asks once more before it writes the lock. ^F-kw407m (R-ebjvnd, R-vcvkc2)
- None of the commands commits; the user commits the skopository, its lock and its records. ^F-xw40f8
