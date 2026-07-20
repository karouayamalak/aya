"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    date: "2026",
    title: "Unicare Clinic",
    desc: "A comprehensive healthcare portal facilitating clinic workflow, doctor searches, appointment booking, and patient records.",
    category: "Healthcare Portal",
    stack: ["React", "Next.js", "Tailwind CSS"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://unicare-clinic-2.vercel.app",
  },
  {
    date: "2026",
    title: "Thazdayth",
    desc: "A full-stack platform built with modern web technologies. Features a responsive design, dynamic content, and seamless user experience.",
    category: "Full Stack App",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://thazdayth.vercel.app",
  },
  {
    date: "2026",
    title: "Veto Care",
    desc: "A veterinary care management platform. Streamlines appointment booking, patient records, and communication between vets and pet owners.",
    category: "Healthcare Platform",
    stack: ["React", "Node.js", "Database"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://veto-care-2f5d.vercel.app/",
  },
  {
    date: "2026",
    title: "Rite of Way",
    desc: "A full-stack web application with rich interactive features and a polished UI, handling complex user flows end-to-end.",
    category: "Web Application",
    stack: ["Next.js", "TypeScript", "API"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://rite-of-way-dgzx.vercel.app/",
  },
  {
    date: "2025",
    title: "Duxel",
    desc: "A sleek frontend project showcasing pixel-perfect UI design, smooth animations, and a highly polished visual experience.",
    category: "UI / Design",
    stack: ["React", "CSS", "GSAP"],
    type: "frontend",
    accent: "#ffffff",
    url: "https://duxel-j374.vercel.app",
  },
  {
    date: "2025",
    title: "Focusly",
    desc: "A beautiful productivity-focused frontend app designed to help users manage their focus sessions with an elegant, distraction-free interface.",
    category: "Productivity",
    stack: ["React", "TypeScript", "CSS"],
    type: "frontend",
    accent: "#ffffff",
    url: "https://focusly-mnw4-ten.vercel.app",
  },
];

const TABS = [
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend Only" },
] as const;

type TabId = typeof TABS[number]["id"];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function OnlineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabId>("fullstack");

  const filtered = PROJECTS.filter((p) => p.type === activeTab);

  /* entrance animation */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current?.children[0] || [], { autoAlpha: 0, x: -50 });
      gsap.set(headerRef.current?.children[1] || [], { autoAlpha: 0, x: 50 });
      gsap.set(gridRef.current, { autoAlpha: 0, y: 50 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
        .to(headerRef.current?.children[0] || [], { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" })
        .to(headerRef.current?.children[1] || [], { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(gridRef.current, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.35");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* animate cards when tab changes */
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".project-card"),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", overwrite: "auto" }
    );
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-chapter="projects"
      className="relative w-full min-h-screen py-16 md:py-20 flex flex-col justify-center bg-transparent text-white z-30"
      aria-label="Projects chapter"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-10 z-0"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-5 z-0"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }}
      />

      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[5%] top-[8%] w-44 h-44 md:w-64 md:h-64 pointer-events-none opacity-20 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Second decorative hand-drawn sparkle sketch */}
      <div className="absolute left-[4%] bottom-[8%] w-44 h-44 md:w-64 md:h-64 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>



      <div className="w-full px-6 md:px-24 max-w-7xl mx-auto relative z-10">

        {/* ── Header + tabs ───────────────────────────────── */}
        <div ref={headerRef} className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end gap-3 md:gap-0 md:justify-between">
          <div>
            <span
              className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Chapter II — Engineering
            </span>
            <h2
              className="text-white text-4xl md:text-5xl font-normal leading-[1.05] flex items-center gap-3 flex-wrap"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Projects
              <img src="/cat_sketch.png" alt="" className="w-12 h-12 md:w-16 md:h-16 object-contain inline-block flex-shrink-0 theme-sketch translate-y-[2px]" />
            </h2>
            <p
              className="text-white/50 text-sm max-w-md mt-3 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A selection of engineering work across full-stack applications and high-performance frontend experiences.
            </p>
          </div>

          {/* Tab pills */}
          <div className="inline-flex p-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${activeTab === tab.id
                  ? "bg-white text-black shadow-md"
                  : "text-white/55 hover:text-white"
                  }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="project-card glass-panel hover-shine-wrapper group rounded-2xl p-4 md:p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${project.accent}45`;
                el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px ${project.accent}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: project.accent + "18",
                      color: project.accent,
                      border: `1px solid ${project.accent}30`,
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-white/30 text-[10px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {project.date}
                  </span>
                </div>
                {/* Accent dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: project.accent }}
                />
              </div>

              {/* Title + description */}
              <div>
                <h3
                  className="text-white text-lg font-bold mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-white/55 text-[12px] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {project.desc}
                </p>
              </div>

              {/* Stack tags + live link */}
              <div className="flex items-center justify-between gap-3 mt-auto pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-semibold no-underline flex-shrink-0 transition-all duration-200 hover:gap-2"
                  style={{ color: project.accent, fontFamily: "var(--font-inter)" }}
                >
                  View Live
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
