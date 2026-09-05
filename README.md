# Bee AI 4.1 Pro

A polished ChatGPT-style Bee AI interface using Gemini through a secure server-side API key.

## Render
Build command:
npm install

Start command:
npm start

Environment variables:
GEMINI_API_KEY = your Gemini API key
GEMINI_MODEL = gemini-3.8-flash

Never put your real API key in frontend files or GitHub.

## What's new
- Premium dark liquid-glass UI with animated glass sheen
- Subtle black animated wallpaper made with CSS (no external image required)
- Responsive mobile sidebar
- Search chats
- Rename and delete chats
- Local chat persistence
- Markdown/code rendering with Copy buttons
- Typing indicator
- Better empty state and quick prompts
- Settings panel
- Compact mode
- Enter-to-send option
- 429-friendly Gemini handling with limited retry/backoff
- Smaller conversation context to reduce unnecessary token usage

- Smooth entrance, hover, logo, background and typing animations
- `prefers-reduced-motion` support for users who disable motion

- 4.3 performance pass: lighter backdrop blur, slower background animation, no per-message entrance animation, debounced chat search, capped sidebar rendering, and background animation pauses when the tab is hidden.
- Visual style remains the same dark liquid-glass design.

- 4.4 ultra-light mode: decorative background animation removed, liquid-glass blur removed from major panels, static dark glass surfaces retained for a much lighter GPU load.

- 4.5 ULTRA FAST: all decorative animations, animated background, radial glow layers, and blur/glass filters removed. Uses simple opaque dark panels for maximum browser performance.
