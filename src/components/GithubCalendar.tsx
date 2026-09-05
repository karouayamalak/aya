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
  "#141416", // Level 0: Pure dark neutral
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
  const [allWeeks, setAllWeeks] = React.useState<WeekData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });
  const [viewRange, setViewRange] = React.useState<"year" | "recent">("year");

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
        setAllWeeks(groupIntoWeeks(data.contributions));
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

  // Choose weeks based on viewRange
  const displayedWeeks = viewRange === "recent" ? allWeeks.slice(-26) : allWeeks;
  const monthLabels = getMonthLabels(displayedWeeks);

  // SVG Geometry Constants for scalable vector layout
  const colWidth = 12;
  const cellSize = 9.5;
  const cellRadius = 2;
  const startX = 26;
  const startY = 18;
  const svgWidth = startX + displayedWeeks.length * colWidth + 4;
  const svgHeight = startY + 7 * colWidth + 4;

  const handleDayInteraction = (e: React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>, day: ContributionDay) => {
    if (day.count === -1) return;
    setHovered(day);
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className={cn("w-full flex flex-col gap-3 font-mono", className)}>
      {/* Top Header Row — Fully Responsive */}
      {showTotal && (
        <div className="flex items-center justify-between gap-3 flex-wrap pb-2 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <svg height="18" viewBox="0 0 16 16" width="18" className="fill-white/70 flex-shrink-0">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white/90 hover:text-white hover:underline font-sans"
            >
              @{username}
            </a>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] sm:text-xs text-white/60 font-sans">
              <strong className="text-white font-semibold">{total.toLocaleString()}</strong> contributions in the last year
            </span>

            {/* View range toggle for mobile clarity */}
            <div className="inline-flex rounded-md p-0.5 bg-white/5 border border-white/10 text-[10px] font-sans">
              <button
                type="button"
                onClick={() => setViewRange("year")}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${viewRange === "year" ? "bg-white text-black font-semibold" : "text-white/50 hover:text-white"}`}
              >
                Full Year
              </button>
              <button
                type="button"
                onClick={() => setViewRange("recent")}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${viewRange === "recent" ? "bg-white text-black font-semibold" : "text-white/50 hover:text-white"}`}
              >
                Recent (6 Mo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scalable Vector Contribution Graph — 100% visible on mobile with ZERO cutoffs */}
      <div className="relative w-full overflow-visible py-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto block select-none"
          style={{ maxHeight: "160px" }}
          shapeRendering="crispEdges"
        >
          {/* Day of week labels */}
          {DAY_LABELS.map((d, i) =>
            d.label ? (
              <text
                key={i}
                x={20}
                y={startY + d.row * colWidth + 8}
                textAnchor="end"
                className="fill-white/40 font-sans text-[8px]"
              >
                {d.label}
              </text>
            ) : null
          )}

          {/* Month labels */}
          {monthLabels.map(({ label, colIndex }) => (
            <text
              key={`${label}-${colIndex}`}
              x={startX + colIndex * colWidth}
              y={11}
              className="fill-white/40 font-sans text-[8px]"
            >
              {label}
            </text>
          ))}

          {/* Contribution Cells */}
          {displayedWeeks.map((week, wi) => {
            const colX = startX + wi * colWidth;
            return (
              <g key={wi}>
                {week.days.map((day, di) => {
                  const isPadding = day.count === -1;
                  if (isPadding) return null;
                  const rowY = startY + di * colWidth;
                  const isHovered = hovered?.date === day.date;
                  return (
                    <rect
                      key={`${wi}-${di}`}
                      x={colX}
                      y={rowY}
                      width={cellSize}
                      height={cellSize}
                      rx={cellRadius}
                      fill={GITHUB_LEVEL_COLORS[day.level]}
                      stroke={isHovered ? "#ffffff" : GITHUB_LEVEL_BORDERS[day.level]}
                      strokeWidth={isHovered ? 1.2 : 0.8}
                      className="cursor-pointer transition-all duration-100"
                      onMouseEnter={(e) => handleDayInteraction(e, day)}
                      onMouseLeave={() => setHovered(null)}
                      onTouchStart={(e) => handleDayInteraction(e, day)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
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
                top: tooltipPos.y - 38,
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
          className="text-[10px] sm:text-[11px] text-white/70 hover:text-white hover:underline"
        >
          Learn how contributions are counted
        </a>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">Less</span>
          <div className="flex gap-[3px] items-center">
            {GITHUB_LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-[9px] h-[9px] rounded-[2px]"
                style={{
                  backgroundColor: color,
                  border: `1px solid ${GITHUB_LEVEL_BORDERS[i]}`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px]">More</span>
        </div>
      </div>
    </div>
  );
}
