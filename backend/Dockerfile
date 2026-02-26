# =============================================
# Dockerfile — Express Backend (Multi-Stage)
# =============================================

# ---- Stage 1: Install Dependencies ----
FROM node:20-alpine AS deps

WORKDIR /app

# Salin file lockfile dan package.json untuk caching layer
COPY package.json package-lock.json ./

# Install semua dependencies (termasuk devDependencies untuk compile TS)
RUN npm ci

# ---- Stage 2: Build TypeScript ----
FROM node:20-alpine AS builder

WORKDIR /app

# Salin dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Salin semua source code dan config
COPY . .

# Compile TypeScript ke JavaScript (output: dist/)
RUN npm run build

# ---- Stage 3: Production Runner ----
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment ke production
ENV NODE_ENV=production

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

# Salin package.json dan lockfile untuk install production deps
COPY --from=builder /app/package.json /app/package-lock.json ./

# Install hanya production dependencies (tanpa devDependencies)
RUN npm ci --omit=dev

# Salin hasil build TypeScript
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist

# Gunakan user non-root
USER expressjs

# Expose port
EXPOSE 5000

# Jalankan server dari hasil compiled JS
CMD ["node", "dist/index.js"]
