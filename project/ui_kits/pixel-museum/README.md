# Pixel Museum — UI kit

A two-section, desktop-first web app: a white-cube modern museum that frames **pixelated** travel photos.

## Screens
- **Curate** (`index.html`) — upload up to 10 photos; they pixelate on import, then "Ship it" runs a playful crate-and-truck animation before landing in the gallery.
- **Gallery** (`gallery.html`) — a white-cube wall navigated with the arrow keys. `← →` walk the room (a pixel visitor strolls along), `↑` zooms a work, `↓` returns. Frames size to each photo's aspect ratio.

## Source of truth
The working implementation is the project-root Design Component **`Pixel Gallery.dc.html`** (full interaction, upload, pixelation, animation, keyboard nav). `index.html` here is a static, token-driven recreation of the Curate screen for the Design System preview.

## Built from
Components in `components/core/`: `Button`, `SectionToggle`, `ArtFrame`, `Plaque`, `Keycap`. Tokens in `tokens/` via root `styles.css`.
