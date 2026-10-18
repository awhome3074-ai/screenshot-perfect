import { Link, useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = isSignUp
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (!data.session) return setError("請到信箱點擊確認連結後再登入。Check your email to confirm.");
    navigate("/app", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-hero text-foreground">
      <SiteHeader />
      <main className="flex justify-center px-4 py-20">
        <form onSubmit={onSubmit} className="animate-fade-up w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-8 shadow-glow">
          <div>
            <h1 className="text-2xl font-bold">{isSignUp ? "建立帳號 / Sign up" : "登入 / Sign in"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Flight Price Notifier</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} autoComplete={isSignUp ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "…" : isSignUp ? "Sign up / 註冊" : "Sign in / 登入"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>已有帳號？ <Link to="/signin" className="text-primary-glow hover:underline">Sign in</Link></>
            ) : (
              <>還沒有帳號？ <Link to="/signup" className="text-primary-glow hover:underline">Sign up</Link></>
            )}
          </p>
        </form>
      </main>
    </div>
  );
}
