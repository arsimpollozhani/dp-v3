---
description: Review the current implementation
---

Use the reviewer subagent.

Review the current git changes and relevant surrounding code.

Focus on:

- correctness
- complete assignment requirements (restaurant info, about, team, menu/services,
  contact form + info, news/blog, multilingual support, cookie consent,
  responsive design, detailed restaurant information)
- SQLite architecture (Prisma `provider = "sqlite"`, file-based DB, no
  PostgreSQL references/dependencies, no committed `*.db` files)
- modern UI quality, responsive design, animation quality
- accessibility and `prefers-reduced-motion`
- security
- architecture (route → controller → service → repository → Prisma)
- responsive frontend
- API design
- database correctness

Do not modify files.

Return findings ordered by severity.
