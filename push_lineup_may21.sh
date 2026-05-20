#!/usr/bin/env bash
set -e
PAT="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"
OWNER="acorn1sh1"
REPO="CAA2026"
BRANCH="main"

DIR="$(cd "$(dirname "$0")" && pwd)"
MSG="lineup: May 21 vs Search"

push_file() {
  local PATH_IN_REPO="$1"
  local LOCAL_FILE="$2"
  SHA=$(curl -s -H "Authorization: token $PAT" \
    "https://api.github.com/repos/$OWNER/$REPO/contents/$PATH_IN_REPO" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))" 2>/dev/null || echo "")
  CONTENT=$(base64 < "$LOCAL_FILE" | tr -d '\n')
  if [ -n "$SHA" ]; then
    PAYLOAD="{\"message\":\"$MSG\",\"content\":\"$CONTENT\",\"sha\":\"$SHA\",\"branch\":\"$BRANCH\"}"
  else
    PAYLOAD="{\"message\":\"$MSG\",\"content\":\"$CONTENT\",\"branch\":\"$BRANCH\"}"
  fi
  curl -s -X PUT \
    -H "Authorization: token $PAT" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$OWNER/$REPO/contents/$PATH_IN_REPO" \
    -d "$PAYLOAD" \
    | python3 -c "import sys,json; r=json.load(sys.stdin); print('OK:', r.get('commit',{}).get('message','error'))"
}

push_file "lineup_2026-05-21_search.html" "$DIR/lineup_2026-05-21_search.html"
push_file "data/games.json"               "$DIR/data/games.json"
push_file "data/games.js"                 "$DIR/data/games.js"
echo "Done!"
