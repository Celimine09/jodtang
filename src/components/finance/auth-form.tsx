"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Wallet, Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-medium text-[#6B9B7A] hover:text-[#5a8a69] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={login.isPending || register.isPending}
                className="w-full"
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
                <span className="text-xs text-muted-foreground">
                  or continue with google
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:bg-muted transition-all duration-200">
                <GoogleIcon className="h-4 w-4" />
                Google
              </button>
            </div>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
