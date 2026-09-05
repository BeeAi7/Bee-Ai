# Bee AI 3.0

Full Bee AI chat interface with:
- Gemini API backend
- ChatGPT-style dark UI
- New chat / recent chats / search / delete
- Local chat history
- Markdown-like rendering
- One-click copy buttons for fenced code
- Settings (dark mode, Enter-to-send, delete chats)
- Profile editor
- Responsive mobile sidebar
- Render-compatible server

## Render Environment Variables
GEMINI_API_KEY = your Gemini API key
GEMINI_MODEL = gemini-3.8-flash

Never commit a real API key to GitHub.

## Deploy
Build: npm install
Start: npm start

## Google Login
A true Google OAuth login requires a Google OAuth Client ID and redirect/session configuration. This starter keeps profile settings working without pretending that a local profile editor is Google authentication.
