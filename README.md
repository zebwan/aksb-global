# AKSB Global — corporate site

Single-page corporate site for **AKSB Global Sdn Bhd** (road maintenance contractor,
Puncak Alam, Selangor · CIDB G4 Bumiputera · 1287934-H).

Live at **https://zebwan.github.io/aksb-global/** — deploys automatically on every
push to `main` via GitHub Actions (no build step).

## Stack

Plain static **HTML + CSS + vanilla JS**. No framework, no build step, no Node.

- `index.html` — the whole page (all copy lives here)
- `assets/site.css` — compiled utility CSS (kept from the original Tailwind build,
  so all existing class names keep working)
- `assets/custom.css` — the animation state styles (reveal, mask wipe, hero load-in,
  blur titles, mobile menu, form radios)
- `assets/site.js` — all behaviour: Lenis smooth scroll, section nav, scroll-linked
  effects (dawn sky, blur titles, sticky horizontal projects row), count-ups, FAQ,
  mobile menu, mailto enquiry form
- `assets/lenis.min.js` — vendored Lenis 1.3.26
- `images/` — client photography + partner/client logos (see CONTENT-NOTES.md for
  provenance and the photo wishlist)

The site was originally a React 19 + Vite app; it was converted 1:1 to static files
in August 2026 for performance (JS payload dropped from ~83 KB to ~10 KB gzipped and
the page no longer needs JavaScript to render). The React source remains in git
history before the "static conversion" commit.

## Editing

- **Copy changes**: edit `index.html` directly — every section is labelled with
  `<!-- ==== Section ==== -->` comments.
- **New styling**: reuse the existing utility classes where possible; add anything
  new to `assets/custom.css`.
- **Content status**: `CONTENT-NOTES.md` tracks asset provenance, rejected photos,
  and the open questions awaiting client confirmation.
