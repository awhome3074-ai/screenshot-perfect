# Screenshot Perfect

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f6efab4-f9ac-4ead-b57e-5a337ac6c701).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
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

Environment variables read in the browser: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

### Deploying to Vercel

`vercel.json` builds with `npm run build`, serves `dist/`, and rewrites every path to
`/index.html` so deep links such as `/app` resolve client-side.
