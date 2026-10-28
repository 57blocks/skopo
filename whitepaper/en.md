# When agents write the code, what do we write?

*Introducing Skopo*

Draft · 2026-10-28 · Specification: Skopo Specification 0.1.0 (a draft, not yet published)

---

## §0 Forty hours of leave

A company built its own attendance system. Its code today (2026) holds this rule: leave of more than 40 hours needs escalating to an L3 manager for approval. Open the system's PRD, though, and it says something else: leave of a full five days goes through three levels of approval, the project lead, the L2 manager and the L3 manager, in that order.

An employee takes Monday to Friday off: five whole days, exactly 40 hours. By the PRD the request needs three approvals; by the code, two. So is this a bug hiding on a boundary? Or should we hold that the code is the only source of truth, and the PRD simply fell behind?

You can call it a bug, but the real problem was planted earlier, in the loose natural language of the PRD. "A full five days": what counts as full? Does exactly five days count? Are days counted on the calendar, or converted from working hours? From Friday afternoon to the next Friday morning, how many days is that? Where the PRD said nothing, the developers filled in: five days is 40 working hours, and "a full" means ">". Each step of that translation made sense on its own; together they introduced a new rule: exactly 40 hours is not a full five days.

How long do you think a disagreement like this takes to surface? The PRD was last updated in 2019. In the seven years since, the company's Jira has collected more than 3,700 tickets, and the commits and pull requests are past counting. What the system should be has drifted a little with each change, and by now nobody can say precisely what it is. The code can tell you what the system is now, but unless someone once wrote long comments and commit messages, it cannot say why something was done this way, still less whether it should have been.

And the software industry is going through a bigger change: agentic coding is lifting software development to a new level of abstraction. Today's code looks more and more like yesterday's assembly: it is still there, but people read it and change it less and less. At this level, what people care about first is no longer C# or C++, SQL or NoSQL; it is what the system should be. So how should we express our intent, and how should we manage what we express? Skopo, the subject of this paper, is our attempt at an answer.

Now suppose HR confirms what the PRD meant: exactly five days also needs the L3 manager. Under Skopo's rules the rule cannot simply be copied from the PRD. First say how days are counted, then pin the rule down with examples on its boundary:

```skopo
spec · spec/leave/approval.md
- **Leave duration** is counted in working time: only the working hours of working days count, eight hours to a working day; weekends and public holidays do not count. ^T-1e3wfx
- A leave request of 40 hours or more **must** be approved by the project lead, the L2 manager and the L3 manager, in that order. ^R-wwab73

> *Example.* An employee takes leave from Friday afternoon to the next Friday morning: two half days of 4 hours each and four working days of 32 hours, 40 hours in all. The request goes to the project lead, the L2 manager and the L3 manager. ^E-jqc9df (R-wwab73, T-1e3wfx)

> *Example.* An employee takes Monday to Friday off, and Wednesday is a public holiday, so the leave is 32 hours. The request does not go to the L3 manager. ^E-cgqyw9 (R-wwab73, T-1e3wfx)
```

The first statement settles what leave duration means: working time, not calendar days. In the second, the bold **must** says it is a requirement, not a description, and "40 hours or more" settles what "full" means. The two examples sit on the boundary. The first spans a weekend, with half a day at each end, and adds up to exactly 40 hours; the second is five days on the calendar but only 32 hours of working time. If the code used "more than", the first example would fail; if it counted calendar days, the second would. The `^T-1e3wfx` and `^R-wwab73` at the end of each statement are their IDs.

Agents can read and write the code for us; deciding is still up to people. Skopo cannot make the decision for you either, but it can help you say clearly what was decided: a rule is written in one place, with one ID, and with examples on its boundary; when it changes later, there is one clear place to change it, and the change has to say whether it changed the meaning or only the wording. As you can see, a skopo is plain English; what is special about it is only the set of rules it keeps. That is Skopo's central claim:

> [!QUOTE]
> No new language, just a new set of rules.

---

## §1 What Skopo is

The name Skopo shares its root with telescope and microscope: Greek σκοπός, meaning aim or intent.

At heart, a skopo is a set of Markdown files written and organized by a set of rules, and those rules are called the Skopo Specification. We recommend keeping the files in a repository of their own, called a skopository; together they are a system's skopo. The specification also allows them to live inside a code repository, as a `skopo/` directory.

