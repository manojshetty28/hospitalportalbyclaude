# Project rules for Claude

## Git flow (standing rule from the repo owner, 2026-11-18)

- Never commit directly to `main`.
- For every piece of work, create a new branch first:
  - `feature/<github_issue_id>/<short_description_of_github_issue>` for new features, specs and docs (for example `feature/12/patient-registration`)
  - `bugfix/<short-name>` for bug fixes
- Push the branch and open a pull request against `main`.
- Never merge a PR. The repo owner reviews and merges every PR themselves.

## Approval gate (standing rule from the repo owner, 2026-11-18)

- Do not start implementation work until the repo owner explicitly approves it.
- Until then, only spec writing, docs and planning are in scope.

## Keeping this file current (standing rule from the repo owner, 2026-11-18)

- Whenever the repo owner states a rule or standing preference for this project, record it in this file.
- Changes to this file follow the Git flow above: feature branch, then PR, merged by the repo owner.
