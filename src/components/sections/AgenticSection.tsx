"use client";

import { useRef } from "react";
import { StickyScrollCards, type StickyScrollCardItem } from "@/components/ui/sticky-scroll-cards";

/* ── Timeline milestones ─────────────────────────────── */
const milestones = [
  {
    period: "Summer 2025 — 2026",
    title: "Frontend Developer",
    body: "Mastered HTML5, CSS3, Tailwind, JavaScript & TypeScript. Shipped multiple interactive, responsive layouts fusing clean styling with GSAP-powered motion. Achieved 100 Lighthouse score across all projects.",
    tags: ["React", "Next.js", "GSAP", "TypeScript"],
    accent: "#18181b",
    active: false,
  },
  {
    period: "Now — Summer 2026",
    title: "Learning Backend",
    body: "Currently expanding into backend development. Studying Node.js, databases, REST APIs and server-side rendering to ship complete full-stack products independently.",
    tags: ["Node.js", "PostgreSQL", "REST API", "Python"],
    accent: "#18181b",
    active: true,
  },
];

/* ── Skills grid ─────────────────────────────────────── */
const skills = [
  { title: "Full-Stack Growth", body: "SQL/NoSQL databases, REST APIs, and server-side rendering for production apps." },
  { title: "Motion Design", body: "GSAP & Framer Motion for micro-interactions, canvas effects, and scroll storytelling." },
  { title: "Modern Styling", body: "Tailwind + CSS custom tokens, responsive systems, and premium dark-mode aesthetics." },
  { title: "Clean Architecture", body: "Component-driven design, reusable patterns, and maintainable code at scale." },
];

const combinedCards: StickyScrollCardItem[] = [
  {
    title: "",
    src: "",
  },
  {
    title: "",
    src: "",
  },
  {
    title: "",
    src: "",
  },
  {
    title: "",
    src: "",
  },
];

export default function AgenticSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-chapter="experience"
      className="relative w-full py-14 md:py-18 flex flex-col justify-center bg-transparent text-white z-40"
      aria-label="Experience chapter"
    >
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ──────────────────────────────── */}
        <div ref={headRef} className="mb-6 md:mb-8">
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-2 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter IV — Milestones
          </span>
          <h2
            className="text-white text-3xl md:text-4xl font-normal leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Experience
          </h2>
          <p
            className="text-white/50 text-xs md:text-sm max-w-lg mt-2 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            My learning path — from crafting frontends to shipping full-stack products.
          </p>
        </div>

        {/* ── Timeline ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
            >
              <div
                className="rounded-2xl p-4 sm:p-5 transition-all duration-300 glass-panel hover-shine-wrapper group"
                style={{
                  background: m.active ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                  border: m.active
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {m.active && (
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      <span className="live-dot w-1.5 h-1.5 rounded-full inline-block bg-emerald-400 animate-pulse" />
                      Now Learning
                    </span>
                  </div>
                )}
                <span
                  className="text-white/40 text-[10px] uppercase tracking-widest block mb-2 font-medium"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {m.period}
                </span>
                <h3
                  className="text-white text-base md:text-lg font-semibold mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-white/60 text-xs leading-relaxed mb-3 font-light"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {m.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md text-white/80 bg-white/5 border border-white/10"
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Skills grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {skills.map((s, i) => (
            <div
              key={i}
              ref={(el) => { skillRefs.current[i] = el; }}
              className="rounded-xl p-4 transition-all duration-300 glass-panel hover:border-white/20"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h4 className="text-white text-[12px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                {s.title}
              </h4>
              <p className="text-white/50 text-[10px] leading-relaxed font-light" style={{ fontFamily: "var(--font-inter)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ═══ Certificates & Internships — StickyScrollCards ════ */}
      <div className="w-full">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              Certificates &amp; Internships
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <p className="text-white/40 text-[10px] mt-1 italic font-light" style={{ fontFamily: "var(--font-inter)" }}>
            Credentials, certificates &amp; internship milestones.
          </p>
        </div>
        <StickyScrollCards
          cards={combinedCards}
          hint="scroll to see certificates"
        />
      </div>

      {/* ── Stats strip ────────────────────────────────────── */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 pt-10">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10"
        >
          {[
            { val: "1yr+", label: "Coding Experience" },
            { val: "4", label: "Projects Shipped" },
            { val: "100", label: "Lighthouse Score" },
            { val: "∞", label: "Drive to Learn" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-white text-3xl md:text-4xl font-bold leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.val}
              </span>
              <span
                className="text-white/40 text-[11px] uppercase tracking-wider font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
