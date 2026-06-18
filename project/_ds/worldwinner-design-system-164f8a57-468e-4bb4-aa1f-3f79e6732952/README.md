# WorldWinner Design System

**WorldWinner** is a skill-gaming platform where players compete in games of skill for real cash prizes. The brand tagline is **"For the Win"**. Players earn **Cash** (played with, won as prizes) and **Rewards Points** (redeemable for Bonus Bucks, Game Credits, Gift Cards).

> *"Compete in Games of Skill with REAL CASH PRIZES! 20+ skill games. $2 Billion in payouts."*

## Sources
- **Figma:** "Style Guide 2023.fig" (mounted as VFS). Focused slides used: 1 (cover), 8 (logo color variations), 9 (logo dos/don'ts), 10 (typography), 12 (currencies), 14 (decoration elements).
- **Upload:** `uploads/Screenshot 2026-04-19 at 7.22.12 PM.png` — marketing composition showing hero/tagline layout and sticker treatments.
- **Product context:** WorldWinner mobile app (iOS/Android) + marketing web. The Figma contains 46 slides covering logo, color, type, currencies, decorations, and gameplay components (Game Tile, CTA buttons, Bottom Menu, Top Menu, Rewards Icons, Ribbons 1st/2nd/3rd, etc.).

## Index (root)
- `colors_and_type.css` — color tokens + type scale + signature highlight treatment
- `assets/` — logos, decoration elements, hero/cash imagery
- `preview/` — per-card HTML previews for the Design System tab
- `slides/` — sample 1920×1080 slides (title, section, comparison, quote, marketing)
- `ui_kits/mobile-app/` — WorldWinner mobile app UI kit (home lobby, game tile, bottom nav)
- `ui_kits/marketing/` — Marketing/landing sticker-based layouts
- `SKILL.md` — Agent Skill entrypoint

---

## Content fundamentals

**Voice.** High-energy, winner-forward, unambiguous. Copy is *short, urgent, promise-driven*, with frequent exclamation marks and dollar-sign callouts. It reads like a casino billboard meets a sports broadcast: "FOR THE WIN", "REAL CASH PRIZES!", "20+ SKILL GAMES", "$2 BILLION IN PAYOUTS!", "EARN UP TO $200 PER WIN PLAYING YAHTZEE".

**Casing.** Headlines are **ALL-CAPS ITALIC**. Subtitles can be title case. Body is sentence case. Money amounts always lead with `$` and are bolded/highlighted.

**Pronouns.** Second-person "you" when addressing players ("Compete", "Play", "Win"). First-person plural "we/our" only for platform-authored copy ("our Rewards Store").

**Emoji & unicode icons.** Not used. The brand has its own yellow **crown** glyph that functions as the brand's single emotive mark.

**Tone examples (from Figma & marketing):**
- "Style & Brand Guide"
- "Logo — Color Variations"
- "Do's and Don'ts"
- "Rewards Points are earned through Cash play. They can be redeemed for Bonus Bucks, Game Credits and Gift Cards in our Rewards Store."
- "In lieu of 'real money', cash coins are used throughout the player experiences…"
- "These elements can be used for BG decorations"
- "Watermark Logo"
- "Earn Up To $200 Per Win Playing Yahtzee"
- "For The Win"

**Vibe.** Confident, competitive, celebratory. Yellow + blue = stadium lights. Italics lean everything **forward** — motion, not stillness.

---

## Visual foundations

**Color.**
- Primary: **WorldWinner Blue `#1D7CEB`** and cool sky gradient `radial(#75D7F6 → #3274E9)` (the "feel-good" background) or deep variant `radial(#0D53D0 → #3274E9)` (the "premium" background).
- Accents: **Yellow `#FFF100` / `#FFFF00`** (crown, highlights) and **Cyan `#4BE9FE`** (alt highlight, glow). These are *transferable* — any important word can be stamped yellow and rotated 8°.
- Currency colors are sacred and never swapped: **green** (`#50AC07` → `#92E94E`) = Cash; **purple `#6F53FA`** = Rewards Points.
- Decorative card gradient: `linear(#AE2870 → #302DC5)` (magenta→violet), used under crown/ribbon/star motifs.

**Type.** Primary in-app font = **SF Pro** (Regular, Black, Black Italic). Marketing + video = **Proxima Nova** (Semi Bold, Black, Black Italic). The display style is **italic black caps** — this is the brand's signature voice.

**Backgrounds.**
- Large marketing surfaces: the radial sky-blue gradient with the mascot image set to the right (from cover slide).
- Decorated blue cards: flat `#1D7CEB` with one of three decoration motifs baked in at ~10–15% opacity: **Crown** (tucked at bottom), **Ribbons** (stylized "W" diagonal zig-zag across), or **Star** (radial burst from corner, overlay blend).
- Deep-card variant: `linear(#1D7CEB → #6327AF)` with the same decorations.

**Imagery.** Warm, vivid, photographic, often with subjects holding phones showing the game. Currency imagery is illustrated (coins with a $ and "Cash" + "Rewards" card icon). **No grain or B&W.** Gradient glow rings under icons (cyan) are a common treatment.

**Animation.** Slight lean/wiggle on stickers (rotate ±8°). Ease out on entries, bouncy scale on wins. No heavy parallax. Fades are quick (150–200ms).

**Hover.** Darken by 10% or overlay white 12%. **Press.** Scale to 0.97 and push down the bottom CTA shadow. Stickers scale to 1.03 on hover.

**Borders & shadows.** Sticker shadow = hard offset `2.6px 2.6px 0 rgba(0,0,0,0.15)`. CTA shadow = soft glow + chunky bottom offset. Rewards/icon glow = radial cyan `0 0 32px 6px #22D7FF`.

**Corner radii.** Pills (`999px`) on CTAs. Medium rounding (`14–22px`) on cards. Tiles are either square or `8–12px`.

**Cards.** Blue backgrounds with decorative overlays, yellow highlighted text at ±8°, chunky black bottom shadow. Never purely rounded-with-left-border-accent.

**Blur/transparency.** Used sparingly — small glow halos behind icons; white 10–20% overlays for decoration masks. No frosted navbars.

**Layout.** Cover-style compositions: big italic headline bottom-left; mascot/photo at right; logo top-left. Grids are simple — 2/3 column stacks, never masonry.

---

## Iconography

WorldWinner uses a **mix of custom illustrated icons + SVG decorations**. No icon font is shipped by the codebase; the brand relies on bespoke artwork:
- **Crown** (yellow, 5-point with ball tips) — the brand's signature motif. Used inside the logo and standalone as decoration.
- **Ribbon "W"** — stylized zig-zag forming a W with a tail.
- **Star burst** — 24-ray radial, used as overlay on cards.
- **Cash coin** — green circle with white "$" and inner ring.
- **Rewards card** — purple rectangle tile with lighter purple inner.
- **Ribbons: 1st / 2nd / 3rd** — ranking ribbons.

**Emoji:** never. **Unicode-as-icon:** never. **System UI icons** inside the app (SF Pro Black glyphs for chevrons, bells, etc.) come from SF Pro (iOS). On web we substitute with **Phosphor Icons (CDN, regular weight)** — flagged as a substitute until native SVGs ship.

**Asset files in `/assets`:**
- `logo-crown.svg`, `logo-horizontal-white.svg`, `logo-horizontal-blue.svg`, `logo-horizontal-black.svg` — **flagged: substitutes** reconstructed from Figma (fig binary stores the wordmark as per-rectangle vector fills, unreconstructable). Ask the user for an official SVG export.
- `decoration-crown.svg`, `decoration-ribbon.svg`, `decoration-star.svg` — decoration motifs.
- `hero-gamepad.png`, `cash-illustration.png`, `cash-illustration-2.png` — copied directly from Figma.

---

## ⚠ Caveats / substitutions
- **Fonts:** SF Pro and Proxima Nova are both licensed. We've linked **Inter Tight / Montserrat** (Google Fonts) as web-safe substitutes with very similar metrics. Ask for TTFs to swap in for production.
- **Logo:** the Figma file stores the WorldWinner wordmark as ~40 overlapping vector rectangles (not real glyphs), so we rebuilt the logo from scratch with the crown + italic caps. **This is an approximation** — please drop in the official logo export.
- **Icons:** the mobile app uses SF Pro glyphs for system icons. We default to Phosphor via CDN for web previews.
