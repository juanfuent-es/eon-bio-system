# 📋 Actualización: Limpieza de Compilaciones en Cada Deploy

Documentación sobre cómo el sistema elimina artefactos de compilación anterior automáticamente.

## 🎯 Resumen

El workflow de GitHub Actions ha sido actualizado para:

✅ **Limpiar compilaciones anteriores automáticamente**
- Eliminar `.next`, `dist`, `out` antes de compilar
- Limpiar npm cache
- Remover node_modules para instalar fresh

✅ **Crear backups en el servidor**
- Backup automático de `.next` anterior
- Opción para clean deploy (remover node_modules)
- Verificación post-deployment

✅ **Múltiples opciones de deployment**
- Vercel (continuado)
- Servidor propio en `/var/www/eon` (nuevo)

---

## 📁 Archivos Relacionados

### Workflows de GitHub

```
.github/workflows/
├── build-deploy.yml              ← Para Vercel (actualizado)
└── deploy-self-hosted.yml        ← Para servidor propio (NUEVO)
```

### Documentación

```
docs/
├── SELF_HOSTED_DEPLOYMENT.md     ← Guía servidor propio (NUEVO)
└── README.md                     ← Documentación principal
```

### Scripts

```
deploy-cleanup.sh                 ← Script de limpieza manual
```

---

## 🧹 Proceso de Limpieza Automático

### Build Stage (GitHub Actions)

```yaml
steps:
  1. Clean previous artifacts
     rm -rf .next dist out coverage
     ↓
  2. Clean npm cache
     npm cache clean --force
     ↓
  3. Remove node_modules
     rm -rf node_modules package-lock.json
     ↓
  4. Fresh install
     npm install
     ↓
  5. Build
     npm run build
```

### Deploy Stage (Servidor)

```yaml
steps:
  1. Backup previous build
     cp .next → backups/.next_TIMESTAMP
     ↓
  2. Clean old artifacts
     rm -rf .next out .next_cache
     ↓
  3. (Optional) Clean dependencies
     rm -rf node_modules package-lock.json
     ↓
  4. Copy fresh build
     cp new .next, package.json
     ↓
  5. Fresh install
     npm ci --prefer-offline
     ↓
  6. Restart app
     pm2 restart / systemctl restart
```

---

## ⚙️ Configuración Requerida

### Secretos GitHub (Para servidor propio)

Si usas `deploy-self-hosted.yml`, necesitas:

```
SERVER_HOST         ← tu.dominio.com o IP
SERVER_USER         ← usuario del servidor
SERVER_SSH_KEY      ← clave SSH privada
SERVER_PORT         ← (opcional) puerto SSH
```

