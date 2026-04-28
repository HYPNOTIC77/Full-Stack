#!/usr/bin/env bash
set -euo pipefail

# Required env vars:
# - FIREBASE_ACCESS_TOKEN
# - FIREBASE_PROJECT_ID
# - FIREBASE_SITE_ID
# - FIREBASE_CUSTOM_DOMAIN

: "${FIREBASE_ACCESS_TOKEN:?FIREBASE_ACCESS_TOKEN is required}"
: "${FIREBASE_PROJECT_ID:?FIREBASE_PROJECT_ID is required}"
: "${FIREBASE_SITE_ID:?FIREBASE_SITE_ID is required}"
: "${FIREBASE_CUSTOM_DOMAIN:?FIREBASE_CUSTOM_DOMAIN is required}"

API_URL="https://firebasehosting.googleapis.com/v1beta1/projects/${FIREBASE_PROJECT_ID}/sites/${FIREBASE_SITE_ID}/domains?domainName=${FIREBASE_CUSTOM_DOMAIN}"

HTTP_CODE=$(curl -sS -o /tmp/firebase-domain-response.json -w "%{http_code}" \
  -X POST "$API_URL" \
  -H "Authorization: Bearer ${FIREBASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{}')

if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "201" || "$HTTP_CODE" == "409" ]]; then
  echo "Custom domain '${FIREBASE_CUSTOM_DOMAIN}' is configured (HTTP ${HTTP_CODE})."
  cat /tmp/firebase-domain-response.json || true
  exit 0
fi

echo "Failed to configure Firebase custom domain. HTTP ${HTTP_CODE}"
cat /tmp/firebase-domain-response.json || true
exit 1
