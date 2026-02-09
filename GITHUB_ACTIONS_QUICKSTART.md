# 🚀 Setup Completo - Próximos Pasos

## ✅ Lo que hemos creado

### Archivos de Workflow
```
✓ .github/workflows/build-deploy.yml
  └─ Compila automáticamente en cada push
  └─ Valida con ESLint
  └─ Deploy automático a Vercel
```

### Documentación (6 archivos)
```
✓ docs/INDEX.md                  ← Índice principal (empieza aquí)
✓ docs/README.md                 ← Overview rápido
✓ docs/VISUAL_CHECKLIST.md       ← Pasos con checkbox
✓ docs/GITHUB_ACTIONS_SETUP.md   ← Guía completa
✓ docs/QUICK_START_SECRETS.md    ← Referencia rápida
✓ docs/STRUCTURE.md              ← Explicación de archivos
```

### Configuración
```
✓ .env.example                   ← Plantilla de variables
✓ .gitignore                     ← Ya estaba configurado
```

---

## 🎯 Próximos Pasos (EN ORDEN)

### PASO 1: Obtener Credenciales Vercel (5 min)

En terminal local:
```bash
# Login en Vercel (si no estás logged)
vercel login

# Obtener Project ID
vercel projects list
# Copia el ID que veas (ej: prj_xxx)

# Obtener Org ID
vercel org list
# Copia el Team ID (ej: team_yyy)

# Obtener Token
# Ve a: https://vercel.com/account/tokens
# Crea un nuevo token y copia el valor
```

✅ Resultado: Tienes 3 valores
- `VERCEL_TOKEN` = v****
- `VERCEL_PROJECT_ID` = prj_***
- `VERCEL_ORG_ID` = team_***

---

### PASO 2: Agregar Secretos en GitHub (3 min)

1. Ve a: `github.com/tuusuario/eon-bio-system`
2. Click en **Settings**
3. Click en **Secrets and variables** (izquierda)
4. Click en **Actions**
5. Click en **New repository secret**

**Agregar 3 secretos:**

```
1. Nombre: VERCEL_TOKEN
   Valor: (pega el token)
   
2. Nombre: VERCEL_PROJECT_ID
   Valor: (pega el Project ID)
   
3. Nombre: VERCEL_ORG_ID
   Valor: (pega el Org ID)
```

✅ Verificar: Ves 3 secretos en la lista

---

### PASO 3: Configurar Variables de Entorno Local (2 min)

En la raíz del proyecto:

```bash
# Crear archivo local (NO se commits)
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=
API_KEY=
EOF
```

✅ Listo: `.env.local` creado

---

### PASO 4: Agregar Variables en Vercel Dashboard (3 min)

1. Ve a: `vercel.com` → Tu Proyecto
2. Click en **Settings**
3. Click en **Environment Variables**
4. Agrega tus variables:
   ```
   NEXT_PUBLIC_API_URL: https://tudominio.com
   DATABASE_URL: postgres://...
   API_KEY: ...
   ```

✅ Listo: Variables en Vercel

---

### PASO 5: Push y Verificar (5 min)

```bash
# En terminal
git add -A
git commit -m "setup: github actions workflow y documentación"
git push origin main
```

**Verificar en GitHub:**
1. Ve a: `github.com/tuusuario/eon-bio-system`
2. Click en **Actions** (pestaña)
3. Ves "Build and Deploy" ejecutándose
4. Espera a que termine (2-5 minutos)
5. Si es verde ✅ = TODO OK

**Verificar en Vercel:**
1. Ve a: `vercel.com`
2. Tu Proyecto
3. **Deployments**
4. Ves la build más reciente
5. Estado "Ready" = deployment exitoso

---

## 📚 Documentación para Leer

Según tu necesidad:

### 🔴 URGENTE: Setup rápido (10 min)
```
1. docs/README.md
2. docs/VISUAL_CHECKLIST.md
3. Ejecuta pasos
```

### 🟠 IMPORTANTE: Setup completo (20 min)
```
1. docs/README.md
2. docs/VISUAL_CHECKLIST.md
3. docs/GITHUB_ACTIONS_SETUP.md (si algo falla)
```

### 🟡 REFERENCIA: Troubleshooting (5-10 min)
```
docs/QUICK_START_SECRETS.md
→ Tabla de troubleshooting
```

### 🟢 META: Entender estructura (10 min)
```
docs/STRUCTURE.md
→ Explicación de cada archivo
```

### 🔵 COMPLETO: Deep dive (30 min)
```
docs/GITHUB_ACTIONS_SETUP.md
→ Todo detallado
```

---

## ⚡ Checklist Rápido

