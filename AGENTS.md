## Rules
- Auth is email/password via Supabase (`src/integrations/supabase/client.ts`, configured by `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`); protected pages live under src/routes/_authenticated (client-only gate redirecting to /signin) — keeps session checks in one place.
- Only built-in auth users; no custom tables until a later milestone requires them — per course scope.
