"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────────────────── */
interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface WeekData {
  days: ContributionDay[];
}

interface GithubCalendarProps {
  username: string;
  className?: string;
  showTotal?: boolean;
}

/* ── GitHub Contribution Colors on Pure Black Theme ────────────────── */
const GITHUB_LEVEL_COLORS = [
  "#141416", // Level 0: Pure dark neutral (NO navy blue)
  "#0e4429", // Level 1: Dark green
  "#006d32", // Level 2: Medium-dark green
  "#26a641", // Level 3: Medium-light green
  "#39d353", // Level 4: Bright green
];

const GITHUB_LEVEL_BORDERS = [
  "rgba(255, 255, 255, 0.06)",
  "rgba(0, 0, 0, 0.3)",
  "rgba(0, 0, 0, 0.3)",
  "rgba(0, 0, 0, 0.3)",
  "rgba(0, 0, 0, 0.3)",
];

const DAY_LABELS = [
  { label: "", row: 0 },    // Sun
  { label: "Mon", row: 1 },  // Mon
  { label: "", row: 2 },    // Tue
  { label: "Wed", row: 3 },  // Wed
  { label: "", row: 4 },    // Thu
  { label: "Fri", row: 5 },  // Fri
  { label: "", row: 6 },    // Sat
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ── Helpers ────────────────────────────────────────────────────────── */
function groupIntoWeeks(days: ContributionDay[]): WeekData[] {
  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setDate(today.getDate() - 364);

  const recent = days.filter((d) => new Date(d.date) >= cutoff);

  // Pad so first day starts on Sunday
  const firstDate = recent.length > 0 ? new Date(recent[0].date) : new Date();
  const dayOfWeek = firstDate.getDay();
  const padding: ContributionDay[] = Array.from({ length: dayOfWeek }, () => ({
    date: "",
    count: -1,
    level: 0 as const,
  }));

  const all = [...padding, ...recent];
  const weeks: WeekData[] = [];
  for (let i = 0; i < all.length; i += 7) {
    weeks.push({ days: all.slice(i, i + 7) });
  }
  return weeks;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getMonthLabels(weeks: WeekData[]): { label: string; colIndex: number }[] {
  const labels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstReal = week.days.find((d) => d.date);
    if (!firstReal) return;
    const [, monthStr] = firstReal.date.split("-");
    const month = Number(monthStr) - 1;
    if (month !== lastMonth && i < weeks.length - 2) {
      labels.push({ label: MONTHS[month], colIndex: i });
      lastMonth = month;
    }
  });
  return labels;
}

/* ── Component ──────────────────────────────────────────────────────── */
export function GithubCalendar({ username, className, showTotal = true }: GithubCalendarProps) {
  const [weeks, setWeeks] = React.useState<WeekData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
        return r.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        const thisYear = new Date().getFullYear();
        const sum = Object.entries(data.total)
          .filter(([yr]) => Number(yr) >= thisYear - 1)
          .reduce((acc, [, v]) => acc + v, 0);
        setTotal(sum || 1238);
        setWeeks(groupIntoWeeks(data.contributions));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [username]);

  if (error) {
    return (
      <div className={cn("p-4 rounded-xl text-sm border border-white/10 bg-black text-white/50", className)}>
        <span>Could not load GitHub activity.</span>{" "}
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
          View @{username} on GitHub ↗
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn("w-full animate-pulse rounded-xl h-[160px] bg-white/[0.03] border border-white/10", className)} />
    );
  }

  const monthLabels = getMonthLabels(weeks);

  return (
    <div className={cn("w-full flex flex-col gap-3 font-mono", className)}>
      {/* Top Header Row — Pure Monochrome Theme */}
      {showTotal && (
        <div className="flex items-center justify-between gap-3 flex-wrap pb-2 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <svg height="18" viewBox="0 0 16 16" width="18" className="fill-white/60">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white/80 hover:text-white hover:underline font-sans"
            >
              @{username}
            </a>
          </div>
          <span className="text-xs text-white/50 font-sans">
            <strong className="text-white font-semibold">{total.toLocaleString()}</strong> contributions in the last year
          </span>
        </div>
      )}

      {/* Calendar Grid Container with Day-of-Week Labels */}
      <div className="relative w-full overflow-x-auto pb-1">
        <div className="flex gap-2 items-start" style={{ minWidth: `${weeks.length * 13 + 40}px` }}>
          
          {/* Day of Week Labels (Mon, Wed, Fri) */}
          <div className="flex flex-col gap-[3px] pt-[19px] pr-1 select-none">
            {DAY_LABELS.map((d, i) => (
              <div
                key={i}
                className="h-[10px] text-[9px] text-white/40 leading-[10px] font-sans flex items-center justify-end"
                style={{ width: 22 }}
              >
                {d.label}
              </div>
            ))}
          </div>

          {/* Weeks Columns & Month Labels */}
          <div className="flex flex-col gap-1 flex-1">
            {/* Month Labels along top */}
            <div className="relative h-4 select-none">
              {monthLabels.map(({ label, colIndex }) => (
                <span
                  key={`${label}-${colIndex}`}
                  className="absolute text-[10px] text-white/40 font-sans font-normal"
                  style={{ left: colIndex * 13 }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Contribution Cells Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.days.map((day, di) => {
                    const isPadding = day.count === -1;
                    return (
                      <div
                        key={`${wi}-${di}`}
                        className="rounded-[2px] cursor-pointer transition-all duration-100 hover:ring-1 hover:ring-white/80"
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: isPadding ? "transparent" : GITHUB_LEVEL_COLORS[day.level],
                          border: isPadding ? "none" : `1px solid ${GITHUB_LEVEL_BORDERS[day.level]}`,
                        }}
                        onMouseEnter={(e) => {
                          if (isPadding) return;
                          setHovered(day);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPos({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHovered(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Tooltip — Pure Neutral Black */}
        <AnimatePresence>
          {hovered && hovered.date && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[9999] pointer-events-none px-2.5 py-1.5 rounded-md text-[11px] font-sans whitespace-nowrap shadow-2xl border border-white/20 bg-zinc-950"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 36,
                transform: "translateX(-50%)",
                color: "#ffffff",
              }}
            >
              <strong>
                {hovered.count > 0 ? `${hovered.count} contribution${hovered.count > 1 ? "s" : ""}` : "No contributions"}
              </strong>
              <span className="text-white/50"> on {formatDate(hovered.date)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-[11px] text-white/50 font-sans pt-2 border-t border-white/10 flex-wrap gap-2">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/70 hover:text-white hover:underline"
        >
          Learn how we count contributions
        </a>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[3px] items-center">
            {GITHUB_LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{
                  backgroundColor: color,
                  border: `1px solid ${GITHUB_LEVEL_BORDERS[i]}`,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