In one sentence: a skopo writes down what a system should be as numbered statements in natural language, keeps them in three layers, marks the requirements with bold keywords, and records in a lock the text people have accepted. The four statements at the start come from that company's attendance skopo.

### 1.1 What a statement looks like

A statement is one Markdown element: a paragraph, a list item, a block quote, or a row of a table. It ends with an anchor such as `^R-wwab73`, a notation borrowed from block references in note-taking tools like Obsidian. The letter after `^` says what kind of statement it is, and there are seven kinds:

| Letter | Kind | What it is | Layer |
|---|---|---|---|
| T | term | the meaning of a word | spec |
| A | act | something someone does, and what follows from it | spec |
| R | rule | what must, must not or may happen | spec |
| W | assumption | a fact the system relies on but does not enforce | spec |
| E | example | a concrete scenario that shows what a rule makes true | spec |
| F | form decision | a decision about what the product's users see | product binding |
| D | design decision | a decision about how the product is built | tech binding |

The letter and the six characters after it make up the statement's ID, such as R-wwab73. A bold **must** in the sentence marks a requirement, and the parentheses after an anchor hold citations, such as the rules an example checks. §2.1 has the details.

> [!FIGURE] fig-statement · Anatomy of a statement
> Enlarge one statement, with its middle elided: `- A leave request of 40 hours or more **must** be approved by … in that order. ^R-wwab73`
> Label it with leader lines: a list item (one Markdown element), the bold keyword (force), the anchor, the kind letter R (rule), the six-character key (identity)
> Below it, a whole example: `> *Example.* An employee takes leave from Friday afternoon to the next Friday morning: two half days of 4 hours each and four working days of 32 hours, 40 hours in all. The request goes to the project lead, the L2 manager and the L3 manager. ^E-jqc9df (R-wwab73, T-1e3wfx)`, with the parentheses marked as "the rules this example checks".

### 1.2 What is in a skopository

Open a skopository and the top level looks like this, again for the attendance system:

```
attendance-skopo/
  skopo.json             which version of the specification it follows
  keywords.json          the bold keywords of each language
  README.md              what this skopo describes, and how to read it
  spec/                  what must be true in the world
    people.md            words every domain uses: employee, office, role
    leave/
      charter.md         the words and principles of leave
      approval.md        requesting and approving leave
      balances.md        how leave balances are counted
    local/
      shanghai.md        the Shanghai office's own rules
  bindings/
    product/
      attendance.md      the attendance system's form decisions
    tech/
      attendance.md      the attendance system's design decisions
  rationale/             records of changes
  views/zh/              the Chinese translation
  spec.lock.json         the accepted text and its fingerprints
```

The two that matter most are `spec/` and `bindings/`, which describe a system in three layers:

- **spec**: what must be true in the world the system serves. The world is the part that exists without software, such as the company's leave policy. The spec is divided into domains, a folder each; §2.2 has more.
- **product binding**: what the product's users see and rely on, such as its screens, the shape of its public API or the channels its notices go out on. We call all this the product's form. There is one per product, under `bindings/product/`.
- **tech binding**: what only the product's developers see, and only at the level of design: which services it is split into, what stores it uses, how its components talk to each other, who may reach what. There is one per product, under `bindings/tech/`, with the same name as its product binding.

Why "binding"? Because one spec can be bound into different products: the same leave policy can become a web app or a chat bot. The two bindings record what this particular binding turned out to be, and how it was built. Below them is the code, and the code is not in the skopository. Which layer a statement goes in is decided by a few questions between the layers; §2.3 has more.

> [!FIGURE] fig-layers · Three layers, and the questions between them
> Four horizontal bands from top to bottom: spec, product binding, tech binding, code. Draw code in a dashed box, labelled "not in the skopository".
> Put a gate between each pair of layers: the one between spec and product binding labelled "outside party objects? holds on pen and paper?", the one between product binding and tech binding labelled "only users notice?", the one between tech binding and code labelled "survives a rewrite?".
> On the right, an upward arrow labelled "citations point up"; an arrow from the skopo to the code, struck through, labelled "the skopo never cites code".
> Beside each layer, one phrase on what it holds, in the words of the text.

The rest deal with change and with readers:

