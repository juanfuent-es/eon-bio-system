# ✅ Actualización: Limpieza Automática en Cada Deploy

## 📝 Resumen de Cambios

Se ha actualizado el sistema de GitHub Actions para eliminar automáticamente referencias a compilaciones anteriores en cada deploy.

---

## 🆕 Archivos Creados/Actualizados

### Workflows Actualizados

```
✅ .github/workflows/build-deploy.yml (ACTUALIZADO)
   └─ Agrega limpieza de artefactos antes de compilar
   └─ Limpia npm cache
   └─ Instala dependencias fresh

✨ .github/workflows/deploy-self-hosted.yml (NUEVO)
   └─ Workflow completo para servidor propio
   └─ Deploy a /var/www/eon con limpieza automática
   └─ Backup automático antes de limpiar
   └─ Soporte para PM2 y Systemd
```

### Documentación Creada

```
✨ docs/DEPLOYMENT_CLEANUP.md (NUEVO)
   └─ Documentación sobre limpieza automática
   └─ Flujo completo de limpieza
   └─ Detalles de directorios limpios

✨ docs/SELF_HOSTED_DEPLOYMENT.md (NUEVO)
   └─ Guía completa para servidor propio
   └─ Configuración SSH
   └─ Setup PM2 o Systemd
   └─ Troubleshooting
```

### Scripts de Utilidad

```
✨ deploy-cleanup.sh (NUEVO)
   └─ Script de limpieza manual
   └─ Backup automático
   └─ Verificación post-deploy
```

---

## 🧹 Qué se Limpia Automáticamente

### En GitHub Actions (Antes de Compilar)

```
✅ .next/                   ← Build de Next.js anterior
✅ dist/                    ← Output alternativo
✅ out/                     ← Export estático
✅ coverage/                ← Tests coverage
✅ npm cache                ← Cache de npm
✅ node_modules/            ← Dependencias (cuando clean)
✅ package-lock.json        ← Lock file (cuando clean)
```

### En Servidor /var/www/eon (Antes de Deploy)

```
✅ .next/ (con backup)      ← Build anterior guardado
✅ out/                     ← Output viejo
✅ .next_cache/             ← Cache
✅ node_modules/            ← (Opcional, clean deploy)
✅ package-lock.json        ← (Opcional, clean deploy)
```

---

## 🚀 Dos Opciones de Deployment

### Opción 1: Vercel (Continuado)

**Archivo:** `.github/workflows/build-deploy.yml`

```
Trigger: Push a main o develop
Limpia: ✅ Automático
Deploy: Vercel
Backup: N/A (Vercel maneja versionado)
```

**Setup:**
- Ya configurado (solo actualizado)
- No requiere cambios

### Opción 2: Servidor Propio (NUEVO)

**Archivo:** `.github/workflows/deploy-self-hosted.yml`

```
Trigger: Push a main o production
Limpia: ✅ Automático en GitHub + Servidor
Deploy: SSH a /var/www/eon
Backup: ✅ Automático (.next anterior)
```

**Setup Requerido:**
1. Configurar SSH key
2. Agregar 3 secretos a GitHub
3. Push a main

---

## 📋 Pasos para Configurar Servidor Propio

### Paso 1: Generar SSH Key

```bash
# En el servidor
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Agregar a authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Paso 2: Obtener Clave Privada

```bash
# En el servidor
cat ~/.ssh/github_actions

# Copiar TODO el contenido (incluir -----BEGIN y -----END)
```

### Paso 3: Agregar Secretos a GitHub

```
GitHub → Repo → Settings → Secrets and variables → Actions

Agregar 3 secretos:
1. SERVER_HOST = tu.dominio.com (o IP)
2. SERVER_USER = usuario_servidor
3. SERVER_SSH_KEY = (contenido completo de archivo)

Opcional:
4. SERVER_PORT = 22 (si es diferente)
```

### Paso 4: Instalar Aplicación en Servidor

```bash
# En /var/www/eon
mkdir -p /var/www/eon
cd /var/www/eon

# Preparar directorios
mkdir -p backups
chmod 755 .

# Primera instalación
npm install
npm run build

# Setup PM2 (recomendado) o Systemd
npm install -g pm2
pm2 start npm --name "eon-bio-system" -- start
pm2 startup
pm2 save
```

### Paso 5: Push y Deploy

```bash
# En local
git push origin main

# GitHub Actions ejecutará automáticamente:
# 1. Build job
# 2. Deploy job
# 3. Verificación
```

---

## 📊 Flujo Visual de Limpieza

```
COMMIT Y PUSH
     │
     ▼
GitHub Actions Detecta
     │
     ├─────────────────┬─────────────────┐
     │                 │                 │
     ▼                 ▼                 ▼
  BUILD            DEPLOY (Vercel)   O   DEPLOY (Self-Hosted)
  
  
BUILD (En GitHub):
  1. rm -rf .next        ← Limpiar build anterior
  2. npm cache clean     ← Limpiar cache npm
  3. rm -rf node_modules ← Limpiar deps
  4. npm install         ← Instalar fresh
  5. npm run build       ← Compilar limpio
  
  
DEPLOY VERCEL:
  1. Enviar a Vercel
  2. Vercel publica
  
  
DEPLOY SELF-HOSTED (/var/www/eon):
  1. SSH al servidor
  2. cp .next → backups/  ← Backup anterior
  3. rm -rf .next         ← Limpiar build viejo
  4. rm -rf others        ← Limpiar otros directorios
  5. cp new .next         ← Copiar nuevo build
  6. npm install          ← Instalar fresh
  7. pm2 restart          ← Reiniciar app
  8. ✅ Verificar         ← Comprobar que todo está ok
