import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Radar, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線", en: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知", en: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: XCircle, title: "隨時取消", en: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={shown ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        right={
          <Button asChild variant="hero" size="sm">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        }
      />
      <main>
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
            <p className="animate-fade-up mb-4 text-sm font-medium tracking-widest text-primary-glow uppercase">機票降價通知</p>
            <h1 className="animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl" style={{ animationDelay: "80ms" }}>
              Flight Price <span className="text-gradient">Notifier</span>
            </h1>
            <p className="animate-fade-up mt-6 text-xl font-medium sm:text-2xl" style={{ animationDelay: "160ms" }}>
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-up mt-3 text-muted-foreground" style={{ animationDelay: "220ms" }}>
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up mt-10" style={{ animationDelay: "300ms" }}>
              <Button asChild variant="hero" size="lg">
                <Link to="/signup">免費開始 / Get started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                    <f.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.en}</p>
                  <p className="mt-4 leading-relaxed text-card-foreground/85">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
