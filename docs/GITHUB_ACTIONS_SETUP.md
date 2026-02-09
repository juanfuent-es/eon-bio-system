# Configuración de GitHub Actions para EON BIO SYSTEM

Guía completa para compilar, publicar y desplegar automáticamente el proyecto Next.js usando GitHub Actions.

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Variables de Entorno](#variables-de-entorno)
3. [Workflow de GitHub Actions](#workflow-de-github-actions)
4. [Publicación Automática](#publicación-automática)
5. [Solución de Problemas](#solución-de-problemas)

---

## Configuración Inicial

### Paso 1: Verificar Requisitos Previos

Asegúrate de tener:
- ✅ Repositorio en GitHub
- ✅ Node.js 18+ (configurado en el proyecto)
- ✅ Next.js 16+ (ya instalado en el proyecto)
- ✅ Acceso de administrador al repositorio

### Paso 2: Estructura de Carpetas

El archivo de workflow debe estar en:

```
.github/
└── workflows/
    └── build-deploy.yml
```

Esta estructura ya está creada en el proyecto.

---

## Variables de Entorno

### Paso 1: Agregar Secretos en GitHub

Para agregar variables secretas al repositorio:

1. Ve a **GitHub.com** → Tu Repositorio
2. Navega a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**

### Paso 2: Secretos Requeridos

Agrega los siguientes secretos según tu configuración:

#### Para Publicación en NPM (Opcional)
```
NPM_TOKEN: tu_token_npm_aqui
```

#### Para Publicación en GitHub Packages
```
GITHUB_TOKEN: (Automático - no requiere configuración manual)
```

#### Para Publicación en Vercel (Recomendado para Next.js)
```
VERCEL_TOKEN: tu_token_vercel
VERCEL_PROJECT_ID: id_del_proyecto
VERCEL_ORG_ID: id_de_la_organizacion
```

#### Variables de Entorno Personalizadas (si aplica)
```
DATABASE_URL: tu_url_base_datos
API_KEY: tu_clave_api
NEXT_PUBLIC_API_URL: https://api.tudominio.com
```

### Paso 3: Cómo Obtener Tokens

#### NPM Token
```bash
npm login
npm token create
# Copia el token generado en los secretos de GitHub
```

#### Vercel Token
1. Ve a https://vercel.com/account/tokens
2. Crea un nuevo token
3. Copia y pega en GitHub Secrets

#### GitHub Token
- Se genera automáticamente por GitHub Actions (no requiere configuración)

---

## Workflow de GitHub Actions

### Archivo: `.github/workflows/build-deploy.yml`

Este archivo contiene:
- ✅ Compilación automática en cada push
- ✅ Linting (validación de código)
- ✅ Build de Next.js
- ✅ Tests (si existen)
- ✅ Publicación automática en Vercel

### Paso 1: Disparo del Workflow

El workflow se ejecuta automáticamente en:

```yaml
# Trigger en push a rama principal
on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main

# O manualmente desde GitHub
workflow_dispatch:
```

### Paso 2: Trabajos (Jobs) Incluidos

El workflow realiza estos trabajos:

1. **Build**
   - Checkout del código
   - Instalación de dependencias
   - Linting (ESLint)
   - Compilación de Next.js
   - Artefactos guardados

2. **Deploy** (opcional, ejecuta si Build es exitoso)
   - Publicación en Vercel
   - O en tu plataforma preferida

---

## Publicación Automática

### Opción 1: Vercel (Recomendado)

#### Configuración Inicial

1. **Conectar Vercel a GitHub:**
   ```
   https://vercel.com/new
   → Importar repositorio → Conectar GitHub
   ```

2. **Obtener Variables de Vercel:**
   ```bash
   # En consola de Vercel
   vercel env pull  # Descarga variables locales
   vercel project
   ```

3. **Agregar Secrets en GitHub:**
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`

#### Comando de Deployment
```bash
npx vercel --token ${{ secrets.VERCEL_TOKEN }}
```

### Opción 2: GitHub Pages

#### Para sitios estáticos (exportar Next.js)

1. **Modificar `next.config.ts`:**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // ... otras configuraciones
}

export default nextConfig
```

2. **GitHub Actions hará el deployment automáticamente**

### Opción 3: Docker + Registry

#### Para publicar imagen Docker:

Agrega en el workflow:
```yaml
- name: Build Docker Image
  run: docker build -t ghcr.io/${{ github.repository }}:latest .

- name: Push to Registry
  run: docker push ghcr.io/${{ github.repository }}:latest
```

---

## Configuración Step-by-Step

### Paso 1: Crear Archivo de Workflow

El archivo está ubicado en: `.github/workflows/build-deploy.yml`

Contenido principal:
```yaml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm install
      
      - run: npm run lint
      
      - run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: next-build
          path: .next

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --token ${{ secrets.VERCEL_TOKEN }} \
            --project-id ${{ secrets.VERCEL_PROJECT_ID }} \
            --org-id ${{ secrets.VERCEL_ORG_ID }} \
            --prod
```

### Paso 2: Configurar Variables de Entorno en el Proyecto

Crea un archivo `.env.local` (local development):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

**NOTA:** No commits este archivo. Usa `.env.example` en git:
```bash
NEXT_PUBLIC_API_URL=
DATABASE_URL=
API_KEY=
```

### Paso 3: Agregar Variables en GitHub Actions

En el workflow, usa variables de GitHub:
```yaml
env:
  NODE_ENV: production
  NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

### Paso 4: Proteger Rama Principal

1. Ve a **Settings** → **Branches**
2. Añade regla de protección para `main`
3. Requiere pasos de CI/CD exitosos

---

## Monitoreo y Logs

### Ver Estado de Workflows

1. Ve a **Actions** en tu repositorio GitHub
2. Selecciona el workflow más reciente
3. Haz clic en el job para ver logs detallados

### Logs Útiles

```
✅ Exitoso: El build y deploy completaron sin errores
❌ Falló: Revisa los logs para encontrar el error
⏳ En ejecución: Espera a que termine
⊘ Skipped: Job no se ejecutó (condiciones no met)
```

---

## Solución de Problemas

### Error: "npm install falla"

**Solución:**
```yaml
- run: npm ci  # Usa npm ci en lugar de npm install
```

### Error: "next build falla"

**Verificar:**
```bash
# Local
npm run build

# Ver el error exacto
npm run build -- --debug
```

### Error: "Secrets no encontrados"

**Solución:**
1. Verifica que el nombre del secret sea exacto (mayúsculas importan)
2. Usa `${{ secrets.NOMBRE_EXACTO }}`
3. Los secretos no se muestran en logs (por seguridad)

### Error: "Deploy a Vercel falla"

**Verificar:**
```bash
vercel --version
vercel projects list --token $VERCEL_TOKEN
```

### Error: Timeout en instalación de dependencias

**Solución:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    cache-dependency-path: '**/package-lock.json'
```

---

## Ejemplos de Ejecución

### Push a Main Branch

```bash
git push origin main
```

Automáticamente:
1. ✅ Checkout del código
2. ✅ Instalación de dependencias
3. ✅ Linting
4. ✅ Build
5. ✅ Deploy a Vercel (si todo está ok)

### Ejecución Manual

En GitHub:
1. Ve a **Actions**
2. Selecciona el workflow
3. Haz clic en **Run workflow**
4. Elige la rama

---

## Mejores Prácticas

### 1. Versionado Semántico

Agrega tags automáticos:
```yaml
- name: Create Release
  if: startsWith(github.ref, 'refs/tags/')
  uses: softprops/action-gh-release@v1
```

### 2. Notificaciones

Agregua notificaciones en Slack:
```yaml
- name: Notify Slack
  if: always()
  run: |
    curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
      -d "Build ${{ job.status }}"
```

### 3. Cache de Dependencias

Acelera builds:
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
```

### 4. Tests Automatizados

Antes del build:
```yaml
- run: npm run test
- run: npm run test:e2e
```

---

## Referencias

- [Documentación GitHub Actions](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Node.js on GitHub Actions](https://github.com/actions/setup-node)

---

## Soporte

Para preguntas o problemas:
1. Revisa los logs en GitHub Actions
2. Consulta la documentación oficial
3. Abre un issue en el repositorio

**Última actualización:** Febrero 2026
