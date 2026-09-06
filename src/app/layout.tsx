import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aya Karou — Full-Stack MERN Developer & Portfolio Creator",
  description:
    "Hi, I'm Aya! A 20-year-old Full-Stack MERN developer and 1CS CS student at ESTIN, Algeria. I build bespoke, high-converting portfolio websites, scalable full-stack MERN web applications, and creative interactive experiences.",
  keywords: [
    "Aya Karou",
    "full stack developer",
    "MERN stack developer",
    "portfolio creator",
    "build portfolio website",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "GSAP",
    "freelance developer",
    "ESTIN",
    "Algeria",
  ],
  authors: [{ name: "Aya Karou", url: "mailto:a_karou@estin.dz" }],
  openGraph: {
    title: "Aya Karou — Full-Stack MERN & Portfolio Developer",
    description:
      "Hi, I'm Aya! Full-Stack MERN developer & portfolio creator. Building custom interactive portfolio experiences & scalable MERN web applications.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aya Karou — Freelance Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Karou — Full-Stack MERN & Portfolio Developer",
    description:
      "Full-stack MERN developer & creative engineer. Building bespoke portfolios and full-stack web applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <head>
        {/* Preload above-the-fold hero images so they appear immediately */}
        <link rel="preload" as="image" href="/hero_flower_luminous.png" />
        <link rel="preload" as="image" href="/hero_butterfly_wing.png" />
        <link rel="preload" as="image" href="/profile.jpg" />
        {/* Preload project previews so they are instantly in memory */}
        <link rel="preload" as="image" href="/projects/morning-crumbs.webp" />
        <link rel="preload" as="image" href="/projects/coffee-boost.webp" />
        <link rel="preload" as="image" href="/projects/unicare-clinic.webp" />
        <link rel="preload" as="image" href="/projects/thazdayth.webp" />
        <link rel="preload" as="image" href="/projects/veto-care.webp" />
        <link rel="preload" as="image" href="/projects/rite-of-way.webp" />
        <link rel="preload" as="image" href="/projects/duxel.webp" />
        <link rel="preload" as="image" href="/projects/focusly.webp" />
        <link rel="preload" as="image" href="/projects/bylka-bio.webp" />
      </head>
      <body className="bg-black text-white overflow-x-hidden" data-theme="dark">
        {/* Global SVG Filters — must NOT use display:none or filters won't resolve */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Organic torn-paper displacement — applied to each section's leading SVG path */}
            <filter id="torn-paper" x="-5%" y="-30%" width="110%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035 0.06"
                numOctaves="4"
                seed="8"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            {/* Rougher displacement for the 3-D shadow/grain layer */}
            <filter id="torn-grain" x="-5%" y="-30%" width="110%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.08"
                numOctaves="3"
                seed="12"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="22"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
