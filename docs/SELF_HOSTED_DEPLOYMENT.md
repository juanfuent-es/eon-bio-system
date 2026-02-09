# 🚀 Deployment en Servidor Propio (/var/www/eon)

Guía para configurar GitHub Actions para compilar y desplegar automáticamente en tu servidor en `/var/www/eon`.

## 📋 Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Configuración SSH](#configuración-ssh)
3. [Secretos de GitHub](#secretos-de-github)
4. [Estructura del Deploy](#estructura-del-deploy)
5. [Flujo de Limpieza](#flujo-de-limpieza)
6. [Ejecución y Monitoreo](#ejecución-y-monitoreo)
7. [Troubleshooting](#troubleshooting)

---

## Requisitos

### En el Servidor

```bash
# 1. Node.js 20+ instalado
node --version

# 2. npm instalado
npm --version

# 3. Estructura de directorios
mkdir -p /var/www/eon
mkdir -p /var/www/eon/backups

# 4. Permisos apropiados
sudo chown -R $USER:$USER /var/www/eon
chmod -R 755 /var/www/eon

# 5. (Opcional) PM2 para gestión de procesos
npm install -g pm2
pm2 startup
pm2 save

# 6. (Opcional) Systemd service para autostart
# Ver sección de setup systemd
```

### En GitHub

- ✅ Acceso de administrador al repositorio
- ✅ SSH key para conectar al servidor

---

## Configuración SSH

### Paso 1: Generar SSH Key en el Servidor

```bash
# En el servidor
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Sin passphrase (presionar Enter cuando pregunte)
```

### Paso 2: Agregar SSH Key Pública a Authorized Keys

```bash
# En el servidor
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Verificar
ls -la ~/.ssh/authorized_keys
```

### Paso 3: Copiar SSH Key Privada

```bash
# En el servidor - Copiar el contenido completo
cat ~/.ssh/github_actions

# Deberá verse como:
# -----BEGIN OPENSSH PRIVATE KEY-----
# AAAAB3NzaC...
# -----END OPENSSH PRIVATE KEY-----
```

---

## Secretos de GitHub

### Agregar Secretos Requeridos

Ve a: `GitHub → Repo → Settings → Secrets and variables → Actions`

#### 1. SERVER_HOST (Requerido)
```
Nombre: SERVER_HOST
Valor: tu.dominio.com  o  123.456.789.012
```

#### 2. SERVER_USER (Requerido)
```
Nombre: SERVER_USER
Valor: tu_usuario_servidor  (ej: deploy, www-data, tu_usuario)
```

#### 3. SERVER_SSH_KEY (Requerido)
```
Nombre: SERVER_SSH_KEY
Valor: (Contenido completo de ~/.ssh/github_actions)
```

**IMPORTANTE:** Debe incluir las líneas:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...contenido...
-----END OPENSSH PRIVATE KEY-----
```

#### 4. SERVER_PORT (Opcional)
```
Nombre: SERVER_PORT
Valor: 22  (o tu puerto SSH custom)
```

#### 5. NEXT_PUBLIC_API_URL (Opcional)
```
Nombre: NEXT_PUBLIC_API_URL
Valor: https://tudominio.com
```

---

## Estructura del Deploy

### Archivos en el Workflow

```yaml
.github/workflows/
├── build-deploy.yml          ← Para Vercel
└── deploy-self-hosted.yml    ← Para servidor propio (NUEVO)
```

### Directorio en el Servidor

```
/var/www/eon/
├── .next/                    ← Build de Next.js (actualizado cada deploy)
├── node_modules/             ← Dependencias (reinstaladas cada deploy)
├── public/                   ← Archivos estáticos
├── src/                      ← Código fuente
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── .env.local                ← Variables de entorno (local, no versionado)
├── .env.example
└── backups/                  ← Copias de seguridad automáticas
    ├── .next_20260209_143022/
    ├── .next_20260208_102530/
    └── ...
```

---

## Flujo de Limpieza

### En GitHub Actions (Build)

```
1. Checkout código
   ↓
2. 🧹 Limpiar artefactos anteriores
   └─ rm -rf .next dist out coverage
   ↓
3. Setup Node.js 20
   ↓
4. 🧹 Limpiar npm cache
   └─ npm cache clean --force
   ↓
5. 🧹 Remover node_modules (para clean build)
   └─ rm -rf node_modules package-lock.json
   ↓
6. 📦 Instalar dependencias fresh
   └─ npm install
   ↓
7. 🔨 Compilar proyecto
   └─ npm run build
   ↓
8. 📦 Crear paquete de deploy
   └─ Copiar .next, package.json, etc.
```

### En el Servidor (Deploy)

```
1. Descargar artefactos desde GitHub
   ↓
2. 💾 Crear backup de .next anterior
   └─ cp .next → backups/.next_TIMESTAMP
   ↓
3. 🧹 Remover .next anterior
   └─ rm -rf .next out .next_cache
   ↓
4. 🧹 (Opcional) Clean deploy
   └─ rm -rf node_modules package-lock.json
   ↓
5. 📦 Copiar nuevo build
   └─ cp .next/, package.json, etc.
   ↓
6. 📦 Instalar dependencias fresh
   └─ npm ci --prefer-offline
   ↓
7. 🔐 Establecer permisos
   └─ chmod 755 .next node_modules
   ↓
8. 🔄 Reiniciar aplicación
   └─ pm2 restart o systemctl restart
   ↓
9. ✅ Verificar deployment
   └─ Comprobar que .next, node_modules, package.json existen
```

---

## Cómo Funciona

### Trigger Automático

El workflow se ejecuta cuando:

```yaml
on:
  push:
    branches:
      - main        ← Push a rama main
      - production  ← Push a rama production
  workflow_dispatch:  ← Ejecución manual
```

### Ejecución Manual

Para forzar un **clean deploy** (eliminar node_modules):

1. GitHub → Actions
2. "Build and Deploy to Self-Hosted Server"
3. Run workflow
4. clean_deploy: ✅ (marcado)
5. Run workflow

---

## Ejecución y Monitoreo

### Monitorear Ejecución en GitHub

```
1. GitHub → Actions
2. Último workflow "Build and Deploy to Self-Hosted Server"
3. Ver logs en tiempo real
4. Pasos completados:
   ✅ Build
   ✅ Deploy
   ✅ Verify
```

### Ver Logs de Deploy

**En GitHub:**
```
Actions → Deploy to Self-Hosted Server → Deploy job → Deploy via SSH
```

**En el Servidor:**
```bash
# Ver últimos logs si hay systemd
sudo journalctl -u eon-bio-system -f

# Ver logs si usas PM2
pm2 logs eon-bio-system

# Ver archivo de acceso
tail -f /var/log/nginx/eon-bio-system.log  # si nginx está configurado
```

---

## Usando PM2 (Recomendado)

### Setup Inicial

```bash
# En el servidor
npm install -g pm2

# Crear archivo ecosystem.config.js en /var/www/eon
cat > /var/www/eon/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: "eon-bio-system",
    script: "npm",
    args: "start",
    cwd: "/var/www/eon",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    error_file: "/var/log/pm2/eon-error.log",
    out_file: "/var/log/pm2/eon-out.log",
    log_file: "/var/log/pm2/eon-combined.log",
    time: true
  }]
}
EOF

# Iniciar aplicación
cd /var/www/eon
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Monitorear con PM2

```bash
# Ver estado
pm2 status

# Ver logs
pm2 logs eon-bio-system

# Reiniciar manualmente
pm2 restart eon-bio-system

# Stop
pm2 stop eon-bio-system

# Delete
pm2 delete eon-bio-system
```

---

## Usando Systemd (Alternativa)

### Setup Inicial

```bash
# Crear servicio systemd
sudo tee /etc/systemd/system/eon-bio-system.service > /dev/null << EOF
[Unit]
Description=EON Bio System - Next.js Application
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/var/www/eon
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Recargar systemd
sudo systemctl daemon-reload

# Habilitar e iniciar
sudo systemctl enable eon-bio-system
sudo systemctl start eon-bio-system

# Ver estado
sudo systemctl status eon-bio-system
```

### Monitorear con Systemd

```bash
# Ver estado
sudo systemctl status eon-bio-system

# Ver logs
sudo journalctl -u eon-bio-system -f

# Reiniciar manualmente
sudo systemctl restart eon-bio-system

# Stop
sudo systemctl stop eon-bio-system
```

---

## Nginx (Reverse Proxy)

### Configuración Recomendada

```nginx
# /etc/nginx/sites-available/eon-bio-system
upstream eon_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name tudominio.com www.tudominio.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tudominio.com www.tudominio.com;

    # Certificados SSL (usar Certbot para Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    # Proxy a Next.js
    location / {
        proxy_pass http://eon_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/javascript application/json application/javascript;
}
```

### Instalar y Configurar

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/eon-bio-system /etc/nginx/sites-enabled/

# Probar configuración
sudo nginx -t

# Recargar
sudo systemctl reload nginx

# Let's Encrypt (certbot)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

## Variables de Entorno en Servidor

### Crear .env.local

```bash
# En /var/www/eon/.env.local
cat > /var/www/eon/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://tudominio.com
DATABASE_URL=postgresql://user:password@localhost:5432/eon_db
API_KEY=tu_api_key
EOF

# Proteger archivo
chmod 600 /var/www/eon/.env.local
```

**NOTA:** El archivo `.env.local` NO debe estar en git. Debes crearlo manualmente en el servidor.

---

## Flujo Completo de Deployment

```
PASO 1: Push a GitHub
  git push origin main
  
PASO 2: GitHub Actions Detecta
  └─ Triggeado por push a rama main o production
  
PASO 3: Build en GitHub
  Build job:
  ├─ Checkout código
  ├─ Limpiar artefactos anteriores
  ├─ Setup Node.js
  ├─ Limpiar npm cache
  ├─ Instalar dependencias fresh
  ├─ Compilar proyecto (npm run build)
  └─ Crear paquete de deploy
  
PASO 4: Deploy en Servidor
  Deploy job (corre después de Build exitoso):
  ├─ Descargar paquete de deploy
  ├─ SSH al servidor
  ├─ Crear backup de .next anterior
  ├─ Limpiar old build artifacts
  ├─ Copiar nuevo build
  ├─ Instalar dependencias fresh
  ├─ Reiniciar aplicación (PM2 o Systemd)
  └─ Verificar deployment
  
PASO 5: Verificación
  ├─ Comprobar que .next existe
  ├─ Comprobar que node_modules existe
  └─ Comprobar que package.json existe

RESULTADO: Tu aplicación está actualizada en /var/www/eon
```

---

## Comandos Útiles

### En el Servidor

```bash
# Ver estado de aplicación
pm2 status
# o
sudo systemctl status eon-bio-system

# Ver logs
pm2 logs eon-bio-system
# o
sudo journalctl -u eon-bio-system -f

# Reiniciar
pm2 restart eon-bio-system
# o
sudo systemctl restart eon-bio-system

# Ver backups disponibles
ls -lh /var/www/eon/backups/

# Restaurar backup anterior
cp -r /var/www/eon/backups/.next_TIMESTAMP /var/www/eon/.next
pm2 restart eon-bio-system

# Verificar espacio en disco
du -sh /var/www/eon/
```

### En GitHub

```bash
# Ver estado de workflows
# Actions → Build and Deploy to Self-Hosted Server

# Ejecutar manual
# Actions → Seleccionar workflow → Run workflow → clean_deploy: true
```

---

## Troubleshooting

### SSH Connection Failed

**Error:** `SSH key permission denied`

**Solución:**
```bash
# En el servidor
chmod 600 ~/.ssh/github_actions
chmod 700 ~/.ssh
cat ~/.ssh/github_actions  # Copiar de nuevo a GitHub Secrets
```

### Deploy Path Issues

**Error:** `Permission denied: /var/www/eon`

**Solución:**
```bash
# En el servidor
sudo chown -R $USER:$USER /var/www/eon
chmod -R 755 /var/www/eon
chmod -R 755 /var/www/eon/.next
```

### npm install Timeout

**Error:** `npm ERR! Timeout`

**Solución:**
En el servidor, aumentar timeout:
```bash
npm config set fetch-timeout 120000
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
```

### Node.js Version Mismatch

**Error:** `The engine "node" is incompatible`

**Solución:**
```bash
# Verificar Node.js
node --version  # Debe ser 20+

# Actualizar si es necesario
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Disk Space Issues

**Error:** `No space left on device`

**Solución:**
```bash
# Limpiar backups antiguos (mantener últimas 5)
cd /var/www/eon/backups
ls -t | tail -n +6 | xargs rm -rf

# Limpiar npm cache en servidor
npm cache clean --force
```

### Application Won't Start After Deploy

**Solución:**
```bash
# Ver logs detallados
pm2 logs eon-bio-system --lines 100

# Verificar que .env.local existe
cat /var/www/eon/.env.local

# Verificar que package.json existe
cat /var/www/eon/package.json | head -20

# Verificar que .next existe
ls -la /var/www/eon/.next/

# Reintentar
pm2 restart eon-bio-system
```

---

## Monitoreo y Mantenimiento

### Limpiar Backups Antiguos

```bash
#!/bin/bash
# /var/www/eon/cleanup-backups.sh

BACKUP_DIR="/var/www/eon/backups"
KEEP=10  # Mantener últimos 10 backups

cd "$BACKUP_DIR"
ls -t | tail -n +$((KEEP+1)) | xargs -r rm -rf

echo "✅ Backups cleaned: Keeping last $KEEP"
```

Ejecutar con cron:
```bash
# Limpiar backups diariamente a las 2am
crontab -e
0 2 * * * /var/www/eon/cleanup-backups.sh >> /var/log/eon-cleanup.log 2>&1
```

---

## Rollback a Versión Anterior

### Opción 1: Restaurar desde Backup

```bash
# En el servidor
BACKUP_TIME="20260209_143022"  # Cambiar a tu timestamp

# Ver backups disponibles
ls -lh /var/www/eon/backups/

# Restaurar
rm -rf /var/www/eon/.next
cp -r /var/www/eon/backups/.next_${BACKUP_TIME} /var/www/eon/.next

# Reiniciar
pm2 restart eon-bio-system
```

### Opción 2: Desde GitHub

```bash
# En local
git revert HEAD  # O git reset a commit anterior
git push origin main

# GitHub Actions ejecutará deploy automático
```

---

## Referencias

- [Documentación de appleboy/ssh-action](https://github.com/appleboy/ssh-action)
- [PM2 Documentación](https://pm2.keymetrics.io/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/)

---

**Última actualización:** Febrero 2026
**Versión:** 1.0
**Estado:** Listo para producción ✅
