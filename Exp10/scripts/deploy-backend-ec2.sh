#!/usr/bin/env bash
set -euo pipefail

# Required env vars:
# - GHCR_USER
# - GHCR_TOKEN
# - GHCR_IMAGE (e.g. ghcr.io/<owner>/exp10-backend:latest)
# - APP_CONTAINER_NAME (default: exp10-backend)
# - APP_PORT (default: 8080)

: "${GHCR_USER:?GHCR_USER is required}"
: "${GHCR_TOKEN:?GHCR_TOKEN is required}"
: "${GHCR_IMAGE:?GHCR_IMAGE is required}"

APP_CONTAINER_NAME="${APP_CONTAINER_NAME:-exp10-backend}"
APP_PORT="${APP_PORT:-8080}"

echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
docker pull "$GHCR_IMAGE"
docker stop "$APP_CONTAINER_NAME" || true
docker rm "$APP_CONTAINER_NAME" || true
docker run -d --name "$APP_CONTAINER_NAME" -p "$APP_PORT:8080" --restart unless-stopped "$GHCR_IMAGE"

echo "Backend deployed successfully to container '$APP_CONTAINER_NAME'."
