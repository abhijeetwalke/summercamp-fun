# Preview-First Workflow — Setup Prompt

A reusable prompt that configures any local project with the same locked development
workflow used by the Summer Camp project: **preview-first, two verbal gates**, where
`preview` stays on your machine and `main` is the only branch that ever reaches GitHub.

**How to use:** open the project in Cowork / Claude Code and paste everything inside the
`--- PROMPT ---` block below as your first message. The agent sets up the environment, then
operates by these rules from then on.

---

--- PROMPT ---

Set up this project to use my locked development workflow, then confirm it back to me.
Read everything below, apply the one-time setup, and from then on operate by these rules.

## THE WORKFLOW — "preview-first, two verbal gates"

Branch model:
- `preview` — a LOCAL-ONLY branch for finished-but-unreviewed work. It is NEVER pushed to GitHub.
- `main`    — the ONLY branch that exists on GitHub. It is the approved/published state.
              It changes ONLY at Gate 2 (and, if this project is hosted, it is the only thing that goes live).

Two human checkpoints. I authorize each by an explicit VERBAL command; YOU run the git commands:
- GATE 1 — I say "approved"      → you `git commit` the finished work to the LOCAL `preview` branch.
                                    Nothing is pushed to GitHub. I review it locally.
- GATE 2 — I say "push to main"  → you merge `preview` → `main` and `git push origin main`.
                                    This is the ONLY step that ever touches GitHub (and the only
                                    step that publishes/deploys).

Hard rules:
- You run ALL git commands — I never push by hand. But you act ONLY on my explicit verbal command:
  never commit without "approved"; never push to GitHub without "push to main".
- Never commit directly to `main`. Never push `preview`. `preview` stays on my machine.
- Before any push to `main`, tell me exactly what you're about to push.
- Only commit work you consider finished and verified — never half-finished states.
- These rules persist across sessions (you'll write them into CLAUDE.md below).

## ONE-TIME SETUP — do all of this now:

1. If this isn't a git repo yet, run `git init`, then make an initial commit of the current
   state on `main` (locally only — do not push).
2. Create a local `preview` branch off `main`.
3. Create a NEW PRIVATE GitHub repo for this project with `gh repo create` (PRIVATE — confirm the
   repo name with me first). Wire it as `origin`. DO NOT push any code during setup — the first
   push to `main` happens only when I say "push to main".
4. Create `.claude/settings.local.json` with the content below — this gives you autonomy on edits
   and safe commands so you stop prompting me for routine actions (the git pushes are still gated by
   my verbal commands above, not by popups):

   {
     "permissions": {
       "defaultMode": "acceptEdits",
       "allow": [
         "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)", "Bash(git show:*)",
         "Bash(git branch:*)", "Bash(git add:*)", "Bash(git commit:*)", "Bash(git push:*)",
         "Bash(git merge:*)", "Bash(git checkout:*)", "Bash(git switch:*)", "Bash(git restore:*)",
         "Bash(git stash:*)", "Bash(git fetch:*)", "Bash(git init:*)",
         "Bash(grep:*)", "Bash(rg:*)", "Bash(ls:*)", "Bash(cat:*)", "Bash(head:*)",
         "Bash(tail:*)", "Bash(wc:*)", "Bash(find:*)"
       ]
     }
   }

5. Create or update `CLAUDE.md` at the repo root with a "## Git workflow (locked)" section that
   captures all of "THE WORKFLOW" rules above verbatim, so they survive across sessions.

## THEN CONFIRM BACK TO ME:
- That `preview` is local-only and GitHub has only `main`.
- The two gates and their exact verbal triggers ("approved" / "push to main").
- That you are able to push to GitHub, but only on my explicit command.

Do not push anything to GitHub during setup. Wait for my "approved" / "push to main".

--- END PROMPT ---

---

## Notes
- **Project-agnostic:** nothing references Summer Camp — paste it into any local project.
- **GitHub repo is created private** and the name is confirmed with you first; the agent does
  **not** push during setup — the first `main` push waits for your "push to main".
- **`gh repo create` needs the GitHub CLI authenticated** (`gh auth login` once per machine).
  The local-only parts work even without `gh`.
- **Per-project test commands:** if a project has its own test runner, tell the agent to add it
  to the allowlist (e.g. `"Bash(npm test:*)"`).
