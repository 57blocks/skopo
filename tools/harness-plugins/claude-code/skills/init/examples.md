# Excerpts from a skopository

An invented system, written to show the shape and tone a recovery should reach: a city's library
network with several branches, a public catalogue that partner schools query, and the service that
runs both. The domain is not yours, so do not borrow its words.

## A charter: words and principles (`spec/lending/charter.md`)

```
# Lending: charter

What a loan is, and the principles every detailed rule below refines.

## Words

- A **member** is a person the library has registered to borrow books. ^T-cpn27y
- A **loan** is one copy lent to one member, from the day it is lent until it comes back. ^T-cmc69g
- A loan is **overdue** when its due date has passed and the copy is not back. ^T-qwavx5
- A **hold** is a member's claim on the next copy of a title that comes back. ^T-sh83hc

## Principles

Each principle is realized through the detailed rules that refine it.

- A copy **must not** be lent while it is on an open loan. ^R-zhqbv3
- A member with an overdue loan **must not** borrow another copy. ^R-3vttrs
- A member **may** keep a loan for the standard loan period of the branch that lent it. ^R-0chw52
```

## A topic: rules that refine, and examples where a rule could be misread (`spec/lending/holds.md`)

```
- A copy that comes back while a hold waits on its title **must** go to the oldest hold, not back
  on the shelf. ^R-9g7an2
- A member with a hold on a title **must not** be lent another copy of it while the hold waits.
  ^R-c60nae
- A loan **must not** be renewed while a hold waits on its title. ^R-ca3j2v (refines R-0chw52)

> *Example.* Two members place holds on the same title on Monday and Tuesday. The copy that comes back on Wednesday goes to Monday's hold, even if Tuesday's member is at the desk. ^E-qrxxew (R-9g7an2)

> *Example.* A member asks to renew a loan on its due date; a hold was placed on the title an hour earlier. The renewal is refused, and the loan is due that day. ^E-xnfczg (R-ca3j2v)
```

## One branch's rules (`spec/local/harbour.md`)

From the branch's own lending policy. Numbers live here, not in the general rules.

```
- The Harbour branch's standard loan period **must** be 14 days for books and 7 days for
  films. ^R-g5by5r (refines R-0chw52)
- The Harbour branch **must** hold a returned copy for its hold for 5 opening days, then offer it
  to the next hold. ^R-zcn3q4 (refines R-9g7an2)

> *Example.* A copy held for a member comes back on a Friday; the branch is closed at the weekend. The hold lapses at closing time on the following Thursday. ^E-5x9e48 (R-zcn3q4)
```

## A product binding: what consumers see (`bindings/product/catalogue.md`)

The catalogue is a public API for partner schools, so the API is defined here.

```
- The catalogue offers a read-only REST API with JSON bodies over HTTPS, under
  `/api/catalogue/v1`. ^F-qg9zfw
- A partner school sees how many copies of a title each branch holds and how many are free, and
  never who has them. ^F-ppf4n0 (T-cmc69g)
- Members place and cancel holds in the library's web app and at any branch desk; there is no
  mobile app. ^F-ty23z4 (T-sh83hc)
- A member is told by email when a held copy is ready, and again a day before the hold
  lapses. ^F-m49zj7 (R-zcn3q4)
```

## A tech binding: what only developers see (`bindings/tech/catalogue.md`)

Components named by role, never by directory; no file, module or symbol.

```
- The catalogue and lending are one service over one PostgreSQL database; branches reach it over
  the city's network, and partner schools only through the public API. ^D-6rqk62 (F-qg9zfw)
- The lending rules hold no state: they take the member, the copy and the loans and holds that
  bear on them, and answer with a new loan, a hold or a refusal. ^D-nsahsa (R-zhqbv3, R-3vttrs, R-9g7an2)
- The public API **must not** read the tables that link copies to members. ^D-kvnf24 (F-ppf4n0)
```

## Questions (the run's `questions.md`, never in the skopo)

Often a recovery's most useful output. Each is a place where sources disagree, and only a person
can say which is right.

```
| # | Category | Question | Sources that disagree | Statements it bears on |
|---|---|---|---|---|
| 1 | promise | The Harbour policy holds a copy for 5 opening days; the code counts 5 calendar days. Which is intended? | Harbour lending policy §3 · the hold expiry job | R-zcn3q4, E-5x9e48 |
| 2 | behaviour | A renewal is refused when a hold waits on the title, but the desk screen offers an override with no recorded reason. Is the override intended, and who may use it? | lending rules · desk application | R-ca3j2v |
| 3 | promise | Partner schools are told they never see who holds a copy; one report endpoint returns the member's branch and loan date. | partner agreement §2 · catalogue API | F-ppf4n0 |
```
