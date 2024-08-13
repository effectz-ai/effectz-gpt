FROM python:3.11 AS python_base

WORKDIR /app/frontend

RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY ./effectzgpt/frontend/package.json .
RUN npm install -f

# Build the application
COPY ./effectzgpt/frontend .
RUN npm run build

## Export the Next.js application as static files
ENV PORT=3000
EXPOSE 3000

WORKDIR /app/backend
ENV PYTHONPATH=/app

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Install Chromium for web loader
# Can disable this if you don't use the web loader to reduce the image size
RUN apt update && apt install -y chromium chromium-driver

# Install dependencies
COPY ./effectzgpt/backend/pyproject.toml .
RUN poetry install --no-root --no-cache --only main

COPY ./effectzgpt/backend .

RUN mkdir -p chromadb

