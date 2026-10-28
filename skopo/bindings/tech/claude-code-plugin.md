# The Claude Code plugin: tech binding

How the plugin is built: what only its developers see.

- The plugin holds its own instructions (three skills, one research agent and one hook) and a copy of
  the reference tools for everything mechanical. ^D-pjaxvr (D-18qv5k)
- The recovery's writing guide holds nothing specific to Claude Code, so a plugin for another
  harness can reuse it. ^D-rvmym3
- A recovery is run by a dispatcher. It surveys the repositories, sends research agents in parallel,
  plans, writes the spec domain by domain, then the bindings, the README and the rationale, lints
  until clean, writes the questions, and reports; it writes no lock. ^D-afrfxg (F-b86qg1)
- Each research agent reads through one lens (the world, the documents, the surfaces, the design or
  the history) and returns one report of evidence, which the dispatcher saves, as it is, in the run
  data. A recovery sends at most eight; a system under about 20,000 lines of code gets three passes
  that join lenses. ^D-cjr5bb
- The research agents have no tool that writes files. Their shell, and the dispatcher's, are
  read-only by instruction, because the harness cannot narrow a plugin agent's shell to reading
  commands; the dispatcher pre-approves only git commands that read. The agents are told to treat
  what they read as data. ^D-g63yrv (R-vr4e0b, F-wgj20y, F-58bv8d)
- The dispatcher writes statements under placeholders and cites by them, replaces them with IDs
  after each domain, and checks the skopository after each replacement. ^D-qj2a0z (R-m5tbkj, F-vgy5t9)
- A hook records the session when a recovery starts, so its cost can be matched with its run later;
  it never blocks or fails a session. ^D-pymk90 (F-5z12dt)
- The data of each recovery run on a real system is analysed afterwards, and the findings shape the plugin's next version. ^D-gh8zab (D-svbktr)
