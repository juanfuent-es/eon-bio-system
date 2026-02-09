# Guía Rápida: Secretos y Variables de Entorno

## 🔐 Secretos de GitHub (Pasos Rápidos)

### 1. Acceso a Secretos

```
GitHub → Tu Repositorio → Settings → Secrets and variables → Actions
```

### 2. Secretos Necesarios

Copia y pega cada uno en GitHub:

#### A. VERCEL_TOKEN
```
Obtener en: https://vercel.com/account/tokens
Tipo: Personal access token
```

#### B. VERCEL_PROJECT_ID
```bash
# Local command
vercel projects list
# O en Vercel dashboard → Project Settings → ID
```

#### C. VERCEL_ORG_ID
```bash
# Local command
vercel org --list
# O en Vercel dashboard → Team Settings → ID
```

#### D. Otros Secretos (Opcional)
```
NEXT_PUBLIC_API_URL = https://api.tudominio.com
DATABASE_URL = postgresql://user:pass@host/db
API_KEY = tu_clave_secreta
```

---

## 📝 Checklist de Configuración

- [ ] Crear carpeta `.github/workflows`
- [ ] Agregar archivo `build-deploy.yml`
- [ ] Obtener token de Vercel
- [ ] Agregar `VERCEL_TOKEN` en GitHub Secrets
- [ ] Agregar `VERCEL_PROJECT_ID` en GitHub Secrets
- [ ] Agregar `VERCEL_ORG_ID` en GitHub Secrets
- [ ] Hacer push a repositorio
- [ ] Verificar que workflow se ejecute en Actions
- [ ] Confirmar deployment en Vercel

---

## ⚡ Comandos Útiles

### Obtener credenciales localmente

```bash
# Login en Vercel
vercel login

# Listar proyectos
vercel projects list

# Listar organizaciones
vercel org list

# Ver información del proyecto actual
vercel project

# Ver variables de entorno
vercel env list
```

### Ejecutar workflow manualmente

```bash
# Desde GitHub Actions en el navegador
→ Actions → Build and Deploy → Run workflow
```

### Ver logs de construcción

```bash
# En GitHub
→ Actions → Último workflow → Build → Ver logs
```

---

## 🐛 Troubleshooting Rápido

| Error | Solución |
|-------|----------|
| `401 Unauthorized` | Verifica `VERCEL_TOKEN` - regenera si es necesario |
| `Project not found` | Verifica `VERCEL_PROJECT_ID` es correcto |
| `npm install timeout` | Aumenta timeout en workflow: `npm ci --prefer-offline` |
| `Build fails` | Ejecuta localmente `npm run build` para debug |
| `Secrets not working` | Usa `${{ secrets.NOMBRE }}` - mayúsculas exactas |

---

## 📚 Estructura Final

```
eon-bio-system/
├── .github/
│   └── workflows/
│       └── build-deploy.yml          # ← Workflow automático
├── docs/
│   ├── GITHUB_ACTIONS_SETUP.md       # ← Documentación completa
│   └── QUICK_START_SECRETS.md        # ← Este archivo
├── .env.example                      # ← Variables de ejemplo
├── .env.local                        # ← Variables locales (NO commits)
├── package.json
├── next.config.ts
└── ...
```

---

## ✅ Test del Workflow

1. **Hacer un cambio pequeño**
   ```bash
   git add -A
   git commit -m "test: workflow setup"
   git push origin main
   ```

2. **Verificar en GitHub**
   ```
   → Actions → Build and Deploy → Ver logs
   ```

3. **Confirmar deployment**
   ```
   → Vercel Dashboard → Ver última build
   ```

---

## 🔗 Enlaces Útiles

- [Vercel Tokens](https://vercel.com/account/tokens)
- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Tiempo estimado de setup:** 5-10 minutos
