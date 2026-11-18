# Hospital Portal

A learning app with two read-only pages (Home and In-patients), built as one Next.js app on a PostgreSQL database. Specs are in `docs/`; project rules are in `CLAUDE.md`.

## Run locally

1. Create the tables and dummy data in a PostgreSQL database:
   `psql -f db/001-create-tables.sql -f db/002-insert-dummy-data.sql`
2. Copy `.env.example` to `.env.local` and fill in the database values.
3. `npm install`, then `npm run dev` and open http://localhost:3000.

## Checks

| Command                 | What it does                                                 |
| ----------------------- | ------------------------------------------------------------ |
| `npm run lint`          | ESLint                                                       |
| `npm run format:check`  | Prettier                                                     |
| `npm run typecheck`     | TypeScript                                                   |
| `npm run test:coverage` | Unit tests with 100% coverage threshold                      |
| `npm run build`         | Production build                                             |
| `npm run e2e`           | Playwright end-to-end tests (needs the database and a build) |
