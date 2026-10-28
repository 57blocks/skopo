# The reference CLI: product binding

The reference tools as their users meet them: commands that check, lock and assign IDs to a
skopository, and the helpers a recovery uses. Its consumers are people who check or lock a
skopository by hand, and authors of harness plugins, who carry a copy of it.

## Running it

- The tools are Node.js scripts that need Node.js 22 or later and no installed packages, run from a
  copy of the repository. ^F-3a0ch9
- Each command that reads or writes a skopository is given its absolute path and never guesses one:
  without it, the command prints its usage and does nothing. The ID minter alone runs without one,
  and then says that its IDs were checked against nothing. ^F-mwc6aa
- The commands are a checker, a lock writer, an ID minter, a placeholder replacer, a handoff for
  semantic checks, a survey of repositories, and a recorder of recovery runs. ^F-3reavk

## The checker

- The checker implements the Skopo Specification 0.1.0, and accepts a skopository that declares any
  0.1 version. ^F-rfvjdf (R-h0bfzd, R-b2ryrq)
- The checker prints a summary of statements by kind, examples, the state of the lock, leaks and
  semantic findings; then one line per finding, giving its severity, its check, the file and the line
  where there is one, and a message, errors before warnings; then the count of each. ^F-azecg0 (R-n2bxnk)
- The checker exits with status 1 when it reports an error, and 0 otherwise. ^F-zrcqm7 (R-ghsfc0)
- While a placeholder remains in any statement file or rationale record, or a file's language has no
  entry in the skopository's own dictionary, the checker reports those errors alone and says that it
  checked nothing else. ^F-ybez3d (R-2rbg6d, R-tjrak2, R-b10cjm)
- A skopository's own keyword dictionary decides which languages the checker knows; within each of
  its entries, a member it lacks comes from the dictionary shipped with the tools. ^F-0cj16p (R-pnc2jt)
- For English, the checker treats these words as naming a form: screen, page, button, click,
  checkbox, dropdown, popup, tooltip, form field, endpoint, api, database, cron, server, url, json,
  login, email, e-mail, slack, sms, push notification, app, mobile, web, ui, dashboard, phone,
  message. ^F-nd4g90 (R-wj1waz, R-c2gkj6)
- Semantic checks are a handoff: one command writes the declared rewordings and the changed
  translations, for a language model, to a file it is given; the checker reads the model's findings
  from a file it is given and reports them as warnings at the statements they concern. Neither file
  is in the skopository, and no command runs the handoff yet. ^F-0pndzp (R-11j6ep, R-k728ve)

## Writing

- The lock writer is run once people accept a skopository's content. It writes the lock of the
  skopository it is given and folds in every current rationale record; it checks nothing first. ^F-q4v4gh (R-ebjvnd, R-3p8qs0)
- The ID minter prints fresh IDs of a given kind that nothing in the skopository uses. ^F-52gj1g (R-5tbe88, R-3re74m)
- The placeholder replacer gives every placeholder in a skopository, translations included and quoted
  text excepted, a fresh ID. Given a map, a label
  keeps the ID it got in an earlier pass, and files passed beside the skopository have their known
  placeholders rewritten too. ^F-vgy5t9 (R-m5tbkj)

## Recovery helpers

- The survey reports each repository's size, languages, documents, branch, default branch and
  distance from its remote as of the last fetch, and the skopositories it holds, listing apart those
  under an examples or fixtures folder; it never fetches. ^F-03h918 (R-4vhze1, R-jjntc2)
- The reference tools are licensed under the Apache License 2.0. ^F-qhm4px
- The run recorder keeps a recovery's data in a timestamped folder under `.skopo/runs/`, in a
  directory that ignores itself in git, and checks that every ID the run's questions and notes cite
  exists in the skopository. ^F-njt9vm (R-cvfbeg)