- `spec.lock.json` is the lock: the text and fingerprint of every statement people have accepted. From then on, every difference between the skopo and the lock has to be accounted for.
- `rationale/` holds records of changes. Each record declares which statements a change touched, whether it changed their meaning or only their wording, and, if you like, why. §2.4 explains how the lock and the records work together.
- `views/` holds translations only. Documents for particular readers, such as an employee handbook or a test plan, are generated from the skopo when wanted and never stored back.
- `skopo.json` names the version of the specification the skopo follows, `keywords.json` lists the bold keywords of each language, and `README.md` tells readers which system the skopo describes.

### 1.3 Compared with four common documents

How is a skopo different from the documents developers already keep? Take the four most common. A PRD answers "what product are we building", for the business side and PMs. A TRD answers "how do we plan to build it", for developers. The docs beside the code (README, `docs/`, ADRs and files like AGENTS.md) answer "how do we work in this repository, and why was it decided this way", for developers and now for agents too. Test cases answer "what output should this input give", for QA and CI. A skopo answers a different question: "what should this system be, and why".

| | Readable by business | Says why | Each item has an identity | Tells requirements from descriptions | Machine-checkable | World, form and design apart | Meaning changes show |
|---|---|---|---|---|---|---|---|
| PRD | ✓ | depends | ✗ | ✗ | ✗ | ✗ | ✗ |
| TRD | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Docs beside the code | ✗ | depends | ✗ | ✗ | ✗ | ✗ | ✗ |
| Test cases | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ | depends |
| skopo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

> [!FIGURE] fig-spectrum · The documents developers keep, and skopo
> Draw a matrix with the content of the table above: five rows (PRD, TRD, docs beside the code, test cases, skopo) and seven columns, named as in its header. Draw ✓ as a solid dot, ✗ as a hollow one, and "depends" as a short dash.
> The first four rows lie on a spectrum in order from business to code; the skopo row on its own, set apart from the spectrum, labelled "natural language, plus a set of rules".
> Do not draw skopo as one more point on the spectrum.

Lay the four documents out from business to code, and skopo is not on that line. It wants the best of both ends: business people can read it, as they can a PRD, and, as with test cases, every item has an identity, requirements stand apart from descriptions, and a machine can check it. What a machine checks, though, is the skopo's own form, citations and declared changes. A skopo cannot run the way a test does, and whether a statement sits in the right layer, or means the right thing, is still for people to judge. And two columns have a place only in a skopo: keeping the world, the form and the design apart, and making every change say whether its meaning changed.

To be clear, the table compares whether each kind of document has a place for these things by design, not whether every one of them gets them right. The ticks in the skopo row have conditions too: a skopo says why only if rationale records are written, and changes of meaning show only if there is a lock and every change is declared.

So a skopo is not one more document on the pile. It takes over the part of each of these that most deserves to last. The business rules of a PRD go into the spec, and its product form into the product binding; the design decisions of a TRD go into the tech binding; the "what should come out" behind a test case becomes examples people can read; and whatever a README or AGENTS.md says the system must do belongs in the skopo as well.

The closest thing to a skopo is BDD's Gherkin: business people can read it, it has examples, and it runs. In practice, though, it mostly slid into UI steps, which button to click and what appears, and it is tied to test code, so it changes whenever the UI does, and in the end nobody wants to read it. A skopo's examples are deliberately not runnable. They stay at the level of the world, with no buttons and no pages, which keeps them from being dragged along by the UI; but if the code changes and the skopo does not, the skopo goes stale just the same, as the end of §2.4 discusses.

### 1.4 What it is not

Finally, a few things it is easy to mistake a skopo for:

- It is **not a new language**. A statement is plain English or Chinese that keeps a few rules.
- It is **not a tool, and it is not tied to a process**. Skopo is a specification, and our plugin and checker are one implementation of it. The rulebook says what a skopo looks like, what every change must declare, and what a tool that writes a skopo must at least guarantee. Where a skopo comes from, when it is compared with the code and who uses it are left to teams and their tools.
- It is **not an up-front document, thrown away once written**. A skopo evolves with the code; we call it the code's companion. We recommend giving it a repository of its own, beside the code's.
- It is **not another Confluence**. Progress, plans and discussions never go into a skopo; §2.5 has the full list.
- It is **not an index of the code**. A statement never says where code is: no source paths, no module names, no function names.

