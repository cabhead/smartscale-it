#!/bin/bash
# smartscale.it deploy script
# Polled by launchd every 2 minutes

set -e

REPO_DIR="/Users/cabhead37/smartscale-it-work"
DIST_DIR="$REPO_DIR/dist"
LOG="/tmp/smartscale-deploy.log"
FTP_HOST="82.198.228.11"
FTP_USER="u798545164.smartscale.it"
FTP_REMOTE_DIR="/public_html"

# Read FTP password from environment or keychain
FTP_PASS="${FTP_PASSWORD:-}"
if [ -z "$FTP_PASS" ]; then
    # Try macOS keychain
    FTP_PASS=$(security find-generic-password -s "smartscale-ftp" -w 2>/dev/null || echo "")
fi

if [ -z "$FTP_PASS" ]; then
    echo "ERROR: No FTP password found. Set FTP_PASSWORD env var or add to keychain with:" >> "$LOG"
    echo "  security add-generic-password -s 'smartscale-ftp' -a '$FTP_USER' -w 'YOUR_PASSWORD'" >> "$LOG"
    exit 1
fi

echo "===== $(date '+%Y-%m-%d %H:%M:%S') =====" >> "$LOG"

cd "$REPO_DIR"

# Pull latest changes
git fetch origin main 2>> "$LOG"
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "No changes, skipping deploy." >> "$LOG"
    exit 0
fi

echo "Changes detected: $LOCAL -> $REMOTE" >> "$LOG"

# Pull and install
git pull origin main 2>> "$LOG"
npm install --production 2>> "$LOG"

# Build
npm run build 2>> "$LOG"

# Check if lftp is available
if ! command -v lftp &> /dev/null; then
    echo "ERROR: lftp not found. Install with: brew install lftp" >> "$LOG"
    exit 1
fi

# Deploy via FTP
echo "Deploying to $FTP_HOST..." >> "$LOG"

lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" <<EOF 2>> "$LOG"
set ssl:verify-certificate no
set ftp:ssl-allow yes
set ftp:ssl-force true
mirror -R --delete --verbose "$DIST_DIR" "$FTP_REMOTE_DIR"
bye
EOF

echo "Deploy complete: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG"
