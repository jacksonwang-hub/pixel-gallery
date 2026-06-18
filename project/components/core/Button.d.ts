import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  /** primary = black fill; ghost = hairline-bordered light. Default "primary". */
  variant?: "primary" | "ghost";
  /** Default "md". */
  size?: "sm" | "md" | "lg";
  /** Show a trailing solid arrow. Default false. */
  arrow?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Uppercase, letter-spaced action button for the Pixel Museum system.
 * @startingPoint section="Core" subtitle="Black primary + ghost button" viewport="360x120"
 */
export function Button(props: ButtonProps): JSX.Element;
