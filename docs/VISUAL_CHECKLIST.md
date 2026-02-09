# 📋 Checklist Visual: Configuración GitHub Actions

## 🔴 ANTES DE EMPEZAR

- [ ] Repositorio creado en GitHub
- [ ] Código pusheado a GitHub
- [ ] Cuenta en Vercel (vercel.com)
- [ ] Proyecto conectado en Vercel (opcional, puede hacerse en workflow)

---

## 🟠 PASO 1: Obtener Credenciales Vercel (5-10 min)

### Opción A: Terminal Local (Más fácil)

```bash
# 1. Login en Vercel
vercel login

# 2. Obtener Project ID
vercel projects list
# Output: eon-bio-system (Pro) [xxx123]
#                            ↑ Copiar esto

# 3. Obtener Org ID  
vercel org list
# Output: Team (Default) [yyy456]
#                           ↑ Copiar esto

# 4. Obtener Token
# Ve a: https://vercel.com/account/tokens
# Crea uno nuevo y copia
```

### Opción B: Vercel Dashboard

```
1. vercel.com
2. Settings (engranaje) → Tokens
3. Create Token → Copia el valor
4. Settings → Team Settings
5. Copy Team ID
6. Ve al Proyecto → Settings
7. Copy Project ID
```

**Resultado: Tienes 3 valores**
```
VERCEL_TOKEN = v**** (32+ caracteres)
VERCEL_PROJECT_ID = prj_xxx (o similar)
VERCEL_ORG_ID = team_yyy (o similar)
```

- [ ] `VERCEL_TOKEN` obtenido
- [ ] `VERCEL_PROJECT_ID` obtenido
- [ ] `VERCEL_ORG_ID` obtenido

---

## 🟡 PASO 2: Agregar Secretos en GitHub (3-5 min)

### Ubicación Exacta

```
github.com 
  ↓
Tu usuario 
  ↓
eon-bio-system (repositorio)
  ↓
⚙️ Settings
  ↓
Secrets and variables (izquierda)
  ↓
Actions
  ↓
New repository secret
```

### Agregar 3 Secretos

**Secreto 1: VERCEL_TOKEN**
```
Name: VERCEL_TOKEN
Secret: (pega el valor de Paso 1)
```
- [ ] Agregado

**Secreto 2: VERCEL_PROJECT_ID**
```
Name: VERCEL_PROJECT_ID
Secret: (pega el Project ID)
```
- [ ] Agregado

**Secreto 3: VERCEL_ORG_ID**
```
Name: VERCEL_ORG_ID
Secret: (pega el Org ID)
```
- [ ] Agregado

**Verificar:** En GitHub Secrets deberías ver 3 items secretos

---

## 🟢 PASO 3: Archivos Ya Creados ✅

El workflow está listo. Ubicaciones:

```
✓ .github/workflows/build-deploy.yml
  ↓
  Ejecuta: npm install, lint, build, deploy a Vercel

✓ docs/README.md
  ↓
  Documentación completa

✓ docs/GITHUB_ACTIONS_SETUP.md
  ↓
  Guía detallada de configuración

✓ docs/QUICK_START_SECRETS.md
  ↓
  Referencia rápida de secretos

✓ .env.example
  ↓
  Plantilla de variables de entorno
```

- [ ] Todos los archivos en lugar

---

## 🔵 PASO 4: Configurar Variables de Entorno (2-3 min)

### Local (`.env.local` - NO COMMITS)

```bash
# Crear archivo en raíz del proyecto
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=
API_KEY=
```

- [ ] `.env.local` creado

### En Vercel Dashboard

```
1. vercel.com → Tu Proyecto
2. Settings → Environment Variables
3. Agregar cada variable:
   - NEXT_PUBLIC_API_URL = https://api.production.com
   - DATABASE_URL = ...
   - API_KEY = ...
```

- [ ] Variables agregadas en Vercel

### En GitHub (Opcional - para workflow)

```
GitHub → Repo → Secrets and variables → Variables
Agregar variables NO secretas (públicas):
  - NEXT_PUBLIC_ENV = production
```

- [ ] Variables públicas en GitHub (si necesario)

---

