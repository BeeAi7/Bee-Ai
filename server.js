const express = require("express");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "Bee AI" });
});

// AI chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions:
        "You are Bee AI, a helpful, friendly and smart AI assistant. Give clear and useful answers.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "Bee AI could not process your request."
    });
  }
});

// Send all other routes to the website
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Render gives us PORT automatically.
// 10000 is the normal Render default.
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Bee AI running on port ${PORT}`);
});