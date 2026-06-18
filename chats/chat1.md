# # Pixelated Photo Gallery Wall

_Started 2026-06-18 16:36 UTC_

---

## User

I am a designer and travel photographer. My goal is to create a fun, pixelated gallery wall of photos that a user can upload and then see on the wall, framed in gold.

I want to build a photo gallery website with frontend only. Output your code in React and Tailwind.

The main thing is that I want this landing page to be split into two sections, and this layout is what I want to brainstorm on.  The user can toggle between the two sections.



First section:
The first section and default landing page is the Curate Photos. The user can upload up to ten images. Once they submit, the uploading process should be fun, as if the photos are being put into crates and shipped off to an art gallery. Once all photos are completed, point to the "Gallery".



Second section:

The second section is a gallery wall which can be navigated using the left and right arrow keys. I want to have a pixelated viewer walking as the user is navigating from left to right, similar to the Google 404 dinosaur.

Users can click the up arrow to zoom in on the image and click down arrow to return to the navigation.

Add visual instructions on how to navigate. At the start of the gallery, add a title "Photos"

## Assistant

I have a clear picture of the functionality. Before I design, a few questions about direction — especially since this pixel-art gallery vision sits quite far from the WorldWinner brand that's bound to this project.

_[tool: questions_v2]_

## User

Questions answered:
- visual_direction: Custom pixel-art aesthetic (8-bit museum vibe, ignore WorldWinner)
- layout_variations: 2 options
- pixel_intensity: 10
- toggle_style: 0
- gallery_setting: Pixel-art museum interior (floor, wall, baseboard, spotlights)
- walker_character: A quirky creature/mascot (dino-style)
- frame_style: Ornate baroque pixel frame
- crate_tone: Very playful — crates, trucks, stamps, progress like a game
- palette: Warm museum (cream walls, deep red, gold)
- device: Desktop only

## Assistant

I have everything I need. Building a custom 8-bit pixel-art gallery as a single Design Component — two persistent toggle layouts (a floating gold pill vs. a museum-banner), full Curate→ship→Gallery flow, a walking pixel dino, and ornate gold frames.

_[tool: update_todos]_

_[tool: dc_write]_

_[tool: show_html]_

_[tool: show_html]_

Curate view looks great. Let me verify the gallery + walker render.

_[tool: multi_screenshot]_

Gallery, walker, spotlights all render well. Let me confirm arrow-key panning actually works with a real pixel capture.

_[tool: save_screenshot]_

Two things look off: the toggle still highlights CURATE while gallery content shows, and the wall isn't panning on ArrowRight. Let me inspect live state.

_[tool: eval_js_user_view]_

My iframe and the user's preview are separate states. Let me drive the user's view to gallery and test nav there where I can inspect it.

_[tool: eval_js_user_view]_

_[tool: eval_js_user_view]_

Everything works — toggle state, keyboard panning, walker, zoom all correct. The earlier confusion was just my iframe vs. the user's preview being separate states. Cleaning up the test capture and handing off.

_[tool: delete_file]_

_[tool: update_todos]_

Built **Pixel Gallery.dc.html** — a full 8-bit pixel-art photo gallery with both layout options for the section toggle.

_[tool: ready_for_verification]_

Streaming artifact — the tray's `<img>` placeholder briefly tries to load the unresolved `{{ img.px }}`. Fixing by not rendering tray placeholders until the real value resolves.

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Same root cause for crate and slide images during placeholder streaming. Fixing all unresolved `<img>` holes at once.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

The literal-`src` fetch fires during the live stream before the logic resolves — `<img src="{{hole}}">` can't avoid it. Fix: build the image elements in `renderVals` so the tag simply doesn't exist until the value resolves.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now swap the three template `<img>` tags for the resolved elements.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Clean load. The design-system warning is expected — you chose a custom pixel-art aesthetic over the WorldWinner brand, so I intentionally didn't load that bundle.

**Pixel Gallery.dc.html** is ready:
- **Curate** (default): upload up to 10 photos (auto-pixelated to chunky 8-bit), then "Ship It" crates them, stamps each "ART", loads them on a pixel truck that drives off, and a "Delivered!" stamp points you to the Gallery.
- **Gallery**: a museum wall with the "PHOTOS" hanging sign at the start, spotlit ornate gold frames, and a walking pixel dino. `←/→` walk, `↑` zooms in, `↓` steps back — with an on-screen key guide.

