# Bee AI 5.1 Full Project

## Run locally
1. Install Node.js.
2. Open this folder in a terminal.
3. Run: npm install
4. Copy `.env.example` to `.env`
5. Put your Gemini API key in `.env` (never share the key).
6. Run: npm start
7. Open http://localhost:10000

## Render
- Build Command: npm install
- Start Command: npm start
- Add GEMINI_API_KEY in Render Environment Variables.
- Add GEMINI_MODEL=gemini-3.8-flash

The frontend calls `/api/chat`, so the API key stays on the server.
