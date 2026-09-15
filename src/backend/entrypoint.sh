#!/bin/sh
# Backend entrypoint: apply Prisma migrations, seed demo content only
# when the database is empty, then start Fastify.
# The SQLite file lives at $DATABASE_URL (default file:/data/restaurant.db
# in Docker, file:./dev.db for local dev).
set -e

echo "Applying Prisma migrations..."
npx prisma migrate deploy --schema prisma/schema.prisma

echo "Checking whether the database needs seed data..."
SEED_CHECK=$(node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.menuItem.count().then((c) => { console.log(c); return prisma.\$disconnect(); }).catch(() => console.log(0));
" 2>/dev/null || echo "0")

if [ "$SEED_CHECK" = "0" ]; then
  echo "Empty database detected, seeding demo content..."
  npx prisma db seed
else
  echo "Database already has ${SEED_CHECK} menu items, skipping seed."
fi

echo "Starting backend..."
exec node dist/src/server.js
