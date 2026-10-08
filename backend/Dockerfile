FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl && apk upgrade --no-cache
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npx prisma generate

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["src/index.js"]
