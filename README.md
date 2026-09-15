# 🍽️ Ohrid Restaurant — Website

Welcome! This is the presentation website of **Ohrid Restaurant**, a cozy fictional
family restaurant — and a university software engineering project that takes you
from an empty folder to a fully working, two-language, database-backed web app.

**What you'll find here:**

- 🏠 **8 pages** — Home, About, Menu, Services, Team, News, article pages, Contact
- 🌍 **2 languages** — English and Macedonian behind one global EN/МК
  switcher (no duplicated pages, everything translates instantly)
- 🗄️ **Real data** — menu dishes, team members and news articles served by a
  REST API from a local SQLite database, with photos and trilingual descriptions
- ✉️ **Working contact form** — validated in the browser *and* on the server,
  with loading, success and error states, stored in the database
- 🍪 **Cookie banner** — remembers only your choice, locally. Zero tracking.
- 📱 **Responsive** — comfortable on phones, tablets and desktops

## ⚡ Start here: one command, whole app

The fastest way to see everything working. This single command builds and starts
**both services** — backend API and website (the database is a SQLite file,
no database server needed):

```bash
docker compose up --build
```

That's it. Give it a few minutes the first time (it downloads images and
installs dependencies), then open:

👉 **http://localhost:8080**

You are looking at the complete product: the nginx web server in the
`frontend` container serves the site, forwards every `/api/*` call to the
`backend` container (Fastify), which reads from a SQLite file persisted in
the `sqlite-data` volume.
One address, no CORS headaches, no manual wiring.

**What happens behind the scenes on first boot:**

1. 🗄️ `backend` applies Prisma migrations to the SQLite file (data lives in
   the named `sqlite-data` volume, so it survives restarts) and — only if the
   database is empty — seeds 6 dishes, 3 team members, 3 news
   articles and 2 sample messages
2. 🌐 `frontend` serves the built site and proxies the API

**Everyday Docker commands:**

```bash
docker compose ps                # are both services Up?
docker compose logs -f backend   # peek inside one service (frontend too)
docker compose down              # stop everything, keep your data
```

## 🛠️ Tech stack

| Layer | What's inside |
|-------|---------------|
| 🎨 Frontend | React 18, TypeScript, Vite, React Router 6, Tailwind CSS + custom CSS |
| ⚙️ Backend | Node.js 22, Fastify 4, TypeScript, Zod validation, Prisma 5 |
| 🗃️ Database | SQLite file (`src/backend/prisma/dev.db` locally) with migrations + trilingual seed data |
| 📦 Delivery | Docker + Docker Compose (one command starts everything) |
| 📁 Repo | npm workspaces monorepo: `src/frontend` + `src/backend` |

## 🗺️ Project tour

```text
restaurant/
  docker-compose.yml          # ⚙️ backend + 🌐 frontend (the single entry point; SQLite file in a volume)
  .env.example                # safe placeholder config — copy to .env, never commit secrets
  package.json                # workspaces + shared scripts (dev, build, typecheck, db:*)
  src/
    frontend/
      vite.config.ts          # dev on :5173, /api proxied to the backend
      src/
        main.tsx / App.tsx    # 🌍 LanguageProvider + Router + Layout
        api/                  # typed clients: menu, team, news, contact (no fetch in components!)
        i18n/                 # en/mk dictionaries + language context + pick() helper
        components/           # Header, Footer, Hero, *Cards, ContactForm, CookieBanner, …
        pages/                # Home, About, Menu, Services, Team, News, NewsDetail, Contact
        styles/               # variables → base → layout → components → responsive
      public/images/          # 📸 restaurant photos (served as /images/…)
      Dockerfile + nginx.conf # production image: static files + /api proxy, SPA fallback
    backend/
      prisma/
        schema.prisma         # MenuItem, TeamMember, NewsPost, ContactMessage
        migrations/           # versioned SQL — the history of the database
        seed.ts               # bilingual demo content (idempotent, safe to re-run)
      src/
        server.ts / app.ts    # bootstrap + Fastify wiring
        routes/ → controllers/ → services/ → repositories/
                              # thin routes, Zod validation, business logic, Prisma only here
        schemas/              # every external input validated: body, query, params
        plugins/errorHandler.ts  # friendly 400s, silent 500s (no stack leaks, ever)
      Dockerfile + entrypoint.sh  # migrate → seed-if-empty → serve
```

