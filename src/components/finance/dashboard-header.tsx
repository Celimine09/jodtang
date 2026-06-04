"use client"

import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddTransactionButton } from "./add-transaction-button"

export function DashboardHeader() {
  const currentDate = new Date()
  const greeting = getGreeting()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  function getGreeting() {
    const hour = currentDate.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          {greeting}, Alex 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">{formattedDate}</p>
      </div>
      <div className="flex items-center gap-3">
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
        <div className="hidden sm:block">
          <AddTransactionButton />
        </div>
      </div>
    </header>
  )
}
