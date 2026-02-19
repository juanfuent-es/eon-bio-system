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

echo "� Verificando build..."
CSS_COUNT=$(find .next/static/chunks -name "*.css" 2>/dev/null | wc -l)
if [ "$CSS_COUNT" -eq 0 ]; then
  echo "❌ ERROR: No se generaron archivos CSS en el build"
  exit 1
fi
echo "   ✅ $CSS_COUNT archivo(s) CSS generados"
ls -la .next/static/chunks/*.css

echo "♻️ Reiniciando PM2"
pm2 delete eon || true
PORT=3003 pm2 start npm --name "eon" --cwd /var/www/eon -- start
pm2 save

echo "⏳ Esperando a que Next.js inicie..."
sleep 3

echo "🔍 Verificando que el servidor responde..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3003/ 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   ✅ Servidor responde OK (HTTP $HTTP_CODE)"
else
  echo "   ⚠️  Servidor respondió HTTP $HTTP_CODE"
  echo "   Revisando logs de PM2:"
  pm2 logs eon --lines 20 --nostream
fi

echo "✅ Deploy completado"
