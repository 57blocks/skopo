# The Skopo Specification: product binding

The specification as its readers meet it: a published document, and the files and syntax it defines
for a skopository. Its consumers are the people who build checkers and generators, and the people
who write and review skopositories. The model these files encode is in the spec.

## The document

- The specification is published in English, one Markdown document per version, each opening with
  a header that gives its version, status, date, editors, the version it supersedes and its
  licence. ^F-0h66hb (T-r29cxd, T-wt76t9)
- Versions are numbered with Semantic Versioning 2.0.0. ^F-1t597p (R-rkfwrw, R-qjmzpq, R-ae5yjt)
- Readers cite the specification by version and section, as in "the Skopo Specification 0.1.0,
  section 5.2". ^F-5g43zb (R-and5hm)
- The specification's own requirements use the capitalised key words of BCP 14 (RFC 2119 and
  RFC 8174). They bind skopositories and tools, and are distinct from the bold lowercase keywords
  inside a skopository, which bind the system it describes. ^F-fjdway (T-4eenax)
- A changelog lists what each version changed, newest first, in the Keep a Changelog form. ^F-pn3j7n (T-r29cxd)
- Each version closes with appendices: a syntax summary, the default keyword dictionary, a minimal
  skopository, and the gaps that version knowingly leaves open. ^F-qcs6q5 (R-7ees8q)
- Complete example skopositories ship beside the specification, each naming the version it follows;
  they are informative. ^F-rezak6 (R-s5h1w7)
- The specification and the example skopositories that ship with it are licensed under the Creative
  Commons Attribution 4.0 International licence. ^F-0ge39x (F-rezak6)

## Files and layout

- A skopository is a directory: a directory inside a code repository, conventionally named `skopo/`,
  or a repository of its own. ^F-15byd4 (T-tcrx8w)

The root of a skopository holds:

| ID | Path | Presence | Holds |
|---|---|---|---|
| F-32qbbz | `skopo.json` | required | the manifest, which declares the version of the specification followed |
| F-4mq4yq | `keywords.json` | required | the keyword dictionary |
| F-3nz55w | `README.md` | required | what the skopository describes and how to read it |
| F-pazh46 | `spec/` | required | the statement files of the spec |
| F-pqz9fc | `bindings/product/` | optional | one statement file per product |
| F-8fqhye | `bindings/tech/` | optional | one statement file per product, named as its product binding |
| F-8jn56z | `rationale/` | optional | rationale records |
| F-086e2f | `views/<language>/` | optional | translations of the spec and the bindings |
| F-rmjg6t | `spec.lock.json` | recommended | the lock, absent until the first one is written |

- Checkers ignore other files and directories at the root. ^F-jmtmp3
- The manifest is a JSON object whose `specVersion` member gives the version as
  `MAJOR.MINOR.PATCH`; tools ignore members they do not know. ^F-02yjj4 (R-g7ysee)
- The specification recommends arranging the spec as a file of shared words, one folder per domain
  with a `charter.md` of words and principles and topic files that refine it, a single file for a
  small domain, and `local/<jurisdiction>.md` for the rules of one office, market, regulator or
  operator among several; it recommends cutting a domain where a word changes meaning and keeping
  a topic file readable in one sitting. ^F-z3ccq2
- The binding folders **must not** hold subfolders, and a binding's file name without `.md` names its
  product. ^F-nx12z3 (R-a6z2k6)
- A statement file **may** open with YAML front matter whose `language` member is a BCP 47 tag. ^F-36nvj9 (R-ex1ywt)
- Every file is UTF-8 without a byte order mark, with LF line endings, and Markdown follows
  CommonMark 0.31.2 with the table extension of GitHub Flavored Markdown. ^F-69rq6k
- A statement file **must not** hold fenced code blocks, HTML blocks, footnote definitions or link
  reference definitions. ^F-ap82sb (R-gh00sn)

## Statements in Markdown

- A statement is one Markdown element: a paragraph, a list item at any depth, a block quote or a
  table row. ^F-qq33qh (R-9td139)
