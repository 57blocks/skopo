# The reference CLI: tech binding

How the reference tools are built: what only their developers see.

- The tools are plain JavaScript modules on Node.js with no dependencies. ^D-b9qcqe (F-3a0ch9)
- One shared parser implements the statement grammar, and every command reads a skopository through
  it. ^D-k5wz7s (F-qq33qh, F-yc21zh)
- The checks are written by hand in the checker, and the version it implements is fixed in the
  checker; nothing is read from the specification's text at run time. ^D-pn11cz (F-rfvjdf)
- What each command touches: the checker and the ID minter only read; the lock writer writes the
  lock alone; the semantic handoff writes its input to the file it is given; the placeholder replacer
  rewrites statement files and the files passed beside them; the run recorder writes under the run
  folder; the survey only reads git. ^D-d2r5q4
- The tools make no network request. ^D-x4c9h7
- Keys are drawn from a cryptographic random source and, when a skopository is given, checked against
  every ID already present in statements, the lock, rationale records and the run's map. ^D-51gxmy (R-5tbe88, R-3re74m)
- The lock is written in key order and read back before it is saved, so it diffs cleanly and never
  lands unparseable. ^D-ts5hsy (F-jzhf13)
- The tools in this repository are the single source. Each harness plugin carries a byte-identical
  copy, made by a sync step that overwrites drifted copies and removes extra files, and that can
  report drift without changing anything. ^D-18qv5k
- The run recorder is the only writer of a run's record, and wraps the checker to keep the full
  output of every pass. ^D-rgg231 (F-njt9vm)