Ver: [docs/SELF_HOSTED_DEPLOYMENT.md](SELF_HOSTED_DEPLOYMENT.md#secretos-de-github)

---

## 🚀 Cuándo se Ejecuta la Limpieza

### build-deploy.yml (Vercel)

```
Trigger:
  - Push a main
  - Push a develop
  - Pull Requests a main
  - Manual workflow dispatch

Limpia:
  ✅ Antes de cada compilación
  ✅ Instala dependencias fresh
  ✅ Compila proyecto limpio
```

### deploy-self-hosted.yml (Servidor)

```
Trigger:
  - Push a main
  - Push a production
  - Manual workflow dispatch (opción clean_deploy)

Limpia:
  ✅ En GitHub Actions: Mismo que build-deploy.yml
  ✅ En servidor: Backup automático + limpieza
  ✅ (Opcional) Limpia node_modules en servidor
```

---

## 📊 Directorios que se Limpian

### En GitHub Actions

```
.next/                      ← Build de Next.js
dist/                       ← Output alternativo
out/                        ← Export estático
coverage/                   ← Tests coverage
build/                      ← Build genérico

node_modules/               ← Dependencias (cuando clean)
package-lock.json           ← Lock file (cuando clean)
```

### En Servidor (/var/www/eon)

```
.next/                      ← Build anterior (con backup)
out/                        ← Output antiguo
.next_cache/                ← Cache de Next.js

node_modules/               ← (Solo si clean_deploy=true)
package-lock.json           ← (Solo si clean_deploy=true)
```

---

## 💾 Sistema de Backups

### Ubicación

```
/var/www/eon/backups/
├── .next_20260209_143022/      ← Backup automático
├── .next_20260209_102530/
├── .next_20260208_095015/
└── node_modules_20260209_143022/  ← (Si clean deploy)
```

### Retención

- **Automática:** Últimos 10 backups
- **Manual:** Script de limpieza disponible

```bash
# Script de limpieza
./deploy-cleanup.sh

# O manual
rm -rf /var/www/eon/backups/.next_TIMESTAMP
```

---

## 🔄 Flujo Completo

```
┌─────────────────────────────────────────┐
│  TÚ: git push origin main               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GITHUB ACTIONS: Build Job              │
├─────────────────────────────────────────┤
│  1. Checkout código                     │
│  2. 🧹 Limpiar .next anterior          │
│  3. 🧹 Limpiar npm cache               │
│  4. 🧹 Remover node_modules            │
│  5. 📦 npm install (fresh)              │
│  6. 🔨 npm run build                    │
│  7. 📦 Crear deployment package         │
└──────────────┬──────────────────────────┘
               │
               ▼ (Si build exitoso)
┌─────────────────────────────────────────┐
│  GITHUB ACTIONS: Deploy Job             │
├─────────────────────────────────────────┤
│  1. Descargar artifacts                 │
│  2. SSH al servidor /var/www/eon        │
│  3. 💾 Backup .next anterior            │
│  4. 🧹 Limpiar .next viejo              │
│  5. 🧹 Limpiar otros directorios        │
│  6. 📦 Copiar nuevo .next               │
│  7. 📦 npm ci (fresh install)           │
│  8. 🔐 Establecer permisos              │
│  9. 🔄 Reiniciar app (PM2/Systemd)     │
│  10. ✅ Verificar deployment             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  SERVIDOR: Aplicación Actualizada       │
├─────────────────────────────────────────┤
│  ✅ .next limpio y nuevo               │
│  ✅ node_modules fresco                │
│  ✅ Aplicación reiniciada              │
│  ✅ Backup anterior guardado           │
└─────────────────────────────────────────┘
```

---

## 📖 Documentación Completa

### Para Vercel (build-deploy.yml)
→ [docs/README.md](README.md)
→ [docs/GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)

### Para Servidor Propio (deploy-self-hosted.yml)
→ [docs/SELF_HOSTED_DEPLOYMENT.md](SELF_HOSTED_DEPLOYMENT.md) ⭐

### Información General
→ [docs/INDEX.md](INDEX.md)

---

## ⚡ Ejecución Rápida

### Setup Inicial (Servidor)

```bash
# 1. Configurar SSH key (ver docs/SELF_HOSTED_DEPLOYMENT.md)

# 2. Agregar secretos a GitHub
GitHub → Settings → Secrets
├─ SERVER_HOST = tu.dominio.com
├─ SERVER_USER = deploy_user
├─ SERVER_SSH_KEY = (contenido de ~/.ssh/github_actions)
└─ SERVER_PORT = 22

# 3. Push a main o production
git push origin main

# 4. Verificar en GitHub Actions
GitHub → Actions → Build and Deploy to Self-Hosted Server
```

### Ejecución Manual (Clean Deploy)

```
GitHub → Actions
→ Build and Deploy to Self-Hosted Server
→ Run workflow
→ clean_deploy: ✅
→ Run workflow
```

---

## 🔍 Verificación

### En GitHub Actions

```
✅ Build job completed
  ├─ Code cleaned
  ├─ Dependencies fresh
  └─ Build successful

✅ Deploy job completed
  ├─ SSH connected
  ├─ Artifacts copied
  ├─ Dependencies installed
  ├─ Application restarted
  └─ Verification passed
```

### En el Servidor

```bash
# Ver logs
pm2 logs eon-bio-system
# o
sudo journalctl -u eon-bio-system -f

# Ver directorio
ls -la /var/www/eon/.next/     # Debe existir
ls -la /var/www/eon/node_modules/ # Debe existir

# Ver backups
ls -lh /var/www/eon/backups/   # Debe tener backups

# Verificar proceso
pm2 status
# o
sudo systemctl status eon-bio-system
```

---

## 🆘 Si Algo Falla

### "Build failed" en GitHub

```bash
# Verificar localmente
npm run build

# Ver logs exactos en GitHub
GitHub → Actions → Build job → Ver logs
```

### "Deploy failed" en GitHub

```
GitHub → Actions → Deploy job → Ver logs SSH

Buscar:
  - Permission denied
  - SSH key error
  - Disk space
  - npm install timeout
```

### Servidor no actualiza

```bash
# En servidor
# 1. Verificar que .next existe
ls -la /var/www/eon/.next/

# 2. Ver logs de aplicación
pm2 logs eon-bio-system

# 3. Ver si proceso está corriendo
pm2 status

# 4. Reiniciar manual
pm2 restart eon-bio-system
```

Ver más soluciones: [docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting](SELF_HOSTED_DEPLOYMENT.md#troubleshooting)

---

## 📚 Archivos de Referencia

| Archivo | Usa cuando |
|---------|-----------|
| `.github/workflows/build-deploy.yml` | Deploy a Vercel |
| `.github/workflows/deploy-self-hosted.yml` | Deploy a servidor propio |
| `deploy-cleanup.sh` | Limpieza manual en servidor |
| `docs/SELF_HOSTED_DEPLOYMENT.md` | Configurar servidor propio |
| `docs/README.md` | Overview general |

---

## ✨ Características

✅ **Automático:** No requiere intervención manual
✅ **Limpio:** Elimina artefactos anteriores
✅ **Seguro:** Backups automáticos antes de limpiar
✅ **Confiable:** Verificación post-deployment
✅ **Escalable:** Fácil agregar más optimizaciones

---

## 🎯 Próximos Pasos

1. **Si usas Vercel:**
   - Configuración existente ya está actualizada
   - Solo hacer push a main para ver cambios

2. **Si usas Servidor Propio:**
   - Leer: [docs/SELF_HOSTED_DEPLOYMENT.md](SELF_HOSTED_DEPLOYMENT.md)
   - Configurar SSH key
   - Agregar 3 secretos a GitHub
   - Push a main para activar deployment

---

**Última actualización:** Febrero 2026
**Versión:** 1.1
**Estado:** Listo para producción ✅