If you would rather try it before reading on, the commands are at the end of §4: install the Claude Code plugin, run `/skopo:init` in a repository with plenty of rules, and you get a draft skopo and a list of questions.

---

## §2 The rules in detail

§1 showed what a skopo looks like; this section covers the rules it keeps. The example is still the company's attendance system.

### 2.1 Statements: bold keywords, IDs and citations

**Only bold keywords carry force.** In English the keywords are **must**, **must not** and **may**, for a requirement, a prohibition and a permission; in Chinese they are **应**, **不应** and **可**. Only bold ones count, and a sentence without one is a description. There is deliberately no "should": a rule either is a requirement or it is not, and a "should" lets the vagueness back in.

Go back to the rule in the code: "leave of more than 40 hours needs escalating to an L3 manager for approval." In everyday speech "needs" is a requirement, but nothing marks it, so a tool cannot recognize it, and a translation may turn it into a description. In a skopo, lint flags force hidden in the wording like this. This rule was not invented on a whim. The first time we used our tools to recover the skopo of a financing platform automatically, the agent wrote 225 of 284 rules as plain statements of fact, "is refused", "never happens": the meaning was right, but the force was lost. After we changed the writing guide and added this lint, the second run gave keywords to 219 of 266 rules.

**IDs are permanent.** The six characters of an ID are its key. The key is random, unrelated to the file a statement is in or to what it says; once given, it never changes, and a deleted key is never given to another statement. So files can be split, merged and moved without breaking anything that cites them. The letter follows the layer: when a decision moves from the product binding to the tech binding, F becomes D, and the key stays.

**Citations point up.** The parentheses after an anchor are citations: an example names the rules it checks, a form or design decision names the rules it serves, and a rule that refines another says `refines`. Each layer cites only its own layer and the layers above it: the spec cites the spec, a product binding may also cite the spec, and a tech binding may cite all three. A skopo never cites code, while code may cite the skopo. We learned this the hard way in a pilot: its tech binding started out as an index of which file and which function realized each rule, and every refactor meant changing the skopo.

### 2.2 The spec: organized by domain

The spec is divided into domains. Each domain has a **charter** with the domain's words and a few principles, usually five to seven; under it are **topic** files, each about one thing, such as requesting and approving leave, or how balances are counted. Rules that belong to one region or office go in `spec/local/`, with `refines` pointing to the general rule they refine, which they replace within their scope. Domains are cut where a word changes meaning: on the financing platform, "approval" meant reviewing documents in one place, approving a payment in another and a credit decision in a third, so it became three domains.

Not every rule needs an example. Put examples where a rule is easy to misread, best on its boundary, like the two at the start.

This way of organizing comes from law. Law is a kind of "source code", written in natural language, that has run for centuries. It never set out to remove ambiguity; it hands ambiguity to people with the authority to decide, and records their decisions as precedent. Skopo does the same, without borrowing law's style.

