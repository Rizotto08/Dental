#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
MOBILE_DIR="$ROOT_DIR/mobile"

MODE="${1:-local}"
# local | tunnel

if ! command -v docker >/dev/null 2>&1; then
  echo "[ERROR] Docker is required (for postgres/redis)."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] npm is required."
  exit 1
fi

echo "[1/6] Starting postgres + redis..."
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d postgres redis

echo "[2/6] Preparing backend .env..."
if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  if [[ -f "$BACKEND_DIR/.env.example" ]]; then
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    echo "  -> backend/.env created from .env.example"
  else
    cat > "$BACKEND_DIR/.env" <<'ENVEOF'
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://dentalpro:dentalpro@localhost:5432/dentalpro
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=dev_access_secret
JWT_REFRESH_SECRET=dev_refresh_secret
STRIPE_SECRET_KEY=sk_test_123
STRIPE_WEBHOOK_SECRET=whsec_test_123
STRIPE_PRICE_ID=price_test_123
STRIPE_SUCCESS_URL=https://example.com/success
STRIPE_CANCEL_URL=https://example.com/cancel
S3_BUCKET=dentalpro-dev
CORS_ORIGIN=*
MONTHLY_PRICE=99
ENVEOF
    echo "  -> backend/.env created with defaults"
  fi
fi

echo "[3/6] Installing backend deps + prisma..."
(
  cd "$BACKEND_DIR"
  npm install
  npx prisma generate
  npx prisma migrate dev --name init || true
)

echo "[4/6] Starting backend..."
(
  cd "$BACKEND_DIR"
  npm run dev
) &
BACKEND_PID=$!

API_URL="http://localhost:4000/api/v1"
if [[ "$MODE" == "tunnel" ]]; then
  echo "[INFO] Tunnel mode selected. Set mobile/.env EXPO_PUBLIC_API_URL manually if backend is remote."
fi

echo "[5/6] Preparing mobile .env..."
cat > "$MOBILE_DIR/.env" <<EOFENV
EXPO_PUBLIC_API_URL=$API_URL
EOFENV

echo "[6/6] Starting Expo ($MODE)..."
cd "$MOBILE_DIR"
npm install

cleanup() {
  echo "\nShutting down..."
  kill "$BACKEND_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

if [[ "$MODE" == "tunnel" ]]; then
  npx expo start --tunnel --clear
else
  npx expo start --clear
fi
