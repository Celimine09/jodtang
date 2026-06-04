"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"

interface SummaryCardProps {
  title: string
  amount: string
  icon: React.ReactNode
  type: "balance" | "income" | "expense"
}

function SummaryCard({ title, amount, icon, type }: SummaryCardProps) {
  const colorClasses = {
    balance: "bg-slate-50 text-slate-600",
    income: "bg-[#E8F5E9] text-[#6B9B7A]",
    expense: "bg-[#FFEBEE] text-[#E57373]",
  }

  const amountColorClasses = {
    balance: "text-foreground",
    income: "text-[#6B9B7A]",
    expense: "text-[#E57373]",
  }

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-xl md:text-2xl font-semibold tracking-tight ${amountColorClasses[type]}`}>
              {amount}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl ${colorClasses[type]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Balance"
        amount="$12,580.00"
        icon={<Wallet className="h-5 w-5" />}
        type="balance"
      />
      <SummaryCard
        title="Monthly Income"
        amount="$5,240.00"
        icon={<TrendingUp className="h-5 w-5" />}
        type="income"
      />
      <SummaryCard
        title="Monthly Expenses"
        amount="$2,860.00"
        icon={<TrendingDown className="h-5 w-5" />}
        type="expense"
      />
    </div>
  )
}
