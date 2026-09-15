# Restaurant Website Project

## Project

University software engineering project.

Build a responsive presentation website for a small restaurant business.

The website must demonstrate:

- restaurant information
- about section
- team/employees
- menu/services
- contact form
- contact information
- news/blog
- multilingual support (english default, macedonian, albanian)
- cookie consent
- responsive design
- detailed restaurant information

## Technology

Frontend:

- React
- TypeScript
- Vite
- React Router
- custom CSS only (no CSS frameworks: no Tailwind, no Bootstrap)

Backend:

- Node.js
- Fastify
- TypeScript
- Zod
- Prisma

Database:

- SQLite (file-based, via Prisma)

Infrastructure:

- Docker Compose (app delivery: backend + frontend containers)

## Architecture

Use a monorepo structure:

src/frontend
src/backend

Frontend communicates with backend through HTTP REST APIs.

Do not access the database (SQLite/Prisma) directly from the frontend.

Backend responsibilities:

- HTTP API
- validation
- business logic
- database access
- error handling

Frontend responsibilities:

- UI
- routing
- user interaction
- API communication
- localization
- responsive presentation

Keep business logic out of React components when practical.

## Frontend rules

Use TypeScript everywhere.

Prefer small reusable React components.

Do not create giant components.

Use semantic HTML.

Use accessible labels and buttons.

Use React Router for pages.

Use custom CSS for styling. Do not use Tailwind, Bootstrap, or any other CSS
framework. The grid, utilities and components in `src/frontend/src/styles/`
are hand-written.

Keep CSS organized by responsibility:

- `variables.css` → design + motion tokens
- `base.css` → typography, focus states
- `layout.css` → header/footer/sections + custom grid/utilities
- `components.css` → hero, cards, buttons, forms, banner
- `animations.css` → keyframes, page transitions, scroll reveals
- `responsive.css` → breakpoints

Use CSS variables for colors, spacing, typography and layout values.

Design quality requirements:

- modern, polished restaurant aesthetic (real contemporary restaurant site,
  not a generic assignment look)
- modern typography, strong visual hierarchy, generous spacing
- image-focused sections, modern cards, polished buttons and navigation
- subtle borders, shadows and depth; tasteful hover effects

Animation requirements:

- tasteful modern animations: hero entrance, scroll-based section reveals,
  nav transitions, card/image hover, button hover/press, subtle page transitions
- use CSS animations/transitions (see `animations.css` + the `Reveal` component);
  do not add an animation library unless CSS + React clearly cannot do it
- do not over-animate; motion must aid content, never distract
- respect `prefers-reduced-motion` (reduced/no animation fallback is mandatory)

Accessibility requirements:

- semantic HTML, accessible labels and buttons, visible focus states,
  sufficient color contrast, keyboard-operable navigation.

The website must work on:

- mobile
- tablet
- desktop
- large desktop screens

## Backend rules

Use REST endpoints.

Validate external input using Zod.

Do not trust request bodies.

Keep routes thin.

Prefer:

route -> controller -> service -> repository -> database

Do not put database queries directly inside route handlers.

Use centralized error handling.

Never expose internal errors or stack traces to clients.

## Database rules

Use Prisma with SQLite.

Keep schema in prisma/schema.prisma with `provider = "sqlite"`.

The development database is the file `src/backend/prisma/dev.db`
(`DATABASE_URL="file:./dev.db"`).

Use migrations for schema changes.

SQLite has no Decimal type: store prices as Float.

Never manually modify generated Prisma files.

Never commit SQLite database files (`*.db`, `*.db-shm`, `*.db-wal`,
`*.sqlite`, …). They are gitignored local data.

Seed development data (seed script must work with SQLite).

## API conventions

Use:

GET /api/menu
GET /api/menu/:id

GET /api/team
GET /api/news
GET /api/news/:slug

POST /api/contact

Use JSON responses.

Return appropriate HTTP status codes.

## Internationalization

Support:

- English (default)
- Macedonian
- Albanian

Do not duplicate entire React components for different languages.

Keep translatable text in localization files.

Restaurant content coming from the database should support both languages where appropriate.

## Security

Never commit secrets.

Use environment variables.

Validate all user input.

Add basic rate limiting to the contact endpoint.

Do not expose database credentials.

