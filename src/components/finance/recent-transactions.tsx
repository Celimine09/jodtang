"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Utensils,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  icon: LucideIcon;
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Salary Deposit",
    category: "Income",
    date: "Today",
    amount: 5240.0,
    type: "income",
    icon: Briefcase,
  },
  {
    id: "2",
    name: "Rent Payment",
    category: "Housing",
    date: "Yesterday",
    amount: -1200.0,
    type: "expense",
    icon: Home,
  },
  {
    id: "3",
    name: "Coffee Shop",
    category: "Food & Dining",
    date: "Apr 22",
    amount: -8.5,
    type: "expense",
    icon: Coffee,
  },
  {
    id: "4",
    name: "Grocery Store",
    category: "Shopping",
    date: "Apr 21",
    amount: -156.8,
    type: "expense",
    icon: ShoppingBag,
  },
  {
    id: "5",
    name: "Gas Station",
    category: "Transportation",
    date: "Apr 20",
    amount: -48.0,
    type: "expense",
    icon: Car,
  },
];

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const Icon = transaction.icon;
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center gap-4 py-3">
      <div
        className={`flex-shrink-0 p-2.5 rounded-xl ${
          isIncome
            ? "bg-[#E8F5E9] text-[#6B9B7A]"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {transaction.name}
        </p>
        <p className="text-xs text-muted-foreground">{transaction.category}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-medium ${
            isIncome ? "text-[#6B9B7A]" : "text-[#E57373]"
          }`}
        >
          {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">{transaction.date}</p>
      </div>
    </div>
  );
}

export function RecentTransactions() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-foreground">
            Recent Transactions
          </CardTitle>
          <button className="text-sm text-[#6B9B7A] hover:text-[#5a8a69] font-medium transition-colors hover:bg-[#E8F5E9] rounded-md px-2 py-1">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
