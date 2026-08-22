"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLACK = "#000000";
const BEIGE = "#f4f1ea";

// Alternates: black → beige → black → beige …
const SECTION_THEMES: Record<string, { bg: string; dark: boolean }> = {
  hero:       { bg: BLACK, dark: true  },
  services:   { bg: BEIGE, dark: false },
  projects:   { bg: BLACK, dark: true  },
  experience: { bg: BEIGE, dark: false },
  stack:      { bg: BLACK, dark: true  },
  feedback:   { bg: BLACK, dark: true  },
  contact:    { bg: BLACK, dark: true  },
};

let currentChapter = "";

export default function BackgroundController() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    );
    const webglEl = document.querySelector<HTMLElement>("[data-webgl-canvas]");

    if (sections.length === 0) return;

    // Detect which section is currently at center on mount / load
    const updateActiveSection = () => {
      const centerY = window.innerHeight / 2;
      let activeSec = sections[0];

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) {
          activeSec = sec;
          break;
        }
      }

      const chapter = activeSec.dataset.chapter ?? "hero";
      const theme = SECTION_THEMES[chapter] ?? { bg: BLACK, dark: true };
      if (chapter !== currentChapter) {
        currentChapter = chapter;
        applyTheme(theme, webglEl);
      }
    };

    updateActiveSection();

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const chapter = section.dataset.chapter ?? "hero";
      const theme = SECTION_THEMES[chapter] ?? { bg: BLACK, dark: true };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end:   "bottom 45%",
        onEnter: () => {
          if (chapter === currentChapter) return;
          currentChapter = chapter;
          applyTheme(theme, webglEl);
        },
        onEnterBack: () => {
          if (chapter === currentChapter) return;
          currentChapter = chapter;
          applyTheme(theme, webglEl);
        },
      });

      triggers.push(st);
    });

    const onScroll = () => {
      // Safety fallback during rapid scrolling or anchor navigation
      updateActiveSection();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}

function applyTheme(
  theme: { bg: string; dark: boolean },
  webglEl: HTMLElement | null
) {
  document.body.dataset.theme = theme.dark ? "dark" : "beige";

  gsap.to(document.body, {
    backgroundColor: theme.bg,
    duration: 0.6,
    ease: "power1.inOut",
    overwrite: "auto",
  });

  if (webglEl) {
    gsap.to(webglEl, {
      opacity: theme.dark ? 1 : 0,
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  }
}

