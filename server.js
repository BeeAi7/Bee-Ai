const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "Bee AI" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.chat.completions.create({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      messages: [
        {
          role: "system",
          content:
            "You are Bee AI, a helpful, friendly and smart AI assistant. Give clear and useful answers."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "Bee AI could not process your request."
    });
  }
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Bee AI running on port ${PORT}`);
});