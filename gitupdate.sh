#!/usr/bin/env bash
# ============================================================
# gitupdate.sh — stage ALL changes, commit, rebase onto the
# latest origin/main, then push. Netlify auto-deploys from main.
#
# Usage:
#   ./gitupdate.sh                       # commits with a timestamped message
#   ./gitupdate.sh "your commit message" # commits with your message
#
# Safe for a repo shared across sessions: it rebases onto the
# remote BEFORE pushing, so the push won't be rejected as
# non-fast-forward. On conflict it stops and tells you what to do.
# ============================================================
set -uo pipefail

# always run from the repo root (this script's own folder)
cd "$(dirname "$0")" || { echo "✗ Could not cd to script folder."; exit 1; }

# must be inside a git repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "✗ Not a git repository."; exit 1; }

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
MSG="${1:-Update Summer Camp ($(date '+%Y-%m-%d %H:%M'))}"

echo "▶ Repo:   $(git rev-parse --show-toplevel)"
echo "▶ Branch: $BRANCH"

# Guard: don't run in the middle of an existing rebase/merge
if [ -d "$(git rev-parse --git-dir)/rebase-merge" ] || [ -d "$(git rev-parse --git-dir)/rebase-apply" ]; then
  echo "✗ A rebase is already in progress. Finish it (git rebase --continue) or abort it (git rebase --abort) first."
  exit 1
fi

# Guard: a leftover index.lock blocks every git write. It's normal DURING a git
# operation, but a stale one (from a crash or another session) must be cleared.
LOCK="$(git rev-parse --git-dir)/index.lock"
if [ -f "$LOCK" ]; then
  echo "✗ Found a git lock file: $LOCK"
  echo "  This blocks commits/pushes. If no other git or Cowork session is running right now,"
  echo "  it's stale — remove it and re-run this script:"
  echo "      rm -f \"$LOCK\" && ./gitupdate.sh"
  exit 1
fi

# 1) Stage + commit everything (only if there's something staged)
echo "▶ Staging all changes ..."
git add -A
if git diff --cached --quiet; then
  echo "• Working tree clean — nothing new to commit."
else
  echo "▶ Changes to be committed:"
  git diff --cached --name-status | sed 's/^/    /'
  git commit -m "$MSG" >/dev/null && echo "✓ Committed: \"$MSG\""
fi

# 2) Rebase onto the latest remote baseline
echo "▶ Fetching + rebasing onto origin/$BRANCH ..."
if ! git pull --rebase origin "$BRANCH"; then
  echo ""
  echo "✗ Rebase stopped (a conflict, or uncommitted changes) — nothing was pushed."
  echo "  Run 'git status' to see why. If it's a conflict:"
  echo "  1) Open the conflicted files (git status shows them) and resolve them."
  echo "  2) git add <those files>"
  echo "  3) git rebase --continue        (repeat 1–3 if more conflicts appear)"
  echo "  4) git push origin $BRANCH"
  echo "  …or back out entirely with:  git rebase --abort"
  exit 1
fi

# 3) Push
echo "▶ Pushing to origin/$BRANCH ..."
if git push origin "$BRANCH"; then
  echo ""
  echo "✓ Done. Pushed to origin/$BRANCH — Netlify will auto-deploy."
  echo "  Live updates show after the deploy finishes (no hard-refresh needed; _headers forces fresh cache)."
else
  echo ""
  echo "✗ Push failed (likely auth or network)."
  echo "  Your work is safely committed locally. Fix the issue and re-run ./gitupdate.sh,"
  echo "  or push manually with:  git push origin $BRANCH"
  exit 1
fi
