"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  { title: "Design Fidelity",   badge: "01", gradient: "from-amber-400 via-orange-500 to-rose-500",     desc: "Pixel-perfect implementation matching Figma designs 100%." },
  { title: "Performance First", badge: "02", gradient: "from-blue-500 via-indigo-500 to-violet-600",   desc: "Optimized bundles, lazy loading, and 100 Lighthouse score." },
  { title: "Fluid Animation",   badge: "03", gradient: "from-emerald-400 via-teal-500 to-cyan-600",    desc: "Scroll-linked motion and micro-interactions that feel alive." },
  { title: "Clean Code",        badge: "04", gradient: "from-yellow-400 via-amber-500 to-orange-500",  desc: "Strict TypeScript, reusable tokens, documented components." },
  { title: "Accessibility",     badge: "05", gradient: "from-fuchsia-400 via-purple-500 to-indigo-600",desc: "WAI-ARIA compliance, semantic HTML, screen-reader support." },
];

const focusAreas = [
  { title: "UX Engineering",     sub: "Design → Code",  body: "Bridging concepts and robust code systems. Specializing in high-end UI layout engines that scale." },
  { title: "Interactive Motion", sub: "GSAP & WebGL",   body: "Immersive storytelling via GSAP ScrollTriggers, canvas animations, and WebGL shader effects." },
  { title: "App Performance",    sub: "Core Web Vitals", body: "Loading optimizations, SSR caching strategies, runtime frame rates, and memory management." },
  { title: "System Design",      sub: "Design Systems",  body: "Reusable UI component libraries and design tokens that scale gracefully across large teams." },
];

export default function SidekickSection() {
  const sectionRef       = useRef<HTMLDivElement>(null);
  const headRef          = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const featureRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(cardRefs.current, {
        x: 0, y: 0,
        rotation: (i) => (i - 2) * 6,
        scale: 0.82,
        opacity: 0,
      });
      gsap.set(featureRefs.current, { autoAlpha: 0, y: 24 });
      gsap.set(statsRef.current,    { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(headRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0)
        .to(cardRefs.current, { opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }, 0.1)
        .to(cardRefs.current, {
          x: (i) => (i - 2) * 175,
          y: (i) => (i % 2 === 0 ? -14 : 14) * Math.abs(i - 2),
          rotation: (i) => (i - 2) * 10,
          scale: 1,
          stagger: 0.03,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.3")
        .to(featureRefs.current, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.4")
        .to(statsRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-chapter="about"
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col justify-center bg-transparent z-20 overflow-hidden"
      aria-label="About Me chapter"
    >
      {/* Decorative hand-drawn sparkle sketches */}
      <div className="absolute right-[5%] top-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-[0.08] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[3%] bottom-[8%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-[0.06] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>



      {/* Warm beige ambient — soft light blobs for depth on light bg */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(212,160,23,0.12) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(180,140,100,0.1) 0%, transparent 70%)" }}
      />

      <div className="w-full px-6 md:px-24 max-w-7xl mx-auto relative z-10 text-black">

        {/* ── Header ───────────────────────────────────────── */}
        <div ref={headRef} className="mb-12 md:mb-20">
          <span
            className="text-black/35 text-[11px] uppercase tracking-[0.2em] block mb-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter I — Philosophy
          </span>
          <h2
            className="text-black text-5xl md:text-7xl font-normal leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            About Me
          </h2>
          <p
            className="text-black/60 text-sm md:text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            I'm <strong className="font-semibold text-black/90">Aya Karou</strong>, a 20-year-old developer and ESTIN student with a 17/20 Baccalaureate in Mathematics. I build web experiences where engineering precision meets artistic sensibility.
          </p>
        </div>

        {/* ── Fan-out value cards ───────────────────────────── */}
        <div
          ref={cardsContainerRef}
          className="relative h-64 md:h-72 flex items-center justify-center mb-20 md:mb-28"
        >
          <div className="relative w-64 md:w-72 h-40 md:h-48">
            {coreValues.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl flex flex-col p-5 cursor-pointer text-white`}
                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d", willChange: "transform, opacity" }}
              >
                <div className="flex items-start justify-between mb-auto">
                  <span className="text-white/70 text-[9px] font-bold uppercase tracking-widest">{card.badge}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/80" />
                  </div>
                </div>
                <div>
                  <div className="text-white text-lg font-bold leading-tight mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                    {card.title}
                  </div>
                  <div className="text-white/70 text-[10px] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                    {card.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Focus areas grid ──────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-12 md:mb-16">
          {focusAreas.map((area, i) => (
            <div
              key={i}
              ref={(el) => { featureRefs.current[i] = el; }}
              className="flex flex-col gap-3"
            >
              {/* Mini visual placeholder */}
              <div
                className="w-full aspect-video rounded-xl overflow-hidden relative flex items-center justify-center shadow-sm"
                style={{ background: "#ece8df", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ background: `linear-gradient(135deg, hsl(${i * 60 + 200}, 55%, 55%), hsl(${i * 60 + 260}, 65%, 45%))` }}
                />
                <div className="relative z-10 w-[82%] bg-white/90 rounded-lg p-2 shadow-sm" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{ background: `hsl(${i * 60 + 220}, 65%, 55%)` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-black/45 text-[8px] flex-1 truncate font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                      {area.sub}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-black/35 text-[9px] uppercase tracking-wider block mb-0.5 font-bold" style={{ fontFamily: "var(--font-inter)" }}>
                  {area.sub}
                </span>
                <h3 className="text-black text-sm md:text-base font-bold leading-tight mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                  {area.title}
                </h3>
                <p className="text-black/55 text-[11px] leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                  {area.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Profile Card replacing stats strip ─────────────────── */}
        <div
          ref={statsRef}
          className="w-full flex justify-center pt-8 border-t"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="w-full max-w-xl bg-white/40 backdrop-blur-md border border-black/5 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Rectangle profile picture placeholder */}
            <div className="relative w-32 h-40 flex-shrink-0 bg-zinc-200/50 rounded-2xl border border-black/5 shadow-inner group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 via-indigo-50 to-emerald-100 opacity-80 group-hover:scale-105 transition-transform duration-500" />
              {/* Profile icon placeholder inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-black/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            {/* Info details */}
            <div className="flex flex-col text-left justify-center flex-1">
              <span className="text-black/35 text-[9px] uppercase tracking-widest font-bold block mb-1">Developer Profile</span>
              <h3 className="text-black text-xl font-bold mb-2">Aya Karou</h3>
              <p className="text-black/60 text-xs leading-relaxed font-light mb-3">
                ESTIN University student. Fusing mathematical concepts with creative front-end design to build high-performance user interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full font-medium">ESTIN Student</span>
                <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full font-medium">Frontend Developer</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
