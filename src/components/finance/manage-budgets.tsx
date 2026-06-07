"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Plus,
  Pencil,
  Home,
  Utensils,
  Car,
  Gamepad2,
  ShoppingBag,
  Smartphone,
  Heart,
  type LucideIcon,
} from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  budgeted: number;
  spent: number;
  color: string;
}

const initialBudgets: BudgetCategory[] = [
  {
    id: "1",
    name: "Housing",
    icon: Home,
    budgeted: 1500,
    spent: 1200,
    color: "#6B9B7A",
  },
  {
    id: "2",
    name: "Food & Dining",
    icon: Utensils,
    budgeted: 600,
    spent: 580,
    color: "#81C784",
  },
  {
    id: "3",
    name: "Transportation",
    icon: Car,
    budgeted: 400,
    spent: 340,
    color: "#FFB74D",
  },
  {
    id: "4",
    name: "Entertainment",
    icon: Gamepad2,
    budgeted: 300,
    spent: 280,
    color: "#64B5F6",
  },
  {
    id: "5",
    name: "Shopping",
    icon: ShoppingBag,
    budgeted: 400,
    spent: 460,
    color: "#E57373",
  },
  {
    id: "6",
    name: "Utilities",
    icon: Smartphone,
    budgeted: 200,
    spent: 150,
    color: "#BA68C8",
  },
  {
    id: "7",
    name: "Health",
    icon: Heart,
    budgeted: 150,
    spent: 50,
    color: "#4DD0E1",
  },
];

function BudgetCategoryCard({ budget }: { budget: BudgetCategory }) {
  const Icon = budget.icon;
  const remaining = budget.budgeted - budget.spent;
  const percentage = Math.min((budget.spent / budget.budgeted) * 100, 100);
  const isOverBudget = remaining < 0;
  const isWarning = percentage >= 80 && percentage < 100;

  const getProgressColor = () => {
    if (isOverBudget) return "bg-[#E57373]";
    if (isWarning) return "bg-[#FFB74D]";
    return "bg-[#6B9B7A]";
  };

  return (
    <div className="p-4 rounded-xl border border-border/50 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              backgroundColor: `${budget.color}20`,
              color: budget.color,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">
              {budget.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              ${budget.spent.toLocaleString()} of $
              {budget.budgeted.toLocaleString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}% used
          </span>
          <span
            className={`text-xs font-medium ${isOverBudget ? "text-[#E57373]" : "text-[#6B9B7A]"}`}
          >
            {isOverBudget
              ? `$${Math.abs(remaining).toLocaleString()} over budget`
              : `$${remaining.toLocaleString()} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}

function BudgetSummaryChart({ budgets }: { budgets: BudgetCategory[] }) {
  const chartData = budgets.map((b) => ({
    name: b.name,
    value: b.spent,
    color: b.color,
  }));

  const totalBudget = budgets.reduce((acc, b) => acc + b.budgeted, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "8px 12px",
              }}
              formatter={(value) => [`$${value}`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">Total Budget</p>
        <p className="text-xl font-semibold text-foreground">
          ${totalBudget.toLocaleString()}
        </p>
        <p
          className={`text-sm font-medium ${remaining >= 0 ? "text-[#6B9B7A]" : "text-[#E57373]"}`}
        >
          ${Math.abs(remaining).toLocaleString()}{" "}
          {remaining >= 0 ? "remaining" : "over"}
        </p>
      </div>
    </div>
  );
}

export function ManageBudgets() {
  const [budgets] = useState<BudgetCategory[]>(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium text-foreground">
            Manage Your Budgets
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-full px-5 gap-2 w-fit">
                <Plus className="h-4 w-4" />
                Set New Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-medium">
                  Create New Budget
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Category Name
                  </label>
                  <Input
                    placeholder="e.g., Subscriptions"
                    className="rounded-xl border-border focus-visible:ring-[#6B9B7A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Budget Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="rounded-xl border-border focus-visible:ring-[#6B9B7A]"
                  />
                </div>
                <Button
                  className="w-full bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Create Budget
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Summary Chart - Left Panel */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-4 text-center">
                Budget Overview
              </h3>
              <BudgetSummaryChart budgets={budgets} />
            </div>
          </div>

          {/* Budget Categories Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgets.map((budget) => (
                <BudgetCategoryCard key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
