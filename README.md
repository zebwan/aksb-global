# AKSB Global Sdn Bhd — Landing Page

Single-page site for AKSB Global Sdn Bhd (CIDB G4 road maintenance contractor, Bandar Puncak Alam,
Selangor, with a branch in Yong Peng, Johor).

Everything lives on one scrolling page, with the header, hero tiles and footer all deep-linking to
in-page sections:

Hero → About → Expertise (five scopes) → Why AKSB → Projects → Partners & Clients →
Certifications → Contact → FAQ → Closing CTA

Built with React 19, Vite, Tailwind CSS and Lenis smooth scrolling. No router and no backend — the
enquiry form composes an email, so it deploys as plain static files.

All site photography is supplied by the client. Provenance, the images that were rejected and why,
the logo sources and the facts still awaiting client confirmation are documented in
[CONTENT-NOTES.md](CONTENT-NOTES.md).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow that builds and publishes to GitHub Pages.
In the repo settings, set **Pages → Source → GitHub Actions** once to activate it.

Content is sourced from the AKSB Global company profile and brochure (2026).
