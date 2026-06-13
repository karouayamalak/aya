"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    ref?: string;
    ref_type?: string;
    pull_request?: { title: string };
  };
  created_at: string;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function eventLabel(event: GitHubEvent): { icon: string; label: string; detail: string } {
  switch (event.type) {
    case "PushEvent": {
      const msg = event.payload.commits?.[0]?.message?.split("\n")[0] ?? "pushed code";
      return { icon: "↑", label: "Push", detail: msg };
    }
    case "CreateEvent":
      return {
        icon: "✦",
        label: event.payload.ref_type === "repository" ? "New Repo" : "New Branch",
        detail: event.payload.ref ?? event.repo.name,
      };
    case "PullRequestEvent":
      return { icon: "⇄", label: "Pull Request", detail: event.payload.pull_request?.title ?? "opened PR" };
    case "WatchEvent":
      return { icon: "★", label: "Starred", detail: event.repo.name };
    case "ForkEvent":
      return { icon: "⑂", label: "Forked", detail: event.repo.name };
    default:
      return { icon: "·", label: event.type.replace("Event", ""), detail: "" };
  }
}

const ALLOWED_TYPES = ["PushEvent", "CreateEvent", "PullRequestEvent", "WatchEvent", "ForkEvent"];

/* ─── Skeleton ────────────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/[0.07] p-5"
          style={{ background: "rgba(255,255,255,0.03)", animation: `pulse 1.6s ${i * 0.15}s ease-in-out infinite` }}
        >
          <div className="h-3 w-24 rounded-full bg-white/10 mb-2" />
          <div className="h-3 w-48 rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function GitHubSection() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/karouayamalak/events?per_page=30")
      .then((r) => {
        if (!r.ok) throw new Error("GitHub API error");
        return r.json();
      })
      .then((data: GitHubEvent[]) => {
        const filtered = data.filter((e) => ALLOWED_TYPES.includes(e.type)).slice(0, 6);
        setEvents(filtered);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // GSAP scroll reveal for cards
  useEffect(() => {
    if (loading || events.length === 0) return;
    const cards = document.querySelectorAll(".gh-card");
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#github-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [loading, events]);

  return (
    <section
      id="github-section"
      data-chapter="github"
      className="relative w-full py-20 md:py-28 bg-transparent text-white z-35 overflow-hidden"
      aria-label="GitHub Activity"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none z-0 opacity-10"
        style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
      />

      <div className="w-full px-6 md:px-24 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="text-white/35 text-[11px] uppercase tracking-[0.2em] block mb-3" style={{ fontFamily: "var(--font-inter)" }}>
            Live — GitHub Activity
          </span>
          <div className="flex items-center gap-4 flex-wrap">
            <h2
              className="text-white text-4xl md:text-6xl font-normal leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Building in public
            </h2>
            <a
              href="https://github.com/karouayamalak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1.5 mt-1"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              @karouayamalak
            </a>
          </div>
          <p className="text-white/45 text-sm mt-3 max-w-md leading-relaxed" style={{ fontWeight: 300 }}>
            Real-time commits and activity from my GitHub — proof that I ship every day.
          </p>
        </div>

        {/* Content */}
        {loading && <Skeleton />}

        {!loading && error && (
          <div className="rounded-2xl border border-white/[0.07] p-8 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-white/40 text-sm">Couldn&apos;t load GitHub activity right now.</p>
            <a
              href="https://github.com/karouayamalak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white text-xs underline mt-2 inline-block transition-colors"
            >
              View profile on GitHub →
            </a>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map((event) => {
              const { icon, label, detail } = eventLabel(event);
              const repoShort = event.repo.name.replace("karouayamalak/", "");
              return (
                <a
                  key={event.id}
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-card group block rounded-2xl border border-white/[0.07] p-5 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
                >
                  {/* Type badge + time */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                    >
                      {icon} {label}
                    </span>
                    <span className="text-white/30 text-[10px]">{relativeTime(event.created_at)}</span>
                  </div>
                  {/* Repo */}
                  <p className="text-white text-sm font-semibold mb-1 group-hover:text-white/90 transition-colors truncate">
                    {repoShort}
                  </p>
                  {/* Detail / commit message */}
                  {detail && (
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}>
                      {detail}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/karouayamalak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
          >
            See all activity on GitHub
            <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
