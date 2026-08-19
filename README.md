# Zipline × EdoMatch — Recruitment Landing Page (Côte d'Ivoire)

Single-page, bilingual (FR/EN) landing page for the Meta ad campaign.
EdoMatch is hiring **60 people across 6 roles** at Zipline's 3 new
Côte d'Ivoire locations.

**Target domain:** `www.zipline-recruitment-edomatch.com`

---

## Deploy to Railway

No build step, no environment variables, no services to provision.

1. Railway → **New Project** → **Deploy from GitHub repo** → `edo-group/zipline-recruitment`
2. Railway auto-detects Node via Nixpacks and runs `npm start` (see `railway.json`).
   **Do not set `PORT`** — Railway injects it and `server.js` reads it.
3. Wait for the build, then open the generated `*.up.railway.app` URL and confirm
   the page loads with French accents rendering correctly (`Côte d'Ivoire`, not `CÃ´te`).
4. **Settings → Networking → Custom Domain** → add `www.zipline-recruitment-edomatch.com`
5. At the DNS provider, create the `CNAME` Railway shows you.
   Add a redirect (or a second domain entry) for the apex `zipline-recruitment-edomatch.com`.
6. TLS is issued automatically once DNS resolves.

Health check is `GET /` → 200 (configured in `railway.json`).

### Verify after deploy

```bash
curl -sI https://www.zipline-recruitment-edomatch.com/ | head -1        # 200
curl -s  https://www.zipline-recruitment-edomatch.com/ | grep -c Biankouma  # > 0
```

---

## Stack

Zero dependencies. `server.js` is a ~40-line Node static server. `index.html` is
fully self-contained — all CSS, JS, logos and images are inlined, so the page
makes **no external requests**. That keeps it fast on Ivorian mobile data, which
is where the Meta traffic lands.

| File | Purpose |
|---|---|
| `index.html` | The entire site |
| `server.js` | Static server; reads `PORT`, falls back to 8080 |
| `railway.json` | Build + deploy config |
| `robots.txt`, `sitemap.xml` | Served at their paths |
| `cr-full.jpg` | Source copy of the ad creative (not loaded at runtime) |

## Run locally

```bash
npm start
# http://localhost:8080
```

---

## What's on the page

Section order is deliberate: the **6 roles come first**, directly under the hero,
so ad traffic can apply without scrolling. Everything else sits below.

1. Hero — phone mockup of the Instagram ad, so arrivals recognise the creative
2. **The 6 roles**, each linking to its live application form on edomatch.com
3. "None of these fit you? Sign up anyway" → `edomatch.com/jobs`
4. Zipline's story (B1 reading level, written for Ivorian readers)
5. The 3 locations: **Biankouma · Kouto · San Pédro** (20 hires each)
6. What you get — housing allowance for relocation, training, career
7. Referral block — WhatsApp share with a pre-written message, plus copy link

FR is the default, EN via the toggle, choice remembered in `localStorage`.
Light and dark themes, all text/background pairs pass WCAG AA.

## Content rules

These are deliberate. Please keep them if you edit:

- **No salary figures anywhere.** Housing allowance for relocation only.
- **No qualifications or years of experience** on the role cards — they describe
  the work instead, so nobody screens themselves out before applying.
- **Never the word "hubs"** — the page says *sites* (FR) / *locations* (EN) and
  defines it once. The `#hubs` id and `.hub` classes are internal names only.
- **Daloa is not mentioned.** It is the training centre, not a hiring location.

## Editing the copy

Every translatable string is a pair:

```html
<span lang="fr">Texte français</span>
<span lang="en">English text</span>
```

Edit both halves so the toggle stays in sync, then commit and push — Railway
redeploys automatically.

### Watch out

`.route > svg` is deliberately a direct-child selector. Changing it to
`.route svg` also matches every icon inside the phone mockup and blows them
up to full width.

---

## Before the campaign goes live

- [ ] Deploy to Railway and confirm the `*.up.railway.app` URL loads
- [ ] Point `www.zipline-recruitment-edomatch.com` at it
- [ ] **Replace the ad creatives in the phone mockup** — see `AD-CREATIVE.md`.
      Both slots currently hold a placeholder.
- [ ] **Check the towns named in the ad creatives match the page**
      (Biankouma · Kouto · San Pédro), or candidates apply to the wrong place.
