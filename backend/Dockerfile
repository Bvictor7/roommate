# ─── Stage 1 : build ───────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl && apk upgrade --no-cache

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npx prisma generate

# ─── Stage 2 : runtime ─────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl && apk upgrade --no-cache

# Utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]