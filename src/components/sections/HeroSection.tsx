"use client";

import { useRef, useEffect, useState } from "react";
import WarpText from "@/components/ui/WarpText";

function HeroTextFallback() {
  return (
    <div className="w-full flex items-center justify-center lg:justify-start select-none py-1">
      <h1
        className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal text-white text-center lg:text-left leading-none tracking-[-0.03em]"
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
    const mq = window.matchMedia("(max-width: 1023px)");
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
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent text-white px-4 sm:px-6 md:px-12 lg:px-24 py-20"
    >
      {/* ── Background: Luminous Flower (Smaller, One Side Only) ── */}
      <div className="absolute -left-10 sm:-left-6 md:left-[0%] -bottom-10 sm:-bottom-8 md:-bottom-4 w-52 sm:w-64 md:w-[320px] lg:w-[360px] pointer-events-none select-none z-0 mix-blend-screen opacity-70 sm:opacity-80 filter drop-shadow-[0_0_25px_rgba(255,182,193,0.15)]">
        <img
          src="/hero_flower_luminous.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>



      {/* ── Main Hero Content ── */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 sm:gap-10 lg:gap-14 relative z-10 my-auto">
        
        {/* ── Left Column: Clean Typography & Minimal Buttons ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 max-w-xl">
          
          {/* Simple Title */}
          <div className="w-full h-[70px] sm:h-[95px] lg:h-[115px] flex items-center justify-center lg:justify-start">
            {isMobile ? (
              <HeroTextFallback />
            ) : (
              <WarpText
                text="Hii, i'm Aya"
                color="#ffffff"
                warpStrength={0.06}
                warpScale={1.6}
                speed={0.5}
                pointerInfluence={0.4}
                pointerStrength={0.35}
                refraction={0}
                ripple
                fontSize={84}
                fontWeight={800}
                style={{ height: "115px", width: "100%" }}
                fontFamily="'Playfair Display', Georgia, serif"
                letterSpacing={-0.05}
                lineHeight={1.0}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Clean Subtitle & Description — Zero Icons */}
          <div className="flex flex-col gap-2">
            <h2
              className="text-base sm:text-lg md:text-xl font-medium text-white/90 tracking-tight"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Freelance Full-Stack Developer
            </h2>
            <p
              className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Building bespoke portfolios and full-stack MERN web applications with pixel-perfect design and clean code.
            </p>
          </div>

          {/* Minimal Action Buttons — Zero Icons */}
          <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start pt-2">
            <a
              href="#services"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-white/85 transition-all duration-200 min-h-[42px] flex items-center shadow-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Services
            </a>
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20 text-white hover:border-white/50 transition-all duration-200 min-h-[42px] flex items-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200 min-h-[42px] flex items-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact
            </a>
          </div>

        </div>

        {/* ── Right Column: Clean Rectangular Picture Frame ── */}
        <div className="flex-shrink-0 relative select-none">
          {/* Butterfly 2 — top-right tip of the profile card, all screen sizes */}
          <div
            className="absolute -top-10 -right-10 w-20 sm:w-24 md:w-28 pointer-events-none select-none z-20 opacity-95 filter drop-shadow-[0_0_18px_rgba(100,220,255,0.4)] rotate-[8deg]"
          >
            <img
              src="/hero_butterfly_wing.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-48 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 transition-all duration-300 hover:border-white/30">
            <img
              src="/profile.jpg"
              alt="Aya Karou"
              className="w-full h-full object-cover object-top"
            />
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
        <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
