import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/knowledgeBase";

/**
 * Server route — API klíč zůstává jen na serveru, nikdy nejde do prohlížeče.
 * Nastavte ANTHROPIC_API_KEY v .env.local / Vercel env proměnných.
 * Klíč získáte na https://console.anthropic.com (Settings → API Keys).
 * Používá model claude-haiku-4-5 — rychlý a levný, dobrý na FAQ bota.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Chat asistent zatím není nastavený (chybí API klíč na serveru). Napište nám prosím přímo na info@chatanaseraku.cz.",
      },
      { status: 200 }
    );
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Chybí zpráva." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        {
          reply:
            "Omlouváme se, chat teď neodpovídá. Napište nám prosím na info@chatanaseraku.cz.",
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply = data.content?.find((b: { type: string }) => b.type === "text")?.text
      ?? "Omlouváme se, nerozumím. Zkuste to prosím jinak, nebo napište na info@chatanaseraku.cz.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      {
        reply:
          "Omlouváme se, chat teď neodpovídá. Napište nám prosím na info@chatanaseraku.cz.",
      },
      { status: 200 }
    );
  }
}
