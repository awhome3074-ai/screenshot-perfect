import { AuthForm } from "@/components/AuthForm";
import { usePageMeta } from "@/lib/use-page-meta";

export function SignUpPage() {
  usePageMeta({ title: "Sign up — Flight Price Notifier", description: "建立 Flight Price Notifier 帳號，機票降價就通知你。" });
  return <AuthForm mode="signup" />;
}
