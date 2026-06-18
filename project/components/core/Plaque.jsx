import React from "react";

/**
 * Museum wall plaque / caption. Small uppercase title with an optional
 * sentence-case caption beneath. Centered by default.
 */
export function Plaque({ title, caption, align = "center", style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "var(--pm-font-sans)",
          fontSize: "var(--pm-size-micro)",
          fontWeight: "var(--pm-weight-bold)",
          letterSpacing: "var(--pm-tracking-label)",
          textTransform: "uppercase",
          color: "var(--pm-text-strong)",
        }}
      >
        {title}
      </div>
      {caption && (
        <div
          style={{
            fontFamily: "var(--pm-font-sans)",
            fontSize: 12,
            color: "var(--pm-text-muted)",
            marginTop: 3,
            letterSpacing: "0.5px",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
