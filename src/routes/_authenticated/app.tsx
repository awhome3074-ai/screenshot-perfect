import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { usePageMeta } from "@/lib/use-page-meta";
import { useAuthenticatedUser } from "./route";

export function AppPage() {
  usePageMeta({ title: "Dashboard — Flight Price Notifier", description: "你的航線追蹤儀表板。" });
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/signin", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-hero text-foreground">
      <SiteHeader right={<Button variant="outline" size="sm" onClick={signOut}>Sign out / 登出</Button>} />
      <main className="mx-auto max-w-3xl px-4 py-24">
        <div className="animate-fade-up rounded-2xl border border-border bg-card p-8 sm:p-10">
          <h1 className="text-3xl font-bold break-all">Hi {user.email}</h1>
          <p className="mt-4 text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-2 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}
