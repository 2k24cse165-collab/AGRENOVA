const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const languageNames = {
  en: "English",
  ta: "Tamil",
  hi: "Hindi",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
};

export async function chatWithAssistant(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "OpenRouter is not configured. Add OPENROUTER_API_KEY to server/.env." });
  }

  const language = languageNames[req.body?.language] ? req.body.language : "en";
  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = incoming
    .filter((message) => ["user", "assistant"].includes(message?.role) && typeof message?.content === "string")
    .slice(-10)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 4000) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "A user message is required." });
  }

  const systemPrompt = `You are AgriLink's multilingual agricultural marketplace assistant. Reply only in ${languageNames[language]}. Help farmers and buyers with crop information, marketplace listings, orders, pricing concepts, and how to use the AgriLink application. Do not invent live marketplace data, prices, orders, or account information. If a user asks for something that requires their account or current data, explain that they should check the relevant AgriLink page. Keep answers practical and concise. For agricultural advice, give general informational guidance and mention when a local agricultural expert is appropriate.`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(process.env.OPENROUTER_SITE_URL ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL } : {}),
        ...(process.env.OPENROUTER_APP_NAME ? { "X-Title": process.env.OPENROUTER_APP_NAME } : {}),
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const detail = data?.error?.message || "OpenRouter request failed.";
      return res.status(response.status >= 500 ? 502 : response.status).json({ error: detail });
    }

    const message = data?.choices?.[0]?.message?.content;
    if (!message) return res.status(502).json({ error: "OpenRouter returned an empty response." });
    return res.json({ message });
  } catch (error) {
    console.error("OpenRouter error:", error);
    return res.status(502).json({ error: "Unable to reach OpenRouter right now." });
  }
}
