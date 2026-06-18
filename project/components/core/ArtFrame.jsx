import React from "react";

/**
 * The signature artwork frame: a thin black keyline, a wide white mat,
 * and a 1px inner keyline around the image well. Children fill the well
 * (typically a pixelated <img> with imageRendering:"pixelated").
 *
 * `size` is the image well's LONGEST edge. Pass `ar` (width / height) to
 * size the frame to a photo's aspect ratio; omit for a square.
 */
export function ArtFrame({ children, size = 256, ar = 1, mat = 22, style }) {
  const a = ar && ar > 0 ? ar : 1;
  let wellW, wellH;
  if (a >= 1) { wellW = size; wellH = Math.round(size / a); }
  else { wellH = size; wellW = Math.round(size * a); }
  const pad = mat + 3; // mat + keyline, each side
  return (
    <div
      style={{
        position: "relative",
        width: wellW + pad * 2,
        height: wellH + pad * 2,
        background: "var(--pm-surface)",
        padding: 3,
        boxShadow: "var(--pm-frame-rule), var(--pm-shadow-frame)",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", background: "var(--pm-surface)", padding: mat }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            boxShadow: "0 0 0 1px var(--pm-ink-300)",
            background: "var(--pm-surface-fill)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
