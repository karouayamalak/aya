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
    glowColor: "#ffffff",
    image: "/butterfly_sketch.png"
  },
  {
    titleLine1: "Front-end",
    titleLine2: "Developer",
    subtitle: "My entry into web development in the summer of 2025 changed everything. It ceased being just a hobby and became my daily creative outlet — a lifestyle centered around rapid growth and continuous execution.",
    glowColor: "#ffffff",
    image: "/butterfly_sketch.png"
  },
  {
    titleLine1: "Student",
    titleLine2: "At ESTIN",
    subtitle: "An active technology student learning software engineering, clean code architecture, and algorithm design.",
    glowColor: "#ffffff",
    image: "/butterfly_sketch.png"
  },
  {
    titleLine1: "Baccalaureate",
    titleLine2: "Holder",
    subtitle: "Earned with a stellar 17/20 in Mathematics, fueling logical problem solving and technical implementation.",
    glowColor: "#ffffff",
    image: "/butterfly_sketch.png"
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
      className="relative w-full h-screen bg-black"
      aria-label="Hero — About Aya Karou"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black select-none">

        {/* LightRays Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff" // Clean white rays
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

        {/* Decorative hand-drawn sparkle sketch */}
        <div className="absolute left-[8%] top-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-10 select-none">
          <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
        </div>

        {/* Second decorative hand-drawn sparkle sketch */}
        <div className="absolute right-[10%] bottom-[15%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-10 select-none">
          <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
        </div>

        {/* Decorative user sketch 2 (keep original colors) */}
        <div className="absolute left-[3%] bottom-[8%] w-24 h-24 md:w-36 md:h-36 pointer-events-none opacity-100 z-10 select-none">
          <img src="/user_sketch_2.png" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Slide counter */}
        <div className="absolute top-6 right-6 z-[50] pointer-events-none">
          <span className="text-white/40 text-[11px] font-medium tabular-nums" style={{ fontFamily: "var(--font-inter)" }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Slides */}
        <div className={`slides w-full h-full relative ${isSliding ? "is-sliding" : ""}`} style={{ background: "transparent" }}>
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

                  {/* Left Sketch: Moth */}
                  <div
                    className="absolute left-[2%] lg:left-[8%] bottom-[12%] lg:bottom-auto lg:top-[26%] w-28 h-28 md:w-44 md:h-44 lg:w-56 lg:h-56 pointer-events-none opacity-20 lg:opacity-25 z-0 select-none transition-all lg:-translate-x-[30px] lg:translate-y-[100px]"
                  >
                    <img src="/moth_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
                  </div>

                  {/* Right Sketch: Butterfly */}
                  {slide.image && (
                    <div
                      className="absolute right-[4%] top-[10%] bottom-auto left-auto lg:right-[8%] lg:top-[26%] lg:bottom-auto lg:left-auto w-28 h-28 md:w-44 md:h-44 lg:w-56 lg:h-56 pointer-events-none opacity-20 lg:opacity-25 z-0 select-none transition-all lg:translate-x-[100px]"
                    >
                      <img src={slide.image} alt="" className="w-full h-full object-contain theme-sketch" />
                    </div>
                  )}

                  {/* Text or Picture Card */}
                  {i === 3 ? (
                    <div className="slide__header relative z-10 px-4 flex flex-col items-center justify-center">
                      <div
                        className={`w-[270px] sm:w-[320px] rounded-2xl bg-zinc-900/60 border border-white/10 p-5 md:p-6 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-700 transform ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                          }`}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                        {/* Rectangular picture container */}
                        <div className="w-full aspect-[4/5] bg-zinc-950 border border-white/5 rounded-xl relative overflow-hidden mb-4 shadow-2xl">
                          <img
                            src="/photo_2026-06-12_20-42-13.jpg"
                            alt="Aya Karou"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out hero-card-img"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-white text-base font-semibold tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>Aya Karou</h3>
                          <p className="text-white/50 text-[11px] mt-1 font-light" style={{ fontFamily: "var(--font-inter)" }}>ESTIN Student &amp; Creative Developer</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="slide__header relative z-10 px-4">
                      <h1 className="slide__title">
                        <span className="title-line">
                          <span className="text-white">{slide.titleLine1}</span>
                        </span>
                        <span className="title-line mt-1.5">
                          <span style={{ color: slide.glowColor }} className="transition-colors duration-[1.2s]">
                            {slide.titleLine2}
                          </span>
                        </span>
                      </h1>
                      <p className="slide__subtitle" style={{ color: "rgba(255, 255, 255, 0.8)" }}>{slide.subtitle}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 flex gap-2 z-[50]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleGoToSlide(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                ? "w-5 h-1.5 bg-white" // White active dot
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/45" // White translucent inactive dots
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
