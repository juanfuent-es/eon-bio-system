# 🚀 Deploy en Apache - DigitalOcean - Ubuntu 24

Guía completa para compilar y desplegar automáticamente tu aplicación Next.js en Apache (DigitalOcean) usando `/var/www/eon`.

## 📋 Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Setup Inicial del Servidor](#setup-inicial-del-servidor)
3. [Configuración SSH](#configuración-ssh)
4. [Secretos de GitHub](#secretos-de-github)
5. [Configuración de Apache](#configuración-de-apache)
6. [Flujo de Deployment](#flujo-de-deployment)
7. [Monitoreo](#monitoreo)
8. [Troubleshooting](#troubleshooting)

---

## Requisitos

### En DigitalOcean (Ubuntu 24)

```bash
# 1. Node.js 20+ instalado
node --version  # v20 o superior

# 2. npm instalado
npm --version

# 3. Apache2 instalado
sudo apt update && sudo apt install -y apache2

# 4. Módulo Apache para reverse proxy
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod ssl

# 5. Estructura de directorios
sudo mkdir -p /var/www/eon
sudo mkdir -p /var/www/eon/backups

# 6. Permisos apropiados
sudo chown -R www-data:www-data /var/www/eon
sudo chmod -R 755 /var/www/eon
```

### En GitHub

- ✅ Acceso de administrador al repositorio
- ✅ SSH key para conectar al servidor

---

## Setup Inicial del Servidor

### Paso 1: Actualizar Sistema

```bash
ssh root@tu_servidor
sudo apt update && sudo apt upgrade -y
```

### Paso 2: Instalar Node.js 20

```bash
# Descargar e instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node --version  # v20.x.x
npm --version
```

### Paso 3: Instalar Apache2

```bash
sudo apt install -y apache2

# Habilitar módulos necesarios
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers

# Reiniciar Apache
sudo systemctl restart apache2
```

### Paso 4: Crear Estructura de Directorios

```bash
# Como usuario regular (no root)
mkdir -p /var/www/eon/backups
mkdir -p /var/log/eon

# Cambiar permisos
sudo chown -R www-data:www-data /var/www/eon
sudo chown -R www-data:www-data /var/log/eon
sudo chmod -R 755 /var/www/eon
```

### Paso 5: Clone Inicial del Repositorio

```bash
# En /var/www/eon
cd /var/www/eon
git clone https://github.com/tu_usuario/eon-bio-system.git .

# Instalar dependencias inicialmente
npm install
npm run build

# Verificar que .next se creó
ls -la .next/
```

---

## Configuración SSH

### Paso 1: Generar SSH Key en el Servidor

```bash
# En el servidor (como usuario regular o www-data)
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Dejar en blanco cuando pida passphrase (presionar Enter)
```

### Paso 2: Agregar SSH Key a Authorized Keys

```bash
# En el servidor
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Verificar
ls -la ~/.ssh/
```

### Paso 3: Copiar Clave Privada para GitHub

```bash
# En el servidor
cat ~/.ssh/github_actions

# Copiar TODO el contenido, incluyendo:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... contenido ...
# -----END OPENSSH PRIVATE KEY-----
```

---

## Secretos de GitHub

### Agregar Secretos Requeridos

Ve a: `GitHub → Repo → Settings → Secrets and variables → Actions`

#### 1. SERVER_HOST (Requerido)
```
Nombre: SERVER_HOST
Valor: tu_ip_digitalocean  (ej: 123.45.67.89)
        o tu.dominio.com
```

#### 2. SERVER_USER (Requerido)
```
Nombre: SERVER_USER
Valor: root  (o tu_usuario_sudo)
```

#### 3. SERVER_SSH_KEY (Requerido)
```
Nombre: SERVER_SSH_KEY
Valor: (Contenido completo de ~/.ssh/github_actions)

Debe incluir:
-----BEGIN OPENSSH PRIVATE KEY-----
[contenido long]
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
Valor: https://tu.dominio.com
```

---

## Configuración de Apache

### Archivo Vhost Recomendado

Crear archivo `/etc/apache2/sites-available/eon-bio-system.conf`:

```bash
sudo tee /etc/apache2/sites-available/eon-bio-system.conf > /dev/null << 'EOF'
<VirtualHost *:80>
    ServerName tu.dominio.com
    ServerAlias www.tu.dominio.com
    
    # Redirect HTTP to HTTPS
    Redirect permanent / https://tu.dominio.com/
    
    ErrorLog ${APACHE_LOG_DIR}/eon-error.log
    CustomLog ${APACHE_LOG_DIR}/eon-access.log combined
</VirtualHost>

<VirtualHost *:443>
    ServerName tu.dominio.com
    ServerAlias www.tu.dominio.com
    
    # SSL Configuration (HTTPS)
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/tu.dominio.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/tu.dominio.com/privkey.pem
    
    # Security Headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    
    # Reverse Proxy a Node.js en puerto 3000
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
    
    # WebSocket Support (si necesitas)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]
    
    # Gzip Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE text/javascript
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
        AddOutputFilterByType DEFLATE text/css
    </IfModule>
    
    # Cache Headers para archivos estáticos
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
    
    ErrorLog ${APACHE_LOG_DIR}/eon-ssl-error.log
    CustomLog ${APACHE_LOG_DIR}/eon-ssl-access.log combined
</VirtualHost>
EOF
```

### Habilitar Sitio

```bash
# Habilitar sitio
sudo a2ensite eon-bio-system.conf

# Deshabilitar sitio por defecto (opcional)
sudo a2dissite 000-default.conf

# Verificar configuración
sudo apache2ctl configtest  # Debe decir "Syntax OK"

# Reiniciar Apache
sudo systemctl restart apache2
```

### SSL con Let's Encrypt (Certbot)

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtener certificado
sudo certbot --apache -d tu.dominio.com -d www.tu.dominio.com

# Auto-renovación
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verificar
sudo certbot certificates
```

---

## Flujo de Deployment

### Build Stage (GitHub Actions)

```yaml
1. Checkout código
2. 🧹 Limpiar artefactos anteriores (.next, dist, out)
3. 🧹 Limpiar npm cache
4. 📦 Instalar dependencias fresh
5. 🔨 Compilar Next.js (npm run build)
6. ✅ Crear paquete de deploy
```

### Deploy Stage (Servidor)

```yaml
1. SSH al servidor
2. 💾 Crear backup de .next anterior
3. 🧹 Limpiar .next viejo
4. 📦 Copiar nuevo build
5. 📦 Instalar dependencias fresh
6. ⏹️  Detener aplicación anterior
7. 🚀 Iniciar Node.js en puerto 3000
8. 🔄 Reiniciar Apache (reverse proxy)
9. ✅ Verificar que funciona
```

---

## Monitoreo

### Ver Logs de Aplicación

```bash
# Log de aplicación Node.js
tail -f /var/log/eon-bio-system.log

# O con less
less /var/log/eon-bio-system.log

# Ver últimas 100 líneas
tail -100 /var/log/eon-bio-system.log
```

### Ver Logs de Apache

```bash
# Error log
sudo tail -f /var/log/apache2/eon-ssl-error.log

# Access log
sudo tail -f /var/log/apache2/eon-ssl-access.log
```

### Verificar Proceso Node.js

```bash
# Ver si está corriendo
ps aux | grep "npm start"

# O verificar puerto 3000
lsof -i :3000

# Contar procesos Node.js
pgrep -f "npm start" | wc -l
```

### Verificar Apache

```bash
# Estado
sudo systemctl status apache2

# Verificar configuración
sudo apache2ctl configtest

# Ver módulos activos
sudo apache2ctl -M | grep proxy
```

### Verificar Conectividad

```bash
# Probar localhost
curl http://127.0.0.1:3000

# Probar through Apache
curl https://tu.dominio.com

# O desde otro servidor
curl -I https://tu.dominio.com
```

---

## Estructura de Directorios

```
/var/www/eon/
├── .next/                    ← Build actual
├── node_modules/             ← Dependencias
├── public/                   ← Archivos estáticos
├── src/                      ← Código fuente
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── .env.local                ← Variables secretas (NO en git)
│
├── backups/
│   ├── .next_20260209_143022/    ← Backup automático
│   ├── .next_20260208_102530/
│   └── .next_20260207_095015/
│
└── .git/                     ← Repositorio clonado
```

---

## Variables de Entorno en Servidor

### Crear .env.local

```bash
# En /var/www/eon
cat > /var/www/eon/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://tu.dominio.com
DATABASE_URL=postgresql://user:password@localhost:5432/eon_db
API_KEY=tu_api_key
SMTP_HOST=tu_smtp_host
EOF

# Proteger archivo
chmod 600 /var/www/eon/.env.local

# Cambiar propietario a www-data
sudo chown www-data:www-data /var/www/eon/.env.local
```

**NOTA:** El archivo `.env.local` NO debe estar en git. Se crea manualmente en el servidor.

---

## Comandos Útiles

### Reiniciar Aplicación Manually

```bash
# Matar proceso Node.js
pkill -f "npm start"

# Esperar a que se detengan
sleep 2

# Iniciar de nuevo
cd /var/www/eon
nohup npm start > /var/log/eon-bio-system.log 2>&1 &

# Verificar
ps aux | grep "npm start"
```

### Reiniciar Apache

```bash
# Test configuración
sudo apache2ctl configtest

# Reiniciar
sudo systemctl restart apache2

# O solo reload (sin desconectar clientes)
sudo systemctl reload apache2
```

### Ver Backup Disponibles

```bash
ls -lh /var/www/eon/backups/
```

### Restaurar Backup

```bash
# Ver backups
ls -lh /var/www/eon/backups/

# Restaurar backup específico
BACKUP_TIME="20260209_143022"
rm -rf /var/www/eon/.next
cp -r /var/www/eon/backups/.next_${BACKUP_TIME} /var/www/eon/.next

# Cambiar permisos
sudo chown -R www-data:www-data /var/www/eon/.next

# Reiniciar app
pkill -f "npm start"
sleep 2
cd /var/www/eon
nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

### Limpiar Backups Antiguos

```bash
# Mantener últimos 5 backups
cd /var/www/eon/backups
ls -t | tail -n +6 | xargs rm -rf

# O usar el script proporcionado
./deploy-cleanup.sh
```

---

## Troubleshooting

### "Connection Refused"

```bash
# 1. Verificar que Node.js está corriendo
ps aux | grep npm
lsof -i :3000

# 2. Ver logs
tail -50 /var/log/eon-bio-system.log

# 3. Reiniciar
pkill -f "npm start"
sleep 2
cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

### "Permission Denied"

```bash
# Verificar permisos
ls -la /var/www/eon/
ls -la /var/www/eon/.next/

# Arreglar
sudo chown -R www-data:www-data /var/www/eon
sudo chmod -R 755 /var/www/eon
```

### "502 Bad Gateway" en Apache

```bash
# 1. Verificar que Node.js está corriendo
lsof -i :3000

# 2. Verificar configuración Apache
sudo apache2ctl configtest

# 3. Ver error log Apache
sudo tail -50 /var/log/apache2/eon-ssl-error.log

# 4. Reiniciar Apache
sudo systemctl restart apache2
```

### "npm ERR! EACCES: permission denied"

```bash
# Cambiar propietario
sudo chown -R www-data:www-data /var/www/eon/node_modules

# O reinstalar como www-data
sudo -u www-data npm install
```

### "out of memory"

```bash
# Aumentar memoria para npm
npm install --max_old_space_size=4096

# O para aplicación corriendo
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

### SSH Connection Failed

```bash
# Verificar SSH key
cat ~/.ssh/github_actions | wc -c  # Debe tener >1000 caracteres

# Verificar permisos
chmod 600 ~/.ssh/github_actions
chmod 700 ~/.ssh

# Verificar authorized_keys
cat ~/.ssh/authorized_keys | grep "github-actions"
```

---

## GitHub Actions Logs

Para ver logs detallados del deployment:

```
GitHub → Actions
→ Build and Deploy to Apache Server
→ Último workflow
→ Ver los jobs:
  ├─ Build
  ├─ Deploy via SSH
  └─ Verify deployment
```

---

## Rollback a Versión Anterior

### Opción 1: Desde Backup

```bash
# En servidor
BACKUP_TIME="20260209_143022"
rm -rf /var/www/eon/.next
cp -r /var/www/eon/backups/.next_${BACKUP_TIME} /var/www/eon/.next

# Reiniciar
pkill -f "npm start"
sleep 2
cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

### Opción 2: Desde Git

```bash
# En servidor
cd /var/www/eon
git log --oneline  # Ver commits

# Revertir a commit anterior
git revert HEAD
git push

# O reset (cuidado!)
git reset --hard HEAD~1
git push --force

# Luego:
npm install
npm run build
pkill -f "npm start"
sleep 2
nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

---

## Monitoreo Avanzado

### Crear Script de Healthcheck

```bash
# /usr/local/bin/eon-healthcheck.sh
#!/bin/bash

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000)

if [ "$RESPONSE" == "200" ] || [ "$RESPONSE" == "301" ] || [ "$RESPONSE" == "302" ]; then
    exit 0
else
    # Reintentar si falla
    pkill -f "npm start"
    sleep 2
    cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
    exit 1
fi
```

### Agregar a Cron para Verificación Periódica

```bash
# Cada 5 minutos
*/5 * * * * /usr/local/bin/eon-healthcheck.sh >> /var/log/eon-healthcheck.log 2>&1
```

---

## Referencias

- [Apache Proxy Documentation](https://httpd.apache.org/docs/2.4/mod/mod_proxy.html)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Let's Encrypt Certbot](https://certbot.eff.org/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Ubuntu 24 Server Guide](https://ubuntu.com/server/docs)

---

**Última actualización:** Febrero 2026
**Versión:** 1.0
**Stack:** Apache2 + Node.js 20 + Ubuntu 24
**Plataforma:** DigitalOcean
**Estado:** Listo para producción ✅
