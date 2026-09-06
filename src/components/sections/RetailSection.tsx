"use client";

import React from "react";
import { GithubCalendar } from "@/components/GithubCalendar";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "React",
    category: "Frontend",
    icon: (
      <svg className="w-4 h-4" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Framework",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="black" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M16.5 17.5L8.5 7H7V17H8.5V9.5L16.2 19C16.3 19 16.4 18.9 16.5 17.5Z" fill="white" />
        <path d="M14.5 7H16V14H14.5V7Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: (
      <svg className="w-4 h-4 rounded-xs" viewBox="0 0 128 128">
        <path fill="#3178C6" d="M1.5 1.5h125v125H1.5z" />
        <path fill="#ffffff" d="M72.9 87.8c0 10.7 7.2 16.7 18 16.7 8.3 0 14.5-3.3 17.5-6.8l-5.7-7.7c-2.3 2.5-6.1 4.5-10.7 4.5-5.3 0-8.5-3-8.5-7.7 0-5.3 4.2-7.5 12.1-10.6 11.2-4.4 16.3-9.5 16.3-18.8 0-10.8-7.9-16.7-18.4-16.7-8.1 0-14.3 3.1-17.7 6.9l5.5 7.4c2.5-2.6 6.3-4.4 10.7-4.4 4.5 0 7.7 2.3 7.7 6.4 0 4.3-3.2 6.4-10.6 9.3-10.8 4.2-16.2 9.5-16.2 19.5zM38.8 51.5h14.7v52.4H38.8zm-19.1-11h52.9v11H19.7z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Language",
    icon: (
      <svg className="w-4 h-4 rounded-xs" viewBox="0 0 128 128">
        <path fill="#F7DF1E" d="M1.5 1.5h125v125H1.5z" />
        <path fill="#000000" d="M68.3 84.7c0 12.3 7.8 19.8 19.7 19.8 8.8 0 14.9-3.7 18-7.8l-6.8-9.1c-2.7 3-6.2 5.5-10.5 5.5-4.8 0-7.7-2.6-7.7-7.8V42.7H68.3v42zm-33.1 7.2c2.5 1.6 6.3 3.1 10.8 3.1 5.9 0 9.2-3 9.2-7.3 0-4.6-3.8-6.9-10.3-9.5-9.3-3.6-15.3-8.4-15.3-17.2 0-9.8 7.7-16.6 18.9-16.6 7 0 12.2 2.3 15.3 4.8l-5.6 9.4c-2.6-1.8-6-3.3-9.7-3.3-4.5 0-6.8 2.2-6.8 5.4 0 3.7 3.2 5.5 9.8 8.1 9.9 3.9 15.8 8.6 15.8 17.7 0 10.9-8.3 17.5-21 17.5-8.1 0-14.7-2.7-18.4-5.7l2.7-6.7z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 32 32">
        <path fill="#5FA04E" d="M16 2.5l12.1 7v14l-12.1 7-12.1-7v-14l12.1-7z" />
        <path fill="#ffffff" d="M19.5 14.2c-1.3-.7-3.2-.8-4.5-.2-.7.3-1.2.9-1.2 1.6 0 1.2 1 1.7 2.6 2.1l1.1.3c2.5.7 3.9 1.6 3.9 3.9 0 2.5-1.9 4-4.7 4-2 0-3.9-.7-5.1-1.7l1.3-2.1c1 .8 2.4 1.4 3.8 1.4 1.4 0 2.2-.6 2.2-1.6 0-1.1-1-1.6-2.5-2l-1.1-.3c-2.4-.6-3.8-1.7-3.8-3.9 0-2.3 1.9-3.8 4.4-3.8 1.8 0 3.5.6 4.6 1.4l-1 2z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" />
        <path d="M8 9l8 6M8 15l8-6" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5s-6 5.5-6 11.5c0 4.5 3.5 8 6 9.5 2.5-1.5 6-5 6-9.5 0-6-6-11.5-6-11.5z" fill="#47A248" />
        <path d="M12 22.5c-.3 0-.6-.1-.8-.3-.5-.4-.6-1.1-.3-1.6l.8-1.6v-16l.3-.8c.4 0 .7.3.7.7v18.8c0 .5-.3.8-.7.8z" fill="#3FA037" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#336791" />
        <path d="M15.5 8c-.4-.6-1.2-.9-2-.9h-2c-1.4 0-2.5 1.1-2.5 2.5v3.8c0 .7.6 1.3 1.3 1.3h.6v1.9c0 .3.2.5.5.5h1.3c.3 0 .5-.2.5-.5v-1.9h.6c1.4 0 2.5-1.1 2.5-2.5v-1.9c0-.9-.4-1.7-.8-2.3z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Language",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M11.91 2c-4.42 0-4.14 1.92-4.14 1.92l.01 1.99h4.22v.6H5.89S2 6.07 2 10.51s3.39 4.28 3.39 4.28h2.02v-2.85s-.11-3.39 3.33-3.39h5.73s3.22.06 3.22-3.17c0-3.22-2.8-3.38-4.78-3.38zm-2.3 1.35a.86.86 0 110 1.72.86.86 0 010-1.72z" fill="#387EB8" />
        <path d="M12.09 22c4.42 0 4.14-1.92 4.14-1.92l-.01-1.99h-4.22v-.6h6.11s3.89.44 3.89-4s-3.39-4.28-3.39-4.28h-2.02v2.85s.11 3.39-3.33 3.39H7.53s-3.22-.06-3.22 3.17c0 3.22 2.8 3.38 4.78 3.38zm2.3-1.35a.86.86 0 110-1.72.86.86 0 010 1.72z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    name: "Git",
    category: "Version Control",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M21.6 10.8L13.2 2.4c-.6-.6-1.5-.6-2.1 0L9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.7-.7.7-1.9.7-2.7 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.4.4.5.7.5.9.2 2-.7 2.5-.9.5-2 .2-2.5-.7-.5-.9-.2-2 .7-2.5.3-.2.6-.2.9-.2v-5.4c-.3 0-.6-.1-.9-.2-.9-.5-1.2-1.6-.7-2.5.3-.6.9-.9 1.5-.9l-2.6-2.6-6 6c-.6.6-.6 1.5 0 2.1l8.4 8.4c.6.6 1.5.6 2.1 0l8.4-8.4c.6-.6.6-1.5 0-2.1z" fill="#F05032" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ffffff">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    category: "Motion",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#88CE02" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: "Animation",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0055FF">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: "HTML5 & CSS3",
    category: "Core",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#E34F26" />
        <path d="M12 3.6v16.7l5.9-1.5 1.3-15.2H12z" fill="#EF652A" />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    category: "Architecture",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <circle cx="6" cy="6" r="1" fill="#a78bfa" />
        <circle cx="6" cy="18" r="1" fill="#a78bfa" />
      </svg>
    ),
  },
];

export default function RetailSection() {
  // Duplicated for seamless infinite marquee loop
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section
      id="stack"
      data-chapter="stack"
      className="relative w-full text-white z-50 py-8 md:py-12"
      aria-label="Tech Stack & Activity chapter"
    >
      {/* Decorative sparkles */}
      <div className="absolute right-[8%] top-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[8%] bottom-[2%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* ── Single Line Tech Stack Stream with Language Icons ── */}
      <div className="w-full relative z-10 py-6 overflow-hidden select-none">
        {/* Gradient edge masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex w-max marquee-track hover:pause items-center">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="inline-flex items-center gap-2.5 mx-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:scale-105 group"
            >
              <span className="flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                {tech.icon}
              </span>
              <span
                className="text-xs text-white/90 font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tech.name}
              </span>
              <span
                className="text-[9px] text-white/40 uppercase tracking-wider font-mono hidden sm:inline"
              >
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── GitHub Contributions Calendar (Responsive & Fully Visible on Mobile) ── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-6 md:pt-10">
        <div className="mb-4">
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-1"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Activity
          </span>
          <h3
            className="text-white text-xl md:text-2xl font-normal"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            GitHub Contributions
          </h3>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-6"
          style={{
            background: "#000000",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
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
