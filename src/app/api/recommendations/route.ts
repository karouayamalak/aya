import { NextRequest, NextResponse } from "next/server";

// ─── In-memory fallback for local dev (no Supabase env) ──────────────────────
const localStore: Recommendation[] = [];

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
  created_at: string;
}

// ─── Supabase helper (lazy — only if env vars exist and are real) ──────────────
async function getSupabase() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === "your_supabase_project_url" || !url.startsWith("https://")) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(url, key);
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e);
    return null;
  }
}

// ─── GET /api/recommendations ─────────────────────────────────────────────────
export async function GET() {
  const supabase = await getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data ?? []);
  }

  // Local fallback
  return NextResponse.json([...localStore].reverse());
}

// ─── POST /api/recommendations ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, role, comment, avatar, rating } = body;

  if (!name || !role || !comment) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: Recommendation = {
    id: crypto.randomUUID(),
    name: String(name).slice(0, 80),
    role: String(role).slice(0, 100),
    comment: String(comment).slice(0, 600),
    avatar: String(avatar || ""),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    created_at: new Date().toISOString(),
  };

  const supabase = await getSupabase();

  if (supabase) {
    const { error } = await supabase.from("recommendations").insert([entry]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(entry, { status: 201 });
  }

  // Local fallback
  localStore.push(entry);
  return NextResponse.json(entry, { status: 201 });
}