## 🧑‍💻 Developing locally (no Docker needed)

The database is just a file — no database server to install or start:

```bash
npm install                  # install all workspaces

cp src/backend/.env.example src/backend/.env
# default already points at the local SQLite file:
#   DATABASE_URL="file:./dev.db"

cd src/backend && npx prisma migrate dev && npx prisma db seed && cd ../..
npm run dev:backend          # terminal 1 → API on http://localhost:3000
npm run dev:frontend         # terminal 2 → site on http://localhost:5173
```

> 💡 Seeing "could not load" panels in the browser? The frontend is fine — your
> backend probably isn't running. Check terminal 1.

## 🔌 API reference

Base URL `http://localhost:3000` (or `http://localhost:8080/api/*` via the
Docker frontend — same API, proxied). Everything speaks JSON.

| Method | Endpoint | What you get |
|--------|----------|--------------|
| GET | `/api/health` | `200 {"status":"ok"}` — is it alive? |
| GET | `/api/menu?category=&availableOnly=` | `200` dishes, id asc (`availableOnly` defaults `true`) |
| GET | `/api/menu/:id` | `200` one dish (price as a number) · `400` bad id · `404` |
| GET | `/api/team` | `200` the crew, `sortOrder` asc |
| GET | `/api/news` | `200` articles, newest first |
| GET | `/api/news/:slug` | `200` full article (slugs are case-sensitive) · `400` · `404` |
| POST | `/api/contact` | `201 {"id","message":"Message received"}` · `400` + per-field `issues[]` · `429` if too chatty |

The contact endpoint validates name (2–80), email, optional phone
(`^[+0-9 ()-]{6,20}$`), subject (3–120) and message (10–2000) — trimmed, in
both the form and the API — and is rate-limited (~10/15 min per IP, only there).

```bash
curl http://localhost:8080/api/menu | head -c 300; echo
curl -X POST http://localhost:8080/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ana","email":"ana@example.com","subject":"Table for Friday","message":"A table for two, please!"}'
```

## 🧠 Design notes worth knowing

- **Languages without duplication:** UI strings live in three JSON dictionaries;
  database rows carry `…En/…Mk` columns picked at render time with English
  fallback. One component tree serves all languages.
- **Validation twice, errors once:** the form mirrors the Zod rules for instant
  feedback; the server re-validates everything and returns field-level issues
  the form displays. Never trust the browser alone.
- **Images just work:** drop a file in `public/images/` and reference
  `/images/name.jpg` — from a card or from `seed.ts`. Missing DB images fall
  back to local placeholders instead of breaking.
- **Migrations, not magic:** every schema change ships as a versioned SQL file;
  `migrate deploy` runs automatically inside the backend container.

## 📜 Handy commands

```bash
npm run dev / build / typecheck        # everything, via workspaces
npm run dev:frontend | dev:backend     # one app, with hot reload
npm run up | down | logs               # the Docker app stack
npm run db:seed                        # (in src/backend) reseed demo content
npx prisma studio                      # (in src/backend) DB in your browser :5555
```

> Never commit `*.db` / `*.sqlite` files — they are local data (gitignored).

## 🩺 Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Could not load" panels | Backend down — start it, check its terminal |
| `DATABASE_URL not found` | Copy `src/backend/.env.example` → `.env` |
| Port busy (`:3000`/`:5173`/`:8080`) | Stop the other instance, or set `PORT=` / `FRONTEND_PORT=` |
| Prisma type errors after schema edits | `npx prisma generate` (or `migrate dev`) in `src/backend` |
| Need a clean database | Delete `src/backend/prisma/dev.db` then `npx prisma migrate dev` (host dev) |

## 🎓 About

Faculty of Computer Science and Engineering

Subject name: Business Practice

