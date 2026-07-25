# AKSB Global Sdn Bhd — Corporate Website

Multi-page corporate site for AKSB Global Sdn Bhd (CIDB G4 civil engineering contractor, Puncak Alam, Selangor): road furniture, pavement treatment, civil & structure works and bridge expansion joints.

Built with React 19, Vite, Tailwind CSS and Lenis smooth scrolling. Pages: Home, Projects, Expertise, Partners, Contact (hash routing, static-host friendly). Contact page includes a no-backend enquiry form (composes an email) and an FAQ.

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

Pushing to `main` triggers the GitHub Actions workflow that builds and publishes to GitHub Pages. In the repo settings, set **Pages → Source → GitHub Actions** once to activate it.

Content is sourced from the AKSB Global company profile (2026).
