import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aya Karou — Creative Frontend Developer",
  description:
    "Hey, I'm Aya! I'm a 19-year-old frontend developer and a 2CP computer science student at ESTIN (École Supérieure en Sciences et Technologies de l'Informatique et du Numérique), hailing from Bouira, Algeria. My entry into web development in the summer of 2025 changed everything.",
  keywords: ["Aya Karou", "frontend developer", "React", "Next.js", "GSAP", "portfolio", "ESTIN", "Algeria", "Bouira"],
  authors: [{ name: "Aya Karou", url: "mailto:a_karou@estin.dz" }],
  openGraph: {
    title: "Aya Karou ",
    description:
      "Hey, I'm Aya! I'm a 19-year-old frontend developer and a 2CP CS student at ESTIN, from Bouira, Algeria. My entry into web development in the summer of 2025 changed everything — it became my daily creative outlet.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Karou",
    description:
      "19-year-old frontend developer & 2CP CS student at ESTIN, Algeria. Web dev since summer 2025 — now my daily creative lifestyle.",
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
      </body>
    </html>
  );
}
