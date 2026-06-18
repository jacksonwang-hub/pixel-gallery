import React from "react";

export interface PlaqueProps {
  /** Uppercase title, e.g. "PHOTO 01". */
  title: string;
  /** Optional sentence-case caption, e.g. "archival pixel print". */
  caption?: string;
  align?: "center" | "left";
  style?: React.CSSProperties;
}

/**
 * Wall label shown beneath a framed work.
 * @startingPoint section="Core" subtitle="Wall caption / plaque" viewport="280x90"
 */
export function Plaque(props: PlaqueProps): JSX.Element;
