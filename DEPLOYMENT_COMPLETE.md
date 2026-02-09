# 🎯 RESUMEN: Deploy Limpio en /var/www/eon

## ✅ Lo que se ha Configurado

### 🔧 Automatización Completa

Tu sistema de GitHub Actions ahora:

✅ **Elimina artefactos anteriores automáticamente**
- Limpia `.next`, `dist`, `out` antes de compilar
- Limpia npm cache para instalar dependencias fresh
- Opción para clean deploy (remover node_modules)

✅ **Crea backups automáticos en el servidor**
- Guarda compilación anterior en `/var/www/eon/backups/`
- Permite rollback rápido si algo falla
- Gestión automática de backups (últimos 10)

✅ **Deploy automático con verificación**
- Compila en GitHub Actions
- Transfiere via SSH a `/var/www/eon`
- Instala dependencias fresh en servidor
- Reinicia automáticamente (PM2 o Systemd)
- Verifica que todo esté correcto

---

## 📁 Archivos Creados/Actualizados

```
✅ .github/workflows/build-deploy.yml
   └─ ACTUALIZADO: Limpieza antes de compilar

✨ .github/workflows/deploy-self-hosted.yml
   └─ NUEVO: Deploy a /var/www/eon con limpieza

✨ docs/DEPLOYMENT_CLEANUP.md
   └─ NUEVO: Documentación de limpieza

✨ docs/SELF_HOSTED_DEPLOYMENT.md
   └─ NUEVO: Guía completa de servidor propio

✨ deploy-cleanup.sh
   └─ NUEVO: Script manual de limpieza

✨ DEPLOYMENT_UPDATES.md
   └─ NUEVO: Resumen de actualizaciones
```

---

## 🚀 Inicio Rápido: Servidor Propio

### Paso 1: SSH Key (5 min)

```bash
# En el servidor
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Agregar a authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Copiar clave privada
cat ~/.ssh/github_actions
```

### Paso 2: Secretos GitHub (3 min)

```
GitHub → Settings → Secrets and variables → Actions

Agregar 3 secretos:
1. SERVER_HOST = tu.dominio.com
2. SERVER_USER = tu_usuario
3. SERVER_SSH_KEY = (contenido completo de archivo)
```

### Paso 3: Instalar en Servidor (5 min)

```bash
# En servidor
mkdir -p /var/www/eon
cd /var/www/eon

# Instalar y compilar
npm install
npm run build

# Setup PM2 (recomendado)
npm install -g pm2
pm2 start npm --name "eon-bio-system" -- start
pm2 startup && pm2 save
```

### Paso 4: Push (2 min)

```bash
# En local
git push origin main

# ✅ Deployment automático activado!
```

### Paso 5: Verificar (1 min)

```
GitHub → Actions
→ Build and Deploy to Self-Hosted Server
→ Ver logs

O en servidor:
pm2 status
pm2 logs eon-bio-system
```

**Tiempo total: ~15 minutos**

---

## 📊 Flujo de Limpieza

```
┌─ GITHUB ACTIONS ─────────────────────────────────────┐
│                                                       │
│  1. Checkout código                                  │
│  2. 🧹 rm -rf .next dist out coverage               │
│  3. 🧹 npm cache clean --force                      │
│  4. 🧹 rm -rf node_modules package-lock.json        │
│  5. 📦 npm install --prefer-offline                 │
│  6. 🔨 npm run build                                │
│  7. ✅ Build completado                             │
│                                                       │
└───────────────────────────────────────────────────────┘
                          │
                          │ (Transferir via SSH)
                          ▼
┌─ SERVIDOR /var/www/eon ──────────────────────────────┐
│                                                       │
│  1. 💾 cp .next → backups/.next_TIMESTAMP            │
│  2. 🧹 rm -rf .next out .next_cache                 │
│  3. (Opcional) 🧹 rm -rf node_modules               │
│  4. 📦 cp new .next, package.json                   │
│  5. 📦 npm ci --prefer-offline                      │
│  6. 🔄 pm2 restart eon-bio-system                   │
│  7. ✅ Verificación                                 │
│                                                       │
└───────────────────────────────────────────────────────┘
                          │
                          ▼
                    ✅ APP ACTUALIZADA
```

---

## 🎯 Qué se Limpia en Cada Deploy

### Antes de Compilar (GitHub)

```
❌ .next/              → Se elimina y recompila
❌ dist/               → Se elimina
❌ out/                → Se elimina
❌ coverage/           → Se elimina
❌ npm cache           → Se limpia
❌ node_modules/       → Se elimina (cuando clean)
❌ package-lock.json   → Se elimina (cuando clean)
```

### Antes de Instalar en Servidor

```
❌ .next/ anterior     → Se hace backup primero
❌ out/                → Se elimina
❌ .next_cache/        → Se elimina
❌ node_modules/       → Se elimina (clean deploy)
❌ package-lock.json   → Se elimina (clean deploy)
```

### Ubicación de Backups

```
/var/www/eon/backups/
├── .next_20260209_143022/    ← Backup automático
├── .next_20260208_102530/
└── .next_20260207_095015/
```

---

## 🔑 3 Secretos Necesarios

| Secreto | Valor | Dónde obtener |
|---------|-------|---------------|
| `SERVER_HOST` | tu.dominio.com | Tu dominio o IP |
| `SERVER_USER` | usuario_servidor | `whoami` en servidor |
| `SERVER_SSH_KEY` | Clave privada | `cat ~/.ssh/github_actions` |

---

## 🛠️ Comandos en el Servidor