> [!FIGURE] fig-law · Law and Skopo
> Two columns: "Law" on the left, "Skopo" on the right, joined by thin lines.
> Pairs: article ↔ statement; article number ↔ ID; principles and detailed rules ↔ charter and topic; special law over general law ↔ refines; amendment ↔ a change (a pull request's diff plus a rationale record); precedent ↔ example; judge ↔ the people entitled to decide, with an agent bringing the questions to them.
> No scales, gavels or similar icons.

### 2.3 Two bindings: which layer a statement goes in

Which layer does a statement belong in? Ask a few questions, in order:

1. Would anyone outside object to changing it, such as a client, a partner, a regulator, or a standard published by a body outside the makers? If so, it goes in the spec.
2. If the whole system were replaced by people working with pen and paper, would it still hold? If so, it also goes in the spec.
3. If it changed, would only the product's users notice? If no outside party cares, the rules of the world stay the same, and only the people using the product would find out, then it is the product's form and goes in the product binding.
4. If it changed, would only the product's implementers, its developers, notice? If so, ask whether it is a decision at the level of design: which services the product is split into, what stores hold its data, how its components talk to each other, who may reach what. If it would still be there after the code was rewritten from scratch to the same design, it goes in the tech binding.
5. What changes whenever the code is rewritten, such as how functions are split, where files live or what variables are called, is only code or a coding convention, and stays out of the skopository.

In the attendance system, the three layers look like this:

```skopo
spec · spec/leave/approval.md
- A leave request of 40 hours or more **must** be approved by the project lead, the L2 manager and the L3 manager, in that order. ^R-wwab73

product binding · bindings/product/attendance.md
- Before submitting a leave request, an employee can see which levels of approval it will go through. ^F-9zbwzz (R-wwab73)

tech binding · bindings/tech/attendance.md
- The approval route is computed by a stateless rule: given the applicant, the period of leave and the organization chart at the time, it returns the approvers in order. ^D-qp9xff (R-wwab73)
```

"40 hours or more needs three levels" would hold even if the company went back to pen and paper, so it is in the spec. "Employees see the approval route before submitting": if it changed, HR's policy would be untouched and only the employees using the system would notice, so it is in the product binding. "The approval route is computed by a stateless rule": employees cannot see it and only the developers know it; rewrite the code to the same design and it is still there, so it is in the tech binding.

Once the layers are apart, the old PRD has not vanished. It has shrunk to the thin layer of the product binding, no longer mixed up with the rules of the world. If one day leave moves from a web page into a chat bot, only the bindings change, and not a word of the spec.

These questions are for placing statements; they do not demand purity, since abstractions always leak. Some rules hold only for some forms, for example "when one message notifies many people at once, the recipients must not see each other's addresses". Such a rule can stay in the spec, but it opens with a bold **Where** (in Chinese, **凡采用**) to declare that it depends on form. Leaks are not forbidden; once declared, they can be counted.

### 2.4 Managing change

The files of a skopo are plain Markdown, and any way of editing them is fine: by hand in an editor, in a pull request, or through an agent. We do recommend handing the writing itself to agents: people say what should change, read the diff and decide, and the agent does the detailed work of wording, IDs, citations, rationale records and lint.

`spec.lock.json` records the text and fingerprint of each statement as people accepted it. From then on, every difference between the skopo and the lock must be declared in a rationale record: a change of meaning under Touches, a change of wording only under Rewords, a removal under Retires, with sources and reasons if you like. An undeclared difference fails lint. That gives one hard rule: at any time, a committed skopo, linted against its lock, must have no errors. Halfway through a change the two may disagree; when you commit, they must agree.

Say HR decides to lower the threshold from 40 hours to 24, from five days to three. The change carries a record like this:

```skopo
rationale · rationale/2026-10-12-l3-from-24-hours.md
# 2026-10-12 · L3 approval from 24 hours

| | |
|---|---|
| Touches | R-wwab73, E-jqc9df, E-cgqyw9 |
| Sources | HR meeting minutes, 2026-10-12 |

Absences of three days or more have started to affect project schedules.
```

Once a change is accepted, the lock is rewritten. Who decides is up to the team, usually whoever decides such things in real life: the business owner for business rules, the architect for design decisions. The lock records only the text, not who accepted it or when; git history and pull requests keep that.

A model can also check whether a change declared as wording only has quietly changed the meaning. In one experiment we planted six rewrites that changed the meaning; the model found all six, and raised no false alarm on 23 controls whose meaning had not changed. Still, it reports only warnings, and people have the last word.

> [!QUOTE]
> If the meaning changes, say so.

One more thing to be clear about: the lock only sees changes to the skopo itself. If someone changes only the code and leaves the skopo alone, the lock cannot see it; and if the skopo changes first and the code has not caught up, the lock will not say so either. Whichever side moves first, the work is the same: compare the code and the skopo statement by statement, find where they disagree, and hand that to people to decide, rather than letting a tool quietly change one side to match the other. That is how the 40-hour contradiction at the start was found (§3.1). Whether the comparison should run at every merge or periodically is not settled yet. What the rulebook guarantees is that when it runs, there is a text to compare against: numbered, statement by statement, and accepted by people.

### 2.5 What stays out of a skopo

Progress, plans, owners, meeting notes, discussions, research, lists of open questions, how-to guides and changelogs never go into a skopo. Not only because people cannot read that much: even if one day only agents read it, bloat dilutes the most valuable thing in it, the decisions people actually made.

Secrets, credentials and personal data stay out too, and so do people's names: a skopo names roles.

Documents for particular readers, such as an employee handbook, an approval matrix or a test plan, are views generated from the skopo: generated when wanted, thrown away after use. The only view stored back in a skopo is a translation, because a translation, like its source, has to be accepted by people. The lock records which version of the source each translated statement followed, so after the source changes you can find the translations that have fallen behind; for now that comparison is done by hand, and no tool will remind you.

---

## §3 Scenarios

The rulebook sets a few minimum requirements for tools that write a skopo, but it does not prescribe a process: where a skopo comes from, when it is compared with the code and who uses it are things we are still working out ourselves, and §4.2 lists what has not been tried. Here are three scenarios that a skopo handles and the documents above cannot. We have done the first; the other two are still designs.

### 3.1 Reverse-engineering an old system

The 40-hour contradiction at the start turned up in exactly this kind of experiment. We had an agent read the attendance system's code, the 2019 PRD and the commit history, and then, together with people, wrote down what the system should be as a skopo. It came to 104 rules, acts and form decisions, 34 of which had no source but the code: the code was their only record. Along the way came 27 questions for people to decide: 17 where the code and the earlier documents contradicted each other, 6 that no document covered, and 4 about wording and layering. "How many levels does exactly 40 hours need?" was one of them.

Why does it have to be a skopo? If the goal were a new PRD, the contradictions could only be written up as paragraphs of notes, with no way to settle them one by one; if the goal were tests, the tests would take the code's current behaviour as correct, and "more than 40 hours" would be frozen as it is. A skopo has the right grain. Each contradiction lands on one numbered statement and becomes one concrete question; once a person answers it, the statement turns from a recovered draft into a decision people made, and when people accept the skopo, it is recorded in the lock.

> [!FIGURE] fig-loop · A reverse-engineering run
> Two boxes, left: skopo; right: code and old documents.
> Above, an arrow from the code to the skopo, labelled "read out statements, find what does not match".
> Below, a loop: mismatch → becomes a question → people answer (change the skopo, change the code, or "not intent") → accepted, recorded in the lock.
> People appear at the answering step as a simple label, not a portrait.

We have also run the same approach fully automatically, with the reference tools, on a financing platform: two repositories and 615,000 lines of TypeScript gave 518 statements and 66 questions in 34 minutes.

### 3.2 Starting a change from intent

Suppose HR decides to lower the threshold from 40 hours to 24. The change can start in the skopo: change 40 hours to 24 in R-wwab73, move the two boundary examples to the new boundary, and attach a rationale record like the one in §2.4. An agent takes that diff and changes the code, and the pull request carries both the skopo change and the code change.

The reviewer first sees not two hundred lines of code but one declaration: the meaning of R-wwab73 changed, and why. A code diff does not show which rule it changes, and tests changed alongside it only prove that the code and the tests agree, not that this is what was meant. This is, in fact, where we imagine agentic coding starting; more in §4.3.

### 3.3 Audit: since when has this rule been like this?

In finance, HR and compliance systems, sooner or later someone asks: since when has this rule been like this? Why? Who decided? Answering today means digging through old versions of the PRD, Jira and the commits, and in the commits refactors and rule changes are mixed together, so it is hard to tell which ones changed the meaning.

In a skopo the answer can be looked up mechanically. Find every rationale record that lists R-wwab73 under Touches and sort them by date; the ones that give sources and reasons show them at a glance, and git and the pull requests add who accepted what and when. The changes that only reworded the rule are declared as Rewords, so they stay out of the way. This assumes that every change left a rationale record and that the git history is still there; a change without a record shows only that the text changed, not why. Nor is it an audit-grade record: rationale records themselves are not fingerprinted, so a record edited afterwards may go unnoticed.

---

## §4 Past, present and future

### 4.1 Past: what came before

Writing intent down so that it can be both read and checked is not new; people have tried for decades. Their attempts mostly failed to catch on because writing and maintaining them cost too much, not because they lacked expressive power. Almost every rule of Skopo has a source in that earlier work; putting the parts together into one working whole is our part:

| Need | Rule | Borrowed from |
|---|---|---|
| Consistent words | each domain fixes its words in a charter first; where a word changes meaning is a domain's edge | Domain-Driven Design's ubiquitous language and bounded contexts, SBVR |
| Requirements visible at a glance | only bold keywords carry force, with a dictionary for each language | RFC 2119 / 8174, EARS, GB/T 1.1 |
| Something to point at | one element per statement, with a random key that never changes | legal texts, which keep permanent identity apart from position numbers (Akoma Ntoso); StrictDoc's randomly generated MIDs |
| Unambiguous meaning | examples pin rules down | Specification by Example |
| Free of implementation and form | three layers, citations point up | Jackson and Zave: requirements describe the world, not the machine |
| A record of changed meaning | the lock, declared differences, rationale records | Doorstop's fingerprints and suspect links, Architecture Decision Records |
| Order at scale | charter, topic, local; special law over general law | how legislation is organized |

There are cautionary tales too. Some tools derive an ID from a title, so the ID changes when the title does; Skopo's keys are never computed from text. Today's spec-driven tools, such as GitHub's Spec Kit, mostly start from a newly written spec and generate a plan and code. How the spec evolves with the system afterwards, and how it keeps from drifting by the third month, is not their focus; it is exactly the question Skopo tries to answer.

Then why not build a more precise language? That road has been tried too. Formal methods (Z, Alloy, TLA+) are precise and machine-verifiable, but the people who make the decisions cannot read them, let alone write them. At the other end, anyone can write a vibe-coding prompt, and it is thrown away after use. Our choice: the sentences stay human, and the rules go around them.

### 4.2 Present: why now, and where things stand

So why now? Most of these parts are ten or twenty years old. Few people put them together before because it was too expensive: writing every rule as a statement, keeping it in step with the code, and noticing when the two part ways all fell to people. Agents changed that. They can write code from intent and read intent back from code, and cheaply. But an agent is not a reliable translator: it misreads, and it misses things. That is one more reason for the rules: what an agent writes has to be checkable, people have to decide statement by statement, and the version they accept has to be recorded. The clearer the rules, the more use we can make of an unreliable translator.

As for where things stand: the Skopo Specification 0.1.0 is still a draft and has not been published. We expect its core to hold, the three layers, statements and their keys, bold keywords, the lock and declared differences; other parts will change as people use it. Appendix D of the specification lists its known gaps; for example, the lock records the accepted text but not yet who accepted which statement. An independent checker can already be written from it. Most requirements on generators cannot be verified from their output, and there is no conformance test suite yet; help with both is welcome. Our checker and Claude Code plugin are only a reference implementation.

To see a complete skopo, look at Skopo's own. We had the plugin recover a skopo from the repository Skopo is developed in, describing the specification, the reference tools, the plugin and this whitepaper's page. In 29 minutes it wrote 334 statements and raised 33 questions, about 20 of them real faults in the specification and the tools; without that run, most of them would have shipped in the first version. After fixing them, we had an agent compare the revised specification with that skopo. It reported 40 statements that no longer matched, 18 missing and 1 to remove, and we checked the report before applying it, which is why the skopo now holds over 350 statements, not 334. That time the specification moved first and the skopo followed, which is exactly the comparison §2.4 describes. That skopo lives in the same repository as the specification, and it is still a draft: nobody has accepted it statement by statement yet, so it has no lock.

There is more we have not tried than we have:

- writing a skopo from a PRD or a feature spec, instead of recovering it from code;
- keeping a skopo in step with the code: comparing at every merge or periodically, what to ask, and how much;
- having an agent write code starting from the skopo;
- how long a person takes to go through a few hundred statements, whether that turns into nodding them through, and how many recovered statements are actually right;
- how useful it is in systems with fewer rules. We think Skopo fits rule-heavy systems best, such as finance, HR and compliance; in a product driven by experience the "world" is thin, and its skopo will be too thin to be worth reading.

### 4.3 Future: the next rung of the ladder

The history of software development is a climb up a ladder of abstraction. Each rung frees people from one kind of detail, and each depends on a translator that reliably turns what is written above into what is below.

| Rung | Frees people from | Translated down by |
|---|---|---|
| Machine code | (the start) | — |
| Assembly | remembering opcodes | assembler |
| High-level languages | managing registers and memory | compiler |
| Declarative languages (SQL) | working out how to fetch data | query planner |
| Frameworks and managed runtimes | building low-level infrastructure | runtime, framework |
| Intent (Skopo, this rung) | writing and reading code line by line | coding agent (both ways) |

Once a rung has a reliable translator, the rung below it gradually stops being read day to day. Wherever agents become reliable, code starts to become assembly. Some rungs never made it onto the ladder: COBOL, 4GL, MDA, no-code. Each built a "more human language", with narrow, leaky translators and no way to read intent back from code. This time is different: the translator works both ways, and we are not building a new language.

> [!FIGURE] fig-ladder · The ladder of abstraction, and the rungs that never fit
> Five levels from the bottom up: machine code, assembly, high-level languages, declarative languages (SQL), frameworks and managed runtimes; at the top, a dashed level "Intent (Skopo)".
> On the left of each level what it frees people from, on the right what translates it down, in the words of the table (the machine code row is the start, with both sides empty). A downward translation arrow between each pair of levels.
> The translator between the top level and the one below is "coding agent (both ways)": one arrow down and one up, both dashed, because this level is still being built.
> Beside the ladder, four broken, half-transparent rungs: COBOL, 4GL, MDA, no-code. They reach toward the intent level but fall short.
> No years, no people.

We hope Skopo is that rung; more concretely, that each system's skopo becomes the starting point of agentic coding. Today, an agent entering a repository first reads files such as AGENTS.md or CLAUDE.md: conventions, commands, warnings, but nothing about what the system should be. What we picture is an agent that starts from the skopo. A change is first a diff of intent, then lands in the code; people review the intent, and keeping the code in line with it is the agent's job. This is still a vision. For at least the next year the code will still be there, people will still read it, and skopo and code will live side by side.

Further out, what will pass is the controlled way of writing: bold keywords, one statement per element, mechanical lint. We think of it as a bridge of about two years: once models read prose reliably, those constraints will no longer be needed. What will last are the rules, form decisions, design decisions and examples people decided on; the identity of each and the lock; and the record, still to be added, of who accepted which statement and when. Longer context makes reading free; it does not make deciding free.

> [!BET]
> In the long run, everything becomes wishful coding. You say what should be true; the system that makes it true is generated, run and replaced, and nobody needs to look at it again. Forms such as interfaces and platforms will be abstracted away as well, until nobody notices them. The argument above does not depend on this bet.

> [!FIGURE] fig-lifespan · The way of writing will pass; the content will stay
> The horizontal axis is time, from "today" to "the long run", with no years marked.
> These three bands are not layers, so do not use the layers' colours: content and records in the accent colour, the controlled way of writing in neutral grey, code in the code colour.
> The top band, labelled "controlled writing (bold keywords, one element per statement, lint)", fades out at about two years, marked "our estimate: a two-year bridge".
> The middle band, labelled "content and records (decided rules, form decisions, design decisions, examples, IDs, lock, and acceptance records to come)", runs to the far right.
> The bottom band, labelled "code": solid at first, marked "side by side with skopo for at least a year", then fading, with "wishful coding" at the far right.

### 4.4 Next steps

What Skopo needs most now is more people using it and finding fault with it.

The specification, the reference tools and Skopo's own skopo are at [github.com/57blocks/skopo](https://github.com/57blocks/skopo): start with the specification, [`rfc/drafts/0.1.0.md`](https://github.com/57blocks/skopo/blob/main/rfc/drafts/0.1.0.md); Skopo's own skopo is in [`skopo/`](https://github.com/57blocks/skopo/tree/main/skopo). From the specification you can write your own checker or generator, or a plugin for another coding agent.

To try it, the quickest way is to install our plugin in Claude Code:

```bash
claude plugin marketplace add 57blocks/skopo
claude plugin install skopo@skopo
```

Then run `/skopo:init` in the repository you want to describe. It reads the code and the documents and writes a draft skopo, with a list of questions where the code and the documents disagree. The draft is only a proposal, and the plugin does not write the lock for you; once you and your team have read it and accepted it, write the first lock with `/skopo:lock`. `/skopo:lint` checks at any time whether a skopo conforms. Without Claude Code, the checker runs on its own with Node.js 22 or later and nothing to install: in the repository, run `node tools/cli/lint.mjs <path to the skopository>`.

The run records of our experiments are not in the public repository, because they contain material from the systems we tried Skopo on. The exception is the run on Skopo itself (§4.2): its result is the repository's `skopo/`. If you would like to see the records, write to the author at [teki@57blocks.com](mailto:teki@57blocks.com). And once you have tried it, tell us which rules do not work and where it does not make sense.
