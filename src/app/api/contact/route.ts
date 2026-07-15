import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const messageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  const result = messageSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) return NextResponse.json({ error: "Invalid message" }, { status: 400 });

  const db = createSupabaseAdminClient();
  if (!db) {
    if (process.env.NODE_ENV === "development") {
      console.info("Contact message received in local mode", { ...result.data, message: "[redacted]" });
      return NextResponse.json({ ok: true, local: true });
    }
    return NextResponse.json({ error: "Contact service is not configured" }, { status: 503 });
  }

  const { error } = await db.from("messages").insert(result.data);
  if (error) return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
