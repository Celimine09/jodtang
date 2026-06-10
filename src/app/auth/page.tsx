import type { Metadata } from "next";
import { AuthForm } from "@/components/finance/auth-form";

export const metadata: Metadata = {
  title: "JodTang",
  description:
    "Sign in or create an account to start managing your personal finances with JodTang.",
};

export default function AuthPage() {
  return <AuthForm />;
}
