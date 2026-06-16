"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useGoogleLogin } from "@/hooks/useOauth";
import { Button } from "@/components/ui/button";
import { Wallet, Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { login, register } = useAuth();
  const googleLoginMutation = useGoogleLogin();

  const isSignIn = mode === "signin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignIn) {
      login.mutate(
        { email, password },
        {
          onSuccess: () => router.push("/"),
        },
      );
    } else {
      register.mutate(
        { name, surname, email, password },
        {
          onSuccess: () => router.push("/"),
        },
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Graphic */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#E8F5E9] overflow-hidden">
        <Image
          src="/images/auth-finance.png"
          alt="Abstract finance illustration"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm">
              <Wallet className="h-5 w-5 text-[#6B9B7A]" />
            </div>
            <span className="font-semibold text-lg text-[#2E7D32]">
              JodTang
            </span>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold text-[#2E7D32] text-balance leading-tight">
              Take control of your financial future
            </h2>
            <p className="mt-4 text-[#3d6b48] leading-relaxed">
              Track spending, set budgets, and reach your goals with a calm,
              clutter-free experience designed for clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E8F5E9]">
              <Wallet className="h-5 w-5 text-[#6B9B7A]" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              JodTang
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground text-balance">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {isSignIn
                ? "Sign in to continue managing your finances."
                : "Start your journey to smarter money management."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name fields (register only) */}
            {!isSignIn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Alex"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Surname
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Johnson"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {isSignIn && (
                <div className="flex justify-end mt-2">
                  {/* <button
                    type="button"
                    className="text-xs font-medium text-[#6B9B7A] hover:text-[#5a8a69] transition-colors"
                  >
                    Forgot password?
                  </button> */}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={login.isPending || register.isPending}
                className="w-full mt-4 py-6 rounded-xl bg-[#6B9B7A] hover:bg-[#5a8a69] text-white"
              >
                {login.isPending || register.isPending ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground uppercase">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          </form>

          {/* 🌟 4. เปลี่ยนปุ่มหลอกๆ ตรงนี้ให้เป็น GoogleLogin ตัวจริง */}
          <div className="flex justify-center w-full">
            {googleLoginMutation.isPending ? (
              <div className="flex items-center justify-center w-full py-3 border border-border rounded-xl bg-slate-50">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-foreground font-medium">
                  Signing in...
                </span>
              </div>
            ) : (
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      googleLoginMutation.mutate(credentialResponse.credential);
                    }
                  }}
                  onError={() => alert("Google login failed.")}
                  shape="rectangular"
                  theme="outline"
                  size="large"
                  text={isSignIn ? "signin_with" : "signup_with"}
                  width="100%"
                />
              </GoogleOAuthProvider>
            )}
          </div>

          {/* Toggle */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(isSignIn ? "register" : "signin")}
              className="font-medium text-[#6B9B7A] hover:text-[#5a8a69] transition-colors"
            >
              {isSignIn ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
