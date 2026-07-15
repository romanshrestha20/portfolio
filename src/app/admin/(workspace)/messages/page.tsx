import { MailCheck } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { markMessageRead } from "../../actions";

type Message = { id: string; name: string; email: string; message: string; read: boolean; created_at: string };
export default async function MessagesPage() {
  const db = createSupabaseAdminClient();
  const { data } = db ? await db.from("messages").select("*").order("created_at", { ascending: false }) : { data: [] };
  const messages = (data ?? []) as Message[];
  return <div className="mx-auto max-w-5xl"><p className="admin-kicker">Inbox</p><h1 className="admin-title">Messages</h1><p className="admin-subtitle">Contact requests received through the public portfolio.</p><div className="mt-10 border-t border-white/10">{messages.map((message) => <article key={message.id} className={`border-b border-white/10 py-7 ${message.read ? "opacity-60" : ""}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-semibold text-white">{message.name}</p><a href={`mailto:${message.email}`} className="text-sm text-[#b8ff47]">{message.email}</a></div><time className="text-xs text-zinc-500">{new Date(message.created_at).toLocaleString()}</time></div><p className="mt-5 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-zinc-300">{message.message}</p>{!message.read && <form action={markMessageRead} className="mt-5"><input type="hidden" name="id" value={message.id} /><button className="admin-secondary"><MailCheck className="h-4 w-4" />Mark as read</button></form>}</article>)}</div>{messages.length === 0 && <p className="mt-10 text-sm text-zinc-500">No messages yet.</p>}</div>;
}
