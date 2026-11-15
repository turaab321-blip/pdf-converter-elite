
FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libreoffice-writer \
    fonts-dejavu-core \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx vite build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV LIBREOFFICE_PATH=/usr/bin/libreoffice

CMD ["node", "server.cjs"]
