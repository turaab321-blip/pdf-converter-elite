
FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libreoffice-writer \
    fonts-dejavu-core \
    fonts-liberation \
    python3 \
    python3-venv \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/pdf-venv

RUN /opt/pdf-venv/bin/pip install --no-cache-dir \
    pdf2docx==0.5.13 \
    PyMuPDF==1.28.2

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV LIBREOFFICE_PATH=/usr/bin/libreoffice
ENV PYTHON_PATH=/opt/pdf-venv/bin/python
ENV OMP_NUM_THREADS=1
ENV OPENBLAS_NUM_THREADS=1

CMD ["node", "server.cjs"]
