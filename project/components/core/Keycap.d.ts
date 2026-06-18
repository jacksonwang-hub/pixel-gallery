import React from "react";

export interface KeycapProps {
  /** Render a directional triangle. Omit to show `label` text instead. */
  dir?: "left" | "right" | "up" | "down";
  /** Text shown when `dir` is not set. */
  label?: string;
  /** Square size in px. Default 32. */
  size?: number;
}

/**
 * Hairline keycap chip for the arrow-key navigation HUD.
 * @startingPoint section="Core" subtitle="Arrow keycap chip" viewport="200x80"
 */
export function Keycap(props: KeycapProps): JSX.Element;