**Two toggle layouts to brainstorm** (switch via the Tweaks panel → `toggleLayout`): **A** = floating gold pill; **B** = a deep-red museum banner bar. Also tweakable: walker color and instruction visibility.

One note: the on-screen HUD arrows are a visual guide — navigation is keyboard-driven as you specified. Want me to make those clickable too, or lock in one of the two toggle layouts?

## User

Make the character a museum visitor. Female wearing a beret. Her height is halfway from the floor to the bottom of the frame.

## Assistant

Repurposing the walker into a female museum visitor with a beret. Let me rebuild the sprite, its palette, and size her to reach the mid-point between floor and frame.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

Now update the walker container dimensions and floor stance.

_[tool: dc_html_str_replace]_

Let me check how she reads against the wall and frame.

_[tool: show_html]_

My iframe is on Curate. Let me jump to the gallery to see the visitor.

_[tool: save_screenshot]_

She reads clearly as a beret-wearing visitor. But she's a touch tall — her head should land exactly halfway between floor and frame bottom. Let me measure precisely and size her.

_[tool: eval_js_user_view]_

She reads great. Now to honor "halfway from floor to frame bottom" precisely — and keep it correct at any window height — I'll measure the gap at runtime and size her to exactly half of it.

_[tool: dc_js_str_replace]_

I'll key out the gray background and extract the side-view sprite to use as the walker. Let me inspect the image first.

_[tool: image_metadata]_

_[tool: run_script]_

_[tool: view_image]_

Clean cutout, facing right. Now I'll swap the CSS sprite for this image and wire up the runtime sizing. Let me read the current logic to edit precisely.

_[tool: read_file]_

_[tool: read_file]_

She extracted cleanly and faces right. Now I'll replace the CSS sprite with this image, size her to half the floor-to-frame gap at runtime, and give her a marching waddle.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the template walker block and the waddle keyframe, plus dropping the `walkerColor` prop.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_set_props]_

_[tool: save_screenshot]_

My iframe was showing a stale render. Let me reload it and capture fresh.

_[tool: show_html]_

_[tool: save_screenshot]_

The uploaded character now renders with a transparent background, faces right, waddles as she walks, and stands at half the floor-to-frame height. Cleaning up scratch files and finalizing.

_[tool: delete_file]_

Done. The walker is now your uploaded sprite — beret, blonde hair, brown dress — with the gray background keyed out to transparent. She faces her direction of travel, waddles as she walks, and is sized at runtime to exactly half the distance from the floor to the frame bottom (recomputes on window resize). I removed the old color tweak since the character is now a fixed image.

_[tool: ready_for_verification]_

The zoom image has the same streaming-`src` issue. Same fix — build it as an element.

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

_[tool: get_webview_logs]_

_[tool: show_html]_

Page renders correctly. Let me confirm the empty `{}` error isn't a real runtime fault by exercising the gallery + zoom path and trapping any throw.

_[tool: eval_js_user_view]_

No real runtime errors — the full gallery/zoom flow is clean and `character.png` loads. The lone `{}` is the verification harness failing to read the cross-origin Google Fonts stylesheet (a known, benign artifact of loading fonts via `<link>`), not a fault in the design. Re-running so the verifier can proceed.

_[tool: ready_for_verification]_

Let me capture the load-time error at its source by installing an early handler.

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js_user_view]_

My early capture-phase handler caught zero errors across load — the page is genuinely clean. The `{}` is the harness choking on the cross-origin Google Fonts stylesheet (same as the fidelity warning). I'll eliminate it by inlining the `@font-face` rules so there's no cross-origin stylesheet to read. Let me grab the current font URLs.The fetch endpoint is returning cached content, but I have the Press Start 2P URL and know VT323's gstatic path. I'll inline both `@font-face` rules and drop the cross-origin `<link>` (the thing the harness can't read) plus my debug script.

_[tool: dc_html_str_replace]_

_[tool: web_fetch]_

_[tool: web_fetch]_

_[tool: web_fetch]_

_[tool: show_html]_

Both fonts load and render correctly now (VT323 body text is visible), with no cross-origin stylesheet. Let me confirm the load is clean.

_[tool: get_webview_logs]_

The `{}` isn't the font — it persists. It's a `console.error` of a non-serializable object. Let me trap `console.error` itself to see the real message.

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js_user_view]_

Found it — `componentDidUpdate` receives an undefined `prevState` during streaming. Quick guard.

