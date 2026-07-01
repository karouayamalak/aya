"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "../LightRays";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    titleLine1: "Hi, I'm",
    titleLine2: "Aya Karou",
    subtitle: "Hey, I'm Aya! I'm a 20 year old frontend developer and a 2CP computer science student at ESTIN (École Supérieure en Sciences et Technologies de l'Informatique et du Numérique), hailing from Bouira, Algeria.",
    glowColor: "#7a5c3e"
  },
  {
    titleLine1: "Front-end",
    titleLine2: "Developer",
    subtitle: "My entry into web development in the summer of 2025 changed everything. It ceased being just a hobby and became my daily creative outlet — a lifestyle centered around rapid growth and continuous execution.",
    glowColor: "#7a5c3e"
  },
  {
    titleLine1: "Student",
    titleLine2: "At ESTIN",
    subtitle: "An active technology student learning software engineering, clean code architecture, and algorithm design.",
    glowColor: "#7a5c3e"
  },
  {
    titleLine1: "Baccalaureate",
    titleLine2: "Holder",
    subtitle: "Earned with a stellar 17/20 in Mathematics, fueling logical problem solving and technical implementation.",
    glowColor: "#7a5c3e"
  }
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const activeIndexRef = useRef(0);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleGoToSlide = (i: number) => {
    const st = ScrollTrigger.getById("hero-trigger");
    if (st) {
      const targetScroll = st.start + (i / (slides.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      id: "hero-trigger",
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        const rawIndex = Math.floor(p * slides.length);
        const index = Math.min(Math.max(rawIndex, 0), slides.length - 1);

        if (index !== activeIndexRef.current) {
          activeIndexRef.current = index;
          setActiveIndex(index);
          setIsSliding(true);

          if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
          slideTimeoutRef.current = setTimeout(() => {
            setIsSliding(false);
          }, 1100);
        }
      }
    });

    return () => {
      st.kill();
      if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const prev = activeIndexRef.current - 1;
        if (prev >= 0) handleGoToSlide(prev);
      } else if (e.key === "ArrowRight") {
        const next = activeIndexRef.current + 1;
        if (next < slides.length) handleGoToSlide(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-chapter="hero"
      className="relative w-full h-screen bg-transparent"
      aria-label="Hero — About Aya Karou"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none" style={{ background: "#f4f1ea" }}>

        {/* Solid beige base — guarantees warm background on all slides */}
        <div className="absolute inset-0 bg-[#f4f1ea] z-0" />

        {/* LightRays Background — soft warm glow */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-50">
          <LightRays
            raysOrigin="top-center"
            raysColor="#d2cdbe"
            raysSpeed={1.3}
            lightSpread={0.75}
            rayLength={1.3}
            pulsating={true}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.06}
            distortion={0.04}
          />
        </div>

        {/* Decorative sparkle sketches */}
        <div className="absolute left-[8%] top-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-10 z-[2] select-none">
          <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain" style={{ filter: "invert(0)" }} />
        </div>
        <div className="absolute right-[10%] bottom-[15%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-10 z-[2] select-none">
          <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain" style={{ filter: "invert(0)" }} />
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-6 z-[50] pointer-events-none">
          <span className="text-[#7a5c3e]/60 text-[11px] font-medium tabular-nums" style={{ fontFamily: "var(--font-inter)" }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Slides */}
        <div className={`slides w-full h-full relative ${isSliding ? "is-sliding" : ""}`} style={{ background: "transparent" }}>

          {/* ── Persistent: Lace anchored to top-left corner on every slide ── */}
          <div className="absolute left-0 top-0 pointer-events-none z-[5] select-none">
            <img
              src="/hero_lace.png"
              alt=""
              className="w-40 h-64 md:w-56 md:h-[22rem] lg:w-72 lg:h-[32rem] object-cover object-left-top opacity-40"
            />
          </div>

          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            const isPrev = i === activeIndex - 1;
            const isNext = i === activeIndex + 1;

            return (
              <div
                key={i}
                className={`slide ${isActive ? "is-active" : ""} ${isPrev ? "is-prev" : ""} ${isNext ? "is-next" : ""}`}
              >
                <div className="slide__content h-full flex flex-col justify-center items-center text-center relative">

                  {/* ── Same soft watercolor lily on every slide ── */}
                  <div
                    className={`absolute -right-4 bottom-0 pointer-events-none z-[4] select-none transition-all duration-[1.6s] ease-out ${isActive ? "opacity-25 translate-x-0 translate-y-0" : "opacity-0 translate-x-[40px] translate-y-[20px]"
                      }`}
                  >
                    <img
                      src="/hero_watercolor_lily.png"
                      alt=""
                      className="w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 object-contain"
                      style={{ filter: "saturate(0.8) brightness(1.05)" }}
                    />
                  </div>

                  {/* Text or Picture Card */}
                  {i === 3 ? (
                    <div className="slide__header relative z-10 px-4 flex flex-col items-center justify-center">
                      <div
                        className={`w-[270px] sm:w-[320px] rounded-2xl border border-black/10 p-5 md:p-6 flex flex-col justify-between items-center text-center shadow-[0_8px_40px_rgba(0,0,0,0.08)] relative overflow-visible group hover:border-black/20 transition-all duration-700 transform ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                          }`}
                        style={{ background: "rgba(244, 241, 234, 0.85)", backdropFilter: "blur(12px)" }}
                      >
                        {/* Bow — sitting exactly on top of the card, top-left */}
                        <div
                          className={`absolute -top-[15px] left-[0px] pointer-events-none z-20 select-none transition-all duration-[1.6s] ease-out ${isActive ? "opacity-80 translate-y-0" : "opacity-0 -translate-y-[12px]"
                            }`}
                        >
                          <img src="/hero_bow.png" alt="" className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain" />
                        </div>

                        {/* Warm highlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                        {/* Rectangular picture container */}
                        <div className="w-full aspect-[4/5] bg-black/5 border border-black/8 rounded-xl relative overflow-hidden mb-4 shadow-lg">
                          <img
                            src="/photo_2026-06-12_20-42-13.jpg"
                            alt="Aya Karou"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out hero-card-img"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-[#1a1714] text-base font-semibold tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Aya Karou</h3>
                          <p className="text-[#7a5c3e] text-[11px] mt-1 font-light" style={{ fontFamily: "var(--font-inter)" }}>ESTIN Student &amp; Creative Developer</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="slide__header relative z-10 px-4">
                      <h1 className="slide__title">
                        <span className="title-line">
                          <span>{slide.titleLine1}</span>
                        </span>
                        <span className="title-line mt-1.5">
                          <span style={{ color: slide.glowColor }} className="transition-colors duration-[1.2s]">
                            {slide.titleLine2}
                          </span>
                        </span>
                      </h1>
                      <p className="slide__subtitle">{slide.subtitle}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators — dark tones for beige theme */}
        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 flex gap-2 z-[50]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleGoToSlide(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                ? "w-5 h-1.5 bg-[#7a5c3e]"
                : "w-1.5 h-1.5 bg-black/20 hover:bg-black/45"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <section className="slides-nav hidden md:block">
          <nav className="slides-nav__nav">
            <button
              onClick={() => { const p = activeIndexRef.current - 1; if (p >= 0) handleGoToSlide(p); }}
              disabled={activeIndex === 0}
              className="disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              Prev
            </button>
            <button
              onClick={() => { const n = activeIndexRef.current + 1; if (n < slides.length) handleGoToSlide(n); }}
              disabled={activeIndex === slides.length - 1}
              className="disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              Next
            </button>
          </nav>
        </section>
      </div>
    </section>
  );
}
