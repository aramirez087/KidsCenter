# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-05-01

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- **Design ambition (2026-07-11):** When the user asks for “wow factor,” do not stop at safe polish or repeated card grids. Push toward a bold, ownable brand system and make the full-page composition feel authored.

## Key Learnings

- **Project:** KidsCenter
- **Description:** Sitio web para Kids Center, un centro especializado en terapia de lenguaje, enseñanza de idiomas y refuerzo académico para niños en Costa Rica.
- **Design direction (2026-06-09):** "Warm storybook editorial" — cream base (#FAF6F1), DM Serif Display + Nunito, green/pink/blue brand accents, organic blob shapes, greeting stickers + marquee in the 4 taught languages (Hallo/Hello/Olá/¡Hola). Stay on this aesthetic for future UI work.
- **Design evolution (2026-07-11):** Extended the storybook direction into a "language garden" system: paper-cut greeting stickers, yellow highlight strokes, restrained dotted/grid textures, a navy age-program chapter, and alternating atmospheric section backgrounds. Preserve the adult-trust/child-delight balance in future edits.
- **Ownable visual asset (2026-07-11):** The multicolor triangle/tangram border embedded in the original logo and teacher graphics is Kids Center's strongest distinctive motif. Reuse that geometry before generic blobs or circles, and prioritize real team/space imagery over stock classroom scenes.
- Cache busting: bump `?v=YYYYMMDD` on styles.css/script.js references in index.html (4 spots: 2 preloads, 1 link, 1 script) whenever those files change.
- GSAP stagger reveals write inline `transform`; use the independent CSS `rotate`/`translate` properties for persistent decorative tilts (e.g. team polaroids) so GSAP can't clobber them.
- Deploy target is Vercel (vercel.json, /api/contact endpoint); sw.js is a self-destructing cleanup worker — CLAUDE.md claims GitHub Pages + n8n webhook, which is stale.
- Browser verification: the removed `@studio-freight/lenis@1.0.29` CDN build threw `module is not defined`; native smooth scrolling is the intentional resilient fallback, while GSAP remains for reveal/parallax motion.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-06-09] GSAP cannot tween pseudo-elements (`gsap.to('.hero::before')` is a silent no-op). Use real decorative divs for anything GSAP must animate.
- [2026-07-11] Do not add scroll-reveal opacity stagger to entire card grids; it makes later cards look missing in screenshots and during quick scrolling. Keep cards opaque and animate position/scale only.
- [2026-07-11] An absolutely positioned image collage has no intrinsic width on a centered mobile grid item. Set an explicit `width: 100%` on both the collage wrapper and its parent before positioning the child photos.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- **2026-07-11 — Brand-owned second pass:** Replaced the generic stock hero with a real staff/space collage, introduced animated tangram pieces, changed repeated grids into editorial split/bento/journey layouts, and used the original branded teacher graphics as a five-person portrait wall.
