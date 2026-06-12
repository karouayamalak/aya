"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = [
  {
    name: "React", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.143.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.29zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>,
  },
  {
    name: "Next.js", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>,
  },
  {
    name: "TypeScript", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
  },
  {
    name: "GSAP", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.5 5.5h1v13h-1zm-4 2h1v9h-1zm8 0h1v9h-1zm-12 2h1v5h-1zm16 0h1v5h-1z"/></svg>,
  },
  {
    name: "Tailwind CSS", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
  },
  {
    name: "Three.js", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l3.992 15.941a.268.268 0 0 0 .463.106l3.664-4.559.697 2.65a.268.268 0 0 0 .259.196h2.162a.268.268 0 0 0 .259-.196l.697-2.65 3.664 4.559a.268.268 0 0 0 .463-.106L20.226.332A.268.268 0 0 0 19.97 0H.38zm18.287.537l-7.973 3.72L2.721.537h15.946zM2.39 1.18l7.252 3.285-4.583 5.702L2.39 1.18zm15.07 0l-2.669 8.987-4.583-5.702 7.252-3.285zM9.1 4.994l4.12 5.129-2.06.96-2.06-.96 4.12-5.129zm-5.234.301l2.556 9.685-5.058-6.3 2.502-3.385zm14.172 0l2.502 3.385-5.058 6.3 2.556-9.685zm-8.93 5.835l1.893.882 1.893-.882-.655 2.488h-2.476l-.655-2.488z"/></svg>,
  },
];

const ROW_2 = [
  {
    name: "Figma", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.013 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.477 0-4.491-2.014-4.491-4.491S5.671 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.477 0-4.491-2.014-4.491-4.491s2.014-4.49 4.491-4.49h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117v-6.038H8.148zm4.587 15.019c-2.476 0-4.49-2.013-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.013 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.354-3.019-3.019-3.019z"/></svg>,
  },
  {
    name: "CSS / HTML", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>,
  },
  {
    name: "Three.js", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l3.992 15.941a.268.268 0 0 0 .463.106l3.664-4.559.697 2.65a.268.268 0 0 0 .259.196h2.162a.268.268 0 0 0 .259-.196l.697-2.65 3.664 4.559a.268.268 0 0 0 .463-.106L20.226.332A.268.268 0 0 0 19.97 0H.38zm18.287.537l-7.973 3.72L2.721.537h15.946zM2.39 1.18l7.252 3.285-4.583 5.702L2.39 1.18zm15.07 0l-2.669 8.987-4.583-5.702 7.252-3.285zM9.1 4.994l4.12 5.129-2.06.96-2.06-.96 4.12-5.129zm-5.234.301l2.556 9.685-5.058-6.3 2.502-3.385zm14.172 0l2.502 3.385-5.058 6.3 2.556-9.685zm-8.93 5.835l1.893.882 1.893-.882-.655 2.488h-2.476l-.655-2.488z"/></svg>,
  },
  {
    name: "Framer Motion", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>,
  },
  {
    name: "Git", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.604 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>,
  },
  {
    name: "Vercel", accent: "#ffffff",
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  },
];

export default function RetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, x: -50 });
      gsap.set(marqueeRef.current, { autoAlpha: 0, y: 50 });
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
      .to(headRef.current, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" })
      .to(marqueeRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pills1 = [...ROW_1, ...ROW_1];
  const pills2 = [...ROW_2, ...ROW_2];

  return (
    <section
      ref={sectionRef}
      id="stack"
      data-chapter="stack"
      className="relative w-full py-14 md:py-20 bg-transparent text-white z-50 overflow-hidden"
      aria-label="Tech Stack chapter"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
      />

      {/* Decorative hand-drawn sparkle sketch */}
      <div className="absolute right-[8%] top-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>




      {/* Second decorative hand-drawn sparkle sketch */}
      <div className="absolute left-[8%] bottom-[12%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-20 z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      {/* Section header */}
      <div className="w-full px-6 md:px-24 max-w-7xl mx-auto mb-8 relative z-10">
        <div ref={headRef}>
          <span
            className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-1.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Chapter IV — Ecosystem
          </span>
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2
              className="text-white text-3xl md:text-4xl font-normal leading-tight"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Tech I Know
            </h2>
            <span className="text-white/25 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              — hover to pause
            </span>
          </div>
        </div>
      </div>

      {/* ── Infinite Marquee ──────────────────────────────── */}
      <div ref={marqueeRef} className="mt-8 md:mt-12 flex flex-col gap-3 relative z-10">

      {/* Marquee row 1 — left to right */}
      <div
        className="relative w-full overflow-hidden mb-3"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
      >
        <div className="flex gap-3 marquee-track-reverse" style={{ width: "max-content" }}>
          {pills1.map((item, i) => (
            <Pill key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — right to left (reversed) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
      >
        <div className="flex gap-3 marquee-track-reverse" style={{ width: "max-content" }}>
          {pills2.map((item, i) => (
            <Pill key={i} item={item} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

function Pill({ item }: { item: { name: string; svg: React.ReactNode; accent: string } }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0 transition-all duration-300 cursor-default hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${item.accent}28`,
        backdropFilter: "blur(8px)",
        boxShadow: `0 0 0 0 ${item.accent}00`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = `${item.accent}0f`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${item.accent}55`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLDivElement).style.borderColor = `${item.accent}28`;
      }}
    >
      <span className="w-4 h-4 flex-shrink-0" style={{ color: item.accent }}>
        {item.svg}
      </span>
      <span className="text-white/70 text-[12px] font-medium whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
        {item.name}
      </span>
    </div>
  );
}
