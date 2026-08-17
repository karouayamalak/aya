"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "hero", label: "Intro", num: "I" },
  { id: "services", label: "Services", num: "II" },
  { id: "projects", label: "Projects", num: "III" },
  { id: "experience", label: "Experience", num: "IV" },
  { id: "stack", label: "Tech Stack", num: "V" },
  { id: "feedback", label: "Feedback", num: "VI" },
  { id: "contact", label: "Contact", num: "VII" },
];

export default function Sidebar() {
  const [activeChapter, setActiveChapter] = useState<string>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Use root-level IntersectionObserver with large threshold blocks
    const sections = document.querySelectorAll("[data-chapter]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.chapter;
            if (id) setActiveChapter(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="hidden md:flex fixed left-0 top-0 h-full z-[100] flex-col justify-between py-10 px-5 pointer-events-none select-none"
      aria-label="Chapter navigation"
      style={{ mixBlendMode: "difference" }}
    >
      {/* Brand mark — top-left */}
      <div className="pointer-events-auto">
        <button
          onClick={() => {
            const lenis = (window as any).lenis;
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col gap-0.5 group cursor-pointer"
          aria-label="Scroll to top"
        >


        </button>
      </div>

      {/* Chapter list */}
      <ul className="flex flex-col gap-0.5 pointer-events-auto" role="list">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <li key={chapter.id}>
              <button
                onClick={() => scrollTo(chapter.id)}
                className={`flex items-center gap-2 group transition-all duration-300 cursor-pointer w-full text-left`}
                aria-label={`Go to ${chapter.label} — Chapter ${chapter.num}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Active indicator dot */}
                <span
                  className={`w-0.5 rounded-full transition-all duration-300 ${isActive ? "h-3 bg-white opacity-100" : "h-1.5 bg-white opacity-0 group-hover:opacity-40"
                    }`}
                />
                <span
                  className={`text-[10px] font-medium tabular-nums transition-all duration-300 leading-relaxed ${isActive
                      ? "text-white opacity-100"
                      : "text-white opacity-25 group-hover:opacity-55"
                    }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {chapter.label}
                </span>
                <span
                  className={`text-[8px] transition-all duration-300 ml-auto ${isActive
                      ? "text-white opacity-45"
                      : "text-white opacity-15 group-hover:opacity-35"
                    }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {chapter.num}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="pointer-events-auto flex flex-col gap-1">

        <a
          href="https://github.com/ayakarou"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[8px] opacity-25 hover:opacity-55 transition-opacity text-left cursor-pointer no-underline"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ayakarou"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[8px] opacity-25 hover:opacity-55 transition-opacity text-left cursor-pointer no-underline"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
