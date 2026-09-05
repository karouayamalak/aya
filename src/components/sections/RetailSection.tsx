"use client";

import React from "react";
import { GithubCalendar } from "@/components/GithubCalendar";

const ALL_TECH = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "GSAP", category: "Motion" },
  { name: "Framer Motion", category: "Animation" },
  { name: "REST APIs", category: "Architecture" },
  { name: "HTML5 & CSS3", category: "Core" },
  { name: "Git & GitHub", category: "Tools" },
  { name: "Figma", category: "UI/UX" },
  { name: "Python", category: "Language" },
];

export default function RetailSection() {
  // Duplicated for seamless infinite marquee loop
  const marqueeItems = [...ALL_TECH, ...ALL_TECH];

  return (
    <section
      id="stack"
      data-chapter="stack"
      className="relative w-full text-white z-50 py-12 md:py-16"
      aria-label="Tech Stack & Activity chapter"
    >
      {/* Decorative sparkles */}
      <div className="absolute right-[8%] top-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[8%] bottom-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* ── Section Header ─────────────────────────────────── */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-6 relative z-10">
        <div>
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-1.5 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter V — Tools &amp; Activity
          </span>
          <h2
            className="text-white text-3xl md:text-4xl font-normal leading-tight"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Technologies &amp; Activity
          </h2>
          <p
            className="text-white/50 text-xs sm:text-sm mt-2 max-w-lg font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A streamlined view of my technical toolkit and live open-source engineering contributions.
          </p>
        </div>
      </div>

      {/* ── Single Line Tech Stack Stream (Clean & Lightweight) ── */}
      <div className="w-full relative z-10 py-4 my-2 overflow-hidden select-none">
        {/* Gradient edge masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex w-max marquee-track hover:pause">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="inline-flex items-center gap-2 mx-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span
                className="text-xs text-white/90 font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tech.name}
              </span>
              <span
                className="text-[9px] text-white/40 uppercase tracking-wider font-mono hidden sm:inline"
              >
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── GitHub Contributions Calendar (Responsive & Fully Visible on Mobile) ── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-8 md:pt-12">
        <div className="mb-4">
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-1"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Activity
          </span>
          <h3
            className="text-white text-xl md:text-2xl font-normal"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            GitHub Contributions
          </h3>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-6"
          style={{
            background: "#000000",
            border:     "1px solid rgba(255,255,255,0.08)",
            boxShadow:  "0 8px 30px rgba(0,0,0,0.6)",
          }}
        >
          <GithubCalendar
            username="karouayamalak"
            showTotal={true}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
