# Conformance: checks

What a conforming checker finds, at which severity, and how it reports what it finds.

## Performing the checks

- A conforming checker **must** perform every check of the specification, at the severity the
  specification gives it, unless it stops early as the next rule allows. ^R-x7qn09 (refines R-xrp2x5)
- A checker **may** stop after errors that would make every later finding meaningless, such as a
  language with no dictionary entry or a placeholder left in the files, and **must** then say that
  it stopped. ^R-b10cjm
- A checker **must** check translations as it checks every other statement file: for placeholders,
  anchors, citations, code locations, status fields, line citations and keywords in connective
  text. ^R-d74vev
- A skopository or a tool that departs from a recommendation still conforms, and a checker **may**
  report the departure as a warning. ^R-6zr0nq
- A check's name **must** keep its meaning across versions of the specification; the name of a
  dropped check stays unused. ^R-d1jza1

A checker reports each of these as an error, under the check named in the second column:

| ID | Check | Finding |
|---|---|---|
| R-sv593d | L0 | the skopository declares no version of the specification that the checker supports |
| R-tjrak2 | L0 | the keyword dictionary or the README is missing, or the dictionary has no entry for a language a file declares |
| R-2rbg6d | L1 | a placeholder remains |
| R-p92wzt | L1 | an anchor is malformed or does not end its statement, or a statement ends with more than one |
| R-ak7avk | L1 | a statement made of a whole list, table or quote, or of a table row, breaks the form those statements take |
| R-gh00sn | L1 | a statement file holds a construct the format excludes |
| R-1z37af | L1 | a key is defined twice, or a retired key is defined |
| R-h0byrw | L1 | a form or design decision sits outside its binding, or a binding holds another kind |
| R-x73120 | L2 | a cited ID does not resolve to a statement with its current kind |
| R-fv35z3 | L2 | a statement of a kind that takes no links carries some, or a rule refines something other than a rule |
| R-9k0ef0 | L5 | a citation points to a lower layer |
| R-nbcw2g | L5 | a statement file names a location in code |
| R-0nbwd7 | L5 | a tech binding has no product binding of its name, or a binding folder holds folders |
| R-2x62ps | L7 | a statement file holds a status field, or a statement file or a rationale record cites a line of code |
| R-nxdw11 | L8 | connective text holds a bold normative keyword |
| R-0zwyma | L9 | a term, an act, an assumption or an example holds a bold normative keyword |
| R-0xdg8k | L10 | a difference from the lock is not declared |
| R-bx2dv0 | L11 | a translation declares no language, or changes a key, a kind, or the force of a rule, a form decision or a design decision |

A checker reports each of these as a warning:

| ID | Check | Finding |
|---|---|---|
| R-c2gkj6 | L3 | a spec statement names a form outside a declared leak, unless it is an example that checks declared leaks alone |
| R-eat0h6 | L9 | a rule without a bold keyword uses one of the language's hidden-force words |
| R-wyqrhj | L9 | a normative keyword is plain in a rule, a form decision, a design decision or a table stem |
| R-vxvndy | L9 | a statement holds more than three bold normative keywords |
| R-8f411r | L10 | a statement whose meaning changed is cited by examples, refinements or bindings that need checking again |

- A checker reports, as information under check L4, how many rules have an example and how many have
  none. ^R-g735ew
- The words that show a statement names a form are each checker's own list; a word on it marks a
  possible leak, which a reviewer judges. ^R-wj1waz

> *Example.* A spec rule names the channel by which a reminder reaches a member, and the checker
> warns that it may leak form. A reviewer agrees, rewrites the rule as "a member is reminded two days
> before a loan is due", and moves the channel to the product binding. ^E-j5y3rj (R-c2gkj6, R-hvzgqj)

## Semantic checks

- A checker **may** use a language model for checks that words cannot decide: whether a statement
  declared reworded kept its meaning (S1), whether a translation kept the meaning of its source (S2),
  and whether a statement file names code in a form the other checks miss, such as a directory or a
  configuration key (S3). ^R-11j6ep
- A semantic finding **must** be a warning, never an error. ^R-k728ve

## Reporting

- A checker **must** report each finding with its check, its severity and the file it concerns,
  with the line wherever the finding concerns one. ^R-n2bxnk
- A checker **must** signal failure when it reports an error. ^R-ghsfc0
