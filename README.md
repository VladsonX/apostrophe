# Apostrophe

A content-publishing platform in the spirit of Medium/Substack, split into two React apps that share one REST API:

- **Studio** (`frontend/studio`) — where authors create channels, organise them into topics and write articles in a rich-text editor.
- **Reader** (`frontend/reader`) — where readers get a feed, explore content, search channels and follow channels or individual topics.
- **Backend** (`backend`) — Java 17 / Spring Boot REST API with PostgreSQL, JWT auth and S3-compatible media storage.

Originally built in early 2025 as a two-person capstone project: **Uladzislau Navitski** (both frontends) and **Aliaksei Yatsevich** ([MarshallBaby](https://github.com/MarshallBaby), backend). Revived and refactored in November 2026.

## Architecture

```
 ┌──────────────┐      ┌──────────────┐
 │    Studio    │      │    Reader    │      React 18 + Vite + Sass, React Router 7
 │ (authors)    │      │ (readers)    │
 └──────┬───────┘      └──────┬───────┘
        │  JWT, targetSystem=STUDIO / READER
        └────────────┬────────┘
                     ▼
            ┌──────────────────┐
            │ Spring Boot API  │   /auth, /api/v1/channels, /posts,
            │  (Java 17)       │   /subscriptions, /media
            └───┬──────────┬───┘
                ▼          ▼
          PostgreSQL    S3 / R2 (images)
```

**Domain model:** a *Channel* has an owner and optionally *Topics* ("topic mode"). A *Post* belongs to a channel and, in topic mode, to one topic. A reader *Subscription* is either channel-wide or for a single topic.

### Frontend structure (both apps)

```
src/
  api/          client.js (base URL, JWT header, errors) + endpoint functions
  auth/         AuthContext (token, login, logout) + RequireAuth route guard
  hooks/        useApi — data / loading / error for a request, ignores stale responses
  components/   presentational components, grouped by feature
  pages/        route components: load data, compose components
  script/       small pure helpers (dates, colours, subscription status)
```

Studio forms (channel and article) keep their state in one hook in the page and expose it to nested fields through context (`ChannelFormContext`, `ArticleFormContext`), so inputs deep in the tree don't need values and setters passed through every wrapper.

## Running locally

Requirements: Node 20+, Java 17+, Maven, PostgreSQL.

```bash
# 1. Database
createdb apostrophe

# 2. Backend (http://localhost:8080)
cd backend
export POSTGRES_URL=jdbc:postgresql://localhost:5432/apostrophe POSTGRES_USERNAME=postgres POSTGRES_PASSWORD=postgres
export JWT_SECRET=change-me-to-a-long-random-string-of-32-chars
export S3_ACCESS_KEY=... S3_SECRET_KEY=... S3_REGION_NAME=auto S3_BUCKET_NAME=... S3_ENDPOINT=...   # image upload only
export LOCAL_STORAGE_PATH=/tmp/apostrophe-media
mvn spring-boot:run

# 3. Demo content (optional)
node scripts/seed-demo.mjs

# 4. Frontends
cd frontend/reader && npm install && npm run dev   # http://localhost:3000
cd frontend/studio && npm install && npm run dev   # http://localhost:3001
```

Both frontends read the API address from `VITE_API_URL` (see `.env.example`, default `http://localhost:8080`).

## Deployment

| Part      | Host                     | Notes                                               |
|-----------|--------------------------|-----------------------------------------------------|
| Reader    | Vercel (root `frontend/reader`) | `VITE_API_URL` = backend URL, `vercel.json` handles SPA routes |
| Studio    | Vercel (root `frontend/studio`) | same                                          |
| Backend   | Render (Docker, root `backend`) | env vars as above, `PORT` is provided by Render |
| Database  | Neon (PostgreSQL)        | use the JDBC URL in `POSTGRES_URL`                  |
| Images    | Cloudflare R2            | S3-compatible, set `S3_ENDPOINT`                    |

Demo account (created by `scripts/seed-demo.mjs`): `demo@apostrophe.dev` / `Demo12345!`

## What changed in the 2026 refactor

- One API layer per app instead of `fetch` + headers + token checks copied into every page
- Auth context and a route guard instead of checking the token and calling `navigate()` during render
- Create/edit pages share forms; form state is provided through context instead of drilled props
- Studio migrated from Create React App to Vite, ESLint passes in both apps
- Inline error messages instead of `alert()` and empty `catch {}` blocks
- Several bugs fixed (article delete, enabling topics on an existing channel, losing new topics, blank optional fields)
- Backend prepared for cloud hosting (`PORT`, S3-compatible endpoint, multi-stage Dockerfile)
