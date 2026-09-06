"use client";

import React, { useEffect, useRef } from "react";
import { GithubCalendar } from "@/components/GithubCalendar";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    color: "#a78bfa",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "HTML5 & CSS3", level: 97 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    label: "Backend",
    color: "#34d399",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 70 },
    ],
  },
  {
    label: "Animation",
    color: "#f472b6",
    skills: [
      { name: "GSAP", level: 88 },
      { name: "Framer Motion", level: 78 },
    ],
  },
  {
    label: "Tools & Design",
    color: "#fbbf24",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Figma", level: 75 },
      { name: "Python", level: 70 },
    ],
  },
];


export default function RetailSection() {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger-animate the bars in on mount
    const bars = barsRef.current?.querySelectorAll<HTMLDivElement>(".skill-bar-fill");
    if (!bars) return;
    bars.forEach((bar, i) => {
      bar.style.transition = `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`;
      bar.style.width = bar.dataset.level + "%";
    });
  }, []);

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

      {/* ── Skills Proficiency Grid ─────────────────────────────── */}
      <div
        ref={barsRef}
        className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 pb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl p-5 border border-white/8 bg-white/[0.025] backdrop-blur-sm hover:border-white/15 transition-all duration-300"
            >
              {/* Category label */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}80` }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {group.label}
                </span>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className="text-[11px] text-white/80 font-medium"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="text-[10px] text-white/35 font-mono"
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Bar track */}
                    <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        data-level={skill.level}
                        style={{
                          width: "0%",
                          background: `linear-gradient(90deg, ${group.color}99, ${group.color})`,
                          boxShadow: `0 0 6px ${group.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