_[tool: dc_js_str_replace]_

Now remove the debug `console.error` trap and re-check.

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Clean — no errors. The `{}` was a real bug (an unguarded `prevState` in `componentDidUpdate`), now fixed.

_[tool: ready_for_verification]_

Clean load. The design-system warning is expected — you chose the custom pixel-art aesthetic over the WorldWinner brand.

Your uploaded character is now the gallery walker: gray background keyed out to transparent, facing her direction of travel, waddling as she walks, and sized at runtime to exactly half the floor-to-frame height. Along the way I also fixed a streaming-time crash (`{}` console error) and swapped the Google Fonts link for inlined `@font-face` rules.

## User

Do not shake the PHOTOS sign. Remove the signage look.

## Assistant

_[tool: dc_html_str_replace]_

Done — removed the hanging-sign treatment (chains, red plaque, gold border) and the sway animation. "PHOTOS" is now just a plain pixel title with its subtitle.

## User

Change the "PHOTOS" text to "PIXEL PIX"

## Assistant

## User

add a toggle style for modern museum with white, black and gray

## Assistant

Let me check the current title and toggle code.

_[tool: grep]_

The "PIXEL PIX" edit didn't land. I'll apply it and add the new layout C. Let me read the toggle markup and the relevant renderVals.

_[tool: read_file]_

_[tool: read_file]_

Applying the title change and adding a third toggle style (modern museum). I'll make the button colors layout-aware.

_[tool: str_replace_edit]_

Now add layout C markup after layout B's `</sc-if>`.

_[tool: dc_html_str_replace]_

Now make button colors layout-aware and expose `layoutC`.

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: save_screenshot]_

Let me preview layout C by temporarily defaulting to it.

_[tool: dc_js_str_replace]_

_[tool: save_screenshot]_

## Assistant

_[tool: show_html]_

Layout C looks clean — white bar, hairline border, black active / gray inactive buttons. Reverting the default back to A.

_[tool: dc_js_str_replace]_

Both changes are in. The "PHOTOS" title now reads **PIXEL PIX**, and there's a third toggle option — **Layout C, modern museum**: a white top bar with a hairline divider, black active button / gray inactive in clean letter-spaced Helvetica. Switch between A/B/C via the `toggleLayout` tweak.

_[tool: ready_for_verification]_

Done. Clean load — the design-system warning is expected since you chose the custom pixel-art aesthetic over WorldWinner.

## User

Change the entire design system to modern museum style. help me brainstorm options.

## Assistant

Big direction change — let me give you a brainstorm board with three distinct "modern museum" systems to react to, rather than rebuilding the whole app blind. I'll keep your current pixel app untouched and put the options in a separate comparison file.

_[tool: update_todos]_

Got it — keep the photos (and the walking viewer) crunchy and pixelated, but swap all the *chrome* — walls, frames, type, toggle — from warm-gold baroque to a modern museum system. Here are three directions to react to.

_[tool: dc_write]_

I left a `[[PHOTO]]` token in three spots — let me drop in the pixel-landscape SVG everywhere.

_[tool: run_script]_

_[tool: show_html]_

Looks great. Let me see the full scenes including the walker and the Noir card.

_[tool: save_screenshot]_

Cleaning up and handing off.

_[tool: delete_file]_

_[tool: update_todos]_

Three modern-museum directions on the board — pixel photos and the walking viewer stay crunchy in all of them; only the chrome changes:

1. **White Cube** — pure white walls, hairline black frames, wide white mats, tight Helvetica. Near-invisible chrome; the pixels do the talking.
2. **Concrete Kunsthalle** — cool concrete walls, charcoal frames with deep museum mats, editorial Newsreader serif, text+underline toggle. Calm and institutional.
3. **Gallery Noir** — black-box walls, white frames that pop, hard spotlights, bold Space Grotesk. Cinematic and graphic.

Each card shows its palette, type specimen, toggle treatment, and a sample framed photo with the pixel walker in the scene.

Which direction (or mix) do you want me to roll out across the actual Curate + Gallery app? A couple things worth deciding when you pick:
- **Frame** — keep the chunky gold baroque frame, or switch to the thin modern frame shown?
- **Crate/ship animation** — restyle it to match (e.g. monochrome crates, clean progress bar)?

_[tool: ready_for_verification]_

