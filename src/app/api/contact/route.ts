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

    const contacts = await readContacts();
    contacts.push(newMessage);
    await writeContacts(contacts);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
