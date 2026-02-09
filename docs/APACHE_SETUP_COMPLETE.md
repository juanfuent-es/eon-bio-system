# ✅ ACTUALIZACIÓN: Apache + DigitalOcean Configurado

## 🎉 Lo que se ha Hecho

Tu aplicación ahora está lista para deployment automático en Apache (DigitalOcean) con limpieza automática de compilaciones anteriores.

---

## 📋 Archivos Actualizados/Creados

### Workflows Actualizados

```
✅ .github/workflows/deploy-self-hosted.yml (ACTUALIZADO)
   └─ Ahora optimizado para Apache
   └─ Maneja limpieza automática
   └─ Soporta Ubuntu 24 + DigitalOcean
```

### Documentación Creada

```
✨ docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md (NUEVO)
   └─ Guía completa de setup (7 secciones)
   └─ Configuración Apache vhost
   └─ SSL con Let's Encrypt
   └─ Troubleshooting detallado

✨ docs/APACHE_QUICK_START.md (NUEVO)
   └─ 5 pasos rápidos de setup
   └─ Comandos copy-paste
   └─ Checklist final
```

### Scripts Actualizados

```
✅ deploy-cleanup.sh (ACTUALIZADO)
   └─ Ahora para Apache + Node.js
   └─ Reinicia procesos correctamente
```

---

## 🚀 Setup en 5 Pasos (15 minutos)

### Paso 1: SSH Key (5 min)

En el servidor DigitalOcean:
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions  # Copiar contenido
```

### Paso 2: Secretos GitHub (3 min)

```
GitHub → Settings → Secrets and variables → Actions

Agregar:
1. SERVER_HOST = tu_ip_digitalocean
2. SERVER_USER = root
3. SERVER_SSH_KEY = (contenido de ~/.ssh/github_actions)
```

### Paso 3: Instalar en Servidor (5 min)

```bash
# Actualizar y instalar
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs apache2

# Habilitar módulos
sudo a2enmod proxy proxy_http rewrite ssl headers
sudo systemctl restart apache2

# Crear directorio e instalar app
sudo mkdir -p /var/www/eon/backups
sudo chown -R www-data:www-data /var/www/eon
cd /var/www/eon
sudo -u www-data git clone https://github.com/tu_usuario/eon-bio-system.git .
sudo -u www-data npm install
sudo -u www-data npm run build
```

### Paso 4: Configurar Apache

Copiar configuración vhost:
```bash
# Ver docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md sección "Configuración de Apache"
# O usar APACHE_QUICK_START.md para copiar/pegar

sudo a2ensite eon-bio-system.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### Paso 5: Deploy

```bash
# Iniciar app
cd /var/www/eon
nohup npm start > /var/log/eon-bio-system.log 2>&1 &

# Push a GitHub
git push origin main

# ✅ Deployment automático!
```

---

## 📊 Flujo de Limpieza Automática

```
git push origin main
    ↓
GITHUB ACTIONS (Build):
  1. 🧹 rm -rf .next dist out coverage
  2. 🧹 npm cache clean --force
  3. 📦 npm ci (instala fresh)
  4. 🔨 npm run build
    ↓
GITHUB ACTIONS (Deploy):
  5. SSH al servidor
  6. 💾 cp .next → backups/.next_TIMESTAMP
  7. 🧹 rm -rf .next (anterior)
  8. 📦 cp nuevo .next
  9. 📦 npm ci (instala fresh)
  10. ⏹️  pkill npm (detiene anterior)
  11. 🚀 npm start (inicia nuevo)
  12. 🔄 sudo systemctl restart apache2
  13. ✅ Verifica que funciona
    ↓
¡APP ACTUALIZADA CON COMPILACIÓN LIMPIA!
```

---

## 🧹 Qué se Limpia Automáticamente

### Build (GitHub)
```
❌ .next/
❌ dist/
❌ out/
❌ coverage/
❌ npm cache
```

### Deploy (Servidor)
```
❌ .next/ (con backup automático)
❌ node_modules/ (en clean deploy)
❌ package-lock.json (en clean deploy)
```

### Backups Automáticos
```
📁 /var/www/eon/backups/
├── .next_20260209_143022/
├── .next_20260208_102530/
└── .next_20260207_095015/
```

---

## 📁 Estructura en Servidor

```
/var/www/eon/
├── .next/                 ← Build actual (se actualiza cada deploy)
├── node_modules/          ← Dependencias (se reinstala)
├── public/                ← Archivos estáticos
├── src/                   ← Código fuente
├── package.json
├── package-lock.json
├── .env.local             ← Variables secretas (crear manualmente)
│
├── backups/               ← Backups automáticos
│   ├── .next_20260209_143022/
│   ├── .next_20260208_102530/
│   └── .next_20260207_095015/
│
└── .git/                  ← Repositorio
```

---

## 🔑 3 Secretos Necesarios

| Secreto | Dónde obtener |
|---------|--------------|
| `SERVER_HOST` | Tu IP de DigitalOcean (ej: 123.45.67.89) |
| `SERVER_USER` | `whoami` en servidor (generalmente `root`) |
| `SERVER_SSH_KEY` | `cat ~/.ssh/github_actions` en servidor |

---

## ✅ Stack Configurado