```

---

## 🔑 Secretos Requeridos

### Para Vercel (ya configurado)

```
VERCEL_TOKEN
VERCEL_PROJECT_ID
VERCEL_ORG_ID
NEXT_PUBLIC_API_URL (opcional)
```

### Para Servidor Propio (NUEVO)

```
SERVER_HOST (requerido)
SERVER_USER (requerido)
SERVER_SSH_KEY (requerido)
SERVER_PORT (opcional, default 22)
NEXT_PUBLIC_API_URL (opcional)
```

---

## ⚡ Comandos Útiles

### En el Servidor

```bash
# Ver estado de aplicación
pm2 status
sudo systemctl status eon-bio-system

# Ver logs
pm2 logs eon-bio-system
sudo journalctl -u eon-bio-system -f

# Ver backups
ls -lh /var/www/eon/backups/

# Restaurar backup
cp -r /var/www/eon/backups/.next_TIMESTAMP /var/www/eon/.next
pm2 restart eon-bio-system

# Ver espacio usado
du -sh /var/www/eon/

# Limpiar backups antiguos
rm -rf /var/www/eon/backups/.next_*_OLD
```

### En GitHub

```bash
# Ver workflow execution
GitHub → Actions → Build and Deploy to Self-Hosted Server

# Ejecutar clean deploy manual
GitHub → Actions → Run workflow → clean_deploy: true
```

---

## 📁 Estructura de Directorios

### En el Servidor

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
├── .env.local                ← Secretos locales (NO git)
│
└── backups/                  ← Backups automáticos
    ├── .next_20260209_143022/
    ├── .next_20260208_102530/
    ├── .next_20260207_095015/
    └── node_modules_20260209_143022/  (si clean deploy)
```

---

## 🆚 Comparativa: Vercel vs Servidor Propio

| Aspecto | Vercel | Servidor Propio |
|--------|--------|-----------------|
| **Setup** | 5 min | 15 min |
| **Costo** | Gratis (planes) | Costo servidor |
| **Escalabilidad** | Automática | Manual |
| **Control** | Limitado | Total |
| **Limpieza** | Vercel la maneja | GitHub Actions |
| **Backups** | Versionado | Manual en /backups |
| **PM2/Systemd** | N/A | ✅ Soportado |
| **SSL** | Incluido | Certbot/Let's Encrypt |
| **Recomendado** | Startups | Producción |

---

## 🎯 Próximos Pasos

### Si ya usas Vercel

```
1. ✅ Build-deploy.yml está actualizado
2. ✅ Limpieza automática activa
3. Solo hacer push a main para ver cambios
```

### Si usas Servidor Propio

```
1. Leer: docs/SELF_HOSTED_DEPLOYMENT.md
2. Configurar SSH key
3. Agregar 3 secretos a GitHub
4. Push a main
5. Verificar deployment en Actions
6. Verificar en servidor: pm2 status
```

---

## 📖 Documentación de Referencia

```
docs/
├── DEPLOYMENT_CLEANUP.md          ← Información de limpieza
├── SELF_HOSTED_DEPLOYMENT.md      ← Setup servidor completo
├── README.md                      ← Overview general
├── GITHUB_ACTIONS_SETUP.md        ← Detalle de workflows
├── QUICK_START_SECRETS.md         ← Secretos rápido
├── VISUAL_CHECKLIST.md            ← Pasos visuales
└── INDEX.md                       ← Índice de docs

.github/workflows/
├── build-deploy.yml               ← Vercel (actualizado)
└── deploy-self-hosted.yml         ← Servidor (nuevo)

deploy-cleanup.sh                  ← Script de limpieza manual
```

---

## ✅ Verificación

### En GitHub Actions

```
Build job:
  ✅ Checkout
  ✅ Clean artifacts
  ✅ Setup Node.js
  ✅ Clean npm cache
  ✅ Install dependencies
  ✅ ESLint
  ✅ Build

Deploy job (si servidor propio):
  ✅ Download artifacts
  ✅ SSH connected
  ✅ Backup created
  ✅ Clean old artifacts
  ✅ Copy new build
  ✅ Install fresh
  ✅ Restart app
  ✅ Verification
```

### En el Servidor

```bash
# Verificar directorios
ls -la /var/www/eon/.next/        # ✅ Debe existir
ls -la /var/www/eon/node_modules/ # ✅ Debe existir
ls -la /var/www/eon/backups/      # ✅ Debe tener backups

# Verificar aplicación
pm2 status                        # ✅ Debe estar running
pm2 logs eon-bio-system           # ✅ Sin errores
```

---

## 🆘 Troubleshooting Rápido

| Error | Solución |
|-------|----------|
| SSH key error | Verificar SERVER_SSH_KEY en secrets |
| Permission denied | Verificar permisos en /var/www/eon |
| npm install timeout | npm config set fetch-timeout 120000 |
| Disk space | Limpiar backups antiguos |
| App no reinicia | Ver pm2 logs, verificar .next existe |

Ver más: [docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting](docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting)

---

## 🎉 Resumen

✅ **Limpieza automática** en cada compilación
✅ **Backups automáticos** en servidor
✅ **Dos opciones de deploy:** Vercel o Servidor Propio
✅ **Documentación completa** para ambas opciones
✅ **Scripts de utilidad** para operaciones manuales
✅ **Verificación automática** post-deployment

**Tiempo de setup:** 5-15 minutos
**Mantenimiento:** Cero (completamente automático)

---

**Última actualización:** Febrero 2026
**Versión:** 1.1
**Estado:** Listo para producción ✅