Board's ready for you to review (the design-system warning is expected — custom aesthetic by your choice). Tell me which direction to apply, plus your call on the frame and crate-animation questions above.

## User

Proceed 01 White Cube

## Assistant

Applying White Cube across the whole app. Let me read the current file in full so I preserve all the logic and rewrite the chrome.

_[tool: read_file]_

Committing the whole app to White Cube — clean Helvetica, white walls, hairline black frames, concrete floor, monochrome crates. I'll keep all the logic intact, drop the A/B/C toggle layouts (replaced by one white-cube bar), and add a `wallTone` tweak.

_[tool: dc_write]_

Two things: my last edit got interrupted, leaving the app file with no logic class (broken). I'll finish the White Cube app first, then build a separate design system for this style — leaving WorldWinner untouched. Let me read the design-system skill.

_[tool: read_skill_prompt]_

Restoring the app to a working White Cube state first.

_[tool: dc_write]_

_[tool: multi_screenshot]_

Capture via html-to-image looks blank below the bar — let me take a real screenshot.

_[tool: show_html]_

The White Cube app renders correctly — the earlier blank capture was just html-to-image. App is restored and working. Now the design system. Let me set up the folder structure and explore for any logo/assets.

_[tool: update_todos]_

App restored. Now building the design system at the project root (WorldWinner stays a separate bound system — untouched). Starting with tokens and `styles.css`.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the components. Let me build them in `components/core/` — Button, SectionToggle, ArtFrame, Plaque, Dropzone, Keycap.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Good — two app changes. (Multi-select upload already works via the `multiple` input + loop, so I'll confirm that.) The main work is variable frame sizing per image aspect ratio. Let me update the logic and template.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now compute frame dimensions per slide and zoom, and update `measure()` to find frames by attribute.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the template: variable frame dims + `data-frame`, and aspect-correct zoom.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Let me verify with test images of different aspect ratios — landscape, portrait, square.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

The eval ran against a stale render. Let me reload and re-test.

_[tool: show_html]_

_[tool: eval_js]_

Frames now size to aspect ratio: wide → 350×200, tall → 200×350, square → 350×350. Let me capture the gallery and a zoom to confirm visually.

_[tool: save_screenshot]_

Frames size to aspect ratio correctly. But the toggle shows CURATE highlighted while in the gallery — let me check that.

_[tool: eval_js]_

Toggle is correct (transient capture earlier). App changes done: multi-upload works and frames track each image's aspect ratio. Cleaning up and resuming the design system.

_[tool: delete_file]_

I need the design-system namespace for the component cards. Let me check.No `check_design_system` tool here, so I'll make the foundation and component cards self-contained (driven by `styles.css` tokens) for reliable rendering. Setting the project title and writing the foundation specimen cards.

_[tool: set_project_title]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: tool_search_tool_bm25]_

_[tool: tool_search_tool_bm25]_

I'll snip the resolved earlier phases (original pixel-art build, character extraction, brainstorm board iterations) now that those are settled.

_[tool: snip]_

Now the type, spacing/radius/shadow, and motion specimen cards.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now component specimen cards (self-contained, token-driven) and the brand wordmark card.

_[tool: write_file]_

_[tool: write_file]_

Now the UI kit — a faithful recreation of the Curate screen as the product preview.

_[tool: write_file]_

_[tool: write_file]_

Now the root readme and SKILL.md, plus a wordmark/brand card.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Let me spot-check a couple of specimen cards render cleanly.

_[tool: show_html]_

_[tool: show_html]_

Foundation and component cards render. Marking DS tasks complete and verifying the app (the live deliverable the user edits).

_[tool: update_todos]_

_[tool: ready_for_verification]_

App loads clean. The adherence warnings are against the bound **WorldWinner** contract (raw px/hex vs `--ds-*` tokens) — expected, since this is a separate pixel-art system by your choice; my own tokens use the `--pm-*` namespace. No action needed.

Done. Two things shipped:

**App — `Pixel Gallery.dc.html`** (White Cube): frames now size to each photo's aspect ratio (landscape/portrait/square), and multi-select upload works (pick several at once, up to 10). Zoom view matches the photo's ratio too.

**New design system — "Pixel Museum"** (root of project, WorldWinner untouched):
- `styles.css` + `tokens/` (colors, type, spacing) on a `--pm-*` namespace
- `components/core/`: Button, SectionToggle, ArtFrame, Plaque, Keycap (`.jsx` + `.d.ts` + `.prompt.md`)
- Foundation + component specimen cards in `guidelines/` and `components/core/`
- `ui_kits/pixel-museum/` Curate-screen recreation, `readme.md`, `SKILL.md`

