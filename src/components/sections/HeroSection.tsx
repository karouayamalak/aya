"use client";

import { useRef } from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/particle-typography";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      data-chapter="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-white"
    >
      {/* Centered content block */}
      <div
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative z-10 text-center gap-6 px-4"
        style={{ transform: "translateY(-5vh)" }}
      >
        
        {/* Title / Particle Typography */}
        <div className="w-full h-[220px] sm:h-[280px] md:h-[340px] flex items-center justify-center">
          <CursorDrivenParticleTypography
            text="hello, i'm aya"
            fontSize={90}
            fontFamily="'Playfair Display', Georgia, serif"
            particleSize={1.4}
            particleDensity={4.5}
            dispersionStrength={18}
            returnSpeed={0.08}
            color="#ffffff"
            className="w-full h-full animate-fade-in"
          />
        </div>

        {/* Description & CTAs grouped together */}
        <div className="flex flex-col items-center gap-6 max-w-lg px-4 mt-1">
          <p
            className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            20-year-old junior full-stack developer · 1CS student at ESTIN · Bouira, Algeria
            <br />
            Building bespoke portfolios &amp; full-stack MERN web applications.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Projects
            </a>
            <a
              href="#services"
              className="px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white text-black hover:bg-white/85 transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Services &amp; Freelance
            </a>
          </div>
        </div>

      </div>

      {/* Bottom chapter label */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span
          className="text-white/20 text-[9px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Chapter I — Introduction
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
