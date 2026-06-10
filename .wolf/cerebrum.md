# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-01

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** KidsCenter
- **Description:** Sitio web para Kids Center, un centro especializado en terapia de lenguaje, enseñanza de idiomas y refuerzo académico para niños en Costa Rica.
- **Design direction (2026-06-09):** "Warm storybook editorial" — cream base (#FAF6F1), DM Serif Display + Nunito, green/pink/blue brand accents, organic blob shapes, greeting stickers + marquee in the 4 taught languages (Hallo/Hello/Olá/¡Hola). Stay on this aesthetic for future UI work.
- Cache busting: bump `?v=YYYYMMDD` on styles.css/script.js references in index.html (4 spots: 2 preloads, 1 link, 1 script) whenever those files change.
- GSAP stagger reveals write inline `transform`; use the independent CSS `rotate`/`translate` properties for persistent decorative tilts (e.g. team polaroids) so GSAP can't clobber them.
- Deploy target is Vercel (vercel.json, /api/contact endpoint); sw.js is a self-destructing cleanup worker — CLAUDE.md claims GitHub Pages + n8n webhook, which is stale.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-06-09] GSAP cannot tween pseudo-elements (`gsap.to('.hero::before')` is a silent no-op). Use real decorative divs for anything GSAP must animate.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