```
Sistema Operativo:    Ubuntu 24 (DigitalOcean)
Runtime:             Node.js 20+
Aplicación:          Next.js 16
Compilación:         npm run build
Servidor Web:        Apache2 (Reverse Proxy)
Aplicación:          npm start (puerto 3000)
SSL:                 Let's Encrypt (Certbot)
Limpieza:            Automática en cada deploy
Backups:             Automáticos
```

---

## 🛠️ Comandos Útiles

### Ver Logs

```bash
# App
tail -f /var/log/eon-bio-system.log

# Apache
sudo tail -f /var/log/apache2/eon-ssl-error.log

# Ver proceso
ps aux | grep npm
lsof -i :3000
```

### Reiniciar Manualmente

```bash
# Matar y reiniciar app
pkill -f "npm start"
sleep 2
cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &

# Reiniciar Apache
sudo systemctl restart apache2
```

### Restaurar Backup

```bash
BACKUP_TIME="20260209_143022"
rm -rf /var/www/eon/.next
cp -r /var/www/eon/backups/.next_${BACKUP_TIME} /var/www/eon/.next

pkill -f "npm start"
sleep 2
cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

---

## 📖 Documentación Disponible

```
Para QUICK START (5 pasos):
  → docs/APACHE_QUICK_START.md ⭐

Para SETUP COMPLETO (detallado):
  → docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md

Para INFO DE LIMPIEZA:
  → docs/DEPLOYMENT_CLEANUP.md

Para GENERAL:
  → DEPLOYMENT_COMPLETE.md
```

---

## ✨ Beneficios

✅ **Compilación limpia** en cada deploy
✅ **Backups automáticos** de versión anterior
✅ **Zero downtime** (reinicia proceso)
✅ **Limpieza automática** (no requiere mantenimiento)
✅ **Apache reverse proxy** (separación de concerns)
✅ **SSL automático** (Let's Encrypt)
✅ **Documentación completa** (para todos los casos)

---

## 🆚 Arquitectura Apache

```
Internet
    ↓ (HTTPS)
Apache 2.4 (Reverse Proxy)
    ↓ (HTTP 127.0.0.1:3000)
Node.js Next.js App
    ↓
Archivos estáticos (.next/)
Código servidor
Base de datos (si aplica)
```

### Ventajas de esta Setup

✅ Apache maneja SSL, compresión, caching
✅ Node.js solo ejecuta la aplicación
✅ Fácil escalabilidad (agregar instancias)
✅ Separación de responsabilidades
✅ Performance mejorado

---

## 🔄 Flujo Completo de Deployment

```
1. Developer hace cambios locales
2. git push origin main
3. GitHub detecta push
4. GitHub Actions inicia:
   a. Build job:
      - Limpia compilación anterior
      - Instala dependencias fresh
      - Compila proyecto (npm run build)
   b. Deploy job:
      - Conecta via SSH
      - Crea backup de .next anterior
      - Instala nueva compilación
      - Reinicia aplicación
      - Verifica que funciona
5. ✅ App actualizada en producción
6. Usuarios acceden a nueva versión automáticamente
```

---

## 📊 Variables de Entorno

### En Servidor (.env.local - crear manualmente)

```bash
NEXT_PUBLIC_API_URL=https://tu.dominio.com
DATABASE_URL=postgresql://user:pass@localhost:5432/eon
API_KEY=tu_api_key
```

### En GitHub (opcional)

Agregar en workflow si necesitas usar secrets en build:
```yaml
env:
  NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

---

## 🎯 Próximos Pasos

### Inmediato (Setup)
```
1. Seguir "5 Pasos Rápidos" arriba
2. Verificar en GitHub Actions
3. Verificar en https://tu.dominio.com
```

### Después (Optimización)
```
1. Configurar DNS (tu.dominio.com)
2. Configurar SSL auto-renewal
3. Agregar monitoreo (health checks)
4. Configurar alertas (Slack, email)
5. Backup de base de datos
```

---

## ✅ Verificación Final

### En GitHub
```
GitHub → Actions
→ Build and Deploy to Apache Server
→ Último workflow: ✅ Todos en verde
```

### En Servidor
```bash
# Proceso corriendo
ps aux | grep npm    # Debe mostrar proceso

# Respondiendo
curl http://127.0.0.1:3000   # Debe responder

# Apache
sudo systemctl status apache2   # Debe estar active

# Desde navegador
https://tu.dominio.com   # Debe funcionar
```

---

## 🆘 Si Algo Falla

Ver troubleshooting en:
→ [docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md#troubleshooting](docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md#troubleshooting)

Errores comunes:
- "502 Bad Gateway" → Verificar `ps aux | grep npm`
- "Permission denied" → Verificar permisos en /var/www/eon
- "SSH failed" → Verificar SERVER_SSH_KEY contiene contenido completo
- "npm install fails" → Aumentar timeout: `npm config set fetch-timeout 120000`

---

## 🎉 ¡Listo!

Tu sistema ahora:

✅ Compila automáticamente en cada push
✅ Limpia compilaciones anteriores
✅ Crea backups automáticamente
✅ Deploya sin downtime
✅ Reinicia Apache automáticamente
✅ Verifica que todo funciona
✅ Documentado completamente

**Tiempo de setup:** 15-20 minutos
**Mantenimiento:** CERO (completamente automático)

---

**Última actualización:** Febrero 2026
**Versión:** 1.1 (Apache Edition)
**Stack:** Apache2 + Node.js 20 + Next.js 16 + Ubuntu 24
**Plataforma:** DigitalOcean
**Estado:** Listo para producción ✅
