# Project rules for Claude

## Git flow (standing rule from the repo owner, 2026-11-18)

- Never commit directly to `main`.
- For every piece of work, create a new branch first:
  - `feature/<short-name>` for new features, specs and docs
  - `bugfix/<short-name>` for bug fixes
- Push the branch and open a pull request against `main`.
- Never merge a PR. The repo owner reviews and merges every PR themselves.

## Approval gate (standing rule from the repo owner, 2026-11-18)

- Do not start implementation work until the repo owner explicitly approves it.
- Until then, only spec writing, docs and planning are in scope.
