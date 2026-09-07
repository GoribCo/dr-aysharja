#!/bin/bash
set -e

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

rm -rf .next out

# Override the development port with PORT if needed.
npm run dev -- --port "${PORT:-3010}"
