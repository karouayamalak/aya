"use client";

import { ReactNode, CSSProperties } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

/**
 * Clean wrapper that keeps sections in normal flow without clip-path gaps or stuck opacity.
 */
export default function SectionReveal({ children, className = "", style }: SectionRevealProps) {
  return (
    <div className={`w-full ${className}`} style={style}>
      {children}
    </div>
  );
}

