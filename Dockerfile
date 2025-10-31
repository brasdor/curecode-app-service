# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#smaller-images-without-npmyarn
ARG NODE_VERSION=22
ARG ALPINE_VERSION=3.19

# Stage 1: Build
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
LABEL org.opencontainers.image.authors="CureCode Team <marcel.cheng@curecode.ch>"

# Set the working directory
WORKDIR /build-stage

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install build dependencies
RUN npm ci

# Copy the rest of the application code
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Production
FROM alpine:${ALPINE_VERSION}

# Create app directory
WORKDIR /usr/src/app

# Add required binaries
RUN apk add --no-cache libstdc++ dumb-init \
  && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
  && chown node:node ./

COPY --from=builder /usr/local/bin/node /usr/local/bin/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
USER node

COPY --from=builder /build-stage/dist ./dist
COPY --from=builder /build-stage/node_modules ./node_modules
COPY --from=builder /build-stage/prisma ./prisma
COPY --from=builder /build-stage/public ./public

# Run with dumb-init to not start node with PID=1, since Node.js was not designed to run as PID 1
# CMD ["dumb-init", "node", "--require", "/usr/src/app/dist/instrumentation.js", "/usr/src/app/dist/src/main.js"]
CMD ["dumb-init", "node", "/usr/src/app/dist/src/main.js"]