# Pixel Museum Design System

A modern **white-cube museum** system for framing **pixelated** travel photography. It pairs a calm, near-monochrome gallery environment (white walls, hairline black frames, concrete floors, tight Helvetica) with deliberately crunchy, low-res pixel artworks. The contrast — pristine institutional chrome around 8-bit images — is the whole idea.

This system is **separate from, and does not replace, the bound WorldWinner design system.**

## Sources
- Built from the project's own product: **`Pixel Gallery.dc.html`** (root) — the working white-cube gallery app (Curate + Gallery sections).
- Direction chosen from the **`Modern Museum Directions.dc.html`** brainstorm board (option 01, "White Cube").
- Brand wordmark: **PIXEL PIX**.

## Index / manifest
- `styles.css` — entry point; `@import`s all tokens.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (custom properties).
- `components/core/` — `Button`, `SectionToggle`, `ArtFrame`, `Plaque`, `Keycap` (each `.jsx` + `.d.ts` + `.prompt.md`, with `buttons.card.html` & `gallery.card.html` specimens).
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius/shadow, brand wordmark).
- `ui_kits/pixel-museum/` — Curate-screen recreation + README.
- `SKILL.md` — downloadable skill manifest.

## CONTENT FUNDAMENTALS
- **Voice:** curatorial, quiet, a little playful. Think wall labels and shipping manifests, not marketing.
- **Casing:** sentence case for body and headings ("Curate", "Shipping to the gallery"); UPPERCASE only for tracked labels, buttons, plaques, and the wordmark.
- **Person:** addresses the visitor as "you" ("We'll crate them and ship them to your gallery wall").
- **Examples:** eyebrow `EXHIBITION INTAKE`; heading `Curate`; plaque `PHOTO 01` / `archival pixel print`; CTA `SHIP IT`; success `DELIVERED`.
- **Emoji:** never. **Exclamation:** sparingly (the "Delivered" beat).
- **Numbers:** zero-padded for works (`01`), `n / 10` for counts.

## VISUAL FOUNDATIONS
- **Color:** near-monochrome. Ink scale `#fafafa → #111`. The only saturated color in the whole system comes from the pixel photographs themselves. Walls are white / bone / cool; floor is warm concrete.
- **Type:** one family — system **Helvetica/Arial**. Two voices: tight bold display (`-1` to `-3px` tracking) and small UPPERCASE labels (`2px` tracking). The wordmark runs `5px` tracking.
- **Pixel imagery:** all photos render with `image-rendering: pixelated`, downsampled to ~64px on import. Never apply a "pixel font" to chrome — the pixelation lives in the images only.
- **Frames:** the signature object. A `1.5px` solid black keyline (`box-shadow: 0 0 0 1.5px #111`), a wide white mat, and a `1px` inner keyline around the image well. Frames size to each photo's aspect ratio.
- **Spacing:** 4px base scale. Generous padding; lots of negative space (white-cube air).
- **Corners:** square by default (frames, cards, mats, buttons). Radius is reserved for keycaps (`4px`) and the circular remove dot.
- **Shadows:** quiet only — `0 1px 3px` cards, `0 8px 24px` frames, `0 4px 16px` HUD, `0 24px 60px` zoom. No glows, no heavy drops.
- **Backgrounds:** flat wall color + a thin concrete floor band with a 1px top edge. No gradients except the soft, near-invisible spotlight cone above each frame and the protection fade on the floor.
- **Borders:** hairline `#e4e4e4` for chrome; pure black `#111` keyline for frames/crates.
- **Animation:** restrained, purposeful. Track pan uses `cubic-bezier(.22,.61,.36,1)`; crates launch with a slight overshoot `cubic-bezier(.5,-0.3,.6,1)`; the visitor waddles on a 4-step cycle; UI fades up `14px`. Durations `.15s` (state), `.45s` (pan).
- **Hover/press:** buttons transition `all .15s`; primary stays black, ghost shows its border. Toggle active = black fill.
- **Layout:** fixed 64px top bar (wordmark left, segmented toggle right); fixed bottom floor; centered content column (max ~840px). Gallery is a horizontal track of 420px slots.

## ICONOGRAPHY
Minimal and geometric — drawn from CSS primitives, not an icon font. Directional **triangles** (CSS borders) for arrow keycaps and button arrows; a **plus** (two bars) for the add/dropzone; a circular **×** remove dot. No emoji, no third-party icon set, no decorative SVG beyond the pixel artworks. If a larger icon set is ever needed, substitute a thin-stroke set (e.g. Lucide) and flag it.

## Notes / caveats
- Fonts are the **system Helvetica/Arial** stack — no webfont files shipped. If you want a specific grotesque (e.g. Helvetica Neue / a licensed face), provide the files and I'll wire `@font-face`.
- Component **specimen cards are static** (token-driven HTML) for reliable rendering; the React components in `components/core/` are the real, bundled API for consumers.
