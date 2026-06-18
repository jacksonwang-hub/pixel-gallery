import React from "react";

/**
 * Two-up section toggle (segmented control) used in the top bar.
 * Active segment is black; inactive is white with muted text.
 * Sits inside a 1px bordered container.
 */
export function SectionToggle({ options, value, onChange, style }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        border: "1px solid var(--pm-border)",
        width: "max-content",
        ...style,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange && onChange(opt.value)}
            style={{
              fontFamily: "var(--pm-font-sans)",
              fontSize: 11,
              fontWeight: "var(--pm-weight-medium)",
              letterSpacing: "var(--pm-tracking-label)",
              textTransform: "uppercase",
              padding: "11px 22px",
              border: "none",
              cursor: "pointer",
              transition: "all var(--pm-dur-fast) ease",
              background: active ? "var(--pm-accent)" : "var(--pm-surface)",
              color: active ? "var(--pm-accent-text)" : "var(--pm-text-body)",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
