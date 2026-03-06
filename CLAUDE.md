# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Kids Center Costa Rica** — a children's language therapy, language teaching (German, English, Portuguese), and academic support center in San José, Costa Rica. Hosted on **GitHub Pages** with custom domain `kidsscenter.com`.

All user-facing content is in **Spanish (es-CR)**.

## Architecture

This is a single-page static site with no build tools or frameworks:

- **`index.html`** — Monolithic HTML file containing all sections (hero, services, about, testimonials, FAQ, gallery, contact). This is what GitHub Pages serves.
- **`styles.css`** — All styles using CSS custom properties defined in `:root`. Uses a design system with spacing tokens (`--space-*`), color tokens (`--color-primary`, `--color-secondary`, `--color-accent`), shadow tokens, and radius tokens.
- **`script.js`** — Vanilla JS handling: mobile hamburger menu, lightbox, smooth scrolling, contact form submission (n8n webhook), scroll reveal animations (IntersectionObserver), testimonials carousel, FAQ accordion, back-to-top button, and service worker registration.
- **`sw.js`** — Service worker for PWA caching (cache-first strategy, cache name `kids-center-v2`).

## Development

Serve locally with any static file server:

```bash
python -m http.server 8000
# or
npx http-server
```

No build step, no package.json, no dependencies to install. Edit HTML/CSS/JS directly.

## Key Integrations

- **Contact form** submits to an n8n webhook URL defined in `script.js` (`N8N_WEBHOOK_URL`)
- **Google Analytics** tag `G-B028GLHW3T` in `index.html` `<head>`
- **Google Fonts**: Nunito and Poppins
- **PWA**: `site.webmanifest` + `sw.js`

## SEO Assets

- `sitemap.xml` — references `kidscenter.cr` domain
- `robots.txt` — allows major crawlers, blocks scraper bots
- `feed.xml` — RSS feed with blog content
- `google3b0ccbf2796d7cd7.html` — Google Search Console verification
- Structured data (JSON-LD) is embedded inline in `index.html`

## Deployment

Push to `main` branch — GitHub Pages deploys automatically. The `CNAME` file maps to `kidsscenter.com`. No CI/CD pipeline.

## Conventions

- CSS uses BEM-like class naming (e.g., `.service-header--violet`, `.gallery-grid--team`)
- Responsive breakpoints: 992px (tablet), 768px (mobile), 480px (small mobile)
- Brand colors: primary green `#5BC561`, secondary pink `#FF6BA6`, accent blue `#7DD3FF`
- All animations respect `prefers-reduced-motion`
- Touch-friendly targets (`min-height: 48px`) via `@media (hover: none)`

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.