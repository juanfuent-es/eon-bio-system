#!/bin/bash
set -e

echo "🚀 Deploy eonbiosystem.com"

cd /var/www/eon

echo "🔄 Sincronizando repo"
git fetch origin
git reset --hard origin/main

echo "🧹 Limpiando build previo"
rm -rf .next

echo "📦 Instalando dependencias"
npm ci

echo "🏗️ Build producción"
npm run build

echo "♻️ Reiniciando PM2"
pm2 restart eon || pm2 start npm --name "eon" -- start

echo "✅ Deploy completado"
