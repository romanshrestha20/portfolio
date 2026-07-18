import { CheckCheck, MailCheck } from "lucide-react";
import DestructiveSubmitButton from "@/components/admin/DestructiveSubmitButton";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  clearMessages,
  deleteMessage,
  markAllMessagesRead,
  markMessageRead,
} from "../../actions";

type Message = { id: string; name: string; email: string; message: string; read: boolean; created_at: string };
export default async function MessagesPage() {
  const db = createSupabaseAdminClient();
  const { data } = db ? await db.from("messages").select("*").order("created_at", { ascending: false }) : { data: [] };
  const messages = (data ?? []) as Message[];
  const unreadCount = messages.filter((message) => !message.read).length;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="admin-kicker">03 / Incoming transmissions</p>
      <h1 className="admin-title">Messages</h1>
      <p className="admin-subtitle">Contact requests received through the public portfolio.</p>

      {messages.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-500">
            {messages.length} total / {unreadCount} unread
          </p>
          <div className="flex flex-wrap gap-3">
            {unreadCount > 0 && (
              <form action={markAllMessagesRead}>
                <button className="signal-button">
                  <CheckCheck className="h-4 w-4" />Mark all read
                </button>
              </form>
            )}
            <form action={clearMessages}>
              <DestructiveSubmitButton
                label="Clear messages"
                confirmation={`Permanently delete all ${messages.length} messages? This cannot be undone.`}
              />
            </form>
          </div>
        </div>
      )}

      <div className={messages.length > 0 ? "" : "mt-10 border-t border-white/10"}>
        {messages.map((message) => (
          <article key={message.id} className={`border-b border-white/10 py-7 transition-opacity ${message.read ? "opacity-60" : ""}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-white">{message.name}</p>
                <a href={`mailto:${message.email}`} className="text-sm text-signal">{message.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <time className="text-xs text-zinc-500">{new Date(message.created_at).toLocaleString()}</time>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <DestructiveSubmitButton
                    compact
                    label={`Delete message from ${message.name}`}
                    confirmation={`Permanently delete the message from ${message.name}?`}
                  />
                </form>
              </div>
            </div>
            <p className="mt-5 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-zinc-300">{message.message}</p>
            {!message.read && (
              <form action={markMessageRead} className="mt-5">
                <input type="hidden" name="id" value={message.id} />
                <button className="signal-button"><MailCheck className="h-4 w-4" />Mark as read</button>
              </form>
            )}
          </article>
        ))}
      </div>

      {messages.length === 0 && <p className="mt-10 text-sm text-zinc-500">No messages yet.</p>}
    </div>
  );
}
