"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import { GithubCalendar } from "@/components/GithubCalendar";
import { ArrowUpRight, Layers, Pencil } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CARDS = [
  {
    title: "Frontend Stack",
    description:
      "HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, React, Next.js, GSAP, and Framer Motion for pixel-perfect user experiences.",
    bgColor: "#1c1712",
    textColor: "#ffffff",
    icon: <ArrowUpRight className="size-6" />,
  },
  {
    title: "Backend & MERN",
    description:
      "Node.js, Express, MongoDB, REST APIs, PostgreSQL, and server-side rendering to power robust application logic.",
    bgColor: "#12161f",
    textColor: "#ffffff",
    icon: <Layers className="size-6" />,
  },
  {
    title: "Creative & Future Focus",
    description:
      "Advanced WebGL shader effects, 3D canvas physics, custom portfolio design systems, and cloud architecture.",
    bgColor: "#16131f",
    textColor: "#ffffff",
    icon: <Pencil className="size-6" />,
  },
];

export default function RetailSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const calendarRef  = useRef<HTMLDivElement>(null);
  const localScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(headRef.current,     { autoAlpha: 0, x: -40 });
      gsap.set(calendarRef.current, { autoAlpha: 0, y:  40 });

      gsap.timeline({
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
        .to(headRef.current,     { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" });

      gsap.timeline({
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
        .to(calendarRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      data-chapter="stack"
      className="relative w-full text-white z-50"
      aria-label="Tech Stack chapter"
    >

      {/* Decorative sparkles */}
      <div className="absolute right-[8%] top-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[8%] bottom-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Section header */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-16 md:pt-20 pb-6 relative z-10">
        <div ref={headRef}>
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-1.5 font-medium"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter V — Ecosystem
          </span>
          <h2
            className="text-white text-3xl md:text-4xl font-normal leading-tight"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Skills &amp; Tech Stack
          </h2>
          <p
            className="text-white/40 text-xs sm:text-sm mt-2 max-w-md font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Frontend precision meets robust backend architecture — interactive split cards &amp; activity below.
          </p>
        </div>
      </div>

      {/* ── Scroll-Split Card Viewport ───────────────────────── */}
      <div className="relative z-10 w-full px-2 sm:px-4 md:px-12 max-w-6xl mx-auto">
        <ScrollSplitCard
          imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop"
          cards={SKILL_CARDS}
        />
      </div>

      {/* ── GitHub Contributions Calendar ───────────────── */}
      <div ref={calendarRef} className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-14 md:py-20">
        <div className="mb-6">
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Activity
          </span>
          <h3
            className="text-white text-2xl md:text-3xl font-normal"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            GitHub Contributions
          </h3>
        </div>

        <div
          className="rounded-2xl p-5 md:p-6 overflow-x-auto"
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
