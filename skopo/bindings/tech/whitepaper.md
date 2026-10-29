# The whitepaper: tech binding

How the whitepaper page is built: what only its developers see.

- The whitepaper is Markdown, one file per language, and one renderer page that lays it out and
  draws its figures from words in the Markdown. ^D-mnwhem (F-4h23dm)
- A build embeds the Markdown into the renderer, producing a self-contained page per language. ^D-nwpbkp (F-m5m5bj)
- The build prints each self-contained page to PDF with headless Chrome, so the PDF is laid out by
  the page's own print styles. ^D-gqbf9s (F-nh8qmz, F-m5m5bj)
- Without an embedded copy, the renderer takes the Markdown from the address it is given when it runs
  on the reader's own machine or from disk, then from beside itself, then from the repository's main
  branch on GitHub. ^D-55x7k4 (F-nvjbz0, F-d8pmdm)
- The renderer remembers a reader's choice of language in the browser's own storage, and works
  without it when the browser refuses storage. ^D-j7xbwn (F-nvjbz0, F-yav9n4)
- The renderer keeps a link's target only when it is relative or uses http, https or mailto, and
  replaces any other, because the Markdown it renders can come from elsewhere. ^D-23nnec (F-d8pmdm)
- The design export the renderer reproduces is not committed, because it bundles the brand's fonts. ^D-vc3cjc
