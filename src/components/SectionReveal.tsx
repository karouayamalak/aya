"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

/**
 * Wraps a section with a smooth GSAP clip-path wipe-in + fade
 * as it enters the viewport on scroll.
 */
export default function SectionReveal({ children, className = "", style, delay = 0 }: SectionRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        clipPath: "inset(6% 0% 0% 0%)",
        opacity: 0,
        y: 24,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [delay]);

  return (
    <div ref={wrapRef} className={className} style={{ willChange: "clip-path, opacity, transform", ...style }}>
      {children}
    </div>
  );
}
