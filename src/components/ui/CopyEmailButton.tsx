"use client";

import { useState } from "react";

const EMAIL = "a_karou@estin.dz";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Email address */}
      <span
        className="text-white/70 text-sm"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {EMAIL}
      </span>

      {/* Copy button */}
      <button
        id="copy-email-btn"
        onClick={handleCopy}
        aria-label="Copy email address"
        className="group flex items-center justify-center w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/30 transition-all duration-200"
      >
        {copied ? (
          /* Checkmark icon */
          <svg
            className="w-3.5 h-3.5 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          /* Copy icon */
          <svg
            className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>

      {/* Toast notification */}
      <div
        role="status"
        aria-live="polite"
        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
          copied
            ? "opacity-100 -translate-y-0"
            : "opacity-0 translate-y-1"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        ✓ Email copied!
      </div>
    </div>
  );
}
