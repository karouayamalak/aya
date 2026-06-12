import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
  rating: number;
  created_at: string;
}

const filePath = path.join(process.cwd(), "src/data/recommendations.json");

async function readLocalRecommendations(): Promise<Recommendation[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading local recommendations, using fallback:", e);
    return [];
  }
}

async function writeLocalRecommendations(recs: Recommendation[]) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(recs, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing local recommendations:", e);
  }
}

// ─── Supabase helper (lazy — only if env vars exist and are real) ──────────────
async function getSupabase() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let key  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key || key === "your_supabase_service_role_key") {
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
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
  const localRecs = await readLocalRecommendations();

  if (supabase) {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // If Supabase fails, fallback to local
      console.error("Supabase read error, falling back to local:", error);
      const sortedRecs = [...localRecs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return NextResponse.json(sortedRecs);
    }
    
    // Merge local recommendations and db recommendations
    const dbRecs = data ?? [];
    const merged = [...dbRecs];
    const dbIds = new Set(dbRecs.map(r => r.id));
    for (const lr of localRecs) {
      if (!dbIds.has(lr.id)) {
        merged.push(lr);
      }
    }
    merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json(merged);
  }

  // Local file fallback
  const sortedRecs = [...localRecs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return NextResponse.json(sortedRecs);
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

  // Local file fallback
  const recs = await readLocalRecommendations();
  recs.push(entry);
  await writeLocalRecommendations(recs);
  return NextResponse.json(entry, { status: 201 });
}
