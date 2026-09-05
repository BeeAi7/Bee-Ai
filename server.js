const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "Bee AI", aiConfigured: Boolean(process.env.GEMINI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: "Gemini API key is not configured on the server." });
    }

    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required." });
    }

    const safeMessages = messages
      .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-30)
      .map(m => ({ role: m.role, content: m.content.slice(0, 20000) }));

    const response = await client.chat.completions.create({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      messages: [
        {
          role: "system",
          content:
            "You are Bee AI, a helpful, friendly and capable AI assistant. " +
            "Use Markdown. When giving programming code, ALWAYS put each code sample inside a fenced Markdown code block with the correct language when possible. " +
            "Be concise but useful. Never expose server secrets or API keys."
        },
        ...safeMessages
      ]
    });

    res.json({ reply: response.choices?.[0]?.message?.content || "I couldn't generate a response." });
  } catch (error) {
    console.error("Gemini Error:", error?.message || error);
    res.status(500).json({ error: "Bee AI could not process your request. Check the Render logs and Gemini key/model settings." });
  }
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Bee AI running on port ${PORT}`);
});
