"use client";

import React from "react";
import { GithubCalendar } from "@/components/GithubCalendar";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    color: "#a78bfa",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5 & CSS3", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "#34d399",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL"],
  },
  {
    label: "Animation",
    color: "#f472b6",
    skills: ["GSAP", "Framer Motion", "ScrollTrigger", "Micro-interactions"],
  },
  {
    label: "Tools & Design",
    color: "#fbbf24",
    skills: ["Git & GitHub", "Figma", "Postman", "Python", "Vercel"],
  },
];

export default function RetailSection() {
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

      {/* ── Skills Category Grid (Clean Tag Badges) ──────────── */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl p-5 border border-white/8 bg-white/[0.025] backdrop-blur-sm hover:border-white/15 transition-all duration-300 flex flex-col"
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

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white/80 bg-white/[0.035] border border-white/[0.08] hover:border-white/25 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: group.color, opacity: 0.8 }}
                    />
                    {skill}
                  </span>
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
