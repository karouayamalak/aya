"use client";

import { useRef, useEffect, useState } from "react";
import WarpText from "@/components/ui/WarpText";

function HeroTextFallback() {
  return (
    <div className="w-full flex items-center justify-center select-none" style={{ height: "200px" }}>
      <h1
        className="text-[clamp(2.6rem,12vw,5rem)] font-normal text-white text-center leading-[1.0] tracking-[-0.03em]"
        style={{
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          textShadow: "0 2px 40px rgba(255,255,255,0.08)",
        }}
      >
        Hii, i&apos;m Aya
      </h1>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="hero"
      data-chapter="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-white"
    >
      {/* Centered content block */}
      <div
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative z-10 text-center gap-4 sm:gap-6 px-4"
        style={{ transform: "translateY(-5vh)" }}
      >

        {/* Title — WarpText on desktop, elegant fallback on mobile */}
        <div className="w-full h-[200px] sm:h-[280px] md:h-[340px] flex items-center justify-center">
          {isMobile ? (
            <HeroTextFallback />
          ) : (
            <WarpText
              text="Hii, i'm Aya"
              color="#ffffff"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0}
              ripple
              fontSize={116}
              fontWeight={800}
              style={{ height: "320px" }}
              fontFamily="'Playfair Display', Georgia, serif"
              letterSpacing={-0.06}
              lineHeight={0.9}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Description & CTAs grouped together */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-lg px-4 mt-1">
          <p
            className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            20-year-old junior full-stack developer · 1CS student at ESTIN · Bouira, Algeria
            <br />
            Building bespoke portfolios &amp; full-stack MERN web applications.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="#projects"
              className="px-6 py-3 sm:px-5 sm:py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Projects
            </a>
            <a
              href="#services"
              className="px-6 py-3 sm:px-5 sm:py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white text-black hover:bg-white/85 transition-all duration-300 min-h-[44px] flex items-center"
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