## 🟣 PASO 5: Test de Workflow (2-3 min)

### Método 1: Push Normal

```bash
# Hacer cambio pequeño
echo "# Test" >> README.md

# Push
git add -A
git commit -m "test: github actions"
git push origin main
```

- [ ] Push completado

### Método 2: Ejecutar Manualmente

```
1. GitHub → Actions (pestaña)
2. Build and Deploy (workflow)
3. Run workflow (botón)
4. main (rama)
5. Run workflow
```

- [ ] Workflow ejecutado

### Verificar Ejecución

```
GitHub → Actions → Build and Deploy
  ↓
Ver el job que se está ejecutando
  ↓
Debe pasar:
  ✅ Checkout
  ✅ Setup Node.js
  ✅ Install dependencies
  ✅ Run ESLint
  ✅ Build Next.js
  ✅ Upload artifacts
  ✅ Deploy to Vercel
```

- [ ] Build exitoso (✅)
- [ ] Deploy a Vercel completado

---

## 🎯 VERIFICACIÓN FINAL

### En GitHub

```
github.com/tuusuario/eon-bio-system
  ↓
Actions
  ↓
Build and Deploy
  ↓
Último run = ✅ (verde)
```

- [ ] Workflow mostrado en verde ✅

### En Vercel

```
vercel.com
  ↓
Tu Proyecto (eon-bio-system)
  ↓
Deployments
  ↓
Última build = ✅ Ready (verde)
  ↓
URL: https://eon-bio-system.vercel.app
```

- [ ] Deployment exitoso en Vercel
- [ ] Sitio accesible en URL pública

---

## 📊 Resumen de Secretos

| Nombre | Tipo | Valor | Ubicación |
|--------|------|-------|-----------|
| `VERCEL_TOKEN` | Secreto | v**** | GitHub Secrets |
| `VERCEL_PROJECT_ID` | Secreto | prj_*** | GitHub Secrets |
| `VERCEL_ORG_ID` | Secreto | team_*** | GitHub Secrets |
| `NEXT_PUBLIC_API_URL` | Pública/Secreto | https://... | GitHub + Vercel |
| `DATABASE_URL` | Secreto | postgres://... | GitHub + Vercel |

---

## 🚀 Flujo Final

```
1. Haces cambio local
2. git push origin main
   ↓
3. GitHub Actions detecta
   ↓
4. Compila el proyecto
5. Valida con ESLint
6. Crea build Next.js
   ↓
7. GitHub inicia deploy
8. Envía a Vercel
   ↓
9. Vercel publica producción
10. Sitio vivo en 2-5 minutos
```

---

## ⚡ Comandos Rápidos

```bash
# Ver que está en workflow en local
npm run build
npm run start

# Ver logs de Vercel
vercel logs

# Redeploy manual
vercel --prod

# Listar proyectos Vercel
vercel projects list

# Ver variables Vercel
vercel env list
```

---

## 🛑 Si Algo Falla

### Build falla
```bash
# Verificar local
npm run build
npm run lint
# Buscar el error exacto
```

### Deploy falla
```
GitHub Actions → Ver logs rojos
Buscar palabra "error"
```

### Secretos no funcionan
```
Verificar que nombres coincidan EXACTAMENTE:
- VERCEL_TOKEN (no vercel_token)
- VERCEL_PROJECT_ID (no vercel-project-id)
- VERCEL_ORG_ID (no vercel-org-id)
```

---

## ✅ LISTO PARA PRODUCCIÓN

Cuando todo esté ✅ puedes:

1. **Hacer commits** → Se compila automáticamente
2. **Hacer pull requests** → Verifica antes de merge
3. **Mergear a main** → Deploy automático
4. **Acceder a URLs** → https://eon-bio-system.vercel.app

---

## 📚 Documentación Completa

Para más detalles:
- `docs/README.md` - Resumen completo
- `docs/GITHUB_ACTIONS_SETUP.md` - Guía detallada
- `docs/QUICK_START_SECRETS.md` - Referencia rápida
- `.env.example` - Variables de ejemplo

---

**Estado:** Listo para producción 🚀
**Tiempo total:** ~20-30 minutos
**Mantenimiento:** NINGUNO (automático)
