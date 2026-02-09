# 📋 Checklist: Apache + DigitalOcean Setup

Usa este checklist para verificar que todo está configurado correctamente.

---

## ✅ PASO 1: Servidor DigitalOcean

### Sistema Operativo y Actualizaciones
- [ ] Ubuntu 24 instalado
- [ ] `sudo apt update && sudo apt upgrade -y` ejecutado

### Node.js 20
- [ ] Node.js 20+ instalado
  ```bash
  node --version  # Debe ser v20+
  ```
- [ ] npm instalado
  ```bash
  npm --version
  ```

### Apache2
- [ ] Apache2 instalado
  ```bash
  sudo apt install -y apache2
  ```
- [ ] Módulo proxy habilitado
  ```bash
  sudo a2enmod proxy proxy_http rewrite ssl headers
  ```
- [ ] Apache corriendo
  ```bash
  sudo systemctl status apache2  # Debe estar active
  ```

### Directorios
- [ ] `/var/www/eon` creado
  ```bash
  sudo mkdir -p /var/www/eon/backups
  ```
- [ ] Permisos correctos
  ```bash
  sudo chown -R www-data:www-data /var/www/eon
  ```
- [ ] Repositorio clonado
  ```bash
  cd /var/www/eon
  ls -la  # Debe tener archivos del proyecto
  ```

### Aplicación
- [ ] Dependencias instaladas
  ```bash
  npm install
  ```
- [ ] Build ejecutado
  ```bash
  npm run build  # Debe crear .next/
  ```
- [ ] Verificar .next existe
  ```bash
  ls -la /var/www/eon/.next/  # Debe tener contenido
  ```

### Node.js Corriendo
- [ ] Aplicación iniciada
  ```bash
  cd /var/www/eon && nohup npm start > /var/log/eon-bio-system.log 2>&1 &
  ```
- [ ] Proceso verificado
  ```bash
  ps aux | grep npm  # Debe mostrar proceso corriendo
  ```
- [ ] Puerto 3000 disponible
  ```bash
  lsof -i :3000  # Debe mostrar node/npm en puerto 3000
  ```
- [ ] Responde en localhost
  ```bash
  curl http://127.0.0.1:3000  # Debe devolver HTML
  ```

---

## ✅ PASO 2: SSH para GitHub

### Generar Key
- [ ] SSH key generada
  ```bash
  ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
  ```
- [ ] Permisos correctos
  ```bash
  chmod 600 ~/.ssh/github_actions
  chmod 700 ~/.ssh
  ```

### Authorized Keys
- [ ] Key agregada a authorized_keys
  ```bash
  cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
  ```
- [ ] Permisos verificados
  ```bash
  chmod 600 ~/.ssh/authorized_keys
  cat ~/.ssh/authorized_keys | grep github  # Debe aparecer
  ```

### Clave Privada para GitHub
- [ ] Clave privada copiada
  ```bash
  cat ~/.ssh/github_actions
  # Debe tener >1000 caracteres y empezar con:
  # -----BEGIN OPENSSH PRIVATE KEY-----
  ```

---

## ✅ PASO 3: Configuración Apache

### Vhost File
- [ ] Archivo vhost creado
  ```bash
  sudo ls -la /etc/apache2/sites-available/eon-bio-system.conf
  ```
- [ ] Contiene proxy config
  ```bash
  sudo grep -i "ProxyPass" /etc/apache2/sites-available/eon-bio-system.conf
  ```

### Sitio Habilitado
- [ ] Sitio activado
  ```bash
  sudo a2ensite eon-bio-system.conf
  ```
- [ ] Sitio por defecto deshabilitado (opcional)
  ```bash
  sudo a2dissite 000-default.conf
  ```

### Verificación Apache
- [ ] Configuración válida
  ```bash
  sudo apache2ctl configtest  # Debe decir "Syntax OK"
  ```
- [ ] Apache reiniciado
  ```bash
  sudo systemctl restart apache2
  sudo systemctl status apache2  # Debe estar active
  ```

### SSL (Let's Encrypt)
- [ ] Certbot instalado
  ```bash
  sudo apt install -y certbot python3-certbot-apache
  sudo certbot --version  # Debe mostrar versión
  ```
- [ ] Certificado obtenido
  ```bash
  sudo certbot --apache -d tu.dominio.com -d www.tu.dominio.com
  ```
- [ ] Certificado verificado
  ```bash
  sudo certbot certificates  # Debe mostrar certificado válido
  ```
- [ ] Auto-renovación habilitada
  ```bash
  sudo systemctl status certbot.timer  # Debe estar active
  ```

### Testing Apache
- [ ] Test de conectividad HTTP
  ```bash
  curl -I http://127.0.0.1  # Debe redirigir a HTTPS
  ```
- [ ] Test de conectividad HTTPS
  ```bash
  curl -I https://tu.dominio.com  # Debe devolver 200/301/302
  ```

---

## ✅ PASO 4: GitHub Secrets

### SERVER_HOST
- [ ] Agregado a GitHub Secrets
  - Nombre: `SERVER_HOST`
  - Valor: tu IP o dominio
- [ ] Verificado
  ```bash
  ping $(cat secreto)  # Debe responder
  ```

### SERVER_USER
- [ ] Agregado a GitHub Secrets
  - Nombre: `SERVER_USER`
  - Valor: `root` o usuario con sudo
- [ ] Verificado
  ```bash
  whoami  # Debe coincidir con SERVER_USER
  ```

