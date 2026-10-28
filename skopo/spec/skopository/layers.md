# Skopository: layers and placement

Which layer a statement goes in, which products a skopository describes, and which way its
references point. Words are in the [charter](charter.md).

## Placement

- An **outside party** is anyone who holds the makers to something they did not set alone: a client,
  a partner, a regulator, or a standard published by a body other than the system's makers. ^T-189dqf
- The **clerk test** asks whether a statement would stay true were the whole system replaced by
  people working with pen and paper. ^T-1dym6b
- The **counterpart test** asks who would notice a change to a statement: an outside party, the
  product's consumers, or only its developers. ^T-n6dfvq
- The **refactor test** asks whether a statement would still hold were the code rewritten to the
  same design. ^T-cc2njm

These tests, applied in this order, decide where a statement belongs:

1. If an outside party would object to changing it, it belongs in the spec.
2. If it passes the clerk test, it belongs in the spec.
3. If a change to it would be noticed by the product's consumers and by nobody outside the
   product, it belongs in the product binding.
4. If a change to it would be noticed by the product's developers and by nobody else, and it is a
   decision about how the product is built that passes the refactor test, it belongs in the tech
   binding.
5. Otherwise it is code or a coding convention, and it stays out of the skopository.

^R-1vjxxr (refines R-myx06z)

- Authors and generators **must** place each statement by these tests. ^R-vbtx7t (refines R-myx06z)
- Where a product is itself an interface, the parts its consumers use **must** be placed in the
  product binding, and an interface that only the makers' own software uses **must** be placed in
  the tech binding. ^R-zekfcg (refines R-myx06z)

> *Example.* A library lends a member at most five books, and members borrow at a kiosk by the desk.
> Were people with pen and paper to replace the system, the five-book limit would still hold, so
> it is spec. The kiosk would go, and members would notice, so it is a form decision. ^E-qweg93 (R-1vjxxr)

> *Example.* Outside integrators call a service's verification interface; the service's own
> console calls a second interface that nobody else uses. The first is defined in the product
> binding, the second in the tech binding. ^E-v95mws (R-zekfcg)

## Products

- A product **must** have exactly one product binding, and **may** have one tech binding, which
  bears the same name. ^R-a6z2k6
- A tech binding **must not** exist without the product binding of its product. ^R-ht7jhv
- A system that is offered as software others run, and that its makers also run for their own
  users, is two products. ^R-x8hepn

> *Example.* An open-source verification service, and the deployment one company runs from it for
> its own users, are two products: integrators and self-hosting operators consume the first, the
> company's users the second. Each has its own pair of bindings. ^E-s7vmcq (R-x8hepn)

## A declared leak

- A **declared leak** is a spec rule that holds only for some forms of the system and says so in its
  opening words. ^T-cght29
- A spec rule that holds only for some forms of the system **must** be a declared leak. ^R-c9x31x (refines R-myx06z)

## References

- A spec statement **must** cite only spec statements; a product binding **must** cite only the spec
  and product bindings; a tech binding **may** cite all three layers. ^R-8ja5pg (refines R-qvyhr2)
- A skopository **must not** name a location in code, quoted or not: a file, a module, a symbol or a
  line. ^R-p8g5bd (refines R-qvyhr2)
- Code **may** cite a skopository by the ID of a statement; how it does so is left to tools. ^R-w3b4y8

> *Example.* A team moves the code that computes loan limits into a service of its own. The tech
> binding says that the lending rules hold no state and names no file, so the move touches no
> statement. ^E-9xm4qc (R-p8g5bd)
