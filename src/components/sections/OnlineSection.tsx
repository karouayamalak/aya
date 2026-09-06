"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    date: "2026",
    title: "Morning Crumbs",
    desc: "An artisanal buns & coffee bakery platform featuring interactive ordering, full menu exploration, real-time order tracking, and custom branded aesthetics.",
    category: "Bakery & Cafe",
    stack: ["React", "Redux", "Node.js", "Express", "Tailwind CSS"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://morning-crumbs-redux.vercel.app",
    image: "/projects/morning-crumbs.webp",
  },
  {
    date: "2026",
    title: "Coffee Boost",
    desc: "A modern artisanal coffee roastery & cafe platform featuring interactive specialty brew menus, savory breakfast treats, and seamless online ordering.",
    category: "Coffee Roastery & Cafe",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://coffee-boost.vercel.app",
    image: "/projects/coffee-boost.webp",
  },
  {
    date: "2026",
    title: "Unicare Clinic",
    desc: "A comprehensive healthcare portal facilitating clinic workflow, doctor searches, appointment booking, and patient records.",
    category: "Healthcare Portal",
    stack: ["React", "Next.js", "Tailwind CSS"],
    type: "fullstack",
    accent: "#ffffff",
    url: "https://unicare-clinic-2.vercel.app",
    image: "/projects/unicare-clinic.webp",
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
    image: "/projects/thazdayth.webp",
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
    image: "/projects/veto-care.webp",
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
    image: "/projects/rite-of-way.webp",
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
    image: "/projects/duxel.webp",
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
    image: "/projects/focusly.webp",
  },
  {
    date: "2026",
    title: "Bylka Bio",
    desc: "A bespoke client freelance web platform featuring interactive storytelling, rich animations, and an organic product ecosystem.",
    category: "Freelance Project",
    stack: ["React", "Node.js", "GSAP", "Tailwind CSS"],
    type: "freelance",
    accent: "#ffffff",
    url: "https://bylka-bio-dz.vercel.app",
    image: "/projects/bylka-bio.webp",
  },
];

const TABS = [
  { id: "all", label: "All Products" },
  { id: "fullstack", label: "Full Stack" },
  { id: "freelance", label: "Freelance" },
  { id: "frontend", label: "Frontend Only" },
] as const;

type TabId = typeof TABS[number]["id"];

function formatDomain(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return rawUrl;
  }
}

/* ─── Live Window Preview Component ─────────────────────────────────────── */
function LiveProjectWindow({ project }: { project: typeof PROJECTS[number] }) {
  const [imgError, setImgError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(project.image || `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url)}?w=800`);
  const domain = formatDomain(project.url);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group/window transition-all duration-300 hover:border-white/30"
      aria-label={`Open ${project.title} live website`}
    >
      {/* Browser Top Window Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/90 border-b border-white/[0.08] select-none">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 group-hover/window:opacity-100 opacity-70 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 group-hover/window:opacity-100 opacity-70 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 group-hover/window:opacity-100 opacity-70 transition-opacity" />
        </div>

        {/* URL Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/40 border border-white/[0.06] text-[10px] text-white/50 max-w-[200px] sm:max-w-[240px] truncate">
          <svg className="w-2.5 h-2.5 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="truncate" style={{ fontFamily: "var(--font-inter)" }}>{domain}</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-white/40 uppercase font-medium hidden sm:inline" style={{ fontFamily: "var(--font-inter)" }}>Live</span>
        </div>
      </div>

      {/* Website Screenshot / Live Viewport */}
      <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden flex items-center justify-center">
        {/* Screenshot image */}
        {!imgError ? (
          <img
            src={currentSrc}
            alt={`${project.title} landing page preview`}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            onError={() => {
              if (currentSrc === project.image) {
                // Fallback to mshots if local image fails
                setCurrentSrc(`https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url)}?w=800`);
              } else {
                setImgError(true);
              }
            }}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/window:scale-[1.03]"
          />
        ) : (
          /* Fallback UI if screenshot endpoint is unreachable */
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
              🌐
            </div>
            <p className="text-xs text-white/70 font-semibold">{project.title}</p>
            <span className="text-[10px] text-white/40">{domain}</span>
          </div>
        )}

        {/* Hover Overlay with Explore Action */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/window:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span
            className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wide shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover/window:translate-y-0 transition-transform duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Visit Website
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function OnlineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter((p) => p.type === activeTab);

  /* animate cards smoothly when tab changes */
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".project-card"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
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
      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[5%] top-[8%] w-44 h-44 md:w-64 md:h-64 pointer-events-none opacity-20 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Second decorative hand-drawn sparkle sketch */}
      <div className="absolute left-[4%] bottom-[8%] w-44 h-44 md:w-64 md:h-64 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">

        {/* ── Header + tabs ───────────────────────────────── */}
        <div ref={headerRef} className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end gap-4 md:gap-0 md:justify-between">
          <div>
            <span
              className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-2 font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Chapter III — Engineering
            </span>
            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.05] flex items-center gap-3 flex-wrap"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Projects
              <img src="/cat_sketch.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain inline-block flex-shrink-0 theme-sketch translate-y-[2px]" />
            </h2>
            <p
              className="text-white/50 text-xs sm:text-sm max-w-md mt-2.5 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A selection of engineering work across full-stack applications and bespoke freelance experiences.
            </p>
          </div>

          {/* Tab pills */}
          <div className="inline-flex p-1 rounded-full self-start md:self-auto" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 cursor-pointer ${activeTab === tab.id
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

        {/* Project Cards Grid with Live Window Mockup */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-5 md:gap-6">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="project-card glass-panel hover-shine-wrapper group rounded-2xl p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.boxShadow = "0 16px 45px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Top Row: Category + Date */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-white/40 text-[10px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {project.date}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
              </div>

              {/* Live Browser Window Preview */}
              <LiveProjectWindow project={project} />

              {/* Title + description */}
              <div>
                <h3
                  className="text-white text-lg font-bold mb-1.5 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-white/60 text-[12px] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {project.desc}
                </p>
              </div>

              {/* Stack tags + live link */}
              <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-white/[0.08]">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.65)",
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  View Live
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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
