# 🍽️ Ohrid Restaurant — Website

Welcome! This is the presentation website of **Ohrid Restaurant**, a cozy fictional
family restaurant — and a university software engineering project: a modern,
two-language, fully responsive React site for a small restaurant.

**What you'll find here:**

- 🏠 **8 pages** — Home, About, Menu, Services, Team, News, article pages, Contact
- 🌍 **2 languages** — English and Macedonian behind one global EN/МК
  switcher (no duplicated pages, everything translates instantly)
- 🗄️ **Real content** — menu dishes, team members and news articles with photos
  and bilingual text, sourced from typed data modules in the frontend
- ✉️ **Contact form** — fully validated in the browser with loading, success and
  error states; a valid submission opens the user's email client prefilled
- 🍪 **Cookie banner** — remembers only your choice, locally. Zero tracking.
- 📱 **Responsive** — comfortable on phones, tablets and desktops
- ✨ **Tasteful motion** — hero entrance, scroll reveals, hover effects and page
  transitions, all respecting `prefers-reduced-motion`

## ⚡ Start here: one command, whole app

The fastest way to see everything working: build the React app and serve it
through nginx, with SPA-friendly routing and caching.

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

Give it a couple of minutes the first time (it installs dependencies and builds
the site), then open:

👉 **http://localhost:8080**

The `frontend` container builds the site with Vite and serves the static output
with nginx. There is no backend service and no database server: the restaurant
data ships as static TypeScript modules inside the frontend (see
[Where the data lives](#-where-the-data-lives)).

**Everyday Docker commands:**

```bash
docker compose ps                # is the frontend service Up?
docker compose logs -f frontend  # peek inside the container
docker compose down              # stop everything
```

> On the RepoRun platform the base `docker-compose.yml` + `stack.yml` are used
> directly; the local override only adds the `localhost:8080` port mapping.

## 🛠️ Tech stack

| Layer | What's inside |
|-------|---------------|
| 🎨 Frontend | React 18, TypeScript, Vite, React Router 6, Tailwind CSS + custom CSS |
| 🗃️ Data | Typed in-memory modules (`src/frontend/src/api/*`) — no backend, no database |
| 📦 Delivery | Docker + Docker Compose + nginx (one command builds and serves the site) |
| 📁 Repo | npm workspaces monorepo: `src/frontend` |

## 🗺️ Project tour

```text
restaurant/
  docker-compose.yml          # 🐳 frontend build/serve stack (RepoRun entry point)
  docker-compose.local.yml    # local override: publishes the site on :8080
  stack.yml                   # RepoRun ingress: route traffic to the frontend
  .env.example                # safe placeholder config — copy to .env, never commit secrets
  package.json                # workspaces + shared scripts (dev, build, typecheck, up, down)
  src/
    frontend/
      vite.config.ts          # dev server on :5173
      index.html
      src/
        main.tsx / App.tsx    # 🌍 LanguageProvider + Router + Layout
        api/                  # typed data modules: menu, team, news + contact helper
        i18n/                 # en/mk JSON dictionaries + language context + pick() helper
        components/           # Header, Footer, Hero, *Card, ContactForm, CookieBanner, …
        pages/                # Home, About, Menu, Services, Team, News, NewsDetail, Contact
        styles/               # tailwind → variables → base → layout → components → animations → responsive
      public/images/          # 📸 restaurant photos (served as /images/…)
      Dockerfile + nginx.conf # production image: static files + gzip + SPA fallback
```

## 🧑‍💻 Developing locally (no Docker needed)

Everything runs in the browser — no database server and no backend to start:

```bash
npm install
npm run dev:frontend         # site on http://localhost:5173
```

Vite gives you hot reload while you edit. To produce a production build:

```bash
npm run build                # tsc --noEmit + vite build → src/frontend/dist
```

## 🗄️ Where the data lives

There is no HTTP API in this project. The content is defined in typed modules
and consumed by the pages through small async functions, so the UI code never
cares about the source:

- `src/frontend/src/api/menu.ts` — 6 dishes (`getMenu`, `getMenuItem`)
- `src/frontend/src/api/team.ts` — 3 team members (`getTeam`)
- `src/frontend/src/api/news.ts` — 3 articles (`getNews`, `getNewsBySlug`)
- `src/frontend/src/api/contact.ts` — contact-submission contract

Each row carries `…En` / `…Mk` fields that the UI picks at render time, with
English fallback when a translation is missing.

## 🧠 Design notes worth knowing

- **Languages without duplication:** UI strings live in `i18n/en.json` and
  `i18n/mk.json`; database-style content carries `…En/…Mk` fields. One component
  tree serves all languages.
- **Validation in the browser:** the contact form mirrors simple rules for
  instant, field-level feedback. A valid submission composes a `mailto:` link
  with the message prefilled and opens the user's email client.
- **Images just work:** drop a file in `public/images/` and reference
  `/images/name.jpg` from a data module. Missing images fall back to local
  placeholders instead of breaking.
- **Motion with a fallback:** animations are pure CSS (see `animations.css` and
  the `Reveal` component) and are disabled under `prefers-reduced-motion`.

## 📜 Handy commands

```bash
npm run dev / build / typecheck        # everything, via workspaces
npm run dev:frontend                   # Vite dev server with hot reload
npm run up | down | logs               # the Docker app stack
```

> Never commit `.env` files — they are ignored via `.gitignore`. Use
> `.env.example` as a template.

## 🩺 Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank page after `docker compose up` | Use the local override (or check the RepoRun ingress) — the base compose file does not publish a port |
| Port busy (`:8080` / `:5173`) | Stop the other instance, or change the mapped port / Vite `server.port` |
| TypeScript errors | Run `npm run typecheck`; reinstall with `npm install` after dependency changes |
| Stale styles after editing Tailwind classes | Restart `npm run dev:frontend` so Tailwind rebuilds |

## 🎓 About

Faculty of Computer Science and Engineering

Subject name: Business Practice
