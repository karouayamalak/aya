"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{
          scale,
          rotate: rotation,
          top: `calc(-5vh + ${i * 22 + 110}px)`,
          borderRadius: 4,
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.07), 0 12px 32px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.08)",
        }}
        className="relative -top-1/4 origin-top overflow-hidden bg-white"
      >
        {/* 10px border on three sides */}
        <div className="p-[10px] pb-0">
          <div className="w-[460px] overflow-hidden">
            {src && src.trim() !== "" ? (
              <img
                src={src}
                alt={title}
                className="block h-[290px] w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="h-[290px] w-full bg-zinc-950 flex flex-col items-center justify-center border border-white/5 rounded-sm relative overflow-hidden">
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
        <div className="flex h-[44px] items-center justify-center px-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
            {title}
          </p>
        </div>
      </motion.div>
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

  return (
    <div
      ref={container}
      className={cn(
        "relative flex w-full flex-col items-center justify-center pb-[50vh] pt-[2vh]",
        className
      )}
    >
      {/* Hint label */}
      <div className="absolute left-1/2 top-[8%] flex -translate-x-1/2 flex-col items-center gap-3 pointer-events-none">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-30">
          {hint}
        </p>
        <span className="h-12 w-px bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>

      {cards.map((card, i) => {
        // Official Componentry scale formula.
        // Last card never shrinks (targetScale = 1).
        // Each earlier card shrinks progressively more.
        const targetScale = Math.max(0.5, 1 - (cards.length - i - 1) * 0.1);
        return (
          <StickyScrollCard
            key={`card_${i}`}
            i={i}
            {...card}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
