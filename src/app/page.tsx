"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BackgroundController from "../components/BackgroundController";
import SectionReveal from "../components/SectionReveal";
import HeroSection from "../components/sections/HeroSection";
import OnlineSection from "../components/sections/OnlineSection";
import AgenticSection from "../components/sections/AgenticSection";
import GitHubSection from "../components/sections/GitHubSection";
import RetailSection from "../components/sections/RetailSection";
import CheckoutSection from "../components/sections/CheckoutSection";
import PremiumCTA from "../components/sections/PremiumCTA";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (!loaded) return;

    // ScrollTrigger animation for the green butterfly to fly across the viewport on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 3.5,
      }
    });

    tl.to("#green-butterfly", { left: "85%", top: "35%", rotation: 40, ease: "power1.inOut" })
      .to("#green-butterfly", { left: "10%", top: "60%", rotation: -35, ease: "power1.inOut" })
      .to("#green-butterfly", { left: "90%", top: "25%", rotation: 20, ease: "power1.inOut" })
      .to("#green-butterfly", { left: "12%", top: "70%", rotation: -45, ease: "power1.inOut" })
      .to("#green-butterfly", { left: "80%", top: "45%", rotation: 15, ease: "power1.inOut" })
      .to("#green-butterfly", { left: "15%", top: "80%", rotation: -20, ease: "power1.inOut" });

  }, [loaded]);

  return (
    <>
      <SmoothScrollProvider>
        {/*
         * DOCUMENT FLOW ARCHITECTURE
         * ─────────────────────────────────────────────────────────────────
         * Each section is a standard block in normal document flow.
         * Background color transitions are managed by BackgroundController
         * (GSAP ScrollTrigger watching data-chapter on each section).
         * The WebGL starfield fades out when entering light/beige sections.
         *
         * z-index ladder:
         *   WebGL canvas z-0, sections z-10+, Header/Sidebar z-50+
         */}
        <div
          className="relative min-h-screen text-white font-sans overflow-x-hidden"
          style={{ WebkitFontSmoothing: "antialiased" }}
        >

          {/* Background color + WebGL opacity controller */}
          <BackgroundController />

          {/* ── Sticky Green Butterfly Flying Down the Page ── */}
          {loaded && (
            <div
              id="green-butterfly"
              className="fixed pointer-events-none z-[99] w-16 md:w-24 aspect-[0.56] select-none animate-flap transition-opacity duration-300"
              style={{
                top: "15%",
                left: "10%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src="/user_sketch_1.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Persistent chrome */}
          <Header />
          <Sidebar />

          {/* Scroll story — all sections in document flow */}
          <main className="relative w-full flex flex-col">

            {/* ── Hero (pinned slider) — no reveal wrapper, it's already animated ── */}
            <div className="relative" style={{ zIndex: 10 }}>
              <HeroSection />
            </div>

            {/* ── Ch. II  Projects ──────────────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 20 }}>
              <OnlineSection />
            </SectionReveal>

            {/* ── Ch. III  Experience ───────────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 30 }}>
              <AgenticSection />
            </SectionReveal>

            {/* ── Ch. III.V  GitHub Activity ────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 35 }}>
              <GitHubSection />
            </SectionReveal>

            {/* ── Ch. IV  Tech Stack ────────────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 40 }}>
              <RetailSection />
            </SectionReveal>

            {/* ── Ch. V  Feedback ───────────────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 50 }}>
              <CheckoutSection />
            </SectionReveal>

            {/* ── Ch. VI  Contact + Footer ──────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 60 }}>
              <PremiumCTA />
            </SectionReveal>

          </main>
        </div>
      </SmoothScrollProvider>
    </>
  );
}
