# AGENTS.md

## What this is

Single-file Express 5 + MongoDB Atlas API. The entire app is `index.js` — no src/ dirs, no framework layers.

- ES modules (`"type": "module"`), top-level `await` used for DB connect; run with plain `node index.js`.
- No dev server, no hot reload, no build step.

## Commands

- Start: `node index.js` (there is no `start`/`dev` script in `package.json`).
- `npm test` is the default stub and always exits 1 — there is no test suite. Do not treat its failure as a regression.
- No lint, format, or typecheck tooling exists. Don't invent commands; if adding checks, propose them first.

## Environment

- `.env` (gitignored) must exist with `DB_USER` and `DB_PASS` — MongoDB Atlas credentials interpolated into a hardcoded connection string (`cluster0.37pyayk.mongodb.net`). `PORT` is optional (defaults to 4000).
- DB name `simplecruddb`, collection `user` are hardcoded in `index.js`.
- If `DB_USER`/`DB_PASS` are missing or auth fails, `connectToMongoDB()` swallows the error and returns `undefined`, so startup crashes at `connectedClient.db(...)` with an unrelated-looking `TypeError`. Check DB connectivity first when startup fails.

## API shape (verify before changing)

Routes are intentionally asymmetric — don't "fix" without checking callers:

- `GET /`, `GET /user` (all users), `POST /user` — singular `user`
- `GET /users/:id` — plural `users`
- No PUT/PATCH/DELETE routes exist yet, despite the CRUD name.

Body parsing via `express.json()`; CORS wide open (`cors()`).

## Git

- `.env` and `node_modules` are gitignored; never commit them.
