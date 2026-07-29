"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, X, Send, Mail } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Dobrý den! Jmenuji se Jiří a jsem virtuální pomocník Chaty na Šeráku. Protože na chatě není vždy spolehlivý mobilní signál, jsem tu, abych vám pomohl s dotazy ohledně check-inu, storno podmínek, restaurace nebo čehokoliv dalšího. Pokud si s vaším dotazem nebudu vědět rady, předám ho přímo na e-mail info@chatanaseraku.cz.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Omlouváme se, něco se pokazilo. Napište nám na info@chatanaseraku.cz.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const mailtoHref = (() => {
    const transcript = messages
      .filter((m) => m !== GREETING)
      .map((m) => `${m.role === "user" ? "Host" : "Asistent"}: ${m.content}`)
      .join("\n\n");
    const body = transcript
      ? `Dotaz z chatu na webu:\n\n${transcript}`
      : "Dobrý den, mám dotaz ohledně...";
    return `mailto:info@chatanaseraku.cz?subject=${encodeURIComponent(
      "Dotaz z webu"
    )}&body=${encodeURIComponent(body)}`;
  })();

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2.5rem))] rounded-sm bg-[var(--snow-50)] shadow-2xl flex flex-col overflow-hidden max-h-[70vh]">
          <div className="bg-[var(--spruce-950)] px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--snow-50)]">
              Asistent Chaty na Šeráku
            </p>
            <button
              aria-label="Zavřít chat"
              onClick={() => setOpen(false)}
              className="text-[var(--mist-100)] hover:text-[var(--amber-300)]"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[240px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-sm px-3 py-2 max-w-[85%] ${
                  m.role === "user"
                    ? "bg-[var(--amber-500)] text-[var(--spruce-950)] ml-auto"
                    : "bg-[var(--mist-100)] text-[var(--spruce-950)]"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-[var(--granite-600)] px-3">Píšu odpověď…</div>
            )}
          </div>

          <div className="border-t border-[var(--granite-300)]/40 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Napište dotaz…"
                className="flex-1 rounded-sm border border-[var(--granite-300)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--amber-500)]"
              />
              <button
                onClick={sendMessage}
                aria-label="Odeslat"
                disabled={loading}
                className="rounded-sm bg-[var(--amber-500)] px-3 text-[var(--spruce-950)] hover:bg-[var(--amber-300)] disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <a
              href={mailtoHref}
              className="mt-2 flex items-center gap-1.5 text-xs text-[var(--granite-600)] hover:text-[var(--amber-500)] transition-colors"
            >
              <Mail size={13} />
              Poslat dotaz e-mailem na info@chatanaseraku.cz
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Zavřít chat" : "Otevřít chat"}
        className="w-14 h-14 rounded-full bg-[var(--amber-500)] text-[var(--spruce-950)] shadow-lg flex items-center justify-center hover:bg-[var(--amber-300)] transition-colors"
      >
        {open ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
}
