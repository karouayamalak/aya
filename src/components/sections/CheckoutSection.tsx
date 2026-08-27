"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─────────────────────────────────────────────────────────────────── */
interface Recommendation {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
  created_at: string;
}



/* ─── Stars ─────────────────────────────────────────────────────────────────── */
function Stars({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          className={`text-sm transition-colors ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} ${n <= rating ? "text-amber-400" : "text-white/20"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export default function CheckoutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  /* Feed state */
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(false);

  /* Form state */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  /* Custom avatar state and ref */
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCustomAvatar(base64String);
      setAvatar(base64String);
    };
    reader.readAsDataURL(file);
  };

  /* ── Fetch recommendations ────────────────────────────────────────────────── */
  const fetchRecs = useCallback(async () => {
    try {
      setLoading(true);
      setFetchErr(false);
      const res = await fetch("/api/recommendations");
      if (!res.ok) throw new Error("fetch failed");
      const data: Recommendation[] = await res.json();
      setRecs(data);
    } catch {
      setFetchErr(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRecs(); }, [fetchRecs]);

  /* ── Entrance animation ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(formRef.current, { autoAlpha: 0, x: -50 });
      gsap.set(feedRef.current, { autoAlpha: 0, x: 50 });
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
        .to(formRef.current, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0)
        .to(feedRef.current, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0.15);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Submit handler ───────────────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !comment.trim()) return;
    setSubmitting(true);
    setSubmitErr("");
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, comment, avatar, rating }),
      });
      if (!res.ok) throw new Error("submit failed");
      const newRec: Recommendation = await res.json();
      setRecs((prev) => [newRec, ...prev]);
      setSuccess(true);
      setName(""); setRole(""); setComment("");
      setAvatar(""); setRating(5);
      setCustomAvatar(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setSubmitErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="feedback"
      data-chapter="feedback"
      className="relative w-full min-h-screen py-16 md:py-20 flex flex-col justify-center bg-transparent z-60"
      aria-label="Feedback chapter"
      style={{ fontFamily: "var(--font-inter)" }}
    >

      {/* Decorative hand-drawn sketches */}
      <div className="absolute right-[2%] bottom-[5%] w-44 h-44 md:w-64 md:h-64 pointer-events-none opacity-[0.08] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>
      <div className="absolute left-[3%] top-[10%] w-36 h-36 md:w-48 md:h-48 pointer-events-none opacity-[0.06] z-0 select-none">
        <img src="/sparkle_sketch.png" alt="" className="w-full h-full object-contain theme-sketch" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-12 py-6 md:py-8 max-w-7xl mx-auto relative z-10 bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Glow behind the dark panel */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

        {/* Small botanical sketch illustrations placed in random spots */}
        <div className="absolute bottom-[6%] right-[3%] w-[60px] h-[60px] md:w-[86px] md:h-[86px] pointer-events-none opacity-85 z-20 select-none -rotate-12 transition-transform duration-500 hover:scale-110">
          <img src="/processed/6a755a4070816daea2c843b17c8497c4.jpg" alt="" className="w-full h-full object-contain" />
        </div>


        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="mb-6 relative z-10">
          <span className="text-white/40 text-[11px] uppercase tracking-[0.2em] block mb-2 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            Chapter VI — Feedback
          </span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-normal leading-tight" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
            What people say
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-3 max-w-md leading-relaxed" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
            Real recommendations from people I&apos;ve worked with. Leave yours below — it takes 30 seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* ── Left: Submit form ────────────────────────────────────────────── */}
          <div ref={formRef} className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col gap-4 bg-zinc-900/40 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Leave a recommendation
              </h3>

              {/* Name */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1" style={{ fontFamily: "var(--font-inter)" }}>Your Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aya Karou"
                  className="w-full border border-white/10 rounded-lg px-3.5 py-2.5 text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 transition-all"
                  style={{ fontFamily: "var(--font-inter)", background: "rgba(255,255,255,0.03)", color: "#ffffff" }}
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1" style={{ fontFamily: "var(--font-inter)" }}>Your Role</label>
                <input
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Frontend Developer at..."
                  className="w-full border border-white/10 rounded-lg px-3.5 py-2.5 text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 transition-all"
                  style={{ fontFamily: "var(--font-inter)", background: "rgba(255,255,255,0.03)", color: "#ffffff" }}
                />
              </div>

              {/* Avatar upload */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-inter)" }}>Upload avatar (optional)</label>
                <div className="flex items-center gap-3">
                  {/* Preview */}
                  {customAvatar && (
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                      <img src={customAvatar} alt="Your avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-white/20 hover:border-white/45 text-white/50 hover:text-white transition-all cursor-pointer text-xs font-medium min-h-[44px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="text-base leading-none">↑</span>
                    {customAvatar ? "Change photo" : "Upload photo"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1" style={{ fontFamily: "var(--font-inter)" }}>Rating</label>
                <Stars rating={rating} interactive onChange={setRating} />
              </div>

              {/* Comment */}
              <div>
                <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1" style={{ fontFamily: "var(--font-inter)" }}>Your message</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience working with Aya..."
                  className="w-full border border-white/10 rounded-lg px-3.5 py-2.5 text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 transition-all resize-none"
                  style={{ fontFamily: "var(--font-inter)", background: "rgba(255,255,255,0.03)", color: "#ffffff" }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white hover:bg-zinc-100 text-zinc-950 text-[11px] font-semibold py-3 rounded-lg transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {submitting ? "Publishing…" : "Publish Recommendation"}
              </button>

              {success && (
                <p className="text-emerald-400 text-[10px] text-center font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                  ✓ Thank you! Your recommendation is live.
                </p>
              )}
              {submitErr && (
                <p className="text-red-400 text-[10px] text-center" style={{ fontFamily: "var(--font-inter)" }}>
                  {submitErr}
                </p>
              )}
            </form>
          </div>

          {/* ── Right: Scrollable feed ───────────────────────────────────────── */}
          <div ref={feedRef} className="lg:col-span-3 flex flex-col gap-4 max-h-[400px] sm:max-h-[480px] lg:max-h-[560px] overflow-y-auto pr-1" data-lenis-prevent>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                Recommendations
                {recs.length > 0 && (
                  <span className="ml-2 text-white/50 font-normal text-xs">({recs.length})</span>
                )}
              </h3>
              <button
                onClick={fetchRecs}
                className="text-white/50 hover:text-white text-[10px] transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ↻ Refresh
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 border border-white/10 animate-pulse h-28 bg-zinc-900/20"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && fetchErr && (
              <div className="text-center py-8">
                <p className="text-white/50 text-xs mb-2" style={{ fontFamily: "var(--font-inter)" }}>Could not load recommendations.</p>
                <button onClick={fetchRecs} className="text-white text-xs underline cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>Try again</button>
              </div>
            )}

            {/* Empty */}
            {!loading && !fetchErr && recs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 text-center gap-2">
                <span className="text-4xl opacity-40">💬</span>
                <p className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  No recommendations yet — be the first to leave one!
                </p>
              </div>
            )}

            {/* Cards */}
            {!loading && !fetchErr && recs.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl p-5 border border-white/10 bg-zinc-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 select-text"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0 bg-zinc-800">
                    {rec.avatar ? (
                      <img src={rec.avatar} alt={rec.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
                        {rec.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "var(--font-inter)" }}>{rec.name}</p>
                    <p className="text-white/50 text-[11px] font-medium truncate" style={{ fontFamily: "var(--font-inter)" }}>{rec.role}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Stars rating={rec.rating} />
                  </div>
                </div>
                <p className="text-white/80 text-xs leading-relaxed font-normal" style={{ fontFamily: "var(--font-inter)" }}>
                  {rec.comment}
                </p>
                <p className="text-white/30 text-[10px] mt-3" style={{ fontFamily: "var(--font-inter)" }}>
                  {new Date(rec.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
