import { useEffect } from "react";

// Client-side replacement for TanStack Start's per-route `head()`: sets the
// document title and description while the route is mounted.
export function usePageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
