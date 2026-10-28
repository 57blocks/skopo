# Skopository: charter

What a skopository holds and the principles every detailed rule in this folder refines. The shared
words (system, intent, skopository, statement) are in [`../skopo.md`](../skopo.md).

## Words

- A **layer** is one of the three parts of a skopository. Each holds one kind of content and answers
  to one placement test. ^T-phzwr0
- The **spec** is the layer that holds what must be true in the world the system serves. ^T-900abq
- A **product** is anything built from the system that has its own consumers. ^T-d9nrja
- A **consumer** is a person or a system that uses a product: a user, an integrator, an operator who
  runs it. ^T-jhpap1
- A **developer** is a person who builds or maintains a product. ^T-wn0m7k
- A **product binding** is the layer, one per product, that holds what the product's consumers see
  and rely on. ^T-qb0hw7
- A **tech binding** is the layer, one per product, that holds what only the product's developers
  see, at the level of design. ^T-3kzeb8
- **Code** is the level below the tech binding: the instructions that realize a product. It is not
  part of a skopository. ^T-kyhp8e

## Principles

Each principle is realized through the detailed rules that refine it.

- Every statement **must** sit in the layer its content belongs to. ^R-myx06z
- A statement **must** cite only statements of its own layer or of the layers above it, and a
  skopository **must not** cite code. ^R-qvyhr2
- A statement **must** carry its force in a bold normative keyword, and in no other words. ^R-zxr6vs
- A statement's identity **must** be its key: drawn at random, kept for the statement's whole life,
  and never given to another statement. ^R-v1ggdj
- Once a skopository has accepted text, every difference from that text **must** be declared, as a
  change of meaning, a change of wording or a removal. ^R-43tfsd
- A skopository **must** hold intent only: what has been decided, not the work of deciding it. ^R-ywyg21

> *Example.* A lending library's skopository says that a member with an overdue book borrows nothing
> more (spec), that members borrow at a kiosk by the desk (product binding), and that the lending
> rules hold no state of their own (tech binding). The code that realizes all three is not in it. ^E-nqxc1d (T-900abq, T-qb0hw7, T-3kzeb8, T-kyhp8e)
