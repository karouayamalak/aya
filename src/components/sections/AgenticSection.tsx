"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    period: "Summer 2025 — 2026",
    title: "Frontend Developer",
    body: "Mastered HTML5, CSS3, Tailwind, JavaScript & TypeScript. Shipped multiple interactive, responsive layouts fusing clean styling with GSAP-powered motion. Achieved 100 Lighthouse score across all projects.",
    tags: ["React", "Next.js", "GSAP", "TypeScript"],
    accent: "#ffffff",
    active: false,
  },
  {
    period: "Now — Summer 2026",
    title: "Learning Backend & Automation",
    body: "Currently expanding into backend development and workflow automation. Studying Node.js, databases, REST APIs, and building automated pipelines with n8n. This is my focus this summer.",
    tags: ["Node.js", "PostgreSQL", "n8n", "Python"],
    accent: "#ffffff",
    active: true,
  },
];

const skills = [
  { title: "n8n Automation", body: "Workflow triggers connecting API endpoints and streamlining data pipelines." },
  { title: "Motion Design", body: "GSAP & Motion libraries for micro-interactions, canvas effects, and scroll storytelling." },
  { title: "Modern Styling", body: "Tailwind + CSS custom tokens, responsive systems, and premium dark-mode aesthetics." },
  { title: "Full-Stack Growth", body: "SQL/NoSQL databases, REST APIs, and server-side rendering for production apps." },
];

export default function AgenticSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headRef.current?.children[0] || [], { autoAlpha: 0, x: -50 });
      gsap.set(headRef.current?.children[1] || [], { autoAlpha: 0, x: 50 });
      gsap.set(terminalRef.current, { autoAlpha: 0, y: 50 });
      gsap.set(cardRefs.current, { autoAlpha: 0, y: 50 });
      gsap.set(skillRefs.current, { autoAlpha: 0, y: 30 });
      gsap.set(statsRef.current, { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(headRef.current?.children[0] || [], { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0)
        .to(headRef.current?.children[1] || [], { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.1)
        .to(terminalRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.2)
        .to(cardRefs.current, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.55, ease: "power3.out" }, 0.3)
        .to(skillRefs.current, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power2.out" }, 0.55)
        .to(statsRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.7);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-chapter="experience"
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col justify-center bg-transparent text-white z-40 overflow-hidden"
      aria-label="Experience chapter"
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none z-0 opacity-15"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none z-0 opacity-10"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }}
      />



      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[5%] top-[10%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Second decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[8%] bottom-[8%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Decorative hand-drawn lightbulb sketch */}
      <div className="absolute left-[35%] top-[5%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/lightbulb_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>




      <div className="w-full px-6 md:px-24 max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ────────────────────────────────── */}
        <div ref={headRef} className="mb-12 md:mb-20">
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter III — Milestones
          </span>
          <h2
            className="text-white text-5xl md:text-7xl font-normal leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Experience
          </h2>
          <p
            className="text-white/50 text-sm md:text-base max-w-lg mt-4 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            My learning path — from crafting pixel-perfect frontends to shipping full-stack applications and automation systems.
          </p>
        </div>

        {/* ── Two-column: Timeline + Terminal ──────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start mb-14 md:mb-20">

          {/* Vertical timeline */}
          <div ref={timelineRef} className="relative flex flex-col gap-10 pl-0">

            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="relative"
              >

                {/* Card */}
                <div
                  className="hover-shine-wrapper rounded-2xl p-5 transition-all duration-300 group cursor-default"
                  style={{
                    background: m.active ? `${m.accent}08` : "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: m.active ? `1px solid ${m.accent}40` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: m.active
                      ? `0 4px 32px ${m.accent}20, inset 0 1px 0 ${m.accent}15`
                      : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  {/* NOW LEARNING badge for active entry */}
                  {m.active && (
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${m.accent}20`,
                          color: m.accent,
                          border: `1px solid ${m.accent}40`,
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        <span className="live-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: m.accent }} />
                        Now Learning
                      </span>
                    </div>
                  )}
                  <span
                    className="text-white/35 text-[10px] uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {m.period}
                  </span>
                  <h3
                    className="text-white text-xl md:text-2xl font-semibold mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="text-white/55 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {m.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: m.accent + "18",
                          color: m.accent,
                          border: `1px solid ${m.accent}30`,
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

          {/* Terminal mockup */}
          <div ref={terminalRef} className="flex items-center justify-center lg:justify-start">
            <div
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0d0d0f" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#141416" }}>
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="text-zinc-500 text-[11px] ml-2 font-mono">aya@portfolio ~ projects</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-[12px] leading-6 space-y-2">
                <div>
                  <span className="text-zinc-500">❯ </span>
                  <span className="text-zinc-300">ls ./projects</span>
                </div>
                <div className="pl-4 text-zinc-400 space-y-0.5">
                  <div><span className="text-zinc-500 font-semibold">drwxr</span> Thazdayth</div>
                  <div><span className="text-zinc-500 font-semibold">drwxr</span> veto-care</div>
                  <div><span className="text-zinc-500 font-semibold">drwxr</span> rite of way</div>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-500">❯ </span>
                  <span className="text-zinc-300">npm run build</span>
                </div>
                <div className="pl-4 space-y-0.5">
                  <div className="text-zinc-500">▸ Compiling... ████████░░ 80%</div>
                  <div className="text-emerald-400 font-semibold">✓ Build complete in 2.1s</div>
                  <div className="text-emerald-400">✓ Lighthouse: 100 / 100 / 100 / 100</div>
                  <div className="text-cyan-400">→ deployed to ayakarou.dev</div>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-500">❯ </span>
                  <span className="text-zinc-400 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16">
          {skills.map((s, i) => (
            <div
              key={i}
              ref={(el) => { skillRefs.current[i] = el; }}
              className="rounded-xl p-4 transition-all duration-300 hover:border-white/12 group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg mb-3 flex items-center justify-center text-xs"
                style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff" }}
              >
                {["⚡", "✦", "◈", "∞"][i]}
              </div>
              <h4 className="text-white text-[12px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                {s.title}
              </h4>
              <p className="text-white/45 text-[10px] leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Stats strip ───────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {[
            { val: "1yr+", label: "Coding Experience" },
            { val: "3", label: "Major Projects Shipped" },
            { val: "100", label: "Lighthouse Score" },
            { val: "∞", label: "Drive to Learn" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-white text-3xl md:text-5xl font-bold leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.val}
              </span>
              <span
                className="text-white/35 text-[11px] uppercase tracking-wider"
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
