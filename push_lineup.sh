#!/usr/bin/env bash
set -e
PAT="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"
OWNER="acorn1sh1"
REPO="CAA2026"
BRANCH="main"

push_file() {
  local PATH_IN_REPO="$1"
  local LOCAL_FILE="$2"
  local MSG="$3"
  
  # Get current SHA
  SHA=$(curl -s -H "Authorization: token $PAT" \
    "https://api.github.com/repos/$OWNER/$REPO/contents/$PATH_IN_REPO" \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
  
  # Push
  CONTENT=$(base64 < "$LOCAL_FILE" | tr -d '\n')
  curl -s -X PUT \
    -H "Authorization: token $PAT" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$OWNER/$REPO/contents/$PATH_IN_REPO" \
    -d "{\"message\":\"$MSG\",\"content\":\"$CONTENT\",\"sha\":\"$SHA\",\"branch\":\"$BRANCH\"}" \
    | python3 -c "import sys,json; r=json.load(sys.stdin); print('OK:', r.get('commit',{}).get('message','error'))"
}

DIR="$(cd "$(dirname "$0")" && pwd)"
MSG="${1:-stats: post-game update}"
push_file "data/games.json" "$DIR/data/games.json" "$MSG"
push_file "data/games.js"   "$DIR/data/games.js"   "$MSG"
push_file "data/stats.json"  "$DIR/data/stats.json"  "$MSG"
push_file "data/stats.js"    "$DIR/data/stats.js"    "$MSG"
push_file "standings.html"   "$DIR/standings.html"   "$MSG"
echo "Done!"
