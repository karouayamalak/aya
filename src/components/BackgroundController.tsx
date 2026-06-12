"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Maps each section `data-chapter` to a background color.
 * Dark sections → black/very-dark   → WebGL starfield VISIBLE
 * Light sections → warm beige        → WebGL starfield HIDDEN
 */
const SECTION_THEMES: Record<string, { bg: string; dark: boolean }> = {
  hero:       { bg: "#000000", dark: true  },
  projects:   { bg: "#0a0a0c", dark: true  },
  experience: { bg: "#08080a", dark: true  },
  stack:      { bg: "#0a0a0c", dark: true  },
  feedback:   { bg: "#f4f1ea", dark: false },
  contact:    { bg: "#000000", dark: true  },
};

export default function BackgroundController() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const webglEl  = document.querySelector<HTMLElement>("[data-webgl-canvas]");

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const chapter = section.dataset.chapter ?? "hero";
      const theme   = SECTION_THEMES[chapter] ?? SECTION_THEMES.hero;

      const st = ScrollTrigger.create({
        trigger: section,
        start:   "top 35%",
        end:     "bottom 35%",
        onEnter:     () => applyTheme(theme, webglEl),
        onEnterBack: () => applyTheme(theme, webglEl),
      });

      triggers.push(st);
    });

    // Apply hero theme immediately on mount
    applyTheme(SECTION_THEMES.hero, webglEl);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}

function applyTheme(
  theme: { bg: string; dark: boolean },
  webglEl: HTMLElement | null
) {
  // Set data-theme so CSS selectors ([data-theme="beige"]) can flip text colors
  document.body.dataset.theme = theme.dark ? "dark" : "beige";

  gsap.to(document.body, {
    backgroundColor: theme.bg,
    duration: 0.6,
    ease: "power2.inOut",
    overwrite: "auto",
  });

  if (webglEl) {
    gsap.to(webglEl, {
      opacity: theme.dark ? 1 : 0,
      duration: 0.55,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }
}
