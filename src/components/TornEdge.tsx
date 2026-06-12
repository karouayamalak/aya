"use client";

/**
 * TornEdge — recreates the dramatic torn earth/paper border seen between
 * sections on the Shopify Editions Winter '26 site.
 *
 * How it works:
 *  • A 200px tall SVG sits at the very top of each sticky section panel.
 *  • The SVG path fills with the SECTION COLOR from the jagged peaks DOWN
 *    to the bottom — the "new section rising from below" illusion.
 *  • An SVG feTurbulence displacement filter adds organic fractal noise to
 *    the path edges so they look torn rather than drawn.
 *  • A CSS grain overlay (pseudo-element / inline div) adds the gritty
 *    charcoal / soil texture visible in the screenshot.
 *  • A subtle drop-shadow layer gives the leading edge its depth.
 *
 * Props:
 *   color    — fill color matching this section's background  (hex / oklch)
 *   variant  — 0-5, picks a unique jagged path so each tear looks different
 *   flip     — if true, renders a BOTTOM torn edge (for section exits)
 */

interface TornEdgeProps {
  /** The background fill color of this section (what the spikes are made of) */
  color: string;
  /** 0–5 — different path shape per section so no two tears look alike */
  variant?: number;
  /** Height of the tear strip in px. Default 200. */
  height?: number;
  /** Additional className on the wrapper */
  className?: string;
}

/**
 * 6 unique path variants.
 * All use viewBox "0 0 1440 200".
 * The path fills from jagged top edge DOWN to y=200 (L1440,200 L0,200 Z).
 * Peaks range from y=0 to y=140, creating 60-200px tall spikes.
 */
const PATHS = [
  // Variant 0 — gentle wave with a rise in the center
  "M0,200 L0,120 C240,60 480,180 720,120 C960,60 1200,160 1440,120 L1440,200 Z",

  // Variant 1 — smooth, rolling hills
  "M0,200 L0,100 C360,160 720,40 1080,160 1440,100 L1440,200 Z",

  // Variant 2 — soft multiple crests
  "M0,200 L0,140 C180,90 360,90 540,140 C720,190 900,190 1080,140 C1260,90 1350,90 1440,120 L1440,200 Z",

  // Variant 3 — asymmetric wave leaning left
  "M0,200 L0,110 C200,160 400,60 600,110 C800,160 1000,60 1200,110 C1320,135 1380,135 1440,110 L1440,200 Z",

  // Variant 4 — gentle wave leaning right
  "M0,200 L0,130 C150,170 300,90 450,130 C600,170 750,90 900,130 C1050,170 1200,90 1350,130 C1380,142 1410,142 1440,130 L1440,200 Z",

  // Variant 5 — single dramatic sweep
  "M0,200 L0,90 C300,50 600,150 900,90 C1200,30 1320,150 1440,90 L1440,200 Z",
];

export default function TornEdge({ color, variant = 0, height = 200, className = "" }: TornEdgeProps) {
  const path = PATHS[variant % PATHS.length];

  return (
    <div
      className={`relative w-full flex-shrink-0 pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* Layer 1 — subtle shadow/glow on the section BELOW (depth illusion) */}
      <div
        className="absolute inset-x-0 bottom-0 z-0"
        style={{
          height: "60%",
          background: `linear-gradient(to top, ${color}00 0%, ${color}18 100%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Deep drop-shadow for 3D wavy border depth */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-[12]"
        style={{ opacity: 0.75, transform: "translateY(6px)" }}
      >
        <path
          d={path}
          fill="#000000"
          style={{
            filter: "blur(5px)",
          }}
        />
      </svg>

      {/* Layer 2 — slightly offset duplicate path for 3-D edge depth */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-15"
        style={{ opacity: 0.5, transform: "translateY(3px)" }}
      >
        <path
          d={path}
          fill={color}
          style={{
            transform: "translateY(6px)",
          }}
        />
      </svg>

      {/* Layer 3 — main wavy path without displacement filter */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full z-20"
      >
        <path
          d={path}
          fill={color}
        />
      </svg>

      {/* Layer 4 — grain texture overlay on the wavy region for premium feel */}
      <div
        className="absolute inset-0 z-30 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          opacity: 0.1,
        }}
      />

      {/* Layer 5 — crisp highlight line right at the peak edge */}
      <div
        className="absolute inset-x-0 z-40"
        style={{
          top: "2px",
          height: "1px",
          background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}
