"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    category: "Creative Dev",
    title: "Custom Portfolio Websites",
    desc: "Bespoke, high-converting portfolio websites for developers, designers, and creatives. Crafted with smooth GSAP animations, 3D elements, responsive layouts, and 100 Lighthouse performance.",
    stack: ["Next.js", "React", "GSAP", "Tailwind CSS"],
    accent: "#ffffff",
  },
  {
    category: "Full Stack",
    title: "MERN Web Applications",
    desc: "End-to-end web applications built with MongoDB, Express, React, and Node.js. Scalable database models, secure authentication, robust RESTful APIs, and responsive frontends.",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    accent: "#ffffff",
  },
  {
    category: "UI Engineering",
    title: "Frontend & Creative Dev",
    desc: "Translating design concepts and Figma files into pixel-perfect, accessible, and high-performance interactive interfaces with fluid micro-interactions.",
    stack: ["TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#ffffff",
  },
  {
    category: "Freelance",
    title: "Freelance & Contract Work",
    desc: "Available for freelance projects, MVP development, and contract work worldwide. Direct 1-on-1 communication, fast turnaround, clean code, and transparent delivery.",
    stack: ["Remote", "Fast Delivery", "Clean Code"],
    accent: "#ffffff",
    isAction: true,
  },
];

// Content is visible immediately without requiring scroll reveal animations
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      data-chapter="services"
      className="relative w-full py-16 md:py-20 flex flex-col justify-center bg-transparent text-white z-20"
      aria-label="Services and Freelance chapter"
    >

      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[5%] top-[8%] w-36 h-36 md:w-52 md:h-52 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div ref={headRef} className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span
              className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Chapter II — Services &amp; Freelance
            </span>
            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.05] flex items-center gap-3 flex-wrap"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Services
              <img src="/paper_plane_sketch.png" alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain inline-block flex-shrink-0 theme-sketch translate-y-[1px]" />
            </h2>
            <p
              className="text-white/50 text-xs sm:text-sm max-w-md mt-2.5 leading-relaxed font-light"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              What I build — from custom interactive portfolios to full-stack MERN applications.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            <span className="text-[10px] text-white/70 font-medium tracking-wider uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Available for Hire
            </span>
          </div>
        </div>

        {/* Minimal Cards Grid (matches Projects styling exactly) */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((item) => (
            <div
              key={item.title}
              className="minimal-service-card glass-panel hover-shine-wrapper group rounded-2xl p-4 md:p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 cursor-default"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255, 255, 255, 0.25)";
                el.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white border border-white/20 bg-white/10"
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {item.category}
                </span>

                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1 opacity-40 group-hover:opacity-90 transition-opacity bg-white"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  className="text-white text-base md:text-lg font-bold mb-1.5 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white/55 text-[12px] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Stack / Action footer */}
              <div className="flex items-center justify-between gap-3 mt-auto pt-2.5 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium px-2 py-0.5 rounded-md text-white/70 bg-white/5 border border-white/10"
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.isAction ? (
                  <button
                    onClick={scrollToContact}
                    className="flex items-center gap-1 text-[10px] font-semibold text-white no-underline flex-shrink-0 transition-all duration-200 hover:gap-1.5 cursor-pointer"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Start a Project
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={scrollToContact}
                    className="flex items-center gap-1 text-[10px] font-semibold text-white/70 hover:text-white no-underline flex-shrink-0 transition-all duration-200 cursor-pointer"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Inquire
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
