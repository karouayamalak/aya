"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { name: "Email", icon: "✉", color: "#6366f1", conv: "3.8%", sent: "142K", revenue: "$48K" },
  { name: "SMS", icon: "💬", color: "#10b981", conv: "8.4%", sent: "38K", revenue: "$31K" },
  { name: "Meta Ads", icon: "📱", color: "#3b82f6", conv: "2.1%", sent: "520K", revenue: "$89K" },
  { name: "Google", icon: "🔍", color: "#f59e0b", conv: "4.6%", sent: "210K", revenue: "$74K" },
  { name: "TikTok", icon: "🎵", color: "#ec4899", conv: "1.9%", sent: "800K", revenue: "$62K" },
];

const automations = [
  { trigger: "Cart abandoned", action: "Send recovery email + SMS", time: "1h later", revenue: "+$12K/mo" },
  { trigger: "First purchase", action: "Upsell sequence (3 emails)", time: "Day 3", revenue: "+$8K/mo" },
  { trigger: "Product viewed ×3", action: "Dynamic retargeting ad", time: "Instant", revenue: "+$22K/mo" },
];

export default function MarketingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const channelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(contentWrapperRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(channelRefs.current, { autoAlpha: 0, x: -30 });
      gsap.set(autoRefs.current, { autoAlpha: 0, y: 20 });

      // Entrance reveal — plays once when section enters the viewport
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      revealTl.to(contentWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0);

      channelRefs.current.forEach((el, i) => {
        if (!el) return;
        revealTl.to(el, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0.15 + i * 0.08);
      });

      autoRefs.current.forEach((el, i) => {
        if (!el) return;
        revealTl.to(el, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.45 + i * 0.1);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = channels[activeChannel];

  return (
    <section
      ref={sectionRef}
      id="marketing"
      data-chapter="marketing"
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col justify-center bg-transparent text-black z-50 overflow-hidden"
      aria-label="Marketing chapter"
    >
      {/* Decorative hand-drawn sparkle sketches */}
      <div className="absolute right-[4%] top-[10%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-[0.08] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[5%] bottom-[8%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-[0.06] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Decorative user sketch 4 (keep original colors) */}
      <div className="absolute right-[5%] bottom-[10%] w-32 h-40 md:w-48 md:h-60 pointer-events-none opacity-100 z-0 select-none">
        <img src="/user_sketch_4.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div
        ref={contentWrapperRef}
        className="w-full px-6 md:px-24 max-w-7xl mx-auto flex flex-col justify-center relative z-10"
      >
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span
            className="text-black/35 text-[11px] uppercase tracking-[0.2em] block mb-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter VI — Reach
          </span>
          <h2
            className="text-black text-5xl md:text-7xl font-normal leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Marketing
          </h2>
          <p
            className="text-black/55 text-sm md:text-base max-w-xl mt-4 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Reach every customer at the perfect moment across every channel. One platform, unified data, zero guesswork.
          </p>
        </div>

        {/* Channel Selector + Live Preview */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8 md:mb-12 items-start">
          {/* Channel pills */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {channels.slice(0, 4).map((ch, i) => (
              <div
                key={i}
                ref={(el) => { channelRefs.current[i] = el; }}
                onClick={() => setActiveChannel(i)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeChannel === i
                    ? "bg-black text-white shadow-md"
                    : "bg-white/60 text-black hover:bg-white border border-black/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{ch.icon}</span>
                  <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-inter)" }}>{ch.name}</span>
                </div>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: activeChannel === i ? "#d4a017" : ch.color }}
                >
                  {ch.conv} CVR
                </span>
              </div>
            ))}
          </div>

          {/* Live Stats Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-black/8 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{active.icon}</span>
              <div>
                <h3 className="text-black text-base font-bold" style={{ fontFamily: "var(--font-inter)" }}>{active.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-black/40 text-[9px]" style={{ fontFamily: "var(--font-inter)" }}>Live campaign</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Sends / Impressions", val: active.sent },
                { label: "Conversion Rate", val: active.conv },
                { label: "Revenue Attributed", val: active.revenue },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-black/40 text-[8px] uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>{m.label}</span>
                  <span className="text-black text-base md:text-xl font-bold leading-none" style={{ fontFamily: "var(--font-inter)" }}>{m.val}</span>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-12">
              {[40, 55, 35, 70, 60, 85, 75, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-300"
                  style={{ height: `${h}%`, backgroundColor: active.color + (i === 7 ? "ff" : "55") }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Automations list */}
        <h3 className="text-black text-lg font-bold mb-4" style={{ fontFamily: "var(--font-inter)" }}>
          Automated flows
        </h3>
        <div className="flex flex-col gap-2">
          {automations.map((auto, i) => (
            <div
              key={i}
              ref={(el) => { autoRefs.current[i] = el; }}
              className="grid grid-cols-12 items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-black/5 hover:shadow-sm transition-shadow group"
            >
              <div className="col-span-1">
                <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                </div>
              </div>
              <div className="col-span-4">
                <p className="text-black text-xs font-semibold" style={{ fontFamily: "var(--font-inter)" }}>{auto.trigger}</p>
              </div>
              <div className="col-span-4">
                <p className="text-black/55 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>{auto.action}</p>
              </div>
              <div className="col-span-2">
                <span className="text-black/40 text-[9px] bg-black/5 px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>{auto.time}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-emerald-600 text-[9px] font-bold" style={{ fontFamily: "var(--font-inter)" }}>{auto.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
