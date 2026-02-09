#!/bin/bash

# ========================================
# Deploy Cleanup Script para /var/www/eon
# ========================================
# Este script debe ejecutarse en el servidor
# para limpiar completamente la instalación anterior

set -e  # Exit on error

DEPLOY_PATH="/var/www/eon"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${DEPLOY_PATH}/backups"

echo "🚀 Starting complete cleanup and fresh deployment..."
echo "📍 Deploy path: $DEPLOY_PATH"
echo "📅 Timestamp: $TIMESTAMP"
echo ""

# Function to print colored output
print_step() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✨ $1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

print_step "STEP 1: Creating Backups"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup .next
if [ -d "${DEPLOY_PATH}/.next" ]; then
    echo "💾 Backing up .next directory..."
    cp -r "${DEPLOY_PATH}/.next" "${BACKUP_DIR}/.next_${TIMESTAMP}"
    echo "✅ Backup created: ${BACKUP_DIR}/.next_${TIMESTAMP}"
else
    echo "⚠️  .next directory not found (first deployment?)"
fi

# Backup node_modules
if [ -d "${DEPLOY_PATH}/node_modules" ]; then
    echo "💾 Backing up node_modules..."
    cp -r "${DEPLOY_PATH}/node_modules" "${BACKUP_DIR}/node_modules_${TIMESTAMP}"
    echo "✅ Backup created: ${BACKUP_DIR}/node_modules_${TIMESTAMP}"
fi

echo ""
print_step "STEP 2: Cleaning Old Build Artifacts"

# Clean .next
if [ -d "${DEPLOY_PATH}/.next" ]; then
    echo "🧹 Removing .next..."
    rm -rf "${DEPLOY_PATH}/.next"
    echo "✅ .next removed"
fi

# Clean other build directories
for dir in out dist .next_cache build coverage; do
    if [ -d "${DEPLOY_PATH}/${dir}" ]; then
        echo "🧹 Removing $dir..."
        rm -rf "${DEPLOY_PATH}/${dir}"
        echo "✅ $dir removed"
    fi
done

# Clean npm cache files
if [ -f "${DEPLOY_PATH}/.npmrc" ]; then
    echo "🧹 Removing .npmrc..."
    rm -f "${DEPLOY_PATH}/.npmrc"
fi

echo ""
print_step "STEP 3: Cleaning Dependencies"

# Remove node_modules
if [ -d "${DEPLOY_PATH}/node_modules" ]; then
    echo "🧹 Removing node_modules (this may take a while)..."
    rm -rf "${DEPLOY_PATH}/node_modules"
    echo "✅ node_modules removed"
fi

# Remove package-lock.json for fresh install
if [ -f "${DEPLOY_PATH}/package-lock.json" ]; then
    echo "🧹 Removing package-lock.json..."
    rm -f "${DEPLOY_PATH}/package-lock.json"
    echo "✅ package-lock.json removed"
fi

# Clean npm cache globally
echo "🧹 Cleaning npm cache..."
npm cache clean --force
echo "✅ npm cache cleaned"

echo ""
print_step "STEP 4: Installing Fresh Dependencies"

cd "$DEPLOY_PATH"

echo "📦 Installing dependencies from package.json..."
npm install --prefer-offline --no-audit --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies!"
    exit 1
fi

echo ""
print_step "STEP 5: Building Next.js Project"

echo "🔨 Building Next.js project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
print_step "STEP 6: Setting Permissions"

echo "🔐 Setting correct permissions..."
chmod -R 755 "${DEPLOY_PATH}/.next"
chmod -R 755 "${DEPLOY_PATH}/node_modules"
chmod -R 755 "${DEPLOY_PATH}/public"
echo "✅ Permissions set"

echo ""
print_step "STEP 7: Restarting Application"

# Check if using PM2
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting with PM2..."
    pm2 restart eon-bio-system || pm2 start npm --name "eon-bio-system" -- start
    pm2 save
    echo "✅ Application restarted with PM2"
    
    # Show status
    echo ""
    echo "📊 Application status:"
    pm2 status
fi

# Check if using systemd
if systemctl is-active --quiet eon-bio-system; then
    echo "🔄 Restarting with systemd..."
    sudo systemctl restart eon-bio-system
    echo "✅ Application restarted with systemd"
    
    # Show status
    echo ""
    echo "📊 Application status:"
    sudo systemctl status eon-bio-system
fi

echo ""
print_step "STEP 8: Verification"

# Verify .next exists
if [ -d "${DEPLOY_PATH}/.next" ]; then
    echo "✅ .next directory exists"
    echo "   Size: $(du -sh ${DEPLOY_PATH}/.next | cut -f1)"
else
    echo "❌ .next directory missing!"
    exit 1
fi

# Verify node_modules exists
if [ -d "${DEPLOY_PATH}/node_modules" ]; then
    echo "✅ node_modules directory exists"
    echo "   Size: $(du -sh ${DEPLOY_PATH}/node_modules | cut -f1)"
else
    echo "❌ node_modules directory missing!"
    exit 1
fi

# Verify package.json exists
if [ -f "${DEPLOY_PATH}/package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json missing!"
    exit 1
fi

# Show disk usage
echo ""
echo "📦 Deployment size:"
echo "   Total: $(du -sh ${DEPLOY_PATH} | cut -f1)"

# Show available backups
echo ""
echo "📚 Available backups:"
ls -lh "${BACKUP_DIR}/" 2>/dev/null | grep "^d" | awk '{print "   " $NF}' | tail -5

echo ""
print_step "✅ Deployment Completed Successfully!"

echo ""
echo "📍 Location: $DEPLOY_PATH"
echo "📅 Completed at: $(date)"
echo "🔄 Application restarted and running"
echo ""
echo "To check logs:"
echo "  pm2 logs eon-bio-system"
echo "  or"
echo "  sudo journalctl -u eon-bio-system -f"
echo ""
