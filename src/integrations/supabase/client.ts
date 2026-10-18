import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Vite inlines these at build time; only VITE_-prefixed vars reach the browser bundle.
const SUPABASE_URL: string | undefined = import.meta.env['VITE_SUPABASE_URL'];
const SUPABASE_PUBLISHABLE_KEY: string | undefined = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'];

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ['VITE_SUPABASE_URL'] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ['VITE_SUPABASE_PUBLISHABLE_KEY'] : []),
  ];
  const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Set them in .env or your hosting provider's environment settings.`;
  console.error(`[Supabase] ${message}`);
  throw new Error(message);
}

// The single Supabase client for the app. Import it like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
