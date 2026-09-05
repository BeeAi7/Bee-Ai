import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured. Add it to .env."
      });
    }

    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const input = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "")
    }));

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions: "You are Bee AI, a helpful, friendly AI assistant. Be clear, accurate, concise, and age-appropriate.",
      input
    });

    res.json({ text: response.output_text || "I couldn't generate a response." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Bee AI could not reach the AI service. Check your .env configuration."
    });
  }
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Bee AI running on http://localhost:" + PORT);
});