### SERVER_SSH_KEY
- [ ] Agregado a GitHub Secrets
  - Nombre: `SERVER_SSH_KEY`
  - Valor: contenido de ~/.ssh/github_actions
- [ ] Verificado
  ```bash
  cat ~/.ssh/github_actions | wc -c  # Debe ser >1000
  head -1 ~/.ssh/github_actions      # Debe empezar con -----BEGIN
  ```

### SERVER_PORT (Opcional)
- [ ] Agregado a GitHub Secrets (si puerto no es 22)
  - Nombre: `SERVER_PORT`
  - Valor: tu puerto SSH

---

## ✅ PASO 5: GitHub Workflow

### Archivo Configurado
- [ ] Workflow existe
  ```bash
  ls -la .github/workflows/deploy-self-hosted.yml
  ```
- [ ] Tiene configuración Apache
  ```bash
  grep -i "apache\|npm start" .github/workflows/deploy-self-hosted.yml
  ```

### Variables de Entorno
- [ ] DEPLOY_PATH configurado
  ```bash
  grep "DEPLOY_PATH" .github/workflows/deploy-self-hosted.yml
  ```
- [ ] APACHE_USER configurado
  ```bash
  grep "APACHE_USER" .github/workflows/deploy-self-hosted.yml
  ```

---

## ✅ PASO 6: Test de Deployment

### Trigger Manual
- [ ] Workflow puede ejecutarse manualmente
  ```
  GitHub → Actions → Build and Deploy to Apache Server → Run workflow
  ```

### Ejecución de Build
- [ ] Build job completado
  ```
  GitHub Actions → Última ejecución → Build job → ✅
  ```
- [ ] Artefactos creados
  ```
  GitHub Actions → Deploy job → Ver logs de "Upload artifacts"
  ```

### Ejecución de Deploy
- [ ] Deploy job completado
  ```
  GitHub Actions → Última ejecución → Deploy job → ✅
  ```
- [ ] SSH conexión exitosa
  ```
  Ver en logs: "✅ Deployment completed successfully"
  ```
- [ ] Apache reiniciado
  ```
  Ver en logs: "✅ Apache restarted"
  ```

### Verificación Final
- [ ] Aplicación accesible
  ```bash
  curl -I https://tu.dominio.com  # Debe devolver 200
  ```
- [ ] En navegador
  ```
  Abrir: https://tu.dominio.com
  Debe cargar la página sin errores
  ```

---

## ✅ PASO 7: Monitoreo

### Logs de Aplicación
- [ ] Archivo de log existe
  ```bash
  tail -20 /var/log/eon-bio-system.log
  ```
- [ ] Sin errores
  ```bash
  tail -20 /var/log/eon-bio-system.log | grep -i error  # No debe mostrar
  ```

### Logs de Apache
- [ ] Error log accesible
  ```bash
  sudo tail -20 /var/log/apache2/eon-ssl-error.log
  ```
- [ ] Access log accesible
  ```bash
  sudo tail -20 /var/log/apache2/eon-ssl-access.log
  ```

### Proceso Node.js
- [ ] Corriendo
  ```bash
  ps aux | grep npm | grep -v grep
  ```
- [ ] En puerto 3000
  ```bash
  lsof -i :3000
  ```

### Apache
- [ ] Corriendo
  ```bash
  sudo systemctl status apache2
  ```
- [ ] Módulos activos
  ```bash
  sudo apache2ctl -M | grep proxy
  ```

### Backups
- [ ] Directorio existe
  ```bash
  ls -la /var/www/eon/backups/
  ```
- [ ] Con contenido (después de primer deploy)
  ```bash
  ls -la /var/www/eon/backups/.next_*
  ```

---

## 📋 PASO 8: Variables de Entorno

### .env.local (crear manualmente en servidor)
- [ ] Archivo creado
  ```bash
  cat /var/www/eon/.env.local
  ```
- [ ] Contiene variables necesarias
  ```bash
  grep "NEXT_PUBLIC_API_URL\|DATABASE_URL" /var/www/eon/.env.local
  ```
- [ ] Permisos seguros
  ```bash
  ls -la /var/www/eon/.env.local  # Debe ser 600
  ```

---

## ✅ PASO 9: Documentación

### README y Docs
- [ ] APACHE_SETUP_COMPLETE.md leído
- [ ] APACHE_QUICK_START.md disponible
- [ ] APACHE_DIGITALOCEAN_DEPLOYMENT.md accesible

---

## 🎯 RESUMEN FINAL

```
✅ Servidor configurado
✅ SSH key generada
✅ Apache configurado como reverse proxy
✅ SSL activo
✅ Secretos en GitHub
✅ Workflow configurado
✅ Deployment ejecutado exitosamente
✅ Aplicación accesible en https://tu.dominio.com
✅ Backups automáticos funcionando
✅ Logs disponibles
✅ Documentación leída
```

---

## 🚀 ¡Listo para Producción!

Si todos los items están ✅, tu setup está completo y listo para producción.

**Próximos pasos:**
1. Configurar DNS (apuntar tu.dominio.com a IP de DigitalOcean)
2. Hacer un git push y verificar que deploy funciona automáticamente
3. Monitorear logs después del deployment
4. Configurar alertas (opcional)
5. Backup de base de datos (si aplica)

---

**Estado:** Listo para deploy ✅
**Última verificación:** [Escribe fecha aquí]
