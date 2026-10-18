import { AuthForm } from "@/components/AuthForm";
import { usePageMeta } from "@/lib/use-page-meta";

export function SignInPage() {
  usePageMeta({ title: "Sign in — Flight Price Notifier", description: "登入 Flight Price Notifier，管理你的航線降價通知。" });
  return <AuthForm mode="signin" />;
}
