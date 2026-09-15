---
description: Typecheck and build the entire application
---

Verify the current project.

Run the relevant:

- frontend TypeScript check
- backend TypeScript check
- frontend build
- Prisma validation (`npx prisma validate` in `src/backend`)

Do not modify source code.

Also verify:

- no obsolete PostgreSQL references remain
  (`postgres`, `postgresql://`, `POSTGRES_*`, `PGHOST`, `pgdata`, `pg_isready`)
- `.gitignore` ignores SQLite files (`*.db`, `*.sqlite`, …)
- no SQLite database files or secrets are staged for commit

Report:

1. commands executed
2. successful checks
3. failures
4. likely causes
