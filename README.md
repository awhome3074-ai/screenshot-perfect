# Screenshot Perfect

Implement exactly the screenshot and nothing else

## Development

You need Node.js and npm.

```sh
git clone https://github.com/awhome3074-ai/screenshot-perfect.git
cd screenshot-perfect
npm i
npm run dev
```

## Static SPA build (Vite + React Router)

The app is a client-only Vite + React single-page app — no SSR or server entry.

```sh
npm run dev      # local dev server
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

Routes (`src/routes/index.ts`): `/`, `/signin`, `/signup`, and `/app` (behind the
client-side auth guard in `src/routes/_authenticated/route.tsx`, which redirects to `/signin`).

### Supabase

Auth runs on the project's own Supabase project. The browser reads two variables
(see `.env`):

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | the project's `sb_publishable_…` key (replaces the old anon key) |

Set the same two variables in Vercel → Project → Settings → Environment Variables,
then redeploy, because Vite inlines them at build time.

### Deploying to Vercel

`vercel.json` builds with `npm run build`, serves `dist/`, and rewrites every path to
`/index.html` so deep links such as `/app` resolve client-side.
