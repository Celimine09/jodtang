"use client";

import { Bell, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTransactionButton } from "./add-transaction-button";
import { useUserProfile } from "@/hooks/useProfile";

interface PageHeaderProps {
  showAddButton?: boolean;
}

export function PageHeader({ showAddButton = true }: PageHeaderProps) {
  const currentDate = new Date();
  const greeting = getGreeting();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  function getGreeting() {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }
  const { data: userProfile } = useUserProfile();
  const name = userProfile?.name || "User";

  return (
    <header className="pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-foreground">
            {greeting}, {name}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showAddButton && <AddTransactionButton />}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
