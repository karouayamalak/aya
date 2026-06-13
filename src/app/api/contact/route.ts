import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const filePath = path.join(process.cwd(), "src/data/contacts.json");

async function readContacts(): Promise<ContactMessage[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading contact list, using fallback:", e);
    return [];
  }
}

async function writeContacts(contacts: ContactMessage[]) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing contact message to file:", e);
  }
}

// ─── Supabase helper (lazy — only if env vars exist and are real) ──────────────
async function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let key = process.env.SUPABASE_SERVICE_ROLE_KEY;
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

// ─── Resend email notification ─────────────────────────────────────────────────
async function sendEmailNotification(msg: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silently skip if key not configured

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "a_karou@estin.dz",
      replyTo: msg.email,
      subject: `✉️ New message from ${msg.name} — Portfolio`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #0a0a0a; color: #fff; border-radius: 12px;">
          <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 4px;">New contact message</h2>
          <p style="font-size: 12px; color: #666; margin: 0 0 24px;">Received at ${new Date(msg.created_at).toLocaleString("en-GB", { timeZone: "Africa/Algiers" })}</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; width: 90px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; font-size: 14px;">${msg.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; font-size: 14px;"><a href="mailto:${msg.email}" style="color: #aaa;">${msg.email}</a></td>
            </tr>
          </table>
          <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #ddd;">${msg.message}</div>
          <p style="font-size: 11px; color: #444; margin-top: 24px;">Hit Reply to respond directly to ${msg.name}.</p>
        </div>
      `,
    });
  } catch (e) {
    // Don't fail the whole request if email sending fails
    console.error("Resend email error (non-fatal):", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const newMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 150),
      message: String(message).slice(0, 2000),
      created_at: new Date().toISOString(),
    };

    const supabase = await getSupabase();
    if (supabase) {
      const { error } = await supabase.from("contacts").insert([newMessage]);
      if (error) {
        const { error: error2 } = await supabase.from("contact_messages").insert([newMessage]);
        if (error2) {
          return NextResponse.json({ error: error2.message }, { status: 500 });
        }
      }
    } else {
      const contacts = await readContacts();
      contacts.push(newMessage);
      await writeContacts(contacts);
    }

    // Send email notification (non-blocking, non-fatal)
    await sendEmailNotification(newMessage);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
