import { Outlet, redirect, useRouteLoaderData } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const AUTHENTICATED_ROUTE_ID = "_authenticated";

// Client-only auth gate for every protected page: no user → /signin.
export async function authenticatedLoader() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw redirect("/signin");
  return { user: data.user };
}

export function AuthenticatedLayout() {
  return <Outlet />;
}

export function useAuthenticatedUser(): User {
  const data = useRouteLoaderData(AUTHENTICATED_ROUTE_ID) as { user: User } | undefined;
  if (!data) throw new Error("useAuthenticatedUser must be used under the _authenticated route");
  return data.user;
}
