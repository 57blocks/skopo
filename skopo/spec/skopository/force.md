# Skopository: force

How a statement binds: normative keywords, the rules that hold them, and the form condition that
declares a leak. The keywords of each language come from the skopository's keyword dictionary.

## Normative keywords

- A **normative keyword** is a word of obligation, prohibition or permission; in English must, must
  not and may. ^T-4eenax
- A **keyword dictionary** lists, for each language a skopository is written in, its normative
  keywords, its form conditions and its hidden-force words. ^T-0bcqzz
- A normative keyword gives force when it is bold, and none when it is plain. ^R-cby83e (refines R-zxr6vs)
- Where keywords overlap, the longest one applies: a bold prohibition is not read as a requirement. ^R-6g1e9y
- Bold normative keywords **may** appear in rules, form decisions and design decisions, and **must
  not** appear in terms, acts, assumptions, examples or connective text. ^R-9tcngy (refines R-zxr6vs)
- A skopository **must** carry its own keyword dictionary, with an entry for every language its
  statements are written in. ^R-7wz5sw
- A file's language selects the dictionary entry that applies to it; a file that names no language
  is in English. ^R-ex1ywt
- A tool **may** fill a field that a language's entry lacks from the specification's default
  dictionary, and the skopository's own entries **must** prevail. ^R-pnc2jt

## Rules with and without force

- A **behavioral rule** carries a bold normative keyword; a **definitional rule** carries none and
  says what a word or a state means. ^T-8w8gx4
- **Hidden force** is an obligation, a prohibition or a permission stated without a keyword, in
  words such as cannot, is refused, never or only. ^T-a835f6
- A definitional rule **must not** carry hidden force. ^R-qde6dg (refines R-zxr6vs)

> *Example.* A rule reads "A member cannot borrow a book that is on loan." It carries no keyword, so
> it binds no one, and a checker warns about the word cannot. Rewritten with a bold prohibition on
> lending a book that is on loan, it binds, and a reviewer, a translator and a checker all read it
> the same way. ^E-smvpm1 (R-qde6dg)

> *Example.* "A loan is overdue when its due date has passed and the book is not back" carries no
> keyword and obliges no one. It is a definitional rule, and needs none. ^E-w1x8zn (T-8w8gx4)

## Form conditions

- A **form condition** is the bold word that opens a declared leak; in English Where. ^T-4arrp0
- A declared leak **must** open with a bold form condition. ^R-kf585n (refines R-c9x31x)
- A form condition word that is not bold has no meaning. ^R-4pwv5s

> *Example.* A principle opens "Where there is no verdict, nothing is published". Its Where is plain,
> so the rule is not a declared leak; it holds for every form of the system. ^E-91qmsc (R-4pwv5s)

## Recommendations

Recommendations for force:

| ID | Recommendation |
|---|---|
| R-kxfxkg | every obligation, prohibition or permission in a rule, a form decision or a design decision carries a bold keyword |
| R-wtwfgf | a plain keyword in a rule, a form decision or a design decision is made bold when it is normative and reworded when it is not |