```bash
# 1. Obtener credenciales
vercel login
vercel projects list     # Copia Project ID
vercel org list         # Copia Org ID
# Ve a vercel.com/account/tokens → Crea token

# 2. GitHub Secrets
# Ir a: GitHub repo → Settings → Secrets and variables → Actions
# Agregar: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID

# 3. Variables locales
cp .env.example .env.local
# Editar con tus valores

# 4. Push
git add -A
git commit -m "setup: github actions"
git push origin main

# 5. Verificar
# GitHub → Actions (debe estar verde)
# Vercel → Deployments (debe mostrar "Ready")
```

---

## 🎓 Cómo Funciona Automáticamente

Después de este setup:

```
TÚ: git push origin main
  ↓
GitHub Actions detecta:
  1. Checkout código ✅
  2. Instala Node.js ✅
  3. npm install ✅
  4. npm run lint ✅
  5. npm run build ✅
  6. Guarda artefactos ✅
  ↓
GitHub inicia deploy:
  7. Deploy a Vercel ✅
  ↓
Vercel publica:
  8. Build final ✅
  9. ¡Sitio vivo en 2-5 min!
  ↓
TÚ: Tu código está en producción 🚀
```

---

## 🔄 Próximas Veces

Una vez configurado, simplemente:

```bash
# Haces cambio
git add .
git commit -m "feat: nueva feature"
git push origin main

# GitHub Actions se ejecuta automáticamente
# Vercel deploya automáticamente
# ¡Listo en 3-5 minutos!
```

No requiere configuración adicional.

---

## 📖 Documentación Disponible

Todos estos archivos están en la carpeta `/docs`:

| Archivo | Usar cuando |
|---------|------------|
| INDEX.md | Necesitas índice de documentación |
| README.md | Quieres overview rápido (5 min) |
| VISUAL_CHECKLIST.md | Sigues pasos por primera vez (15 min) |
| QUICK_START_SECRETS.md | Necesitas setup de secretos (3 min) |
| GITHUB_ACTIONS_SETUP.md | Quieres todo detallado (30 min) |
| STRUCTURE.md | Entiendes estructura de archivos (10 min) |

---

## 🆘 Si Algo Falla

### Build falla en GitHub
```
GitHub Actions → Ver logs
Buscar "error" en rojo
Generalmente es:
  - npm install timeout → npm ci
  - next build falla → verifica localmente con npm run build
```

### Deploy a Vercel falla
```
Vercel → Deployments → Ver logs
Generalmente es:
  - Secretos no configurados
  - Variables de entorno faltantes
  - Build timeout
```

### Secretos no funcionan
```
Verifica que nombres sean exactos (mayúsculas):
  - VERCEL_TOKEN (no vercel_token)
  - VERCEL_PROJECT_ID (no vercel-project-id)
  - VERCEL_ORG_ID (no vercel-org-id)
```

→ Ver docs/GITHUB_ACTIONS_SETUP.md para más soluciones

---

## ✨ Ventajas de este Setup

✅ **Compilación automática**
- Cada push compila automáticamente
- Se detectan errores antes de producción

✅ **Linting automático**
- ESLint valida código automáticamente
- Evita errores de código

✅ **Deploy automático**
- Vercel deploya automáticamente
- Cero tiempo manual de deployment

✅ **URLs de preview**
- Cada PR obtiene URL preview
- Ver cambios antes de mergeear

✅ **Logs accesibles**
- GitHub Actions muestra logs completos
- Vercel muestra logs de build

✅ **Rollback rápido**
- Puedes revertir en Vercel si algo falla
- Un click para volver a versión anterior

---

## 🎯 Resumen Final

**Has configurado:**
- ✅ Compilación automática en GitHub Actions
- ✅ Linting automático
- ✅ Deploy automático en Vercel
- ✅ Variables de entorno
- ✅ Documentación completa

**Tiempo invertido:** ~30-40 minutos setup inicial
**Beneficio:** Deployments automáticos PARA SIEMPRE

**Próxima vez:** Solo haz `git push` y ¡listo!

---

## 📞 Soporte

Para preguntas:
1. Revisa `/docs/GITHUB_ACTIONS_SETUP.md` (sección Troubleshooting)
2. O revisa `/docs/QUICK_START_SECRETS.md` (tabla rápida)
3. O abre un issue en el repositorio

---

## 🎉 ¡Felicidades!

Tu proyecto `eon-bio-system` ahora tiene:
- Compilación automática ✅
- Validación automática ✅
- Deploy automático ✅

¡Todo configurado y documentado!

---

**Inicio rápido:** `/docs/README.md`
**Pasos detallados:** `/docs/VISUAL_CHECKLIST.md`
**Índice completo:** `/docs/INDEX.md`

**¡A deployar! 🚀**
