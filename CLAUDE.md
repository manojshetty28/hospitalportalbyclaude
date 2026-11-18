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

## Project purpose (standing rule from the repo owner, 2026-11-18)

- This is a learning app only, not a system for real hospital use.
- Use free plans only: Vercel Hobby and Supabase free tier.
- Never use real patient data; all data is synthetic. (Claude's addition, pending owner confirmation.)

## Architecture (standing rule from the repo owner, 2026-11-18)

- One Next.js app covers both the React UI and the backend API. There is no separate Java or standalone backend.
- The app lives at the repo root, with backend logic kept in its own folder inside the app. (Location is Claude's choice, pending owner confirmation.)
- Database: Supabase, used as a SQL (Postgres) database.
- Hosting: one Vercel project.
- Server-side code connects to the Supabase database using four config values: username, password, DB URL and DB name.
- Those config values are supplied as environment variables and are never committed to the repo. (Claude's addition, pending owner confirmation.)

## UI designs (standing rule from the repo owner, 2026-11-18)

- UI page designs are made in Figma, and a copy is always kept in this repo under `docs/design/`.
- Figma files cannot be stored in Git directly, so the repo copy is a PNG export per page plus a link to the Figma file. Re-export whenever the design changes.
