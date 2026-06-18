import React from "react";

export interface ArtFrameProps {
  /** Image well contents — usually a pixelated <img>. */
  children?: React.ReactNode;
  /** Longest edge of the image well in px. Default 256. */
  size?: number;
  /** Aspect ratio (width / height) of the work. Default 1 (square). */
  ar?: number;
  /** Mat (white border) thickness in px. Default 22. */
  mat?: number;
  style?: React.CSSProperties;
}

/**
 * White-cube picture frame: thin black keyline + wide mat + image well.
 * @startingPoint section="Core" subtitle="Thin black frame with white mat" viewport="360x360"
 */
export function ArtFrame(props: ArtFrameProps): JSX.Element;
