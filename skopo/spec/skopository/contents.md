# Skopository: what it holds and leaves out

What never goes into a skopository, and the one kind of view it does store.

## Left out

- A skopository **must not** hold status, progress, plans, assignees, open questions, discussions,
  meeting notes or changelogs. ^R-kehv18 (refines R-ywyg21)
- A skopository **must not** name a person; it refers to people by their roles. ^R-hb203z (refines R-ywyg21)
- A skopository **must not** hold secrets, credentials or personal data. ^R-pcmkpa (refines R-ywyg21)

Recommendations for what a skopository holds:

| ID | Recommendation |
|---|---|
| R-0st74d | a skopository holds no guides, how-to material or onboarding |

## Views and translations

- A **view** is a document generated from a skopository for one kind of reader: a handbook, a test
  plan, a trace from code to statements, a translation. ^T-aak6wm
- Of all views, a skopository stores translations alone; the others are generated when someone needs
  them. ^R-88j4zk
- A **translation** is a view that renders statement files of the spec or of the bindings in another
  language, and that people read and accept as they do its source. ^T-7sgnqp
- A translation **may** cover only some of the files of the spec and the bindings. ^R-rdwetg
- A translation **must** meet every requirement that the layer of its source places on statements,
  their force, their citations and their keys. ^R-gb8f88
- A translation **must** declare its language. ^R-m61mzm
- A translated statement **must** carry the key of the statement it translates, and the same kind. ^R-x0nxnn
- A translated rule, form decision or design decision **must** carry the same classes of force as
  its source: requirement, prohibition, permission. ^R-wrdtdd
- A translation **must not** define a key that the spec and the bindings do not define. ^R-tk3pc7
- The lock records the fingerprint of each translated statement, with the fingerprint of the source
  text it translated when it was locked. ^R-7gxha9

> *Example.* The spec is translated into Chinese. A rule that prohibits in English prohibits in
> Chinese, under the same key. A translator who turns the prohibition into a plain statement of fact
> breaks the translation, and a checker reports it. ^E-08evdb (R-wrdtdd)
