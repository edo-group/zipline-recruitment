# Zipline × EdoMatch — Recruitment Landing Page (Côte d'Ivoire)

Single-page, bilingual (FR/EN) landing page for the Meta ad campaign.
EdoMatch is hiring 60 people across Zipline's 3 new Côte d'Ivoire hubs.

**Target domain:** `www.zipline-recruitment-edomatch.com`

## What's on the page

- Hero + animated flight route across the 3 hubs
- Zipline brand story & Africa mission (short)
- Hubs: **Biankouma · Kouto · San Pédro** (20 hires each). Interviews are online; training runs at Zipline's Daloa hub before you start.
- 6 roles, each linking to its live application form on edomatch.com
- Housing allowance for relocation (**no salary figures anywhere on the page**)
- Referral block with WhatsApp / Facebook / copy-link sharing
- FR default, EN toggle, remembered in localStorage. Light + dark theme.

## Stack

Zero dependencies. `server.js` is a plain Node static server; `index.html` is fully
self-contained (logos and all CSS/JS inlined — no external requests).

## Run locally

```bash
npm start
# http://localhost:8080
```

## Deploy to Railway

1. Push this repo to GitHub.
2. Railway → **New Project** → **Deploy from GitHub repo** → pick this repo.
3. No environment variables needed. Railway sets `PORT`; the server reads it.
4. Wait for the build, confirm the generated `*.up.railway.app` URL works.
5. **Settings → Networking → Custom Domain** → add `www.zipline-recruitment-edomatch.com`.
6. At your DNS provider, add the `CNAME` record Railway shows you.
   Add a redirect (or second domain entry) for the apex `zipline-recruitment-edomatch.com`.
7. TLS is issued automatically once DNS resolves.

## Editing the copy

All content lives in `index.html`. Every translatable string is a pair:

```html
<span lang="fr">Texte français</span>
<span lang="en">English text</span>
```

Edit both halves so the toggle stays in sync, then commit and push — Railway redeploys.

## Notes

- The hero photo is inlined in `index.html`; `hero.jpg` is the source copy. See `HERO-PHOTO.md`.
- Colours: Zipline brand (cream `#F7F4E8`, violet `#6C3FFF`) for the body;
  EdoMatch (black `#0D0D0D`, green `#5AA946`) for header, footer and referral block.
- No salary figures anywhere on the page — housing allowance only.