```bash
# Ver estado
pm2 status
pm2 logs eon-bio-system

# O con Systemd
sudo systemctl status eon-bio-system
sudo journalctl -u eon-bio-system -f

# Reiniciar manual
pm2 restart eon-bio-system

# Ver backups
ls -lh /var/www/eon/backups/

# Restaurar backup
cp -r /var/www/eon/backups/.next_20260209_143022 /var/www/eon/.next
pm2 restart eon-bio-system

# Limpiar manualmente (script disponible)
./deploy-cleanup.sh
```

---

## 📖 Documentación Disponible

Para **servidor propio**, lee en este orden:

1. **DEPLOYMENT_UPDATES.md** ← Resumen (estás aquí)
2. **docs/DEPLOYMENT_CLEANUP.md** ← Info de limpieza (15 min)
3. **docs/SELF_HOSTED_DEPLOYMENT.md** ← Guía completa (30 min)

Para **Vercel**, ya está configurado:
- `build-deploy.yml` está actualizado
- Solo hacer push para que funcione

---

## ⚡ Ejecución Manual (Clean Deploy)

Si necesitas forzar un clean deploy (remover node_modules):

```
GitHub → Actions
→ Build and Deploy to Self-Hosted Server
→ Run workflow
→ clean_deploy: [✅ Marcar]
→ Run workflow
```

Esto eliminará node_modules en el servidor antes de reinstalar.

---

## 🔍 Verificación

### En GitHub

```
GitHub → Actions
→ Build and Deploy to Self-Hosted Server
→ Último workflow

Debe verse:
✅ Build job passed
✅ Deploy job passed
✅ Notify job passed
```

### En el Servidor

```bash
# Estos comandos deben funcionar:
ls -la /var/www/eon/.next/        # ✅ Debe existir
ls -la /var/www/eon/node_modules/ # ✅ Debe existir
ls -la /var/www/eon/package.json  # ✅ Debe existir
ls -la /var/www/eon/backups/      # ✅ Debe tener backups

pm2 status                        # ✅ Debe estar online
```

---

## 🆘 Troubleshooting Rápido

### "SSH connection failed"
```bash
# En servidor
cat ~/.ssh/github_actions | wc -c  # Debe tener >1000 caracteres
chmod 600 ~/.ssh/github_actions
```

### "Permission denied"
```bash
# En servidor
sudo chown -R $USER:$USER /var/www/eon
chmod -R 755 /var/www/eon
```

### "App no reinicia después del deploy"
```bash
# En servidor
pm2 logs eon-bio-system
ls -la /var/www/eon/.next/
cat /var/www/eon/package.json | head
```

→ Ver más: [docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting](docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting)

---

## 📋 Checklist Configuración

```
PASO 1: SSH Key
  [ ] ssh-keygen en servidor
  [ ] Agregar a authorized_keys
  [ ] Copiar contenido

PASO 2: GitHub Secrets
  [ ] SERVER_HOST agregado
  [ ] SERVER_USER agregado
  [ ] SERVER_SSH_KEY agregado (contenido completo)

PASO 3: Servidor
  [ ] mkdir -p /var/www/eon
  [ ] npm install
  [ ] npm run build
  [ ] pm2 start npm

PASO 4: Deploy
  [ ] git push origin main
  [ ] GitHub Actions ejecuta (3-5 min)
  [ ] Deployment exitoso en /var/www/eon

PASO 5: Verificación
  [ ] pm2 status muestra "online"
  [ ] pm2 logs sin errores
  [ ] ls /var/www/eon/.next/ tiene archivos
  [ ] Aplicación accesible en navegador

✅ LISTO PARA PRODUCCIÓN
```

---

## 🎉 Beneficios

✅ **Cero limpieza manual** - Todo automático
✅ **Backups seguros** - Cada deploy guarda anterior
✅ **Deploy limpio** - Instala dependencias fresh
✅ **Rollback fácil** - Restaurar backup en 1 comando
✅ **Verificación automática** - Comprueba que todo está ok
✅ **Documentación completa** - Guías para todo

---

## 🚀 Próximos Pasos

### Si YA TIENES servidor en /var/www/eon

```
1. Configurar SSH key (5 min)
2. Agregar 3 secretos a GitHub (3 min)
3. git push origin main
4. Verificar en GitHub Actions
5. Listo! Deploy automático activo
```

### Si TODAVÍA NO tienes servidor

```
1. Leer: docs/SELF_HOSTED_DEPLOYMENT.md
2. Instalar Node.js 20+ en servidor
3. Crear directorio /var/www/eon
4. Seguir "Inicio Rápido" arriba
```

---

## 📚 Referencias Rápidas

```
Para Setup:        docs/SELF_HOSTED_DEPLOYMENT.md
Para Limpieza:     docs/DEPLOYMENT_CLEANUP.md
Para Troubleshoot: docs/SELF_HOSTED_DEPLOYMENT.md#troubleshooting
Script Manual:     ./deploy-cleanup.sh
Índice Docs:       docs/INDEX.md
```

---

## ✨ Estado Actual

```
Vercel:
  ✅ Build-deploy.yml actualizado
  ✅ Limpieza automática
  ✅ Deploy automático

Servidor Propio:
  ✨ NUEVO: deploy-self-hosted.yml
  ✨ NUEVO: Limpieza automática en servidor
  ✨ NUEVO: Backups automáticos
  ✨ NUEVO: SSH deployment
```

---

**Configuración completada:** ✅
**Documentación:** ✅
**Scripts de utilidad:** ✅
**Listo para producción:** ✅

¡Tu sistema ahora elimina automáticamente compilaciones anteriores en cada deploy!

---

**Última actualización:** Febrero 2026
**Versión:** 1.1
**Tiempo de setup:** 15-20 minutos
