# 🚀 Apache + DigitalOcean + Ubuntu 24 - Setup Completo

Guía rápida para configurar tu aplicación Next.js en Apache con DigitalOcean.

## ⚡ 5 Pasos Rápidos

### 1️⃣ En el Servidor (DigitalOcean)

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Apache2
sudo apt install -y apache2

# Habilitar módulos
sudo a2enmod proxy proxy_http rewrite ssl headers
sudo systemctl restart apache2

# Crear directorio
sudo mkdir -p /var/www/eon/backups
sudo chown -R www-data:www-data /var/www/eon

# Clonar repositorio
cd /var/www/eon
sudo -u www-data git clone https://github.com/tu_usuario/eon-bio-system.git .
sudo -u www-data npm install
sudo -u www-data npm run build

# Iniciar aplicación
cd /var/www/eon
nohup npm start > /var/log/eon-bio-system.log 2>&1 &

# Verificar
ps aux | grep "npm start"
lsof -i :3000
```

### 2️⃣ Configurar Apache Reverse Proxy

```bash
# Copiar vhost configuration
sudo tee /etc/apache2/sites-available/eon-bio-system.conf > /dev/null << 'EOF'
<VirtualHost *:80>
    ServerName tu.dominio.com
    ServerAlias www.tu.dominio.com
    Redirect permanent / https://tu.dominio.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName tu.dominio.com
    ServerAlias www.tu.dominio.com
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/tu.dominio.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/tu.dominio.com/privkey.pem
    
    Header always set Strict-Transport-Security "max-age=31536000"
    
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
    
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://127.0.0.1:3000/$1" [P,L]
    
    ErrorLog ${APACHE_LOG_DIR}/eon-error.log
    CustomLog ${APACHE_LOG_DIR}/eon-access.log combined
</VirtualHost>
EOF

# Habilitar sitio
sudo a2ensite eon-bio-system.conf
sudo a2dissite 000-default.conf

# Verificar y reiniciar
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### 3️⃣ SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtener certificado
sudo certbot --apache -d tu.dominio.com -d www.tu.dominio.com

# Auto-renovación
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 4️⃣ Configurar SSH para GitHub

```bash
# En servidor como root o usuario con sudo
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Agregar a authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Copiar clave privada
cat ~/.ssh/github_actions
```

### 5️⃣ Agregar Secretos a GitHub

```
GitHub → Settings → Secrets and variables → Actions

Agregar:
1. SERVER_HOST = tu_ip_digitalocean (ej: 123.45.67.89)
2. SERVER_USER = root (o tu_usuario_sudo)
3. SERVER_SSH_KEY = (contenido de ~/.ssh/github_actions)
```

**¡Listo!** Ahora cada push a `main` deployará automáticamente.

---

## 🔄 Flujo de Deployment

```
git push origin main
    ↓
GitHub Actions:
  1. 🧹 Limpia .next anterior
  2. 🧹 Limpia npm cache
  3. 📦 npm ci (instala fresh)
  4. 🔨 npm run build
  5. Crea deployment package
    ↓
SSH al Servidor:
  6. 💾 Backup .next anterior
  7. 🧹 Limpia .next viejo
  8. 📦 Copia nuevo .next
  9. 📦 npm ci (instala fresh)
  10. ⏹️  Mata proceso Node anterior
  11. 🚀 Inicia npm start
  12. 🔄 Reinicia Apache
  13. ✅ Verifica que funciona
    ↓
¡Tu app está actualizada!
```

---

## 📊 Qué se Limpia en Cada Deploy

### En GitHub Actions

```
✅ rm -rf .next             ← Compilación anterior
✅ npm cache clean --force  ← Cache npm
✅ rm -rf dist out coverage ← Otros outputs
✅ npm install fresh        ← Dependencias frescas
```

### En Servidor

```
✅ Backup automático de .next anterior → /var/www/eon/backups/
✅ rm -rf .next                        ← Build anterior
✅ npm ci --prefer-offline             ← Instala fresh
✅ Reinicia Node.js                    ← Nuevo proceso
✅ Reinicia Apache                     ← Reverse proxy updated
```

---

## 🔑 3 Secretos Necesarios

| Secreto | Obtener de |
|---------|-----------|
| `SERVER_HOST` | Tu IP de DigitalOcean (ej: 123.45.67.89) |
| `SERVER_USER` | `whoami` en servidor (generalmente `root`) |
| `SERVER_SSH_KEY` | `cat ~/.ssh/github_actions` en servidor |

---

## 🛠️ Comandos Útiles

### Ver Logs

```bash
# App logs
tail -f /var/log/eon-bio-system.log

# Apache access
sudo tail -f /var/log/apache2/eon-access.log

# Apache errors
sudo tail -f /var/log/apache2/eon-error.log
```

### Reiniciar Manualmente

```bash
# Matar proceso Node
pkill -f "npm start"

# Esperar
sleep 2

# Reiniciar
cd /var/www/eon
nohup npm start > /var/log/eon-bio-system.log 2>&1 &

# Reiniciar Apache
sudo systemctl restart apache2
```

### Ver Backups

```bash
ls -lh /var/www/eon/backups/
```

### Restaurar Backup

```bash
rm -rf /var/www/eon/.next
cp -r /var/www/eon/backups/.next_20260209_143022 /var/www/eon/.next

pkill -f "npm start"
sleep 2
cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
```

---

## ✅ Verificación

### En GitHub

```
GitHub → Actions
→ Build and Deploy to Apache Server
→ Último workflow debe estar ✅ verde
```

### En Servidor

```bash
# Node.js corriendo
ps aux | grep npm
lsof -i :3000

# Responde
curl http://127.0.0.1:3000

# Apache funcionando
sudo systemctl status apache2

# Desde navegador
https://tu.dominio.com
```

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| SSH connection failed | Verificar SERVER_SSH_KEY tiene contenido completo |
| 502 Bad Gateway | `pkill -f npm; npm start` y verificar puerto 3000 |
| Permission denied | `sudo chown -R www-data:www-data /var/www/eon` |
| npm install fails | `npm config set fetch-timeout 120000` |
| App no reinicia | Ver logs: `tail -50 /var/log/eon-bio-system.log` |

---

## 📖 Documentación Completa

Para más detalles, ver:
- [docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md](docs/APACHE_DIGITALOCEAN_DEPLOYMENT.md) - Guía completa
- [docs/DEPLOYMENT_CLEANUP.md](docs/DEPLOYMENT_CLEANUP.md) - Info de limpieza
- [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) - Resumen general

---

## 🎯 Checklist Rápido

```
SERVIDOR:
  [ ] Node.js 20 instalado
  [ ] Apache instalado y habilitado
  [ ] /var/www/eon creado
  [ ] Repositorio clonado
  [ ] npm install ejecutado
  [ ] npm run build ejecutado
  [ ] npm start ejecutándose
  [ ] Vhost Apache configurado
  [ ] SSL con Certbot

GITHUB SECRETS:
  [ ] SERVER_HOST agregado
  [ ] SERVER_USER agregado
  [ ] SERVER_SSH_KEY agregado

DEPLOY:
  [ ] git push origin main
  [ ] GitHub Actions ejecutado
  [ ] Deployment exitoso
  [ ] App accesible en https://tu.dominio.com
```

---

**Tiempo de setup:** ~20 minutos
**Mantenimiento:** Cero (todo automático)
**Estado:** Listo para producción ✅
