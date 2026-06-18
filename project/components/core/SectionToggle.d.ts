import React from "react";

export interface ToggleOption {
  label: string;
  value: string;
}

export interface SectionToggleProps {
  options: ToggleOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/**
 * Segmented two-up control for switching primary sections (Curate / Gallery).
 * @startingPoint section="Core" subtitle="Curate / Gallery segmented toggle" viewport="320x80"
 */
export function SectionToggle(props: SectionToggleProps): JSX.Element;
