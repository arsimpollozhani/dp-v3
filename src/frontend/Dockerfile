# Build context is the repo root (npm workspaces share one lockfile).
#   docker compose build frontend
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY src/frontend/package.json src/frontend/package.json
COPY src/backend/package.json src/backend/package.json
RUN npm ci

COPY src/frontend ./src/frontend

# Same-origin /api is served by nginx, so no VITE_API_URL is baked in.
WORKDIR /app/src/frontend
RUN npm run build

# --- runtime ---
FROM nginx:alpine AS runtime

COPY src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/src/frontend/dist /usr/share/nginx/html

EXPOSE 80
