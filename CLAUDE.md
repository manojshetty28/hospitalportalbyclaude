# Project rules for Claude

## Git flow (standing rule from the repo owner, 2026-11-18)

- Never commit directly to `main`.
- Every piece of work starts with a GitHub issue, then a new branch named after it:
  - `feature/<github_issue_id>/<short_description_of_github_issue>` for new features, specs and docs (for example `feature/12/patient-registration`)
  - `bugfix/<short-name>` for bug fixes
- Every commit made for a GitHub issue (code, tests or docs) carries that issue's ID as a suffix on the summary line, for example `Add Num of Beds tile (#7)` (owner rule, 2026-11-19).
- Push the branch and open a pull request against `main`.
- Never merge a PR. The repo owner reviews and merges every PR themselves.

## Approval gate (standing rule from the repo owner, 2026-11-18)

- Do not start implementation work until the repo owner explicitly approves it.
- Until then, only spec writing, docs and planning are in scope.
- Approved so far (2026-11-18): the app code (frontend, backend APIs) and the SQL scripts. Not approved: anything in Vercel or Supabase.

## Keeping this file current (standing rule from the repo owner, 2026-11-18)

- Whenever the repo owner states a rule or standing preference for this project, record it in this file.
- Changes to this file follow the Git flow above: feature branch, then PR, merged by the repo owner.

## Project purpose (standing rule from the repo owner, 2026-11-18)

- This is a learning app only, not a system for real hospital use.
- Use free plans only: Vercel Hobby and Supabase free tier.
- Never use real patient data; all data is synthetic.

## Architecture (standing rule from the repo owner, 2026-11-18)

- One Next.js app covers both the React UI and the backend API. There is no separate Java or standalone backend.
- The app lives at the repo root, with backend logic kept in its own folder inside the app.
- Database: Supabase, used as a SQL (Postgres) database.
- Hosting: one Vercel project.
- Server-side code connects to the Supabase database using four config values: username, password, DB URL and DB name.
- Those config values are the environment variables `DB_USER`, `DB_PASSWORD`, `DB_URL` (host:port) and `DB_NAME`, and are never committed to the repo. `DB_SSL=disable` is allowed only for a local or CI database; Supabase connections always use TLS.
- Pages follow the Next.js Cache Components model: a static shell, with database content read on every request inside `<Suspense>`. Pages and APIs share one service layer in `src/server/`.

## UI designs (standing rule from the repo owner, 2026-11-18)

- UI page designs are made in Figma, and a copy is always kept in this repo under `docs/design/`.
- Figma files cannot be stored in Git directly, so the repo copy is a PNG export per page plus a link to the Figma file. Re-export whenever the design changes.

## Naming conventions (standing rule from the repo owner, 2026-11-18)

The owner requires standard, consistent naming for every object. These conventions were confirmed by the owner on 2026-11-18.

| Object | Convention | Example |
|---|---|---|
| Database table | `snake_case` with `_tbl` suffix | `hospital_info_tbl`, `inpatients_info_tbl` |
| Database column | `snake_case`; primary key `<entity>_id`; foreign key named as the key it references | `hospital_id` |
| Database constraint or index | `pk_`, `fk_`, `uq_`, `ck_`, `idx_` prefix, then table, then column | `fk_inpatients_info_tbl_hospital_id` |
| API path | Lowercase `kebab-case` nouns under `/api`; no verbs | `/api/inpatients` |
| JSON field | `camelCase` | `currentBillAmount` |
| Page route | Lowercase `kebab-case` | `/patients` |
| React component and its file | `PascalCase` | `InpatientsTable.tsx` |
| Other source file and folder | `kebab-case` | `format-date.ts` |
| Variable and function | `camelCase`; functions start with a verb | `getInpatients` |
| Boolean | `is`, `has` or `can` prefix | `isLoading` |
| Type and interface | `PascalCase`, no `I` prefix | `Inpatient` |
| Constant and environment variable | `UPPER_SNAKE_CASE` | `DB_NAME` |
| Test file | Source name plus `.test` | `format-date.test.ts` |
| Document and design file | `kebab-case` | `business-spec.md`, `p1-home.png` |
| Figma frame | Page id and name | `P1 Home` |
| Git branch | As in the Git flow section | `feature/1/business-and-technical-docs` |
| Commit message | Short imperative summary line, ending with the GitHub issue ID in brackets | `Add in-patients page (#5)` |

Names are descriptive English words with no unexplained abbreviations.

## Quality standards (standing rule from the repo owner, 2026-11-18)

Follow current rules and best practices for the SQL database, UI screen design, React and Next.js. Check the official documentation for the installed versions rather than relying on older habits. The detailed checklists are in `docs/technical-solution.md`; the essentials are:

- **SQL database:** primary and foreign keys on every table; not-null, unique and check constraints; an index on every foreign key; `numeric` for money; parameterised queries only; schema and data changes only through reviewed, numbered SQL scripts in `db/`, never by editing the live database; row-level security enabled on every Supabase table.
- **UI screen design:** designed in Figma before build; consistent spacing, type and colour; responsive from phone to desktop; WCAG AA contrast, keyboard access and labelled controls; clear loading, empty and error states.
- **React:** function components and hooks; small single-purpose components; no state that can be derived; stable list keys; effects only for syncing with something outside React.
- **Next.js:** App Router; Server Components by default and `"use client"` only where needed; server-only code kept out of the browser bundle; `loading`, `error` and `not-found` files for data routes; input validated on the server.

## CI and tooling (standing rule from the repo owner, 2026-11-18)

- **Stack:** TypeScript, Next.js (App Router), React, Tailwind CSS, Drizzle ORM, npm.
- **CI on every PR (GitHub Actions):** lint (ESLint), format check (Prettier), type-check, unit tests (Vitest), SonarQube Cloud scan, build, end-to-end tests (Playwright) against a PostgreSQL service loaded from `db/*.sql`.
- **Coverage:** 100% statements, branches, functions and lines; the build fails below that.
- **Static analysis:** SonarQube Cloud, organisation `manojshetty28`, project `manojshetty28_hospitalportalbyclaude`; token in the GitHub secret `SONAR_TOKEN`.
- **Before opening a PR:** run all CI steps locally with the same environment variables CI uses, test pages and APIs against a local sandbox database loaded from `db/*.sql`, and take browser screenshots.
- **After opening a PR:** watch CI; fix a failure at its root cause and never skip or disable a test. Report CI results and Sonar data to the owner. The owner merges only when CI is green.
- **Do not create or change anything in Vercel or Supabase** without the owner's explicit go-ahead.

## Working with the owner (lessons learned, 2026-11-18)

- Keep documents short: only required content, rules, diagrams and best practices.
- Build only the scope the owner states; do not invent features, and label any assumption.
- Show designs before building; the owner prefers cool, muted colours over vibrant ones.
- Confirm table and object names with the owner; tables use the `_info_tbl` style.
- Verify platform facts in current docs before recommending (for example Java is not a native Vercel runtime; Next.js 16 defaults to Cache Components).
- Check a new tool's install conflicts and lint/format rules locally before pushing.
- Unit tests must set every environment variable they depend on; a test that passes locally can fail in CI when the job sets extra variables.
- Read the framework docs bundled with the installed version (`node_modules/next/dist/docs/`) before writing code; APIs change between major versions.
