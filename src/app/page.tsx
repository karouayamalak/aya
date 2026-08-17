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
import ServicesSection from "../components/sections/ServicesSection";
import OnlineSection from "../components/sections/OnlineSection";
import AgenticSection from "../components/sections/AgenticSection";
import RetailSection from "../components/sections/RetailSection";
import CheckoutSection from "../components/sections/CheckoutSection";
import PremiumCTA from "../components/sections/PremiumCTA";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (!loaded) return;

    // ScrollTrigger animation for the butterfly to fly across the viewport on scroll and land directly on the bottom-left flower
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    tl.to("#green-butterfly", { left: "82%", top: "25%", rotation: 25, ease: "sine.inOut" })
      .to("#green-butterfly", { left: "15%", top: "40%", rotation: -25, ease: "sine.inOut" })
      .to("#green-butterfly", { left: "84%", top: "55%", rotation: 28, ease: "sine.inOut" })
      .to("#green-butterfly", { left: "18%", top: "68%", rotation: -30, ease: "sine.inOut" })
      .to("#green-butterfly", { left: "68%", top: "80%", rotation: 20, ease: "sine.inOut" })
      .to("#green-butterfly", {
        left: "5%",
        top: "92%",
        rotation: -15,
        scale: 0.85,
        ease: "power2.out",
      });

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
          className="relative min-h-screen text-white font-sans overflow-x-clip"
          style={{ WebkitFontSmoothing: "antialiased" }}
        >

          {/* Background color + WebGL opacity controller */}
          <BackgroundController />

          {/* ── Sticky Green Butterfly Flying Down the Page ── */}
          {loaded && (
            <div
              id="green-butterfly"
              className="fixed pointer-events-none z-[9999] w-12 sm:w-16 md:w-20 aspect-[0.56] select-none"
              style={{
                top: "15%",
                left: "10%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full h-full animate-flap">
                <img
                  src="/user_sketch_1.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Persistent chrome */}
          <Header />
          <Sidebar />

          {/* Scroll story — all sections in document flow */}
          <main className="relative w-full flex flex-col">

            {/* ── Ch. I   Hero ─────────────────────────────────────────────── */}
            <div className="relative" style={{ zIndex: 10 }}>
              <HeroSection />
            </div>

            {/* ── Ch. II  Services & Freelance ────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 20 }}>
              <ServicesSection />
            </SectionReveal>

            {/* ── Ch. III Projects ─────────────────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 30 }}>
              <OnlineSection />
            </SectionReveal>

            {/* ── Ch. IV  Experience & Milestones ─────────────────────────── */}
            <div className="relative" style={{ zIndex: 40 }}>
              <AgenticSection />
            </div>

            {/* ── Ch. V   Tech Stack & Contributions ───────────────────────── */}
            <div className="relative" style={{ zIndex: 50 }}>
              <RetailSection />
            </div>

            {/* ── Ch. VI  Feedback & Recommendations ───────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 60 }}>
              <CheckoutSection />
            </SectionReveal>

            {/* ── Ch. VII Contact + Footer ───────────────────────────────── */}
            <SectionReveal className="relative" style={{ zIndex: 70 }}>
              <PremiumCTA />
            </SectionReveal>

          </main>
        </div>
      </SmoothScrollProvider>
    </>
  );
}
