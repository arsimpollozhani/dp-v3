# Build context is the repo root (npm workspaces share one lockfile).
#   docker compose build backend
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY src/backend/package.json src/backend/package.json
COPY src/frontend/package.json src/frontend/package.json
RUN npm ci

COPY src/backend ./src/backend

WORKDIR /app/src/backend
RUN npx prisma generate
RUN npm run build

# --- runtime ---
FROM node:22-slim AS runtime

# openssl: required by Prisma engines
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Full node_modules (includes tsx, needed by `prisma db seed`)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/src/backend/dist ./src/backend/dist
COPY --from=build /app/src/backend/prisma ./src/backend/prisma
COPY --from=build /app/src/backend/package.json ./src/backend/package.json
COPY src/backend/entrypoint.sh ./src/backend/entrypoint.sh
RUN chmod +x ./src/backend/entrypoint.sh

WORKDIR /app/src/backend
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
