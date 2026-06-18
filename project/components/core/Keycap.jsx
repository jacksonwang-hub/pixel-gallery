import React from "react";

/**
 * Light keycap chip showing a directional triangle (or text).
 * Used in the navigation HUD and zoom hint.
 */
export function Keycap({ dir, label, size = 32 }) {
  const tri = {
    left:  { borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "9px solid var(--pm-ink-900)" },
    right: { borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid var(--pm-ink-900)" },
    up:    { borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "9px solid var(--pm-ink-900)" },
    down:  { borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "9px solid var(--pm-ink-900)" },
  };
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--pm-ink-300)",
        borderRadius: "var(--pm-radius-sm)",
        fontFamily: "var(--pm-font-sans)",
        fontSize: 11,
        fontWeight: "var(--pm-weight-medium)",
        color: "var(--pm-text-strong)",
      }}
    >
      {dir ? <span style={{ width: 0, height: 0, ...tri[dir] }} /> : label}
    </div>
  );
}
