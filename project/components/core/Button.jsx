import React from "react";

/**
 * Pixel Museum primary/secondary button.
 * Black fill for primary actions, hairline-bordered ghost otherwise.
 * Uppercase, letter-spaced label; optional trailing arrow.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const pads = { sm: "11px 18px", md: "15px 26px", lg: "16px 28px" };
  const fonts = { sm: 11, md: 12, lg: 12 };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "var(--pm-font-sans)",
    fontSize: fonts[size] || 12,
    fontWeight: "var(--pm-weight-medium)",
    letterSpacing: "var(--pm-tracking-label)",
    textTransform: "uppercase",
    padding: pads[size] || pads.md,
    border: "none",
    borderRadius: "var(--pm-radius-0)",
    cursor: disabled ? "default" : "pointer",
    transition: "all var(--pm-dur-fast) ease",
  };

  const variants = {
    primary: {
      background: disabled ? "var(--pm-surface-fill)" : "var(--pm-accent)",
      color: disabled ? "var(--pm-text-muted)" : "var(--pm-accent-text)",
    },
    ghost: {
      background: "var(--pm-surface)",
      color: "var(--pm-text-strong)",
      boxShadow: "inset 0 0 0 1px var(--pm-border)",
    },
  };

  const v = variants[variant] || variants.primary;
  const arrowColor = variant === "primary" ? "#fff" : "#111";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...v, ...style }}
      {...rest}
    >
      {children}
      {arrow && (
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: `9px solid ${arrowColor}`,
          }}
        />
      )}
    </button>
  );
}
