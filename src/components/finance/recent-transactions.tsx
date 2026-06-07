"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Briefcase,
  Tag,
  Gift,
  TrendingUp,
  HeartPulse,
  Plane,
  Gamepad2,
  Users,
  GraduationCap,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface TransactionData {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  category?: {
    name: string;
    color: string;
  };
}

interface RecentTransactionsProps {
  transactions?: TransactionData[];
}

const getCategoryIcon = (categoryName?: string): LucideIcon => {
  if (!categoryName) return Tag;
  const name = categoryName.toLowerCase();
  if (name.includes("food") || name.includes("drink")) return Coffee;
  if (name.includes("transport")) return Car;
  if (name.includes("house") || name.includes("bill")) return Home;
  if (name.includes("shop")) return ShoppingBag;
  if (name.includes("gift")) return Gift;
  if (name.includes("invest")) return TrendingUp;
  if (name.includes("health")) return HeartPulse;
  if (name.includes("travel")) return Plane;
  if (name.includes("entertain")) return Gamepad2;
  if (name.includes("family")) return Users;
  if (name.includes("education")) return GraduationCap;
  if (name.includes("business")) return Briefcase;
  if (name.includes("salary") || name.includes("income")) return Wallet;
  return Tag;
};

function TransactionItem({ transaction }: { transaction: TransactionData }) {
  const isIncome = transaction.type === "INCOME";
  const categoryName = transaction.category?.name || "Uncategorized";

  const categoryColor =
    transaction.category?.color || (isIncome ? "#6B9B7A" : "#64748b");
  const Icon = getCategoryIcon(categoryName);

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4 py-3">
      <div
        className="flex-shrink-0 p-2.5 rounded-xl"
        style={{
          backgroundColor: isIncome ? "#E8F5E9" : `${categoryColor}20`,
          color: isIncome ? "#6B9B7A" : categoryColor,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {transaction.title}
        </p>
        <p className="text-xs text-muted-foreground">{categoryName}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-medium ${
            isIncome ? "text-[#6B9B7A]" : "text-[#E57373]"
          }`}
        >
          {isIncome ? "+" : "-"}฿{Math.abs(transaction.amount).toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>
    </div>
  );
}

export function RecentTransactions({
  transactions = [],
}: RecentTransactionsProps) {
  const recentList = transactions.slice(0, 5);

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-foreground">
            Recent Transactions
          </CardTitle>
          <Link
            href="/transactions"
            className="text-sm text-[#6B9B7A] hover:text-[#5a8a69] font-medium transition-colors hover:bg-[#E8F5E9] rounded-md px-2 py-1"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {recentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentList.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
