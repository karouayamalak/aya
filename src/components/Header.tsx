"use client";

import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navColor   = "text-white/60 hover:text-white";
  const logoColor  = "text-white";
  const dotColor   = "text-white/40";
  const bgScrolled = "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? bgScrolled : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-12 h-[52px] max-w-[1680px] mx-auto">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 no-underline group"
          aria-label="Aya Karou — Creative Frontend Developer Portfolio"
        >
          {/* Gold-accented code icon */}
          <div className="relative w-[20px] h-[20px] flex items-center justify-center">
            <svg
              className="w-[18px] h-[18px] flex-shrink-0 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span
              className={`text-[13px] font-semibold tracking-tight ${logoColor}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Aya Karou
            </span>
            <span
              className={`text-[13px] font-normal ${dotColor}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              .dev
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {[
            { id: "services",   label: "Services" },
            { id: "projects",   label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "stack",      label: "Stack" },
            { id: "feedback",   label: "Feedback" },
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`text-[12px] font-medium transition-colors duration-300 cursor-pointer ${navColor}`}
              style={{ fontFamily: "var(--font-inter)" }}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/karouayamalak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 text-white/60 hover:text-white hover:bg-white/8"
          >
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aya-malak-karou-15a527398"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 text-white/60 hover:text-white hover:bg-white/8"
          >
            <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="header-hire-btn text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-sm bg-white text-black hover:bg-white/90"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Hire me
          </button>
          <button
            className={`md:hidden flex items-center justify-center w-11 h-11 -mr-2 transition-colors duration-300 ${logoColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — grid-rows for GPU-composited smooth open/close */}
      <div
        className={`md:hidden backdrop-blur-md border-t transition-[grid-template-rows] duration-300 overflow-hidden grid bg-black/95 border-white/10 ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-1">
            {[
              { id: "services",   label: "Services" },
              { id: "projects",   label: "Projects" },
              { id: "experience", label: "Experience" },
              { id: "stack",      label: "Tech Stack" },
              { id: "feedback",   label: "Feedback" },
              { id: "contact",    label: "Contact" },
            ].map(({ id, label }) => (
              <button
                key={id}
                className="text-base font-semibold text-left border-b py-3 cursor-pointer transition-colors min-h-[44px] text-white border-white/10 hover:text-white/70"
                style={{ fontFamily: "var(--font-inter)" }}
                onClick={() => { setMobileOpen(false); scrollToSection(id); }}
              >
                {label}
              </button>
            ))}
            {/* Social links in mobile menu */}
            <div className="flex items-center gap-4 pt-3 pb-1">
              <a href="https://github.com/karouayamalak" target="_blank" rel="noopener noreferrer" className="text-sm font-medium no-underline transition-colors min-h-[44px] flex items-center text-white/60 hover:text-white" style={{ fontFamily: "var(--font-inter)" }}>GitHub</a>
              <a href="https://www.linkedin.com/in/aya-malak-karou-15a527398" target="_blank" rel="noopener noreferrer" className="text-sm font-medium no-underline transition-colors min-h-[44px] flex items-center text-white/60 hover:text-white" style={{ fontFamily: "var(--font-inter)" }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
