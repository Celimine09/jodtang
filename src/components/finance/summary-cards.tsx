"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useTransactionSummary } from "@/hooks/useTransaction";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  type: "balance" | "income" | "expense";
}

function SummaryCard({ title, amount, icon, type }: SummaryCardProps) {
  const colorClasses = {
    balance: "bg-slate-50 text-slate-600",
    income: "bg-[#E8F5E9] text-[#6B9B7A]",
    expense: "bg-[#FFEBEE] text-[#E57373]",
  };

  const amountColorClasses = {
    balance: "text-foreground",
    income: "text-[#6B9B7A]",
    expense: "text-[#E57373]",
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p
              className={`text-xl md:text-2xl font-semibold tracking-tight ${amountColorClasses[type]}`}
            >
              {amount}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl ${colorClasses[type]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCards() {
  const { data: summary, isLoading, isError } = useTransactionSummary();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  if (isLoading)
    return (
      <div className="text-center py-8 animate-pulse text-muted-foreground">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load summary. Please try again later.
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Balance"
        amount={formatCurrency(summary?.balance || 0)}
        icon={<Wallet className="h-5 w-5" />}
        type="balance"
      />
      <SummaryCard
        title="Monthly Income"
        amount={formatCurrency(summary?.totalIncome || 0)}
        icon={<TrendingUp className="h-5 w-5" />}
        type="income"
      />
      <SummaryCard
        title="Monthly Expenses"
        amount={formatCurrency(summary?.totalExpense || 0)}
        icon={<TrendingDown className="h-5 w-5" />}
        type="expense"
      />
    </div>
  );
}
