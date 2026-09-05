"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function PremiumCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // Content is immediately visible without scroll reveal delay


    // Magnetic button effects
    const buttons = document.querySelectorAll(".magnetic-btn");
    const handleMouseMove = (e: MouseEvent, btn: HTMLElement) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (btn: HTMLElement) => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    buttons.forEach((button) => {
      const btn = button as HTMLElement;
      btn.addEventListener("mousemove", (e) => handleMouseMove(e, btn));
      btn.addEventListener("mouseleave", () => handleMouseLeave(btn));
    });

    return () => {
      buttons.forEach((button) => {
        const btn = button as HTMLElement;
        btn.removeEventListener("mousemove", (e) => handleMouseMove(e, btn));
        btn.removeEventListener("mouseleave", () => handleMouseLeave(btn));
      });
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setContactSubmitting(true);
    setContactError("");
    setContactSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to send message.");
      }

      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (err: any) {
      setContactError(err.message || "Something went wrong. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="contact"
      data-chapter="contact"
      className="relative w-full min-h-screen py-16 md:py-20 flex flex-col justify-center bg-transparent text-white z-[70]"
    >
      {/* Atmospheric backdrop glow — subtle neutral */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none rounded-full filter blur-[100px] z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Decorative hand-drawn lightbulb sketch */}
      <div className="absolute left-[3%] bottom-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-0 select-none">
        <img src="/lightbulb_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Decorative hand-drawn paperplane sketch */}
      <div className="absolute right-[3%] top-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-0 select-none translate-y-[100px]">
        <img src="/paper_plane_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute left-[40%] top-[8%] w-20 h-20 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Second decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[10%] bottom-[8%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      <div
        ref={contentWrapperRef}
        className="w-full px-6 md:px-24 max-w-7xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        <span
          className="text-white/40 text-xs uppercase tracking-widest block mb-2 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Chapter VII — Connections
        </span>
        <h2
          ref={titleRef}
          className="text-white text-4xl md:text-6xl font-normal leading-[1.05] tracking-tight mb-4 max-w-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Let&apos;s Build Something <span className="italic font-normal">Meaningful</span>
        </h2>
        <p
          className="text-white/60 text-xs md:text-sm max-w-xl mb-6 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          I&apos;m always open to new opportunities, freelance projects, and full-stack collaborations. Whether you need a bespoke portfolio, a MERN app, or want to discuss an idea — my inbox is open.
        </p>

        {/* Buttons */}
        <div
          ref={btnGroupRef}
          className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center"
        >
          <a
            href="mailto:a_karou@estin.dz"
            className="magnetic-btn inline-flex items-center gap-2 bg-white hover:bg-white/90 text-black font-semibold text-xs px-6 py-3 rounded-full transition-colors duration-200 no-underline shadow-[0_10px_20px_rgba(255,255,255,0.1)] min-h-[44px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Email Me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/20 font-semibold text-xs px-6 py-3 rounded-full transition-colors duration-200 no-underline min-h-[44px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            View Resume
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Glassmorphic Contact Form */}
        <form ref={formRef} onSubmit={handleContactSubmit} className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-5 select-text text-left space-y-3 mb-12">
          <div>
            <label className="text-white/40 text-[9px] uppercase tracking-wider block mb-1">Your Name</label>
            <input
              type="text"
              required
              disabled={contactSubmitting}
              placeholder="e.g. Alex"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors disabled:opacity-50 min-h-[44px]"
            />
          </div>
          <div>
            <label className="text-white/40 text-[9px] uppercase tracking-wider block mb-1">Your Email</label>
            <input
              type="email"
              required
              disabled={contactSubmitting}
              placeholder="e.g. alex@domain.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors disabled:opacity-50 min-h-[44px]"
            />
          </div>
          <div>
            <label className="text-white/40 text-[9px] uppercase tracking-wider block mb-1">Message</label>
            <textarea
              required
              rows={3}
              disabled={contactSubmitting}
              placeholder="Let's build a custom interactive portfolio or MERN project..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={contactSubmitting}
            className="w-full bg-white hover:bg-white/90 disabled:bg-white/50 text-black font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-2 min-h-[44px]"
          >
            {contactSubmitting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : "Send Message"}
          </button>
          {contactSuccess && (
            <div className="text-emerald-400 text-[9px] text-center font-semibold mt-1">
              ✓ Message sent successfully! I will reach out soon.
            </div>
          )}
          {contactError && (
            <div className="text-red-400 text-[9px] text-center font-semibold mt-1">
              ✕ {contactError}
            </div>
          )}
        </form>

        {/* Footer Grid */}
        <footer className="w-full border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <h5 className="text-white text-[10px] font-bold uppercase tracking-wider">Socials</h5>
            <a href="https://github.com/ayakarou" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[10px] no-underline transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/ayakarou" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[10px] no-underline transition-colors">LinkedIn</a>
          </div>
          <div className="flex flex-col gap-1.5">
            <h5 className="text-white text-[10px] font-bold uppercase tracking-wider">Services</h5>
            <span className="text-white/50 text-[10px]">Custom Portfolios</span>
            <span className="text-white/50 text-[10px]">MERN Full-Stack Apps</span>
            <span className="text-white/50 text-[10px]">Creative Development</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h5 className="text-white text-[10px] font-bold uppercase tracking-wider">Education</h5>
            <span className="text-white/50 text-[10px]">ESTIN University</span>
            <span className="text-white/50 text-[10px]">Bac Math — 17/20</span>
            <span className="text-white/50 text-[10px]">Full Stack Dev</span>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-white text-[10px] font-bold uppercase tracking-wider">Contact</h5>
            <div className="flex flex-col gap-1 text-[10px]">
              <a href="mailto:a_karou@estin.dz" className="text-white/50 hover:text-white truncate no-underline transition-colors">a_karou@estin.dz</a>
              <div className="flex gap-3 mt-1">
                <a
                  href="https://github.com/ayakarou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/ayakarou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* Decorative hand-drawn flower sketches in the bottom corners of the footer (colorful user sketches 4 & 5) */}
      <div id="target-flower" className="absolute left-[1%] bottom-[-10px] w-24 h-24 md:w-36 md:h-36 pointer-events-none opacity-100 z-10 select-none">
        <img src="/user_sketch_4.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute right-[1%] bottom-[-10px] w-24 h-24 md:w-36 md:h-36 pointer-events-none opacity-100 z-10 select-none">
        <img src="/user_sketch_5.png" alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
