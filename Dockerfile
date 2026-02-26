# =============================================
# Dockerfile — Next.js Frontend (Multi-Stage)
# =============================================

# ---- Stage 1: Install Dependencies ----
FROM node:20-alpine AS deps

WORKDIR /app

# Salin file lockfile dan package.json untuk caching layer
COPY package.json package-lock.json ./

# Install semua dependencies (termasuk devDependencies untuk build)
RUN npm ci

# ---- Stage 2: Build Aplikasi ----
FROM node:20-alpine AS builder

WORKDIR /app

# Salin dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Salin semua source code
COPY . .

# NEXT_PUBLIC_* harus di-set saat build-time karena di-embed oleh Next.js
ARG NEXT_PUBLIC_API_URL=http://localhost:5000/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build Next.js dalam mode standalone
RUN npm run build

# ---- Stage 3: Production Runner ----
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment ke production
ENV NODE_ENV=production

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Salin file public dan asset statis
COPY --from=builder /app/public ./public

# Salin standalone output dari Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Gunakan user non-root
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname untuk container
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Jalankan server Next.js standalone
CMD ["node", "server.js"]