**Caveats / your call:**
- Fonts are the system **Helvetica/Arial** stack — no webfont shipped. If you want a specific licensed face, send the files and I'll wire `@font-face`.
- Component specimen cards are **static token-driven HTML** (reliable rendering); the React components are the real bundled API.
- To let teammates use this system: open the **Share menu and set File type → Design System**.

**Want me to add a Gallery-wall screen to the UI kit, and convert the DS `ArtFrame` to size by aspect ratio like the app now does?**

## User

yes

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now the Gallery-wall screen for the UI kit.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: show_html]_

The Gallery-wall screen renders faithfully — white-cube walls, aspect-correct frames, the pixel visitor walking the floor, spotlight, plaques, and the keycap HUD. Both additions are in.

- **`ArtFrame`** now takes an `ar` prop and sizes the frame to a photo's aspect ratio (`size` = the well's longest edge), matching the live app. `.d.ts` and prompt updated.
- **`ui_kits/pixel-museum/gallery.html`** — new Gallery-wall screen added as a product card and a starting point; UI kit README updated.

Reminder: to share the system with your org, open the **Share menu → set File type to Design System**.

## User

"Pixel Pix" is one line, not two lines of text.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: str_replace_edit]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: eval_js]_

"Pixel Pix" now renders on a single line (269px wide, well within the slot) in both the app and the UI kit gallery screen.

## User

Remove the background color from the image. Use the boxes in the loading animation that occurs while photos are loading.

## Assistant

Let me inspect the uploaded image and key out the gray background.

_[tool: image_metadata]_

_[tool: run_script]_

_[tool: view_image]_

Background removed cleanly (`crate-boxes.png`). Now I'll rebuild the shipping animation so photos drop into this box pile, and the loaded pile carts off-screen.

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

Let me test the shipping animation with the box pile.

_[tool: show_html]_

_[tool: save_screenshot]_

The boxes pile now anchors the shipping animation — photos drop down into it, then the loaded pile carts off-screen. Cleaning up and verifying.

_[tool: delete_file]_

_[tool: ready_for_verification]_

Done. The uploaded box pile is now the centerpiece of the shipping animation: its gray background is keyed out to transparent (`crate-boxes.png`), photos drop down into the pile one by one as they're "crated," and the loaded pile carts off-screen before "Delivered." The adherence warnings are the expected WorldWinner-vs-custom-system mismatch — no action needed.

## User

In the gallery UI, move the floor and character 200px higher.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: snip]_

_[tool: show_html]_

_[tool: save_screenshot]_

Done — the gallery floor and the character are both raised 200px (floor surface now sits 304px up, character stands on it, walker-sizing logic updated to match).

One side effect to flag: on the **title slide**, the raised character now overlaps the "Pixel Pix" text (both are screen-centered). On photo slides it reads correctly as the viewer standing in front of the art. Want me to also nudge the title higher so they don't collide, or keep as-is?

_[tool: delete_file]_

The floor and character are moved up 200px as requested. Let me know on the title-overlap question and I'll adjust if you'd like.

## User

zoomed view of the photo should be larger, at least 125% larger than the original view.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: snip]_

_[tool: show_html]_

_[tool: save_screenshot]_

The capture didn't trigger zoom; let me drive it directly and measure the zoom size vs the on-wall frame.

_[tool: eval_js]_

The aspect-ratio approach collapsed the zoom frame. I'll compute explicit zoom dimensions from the viewport instead.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

Zoom is large and aspect-correct now. But the walker appears over the zoom — let me confirm and hide it during zoom.

_[tool: eval_js]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: save_screenshot]_

The zoomed view is now correct — large (scales to ~2.4× the on-wall work on a standard window), aspect-ratio matched, centered, with the plaque below, and the walker is hidden while zoomed. Cleaning up.

_[tool: delete_file]_

_[tool: ready_for_verification]_

Done. The zoomed view is now much larger — it sizes to ~86% of the viewport height (≈2.4× the on-wall work on a normal window, comfortably past the 125%-larger bar), keeps each photo's aspect ratio, and the walking visitor is hidden while zoomed so nothing overlaps the artwork. The adherence warnings are the expected custom-system-vs-WorldWinner mismatch.

