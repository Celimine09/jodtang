"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, PiggyBank, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useProfile";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: Receipt,
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
];

interface SidebarProfileProps {
  name?: string;
  email?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { data: userProfile } = useUserProfile();
  const name = userProfile?.name || "User";
  const email = userProfile?.email || "user@example.com";

  return (
    <aside className="hidden md:flex md:flex-col md:w-52 md:fixed md:inset-y-0 bg-white border-r border-border">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#E8F5E9]">
          <Wallet className="h-4 w-4 text-[#6B9B7A]" />
        </div>
        <div>
          <h2 className="font-semibold text-xl text-foreground">JodTang</h2>
          <p className="text-[10px] text-muted-foreground">
            Personal Finance Tracker
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-[#6B9B7A] bg-[#E8F5E9]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
            <span className="text-xs font-medium text-[#6B9B7A]">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                isActive ? "text-[#6B9B7A]" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