- An anchor is a caret followed by the ID, at the end of the element's text and after white space. ^F-fcy28n (T-vq9kr8)
- An ID is the kind's letter, a hyphen and a key of six characters drawn from the lowercase Crockford
  base32 alphabet, which is the digits and the letters other than i, l, o and u; it is recognised
  where no lowercase letter or digit follows it. ^F-x8ctsk (T-2fqbse, T-yckb98)
- The kind letters are T for a term, A for an act, R for a rule, W for an assumption, E for an
  example, F for a form decision and D for a design decision. ^F-kd4k5s (T-9fz9tz)
- A whole list, table or block quote is one statement when the paragraph right after it holds an
  anchor alone, with an optional link group; such a list, table or quote holds no anchors of its
  own. ^F-dcdww6 (R-ppf538)
- A table row is a statement when its first cell holds exactly one ID, without a caret. Its table
  **must** follow a stem: a paragraph without an anchor that ends with a colon, ASCII or full-width.
  The stem is part of every row's statement and is not connective text, so a bold keyword in it binds
  every row; a row carries no links. ^F-vx0paq (R-ppf538)
- Quoted text is written as a Markdown code span; a code location inside one still names code. ^F-vekszx (R-94pabc, R-p8g5bd)
- A link group is a pair of parentheses right after the anchor, holding IDs separated by commas; a
  rule's group opens with the word `refines`. ^F-v0eah5 (T-n5x1g7, R-90wstv)
- A term sets off its word in bold, and a normative keyword or a form condition is bold when it is
  Markdown strong emphasis. ^F-8kv6kq (R-cby83e, T-9rphka)
- A statement's text is taken from its lines with their leading space and one list or quote marker
  removed, joined with single spaces, with the anchor and links removed and white space collapsed. A
  table row's text is its stem, a space, and its cells after the ID cell joined by a space, a vertical
  bar and a space. ^F-yc21zh (R-dmd5jb)
- A placeholder is the kind's letter, a hyphen, an at sign and a lowercase label. ^F-7j1f4c (T-ddf7x8)

## Dictionary, lock and records

- The keyword dictionary is a JSON object keyed by language tag. Each entry holds lists named
  `requirement`, `prohibition` and `permission`, and optionally `formCondition`, `hiddenForce` and a
  `warnUnbolded` flag for languages with word boundaries. Members whose names begin with an
  underscore are comments. ^F-a8wk55 (T-0bcqzz)
- The default dictionary has an English entry modelled on BCP 14 and the Easy Approach to
  Requirements Syntax, and a Chinese entry modelled on GB/T 1.1-2020. ^F-v8s0fc (R-pnc2jt)
- The lock is a JSON object with `records`, the rationale files already folded in; `statements`,
  keyed by key in ascending order, each with `kind`, an informative `where` of file and line, `sha`
  and `text`; and `translations`, keyed by directory, each key with `sha` and `source`. ^F-jzhf13 (T-z7h51s, R-7gxha9)
- A fingerprint is the first 16 lowercase hexadecimal digits of the SHA-256 hash of the statement's
  text in UTF-8. ^F-6g9c65 (T-ywpc7q)
- A rationale record is a file named by the date of the decision and a slug, whose first heading is
  its title and whose two-column table holds the fields Touches, Rewords, Retires, Sources, Grade and
  Recorded. ^F-xf6hmp (T-kadph6, T-t6dt99, T-g2x4kx)
- A translation lives in a folder named by its language under the views folder, mirrors the paths of
  the files it translates (so a translated binding sits under a bindings folder there), and declares
  its language in front matter. ^F-r2n89w (R-m61mzm)

## Checks

- A checker detects as a code location at least a path of two or more segments that ends in a
  source or infrastructure extension (ts, tsx, js, mjs, cjs, go, rs, py, java, kt, rb, swift, tf,
  hcl, prisma, sql, sh), and such a file name followed by a colon and an identifier. A bare file name
  that is a word of the world is not one. ^F-e49478 (R-nbcw2g)
- A status field is a line that begins with the word Status and a colon, in any case, bold or not. ^F-3wh7w7 (R-2x62ps)
- The check once named L6 was dropped, and its name stays unused. ^F-w866fb (R-d1jza1)
