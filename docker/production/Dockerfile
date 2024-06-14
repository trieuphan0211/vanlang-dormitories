FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

WORKDIR /app


# Copy package manager lock files if they exist
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY patches ./patches

# Install dependencies based on the presence of lock files
RUN \
    if [ -f yarn.lock ]; then \
    corepack enable && yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
    npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
    corepack enable && pnpm install; \
    else \
    echo "Lockfile not found." && exit 1; \
    fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG AUTH_SECRET
ENV AUTH_SECRET $NEXTAUTH_SECRET
# Copy the .env file
# COPY .env .env
# Install pnpm
# RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
# Copy necessary files from the builder stage
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
