"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);

  // Main vertical rectangle
  const rectRef      = useRef<SVGRectElement>(null);

  // Quarter-circle corners (top-left, top-right, bottom-left, bottom-right)
  const qcTLRef      = useRef<SVGPathElement>(null);
  const qcTRRef      = useRef<SVGPathElement>(null);
  const qcBLRef      = useRef<SVGPathElement>(null);
  const qcBRRef      = useRef<SVGPathElement>(null);

  // Full-width / full-height crosshair guides
  const crossVRef    = useRef<SVGLineElement>(null);
  const crossHRef    = useRef<SVGLineElement>(null);

  // Scattered random decorative lines
  const line1Ref     = useRef<SVGLineElement>(null);
  const line2Ref     = useRef<SVGLineElement>(null);
  const line3Ref     = useRef<SVGLineElement>(null);
  const line4Ref     = useRef<SVGLineElement>(null);

  // Small tick marks along the rectangle border
  const tick1Ref     = useRef<SVGLineElement>(null);
  const tick2Ref     = useRef<SVGLineElement>(null);
  const tick3Ref     = useRef<SVGLineElement>(null);
  const tick4Ref     = useRef<SVGLineElement>(null);

  // Text elements
  const titleRef     = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const statusRef    = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLSpanElement>(null);
  const infoRef      = useRef<HTMLSpanElement>(null);

  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [progress, setProgress]     = useState(0);
  const [done, setDone]             = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            scale: 1.04,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              setDone(true);
              onComplete();
            },
          });
        },
      });

      /* ─── Stroke lengths (approximate) ─────────────────── */
      // rect:  2*(220+420) = 1280
      // qc arc radius 60 → quarter arc = 2*PI*60/4 ≈ 94
      // crosshair lines: 600
      // decorative lines: 80–150 each
      // ticks: 16 each

      const R = 1280;
      const QC = 94;

      gsap.set(rectRef.current,   { strokeDasharray: R,   strokeDashoffset: R });
      gsap.set([qcTLRef.current, qcTRRef.current, qcBLRef.current, qcBRRef.current],
               { strokeDasharray: QC,  strokeDashoffset: QC });
      gsap.set(crossVRef.current, { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set(crossHRef.current, { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
               { strokeDasharray: 200, strokeDashoffset: 200 });
      gsap.set([tick1Ref.current, tick2Ref.current, tick3Ref.current, tick4Ref.current],
               { strokeDasharray: 20, strokeDashoffset: 20 });

      gsap.set(titleRef.current,    { opacity: 0, y: 18 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      gsap.set(statusRef.current,   { opacity: 0 });
      gsap.set(progressRef.current, { opacity: 0 });
      gsap.set(infoRef.current,     { opacity: 0 });

      /* ─── Phase 1: Draw guides (0.1s) ──────────────────── */
      tl.to([crossVRef.current, crossHRef.current], {
        strokeDashoffset: 0,
        duration: 2.2,
        stagger: 0.35,
        ease: "power2.out",
      }, 0.3);

      /* ─── Phase 2: Draw main vertical rect (0.5s) ──────── */
      tl.to(rectRef.current, {
        strokeDashoffset: 0,
        duration: 5.0,
        ease: "power1.inOut",
      }, 1.2);

      /* ─── Phase 3: Quarter-circle corners (0.9s) ───────── */
      tl.to([qcTLRef.current, qcTRRef.current, qcBLRef.current, qcBRRef.current], {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.4,
        ease: "power1.inOut",
      }, 2.0);

      /* ─── Phase 4: Scattered lines (1.1s) ──────────────── */
      tl.to([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
        strokeDashoffset: 0,
        duration: 2.0,
        stagger: 0.3,
        ease: "power2.out",
      }, 2.8);

      /* ─── Phase 5: Tick marks (1.5s) ───────────────────── */
      tl.to([tick1Ref.current, tick2Ref.current, tick3Ref.current, tick4Ref.current], {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.22,
        ease: "none",
      }, 4.0);

      /* ─── Text fade-ins ─────────────────────────────────── */
      tl.to(statusRef.current,   { opacity: 1, duration: 0.8 }, 1.8)
        .to(progressRef.current, { opacity: 1, duration: 0.8 }, 1.8)
        .to(titleRef.current,    { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 3.0)
        .to(subtitleRef.current, { opacity: 0.55, y: 0, duration: 1.1, ease: "power3.out" }, 3.8)
        .to(infoRef.current,     { opacity: 0.3, duration: 0.8 }, 4.8)
        .to({}, { duration: 1.2 }); // hold before exit

      /* ─── Status + progress counter ─────────────────────── */
      const steps = [
        { t: 0.0, msg: "INITIALIZING SYSTEM...",        pct: 5  },
        { t: 1.2, msg: "COMPILING MODULES...",          pct: 18 },
        { t: 2.5, msg: "LOADING WEBGL SHADERS...",      pct: 38 },
        { t: 3.5, msg: "GENERATING GRID ANCHORS...",    pct: 58 },
        { t: 4.5, msg: "CALIBRATING BLUEPRINTS...",     pct: 80 },
        { t: 5.5, msg: "READY",                         pct: 100 },
      ];
      steps.forEach(({ t, msg, pct }) => {
        gsap.delayedCall(t, () => {
          setStatusText(msg);
          setProgress(pct);
        });
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  /* ─── SVG constants ─────────────────────────────────────── */
  // Canvas: 520 × 620
  // Rect: x=150 y=80 w=220 h=460  (big vertical rectangle)
  const W = 520, H = 620;
  const rx = 150, ry = 80, rw = 220, rh = 460; // rect bounds

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#000] flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label="Loading Portfolio"
      role="status"
    >
      {/* ─── SVG Blueprint Canvas ─────────────────────────── */}
      <div className="relative" style={{ width: W, height: H }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 pointer-events-none"
        >
          <defs>
            {/* White glow filter */}
            <filter id="wglow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Subtle glow for dim elements */}
            <filter id="dglow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Full-canvas dashed crosshair guides ─────────── */}
          <line ref={crossVRef}
            x1={W / 2} y1="0" x2={W / 2} y2={H}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1"
            strokeDasharray="5 7"
          />
          <line ref={crossHRef}
            x1="0" y1={H / 2} x2={W} y2={H / 2}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1"
            strokeDasharray="5 7"
          />

          {/* ── Quarter-circle corners of the CANVAS ────────── */}
          {/* Top-left */}
          <path ref={qcTLRef}
            d={`M 60,0 A 60,60 0 0,0 0,60`}
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"
            filter="url(#dglow)"
          />
          {/* Top-right */}
          <path ref={qcTRRef}
            d={`M ${W - 60},0 A 60,60 0 0,1 ${W},60`}
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"
            filter="url(#dglow)"
          />
          {/* Bottom-left */}
          <path ref={qcBLRef}
            d={`M 0,${H - 60} A 60,60 0 0,0 60,${H}`}
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"
            filter="url(#dglow)"
          />
          {/* Bottom-right */}
          <path ref={qcBRRef}
            d={`M ${W},${H - 60} A 60,60 0 0,1 ${W - 60},${H}`}
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"
            filter="url(#dglow)"
          />

          {/* ── Scattered decorative lines ───────────────────── */}
          {/* Top-left scattered line */}
          <line ref={line1Ref}
            x1="20" y1="160" x2="95" y2="220"
            stroke="rgba(255,255,255,0.18)" strokeWidth="1"
          />
          {/* Bottom-right angled line */}
          <line ref={line2Ref}
            x1={W - 30} y1={H - 180} x2={W - 100} y2={H - 260}
            stroke="rgba(255,255,255,0.18)" strokeWidth="1"
          />
          {/* Top-right horizontal accent */}
          <line ref={line3Ref}
            x1={W - 110} y1="42" x2={W - 25} y2="42"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* Bottom-left horizontal accent */}
          <line ref={line4Ref}
            x1="22" y1={H - 42} x2="110" y2={H - 42}
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* ── Tick marks along the rect edges ─────────────── */}
          {/* Top edge mid-tick */}
          <line ref={tick1Ref}
            x1={rx + rw / 2} y1={ry - 10} x2={rx + rw / 2} y2={ry + 10}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"
          />
          {/* Bottom edge mid-tick */}
          <line ref={tick2Ref}
            x1={rx + rw / 2} y1={ry + rh - 10} x2={rx + rw / 2} y2={ry + rh + 10}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"
          />
          {/* Left edge mid-tick */}
          <line ref={tick3Ref}
            x1={rx - 10} y1={ry + rh / 2} x2={rx + 10} y2={ry + rh / 2}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"
          />
          {/* Right edge mid-tick */}
          <line ref={tick4Ref}
            x1={rx + rw - 10} y1={ry + rh / 2} x2={rx + rw + 10} y2={ry + rh / 2}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"
          />

          {/* ── Main Vertical White Rectangle ───────────────── */}
          <rect
            ref={rectRef}
            x={rx} y={ry}
            width={rw} height={rh}
            rx="6" ry="6"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
            filter="url(#wglow)"
          />
        </svg>

        {/* ── Text Content (centered inside the rect) ─────── */}
        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{
            left: rx,
            top: ry,
            width: rw,
            height: rh,
          }}
        >
          {/* Name */}
          <div ref={titleRef}>
            <h1
              className="text-white font-normal tracking-[0.45em] uppercase"
              style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", letterSpacing: "0.42em" }}
            >
              Aya Karou
            </h1>
          </div>

          {/* Role */}
          <p
            ref={subtitleRef}
            className="uppercase tracking-[0.38em] mt-2"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", color: "rgba(255,255,255,0.45)" }}
          >
            Creative Developer
          </p>

          {/* Divider */}
          <div
            className="my-8 w-12"
            style={{ height: "1px", background: "rgba(255,255,255,0.15)" }}
          />

          {/* Status log */}
          <div
            ref={statusRef}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="font-mono uppercase text-center"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}
            >
              {statusText}
            </span>

            {/* Progress percentage */}
            <span
              ref={progressRef}
              className="font-mono tabular-nums"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}
            >
              {String(progress).padStart(3, " ")}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom metadata ──────────────────────────────────── */}
      <span
        ref={infoRef}
        className="absolute bottom-8 font-mono uppercase"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.28em",
        }}
      >
        Portfolio 2026 / AK
      </span>
    </div>
  );
}
