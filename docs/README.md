# 📋 Resumen: Setup Completo GitHub Actions + Vercel

## 🎯 Objetivo
Compilar automáticamente tu proyecto Next.js en cada push a GitHub y publicarlo en Vercel.

---

## ✅ Archivos Creados

```
✓ .github/workflows/build-deploy.yml     → Workflow automático
✓ docs/GITHUB_ACTIONS_SETUP.md          → Documentación completa (120+ líneas)
✓ docs/QUICK_START_SECRETS.md           → Guía rápida de secretos
✓ .env.example                          → Plantilla de variables
```

---

## 🚀 Pasos para Configurar (Orden Exacto)

### PASO 1: Obtener Credenciales Vercel (5 min)

```bash
# En terminal local
vercel login

# Obtener datos
vercel projects list      # → Copia VERCEL_PROJECT_ID
vercel org list          # → Copia VERCEL_ORG_ID
```

**O desde Vercel Dashboard:**
1. Ir a https://vercel.com
2. Settings → Tokens → Crear nuevo
3. Settings → Team → Copiar Team ID
4. Project Settings → Copiar Project ID

### PASO 2: Agregar Secretos en GitHub (3 min)

1. Ir a: `GitHub.com/tuusuario/eon-bio-system`
2. Settings → Secrets and variables → Actions
3. Crear 3 secretos:

```
VERCEL_TOKEN = (Token obtenido en Paso 1)
VERCEL_PROJECT_ID = (ID del proyecto)
VERCEL_ORG_ID = (ID de la organización)
```

### PASO 3: Configurar Variables de Entorno (2 min)

Copiar en `.env.local` (NO COMMITS):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
# ... más variables según necesites
```

Para producción, agregar en Vercel Dashboard:
1. Project Settings → Environment Variables
2. Agregar cada variable

### PASO 4: Push y Verificar (1 min)

```bash
git add -A
git commit -m "setup: github actions workflow"
git push origin main
```

Verificar en: `GitHub → Actions → Build and Deploy`

---

## 📊 Flujo de Ejecución Automático

```
TÚ: git push
    ↓
GitHub Actions:
  ├─ Checkout código
  ├─ Setup Node 20
  ├─ npm ci (instalar deps)
  ├─ npm run lint (validar)
  ├─ npm run build (compilar)
  ├─ Guardar artefactos
  └─ Deploy a Vercel (si rama = main)
    ↓
Vercel:
  ├─ Recibe build
  ├─ Genera preview URL
  └─ ¡Listo para producción!
```

---

## 🔒 Secretos Configurados

| Secreto | Origen | Uso |
|---------|--------|-----|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens | Autenticación |
| `VERCEL_PROJECT_ID` | `vercel projects list` | Identificar proyecto |
| `VERCEL_ORG_ID` | `vercel org list` | Identificar organización |

---

## 🔄 Qué Ocurre Automáticamente

### En EVERY Push a Main
1. ✅ Se compila el proyecto
2. ✅ Se valida con ESLint
3. ✅ Se genera artefacto `.next`
4. ✅ Se publica en Vercel (PRODUCCIÓN)

### En EVERY Push a Develop
1. ✅ Se compila el proyecto
2. ✅ Se valida con ESLint
3. ✅ Se genera preview en Vercel

### En Pull Requests
1. ✅ Se compila el proyecto
2. ✅ Se valida con ESLint
3. ✅ ❌ NO se publica (solo verifica)

---

## 📱 Variables de Entorno por Entorno

### Local Development (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### GitHub Actions (secrets)
```
NEXT_PUBLIC_API_URL=https://api.production.com
VERCEL_TOKEN=...
VERCEL_PROJECT_ID=...
VERCEL_ORG_ID=...
```

### Vercel Dashboard
```
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=postgres://...
API_KEY=...
```

---

## 🛠️ Personalización

### Agregar más pasos en workflow
Editar `.github/workflows/build-deploy.yml`:
```yaml
- name: Mi paso personalizado
  run: echo "Haciendo algo"
```

### Agregar tests automatizados
```yaml
- run: npm run test
```

### Agregar notificaciones Slack
```yaml
- name: Slack notification
  run: curl -X POST ${{ secrets.SLACK_WEBHOOK }}
```

---

## ✋ Parar el Workflow (si necesitas)

Opción 1: Desabilitar en GitHub
```
Settings → Actions → Disable
```

Opción 2: Comentar triggers
```yaml
# on:
#   push:
#     branches: [main]
```

---

## 🐛 Debug

### Ver logs del workflow
```
GitHub → Actions → Último workflow → Build → Logs
```

### Test local
```bash
npm run build
npm run start
```

### Ver variables GitHub Actions
```bash
# El workflow puede imprimir (sin secretos)
- run: echo "Env: $NODE_ENV"
```

---

## 📈 Monitoreo

### Checks del workflow
- Cada push muestra estado ✅ o ❌
- Pull requests requieren workflow exitoso
- GitHub marca commits como "verified"

### Vercel deployment
- Acceso automático a Vercel Dashboard
- Logs de build disponibles
- Rollback a version anterior si falla

---

## 🎓 Próximos Pasos (Opcional)

1. **Agregar tests**: `npm run test`
2. **Agregar staging**: Vercel Preview URLs
3. **Agregar notificaciones**: Slack, Email
4. **Agregar custom domain**: En Vercel
5. **Agregar caching**: Acelerar builds

---

## 📞 Soporte

- GitHub Actions Docs: https://docs.github.com/actions
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Este proyecto: `/docs/GITHUB_ACTIONS_SETUP.md` (documentación completa)

---

## ✨ ¡Hecho!

Tu proyecto ahora:
- ✅ Se compila automáticamente
- ✅ Se valida con linting
- ✅ Se publica en Vercel
- ✅ Tiene URLs de preview
- ✅ Está listo para producción

**Próxima vez que hagas push, ¡verás la magia!** 🚀

---

**Tiempo total setup:** ~15 minutos
**Beneficio:** Deployments automáticos para siempre