Do not use dangerouslySetInnerHTML unless absolutely necessary.

## Cookie consent

Implement a simple cookie-consent banner.

Do not use unnecessary tracking cookies.

Only store consent information locally.

The banner must be dismissible.

## Contact form

Fields:

- name
- email
- phone (optional)
- subject
- message

Validate both frontend and backend.

Show useful validation errors.

Show loading state.

Show success/error state.

## UI

Restaurant website must feel like a modern, polished, contemporary restaurant
site (luxury aesthetic) while remaining realistic for a university assignment.

Use:

- strong hero section with entrance animation
- restaurant imagery with hover polish
- clear navigation with transitions
- menu cards
- team cards
- news cards
- contact section
- footer

Add tasteful animations (hero entrance, fade/slide-in sections via scroll
reveal, hover/press effects, subtle page transitions) and always respect
`prefers-reduced-motion`.

Prioritize readability, visual hierarchy and responsiveness.

## Code quality

Prefer simple solutions.

Do not over-engineer.

Do not introduce abstractions unless they solve a real problem.

Avoid premature optimization.

Reuse existing components before creating new ones.

Before creating a new dependency, check whether the existing stack can solve the problem.

## Git Workflow

After completing each feature or meaningful change:

1. Inspect the changed files.
2. Run the relevant typechecks, tests, and builds.
3. Review the git diff.
4. Create a git commit for the completed change.

Use small, focused commits.

Commit messages should use imperative wording and clearly describe the change.

Examples:

- feat: add restaurant menu
- feat: add contact form
- feat: add multilingual support
- feat: add cookie consent
- fix: validate contact email
- fix: correct mobile navigation
- chore: configure Docker app stack

Do not combine unrelated changes into one commit.

Do not commit secrets, .env files, database credentials, or generated files that should be ignored.

Do not use destructive git commands such as `git reset --hard`, `git clean -fd`, or force-push unless explicitly requested.

Before committing, verify that the commit contains only changes related to the completed feature.

## Verification

After TypeScript changes run:

npm run typecheck

After frontend changes run:

npm run build

After backend changes run:

npm run typecheck

Run tests when relevant.

Before declaring a feature complete:

1. inspect changed files
2. typecheck
3. run relevant tests
4. build if frontend/backend structure changed
5. report remaining issues

## OpenCode behavior

Do not read the entire repository unnecessarily.

First inspect the relevant files.

Make focused changes.

Do not rewrite working code unnecessarily.

Do not create files that are not required by the architecture.

Do not change the technology stack without explicit instruction.

When implementing a feature, first understand the existing architecture.

Prefer incremental implementation.

If requirements are ambiguous, make the smallest reasonable assumption and state it.

Never fabricate test results.

Never claim a command succeeded unless it was actually run.

## Development principle

Implement the smallest complete solution.

Do not over-engineer this project.

Before creating an abstraction, ask whether it is actually needed.

Before adding a dependency, check whether the existing stack can solve the problem.

Do not rewrite unrelated code.

Do not read the entire repository when the task only concerns a small part.

Prefer simple, explicit TypeScript code over complex patterns.

## Development Environment

The application uses a file-based SQLite database via Prisma. No database
server is required; Docker is only used for app delivery (backend + frontend
containers), not for the database.

Local development database: `src/backend/prisma/dev.db`
(configured with `DATABASE_URL="file:./dev.db"` in `src/backend/.env`).

In Docker Compose the backend uses a SQLite file on a named volume
(`sqlite-data:/data`, `DATABASE_URL=file:/data/restaurant.db`) so data
survives container recreation.

Database files must never be committed. They are ignored via `.gitignore`
(`*.db`, `*.db-shm`, `*.db-wal`, `*.sqlite`, …).

Database configuration must use environment variables.

Example:

DATABASE_URL="file:./dev.db"

Create all necessary files for environment variables, ignore them in .gitignore.

Do not commit `.env` files containing real credentials.

Provide `.env.example` with placeholder values.

## Docker Commands

Start the application:

docker compose up --build

Stop the application:

docker compose down

View backend logs:

docker compose logs -f backend

The `sqlite-data` volume holds the production-like SQLite file. Do not use
`docker compose down -v` unless explicitly requested because it removes the
database volume.

Before changing Docker configuration, inspect the existing docker-compose.yml.

