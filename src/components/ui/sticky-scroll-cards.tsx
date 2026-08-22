"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export interface StickyScrollCardItem {
  title: string;
  src: string;
}

// Very subtle tilts — natural scatter without looking messy
const CARD_ROTATIONS = [-1.4, 1.0, -0.8, 1.6, -1.1];

interface StickyScrollCardProps {
  i: number;
  title: string;
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
}

function StickyScrollCard({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: StickyScrollCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];

  return (
    // h-screen gives this 100vh of flow height.
    // sticky top-0 pins the card to the viewport top while the container scrolls past.
    // Later cards sit on top via natural DOM stacking order.
    <div className="sticky top-0 flex h-[70vh] sm:h-[75vh] md:h-[80vh] items-center justify-center px-4">
      <motion.div
        style={{
          scale,
          rotate: rotation,
          top: `calc(-4vh + ${i * 16 + 70}px)`,
          borderRadius: 8,
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.07), 0 12px 32px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.08)",
        }}
        className="relative -top-1/4 origin-top overflow-hidden bg-white max-w-[460px] w-[88vw] border border-black/5"
      >
        {/* 10px border on three sides */}
        <div className="p-2 sm:p-[10px] pb-0">
          <div className="w-full overflow-hidden rounded-sm">
            {src && src.trim() !== "" ? (
              <img
                src={src}
                alt={title}
                className="block h-[190px] sm:h-[240px] md:h-[290px] w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="h-[190px] sm:h-[240px] md:h-[290px] w-full bg-zinc-950 flex flex-col items-center justify-center border border-white/5 rounded-sm relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '16px 16px'
                  }}
                />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono relative z-10">
                  Placeholder Certificate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Caption strip */}
        {title && title.trim() !== "" && (
          <div className="flex h-[38px] sm:h-[44px] items-center justify-center px-3 sm:px-4">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">
              {title}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Mobile card (swipe carousel item) ──────────────────────────────────── */
function MobileCard({ title, src, i }: { title: string; src: string; i: number }) {
  return (
    <div className="flex-shrink-0 w-[80vw] max-w-[320px] snap-center">
      <div
        className="overflow-hidden bg-white border border-black/5"
        style={{
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
          rotate: `${CARD_ROTATIONS[i % CARD_ROTATIONS.length]}deg`,
        }}
      >
        <div className="p-[8px] pb-0">
          <div className="w-full overflow-hidden rounded-sm">
            {src && src.trim() !== "" ? (
              <img
                src={src}
                alt={title}
                className="block h-[180px] w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="h-[180px] w-full bg-zinc-950 flex flex-col items-center justify-center border border-white/5 rounded-sm relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono relative z-10">
                  Placeholder
                </p>
              </div>
            )}
          </div>
        </div>
        {title && title.trim() !== "" && (
          <div className="flex h-[38px] items-center justify-center px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-900">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StickyScrollCardsProps {
  cards?: StickyScrollCardItem[];
  hint?: string;
  className?: string;
}

export function StickyScrollCards({
  cards = [],
  hint = "scroll to explore",
  className,
}: StickyScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // useScroll tracks window scroll relative to container boundaries.
  // offset ["start start", "end end"]:
  //   progress = 0 when container TOP reaches viewport TOP
  //   progress = 1 when container BOTTOM reaches viewport BOTTOM
  // pt-[50vh] ensures the first card only starts entering sticky
  // at the right moment — this is the official Componentry value.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  /* ── Mobile: horizontal swipe carousel ── */
  if (isMobile) {
    return (
      <div className={cn("w-full py-6", className)}>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30 text-center mb-5">
          {hint}
        </p>
        <div
          className="flex gap-5 px-[10vw] overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {cards.map((card, i) => (
            <MobileCard key={`mcard_${i}`} i={i} {...card} />
          ))}
        </div>
        {/* Swipe indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {cards.map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-current opacity-20" />
          ))}
        </div>
      </div>
    );
  }

  /* ── Desktop: stacked sticky scroll ── */
  return (
    <div
      ref={container}
      className={cn(
        "relative flex w-full flex-col items-center justify-center pb-[12vh] pt-[1vh]",
        className
      )}
    >
      {/* Hint label */}
      <div className="absolute left-1/2 top-[2%] flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30">
          {hint}
        </p>
        <span className="h-8 w-px bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>

      {cards.map((card, i) => {
        const total = cards.length || 1;
        const targetScale = Math.max(0.5, 1 - (total - i - 1) * 0.08);
        const rangeStart = (i / total) * 0.7;
        return (
          <StickyScrollCard
            key={`card_${i}`}
            i={i}
            {...card}
            progress={scrollYProgress}
            range={[rangeStart, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

