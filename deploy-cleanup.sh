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

echo "🔍 Verificando .env"
if [ ! -f .env ]; then
  echo "⚠️  Archivo .env no encontrado en /var/www/eon"
  echo "   Copia .env.example y configura las variables"
  exit 1
fi

echo "🏗️ Build producción"
npm run build

echo "♻️ Reiniciando PM2"
pm2 delete eon || true
PORT=3003 pm2 start npm --name "eon" --cwd /var/www/eon -- start
pm2 save

echo "✅ Deploy completado"
