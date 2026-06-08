"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Coffee,
  Car,
  Gamepad2,
  ShoppingBag,
  Smartphone,
  HeartPulse,
  Tag,
  Gift,
  TrendingUp,
  Plane,
  Users,
  GraduationCap,
  Briefcase,
  Wallet,
  Loader2,
  type LucideIcon,
} from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBudgets } from "@/hooks/useBudget";
import { useCategories } from "@/hooks/useCategory";
import { budgetService } from "@/services/budget.service";

interface BudgetData {
  id: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  spent: number;
  remaining: number;
  usagePercentage: number;
}

const getCategoryIcon = (categoryName?: string): LucideIcon => {
  if (!categoryName) return Tag;
  const name = categoryName.toLowerCase();
  if (name.includes("food") || name.includes("drink")) return Coffee;
  if (name.includes("transport") || name.includes("car")) return Car;
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
  if (name.includes("util")) return Smartphone;
  return Tag;
};

// 🌟 อัปเดตคอมโพเนนต์ Card ให้มี Modal สำหรับแก้ไข
function BudgetCategoryCard({ budget }: { budget: BudgetData }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(budget.amount.toString());
  const queryClient = useQueryClient();

  const Icon = getCategoryIcon(budget.categoryName);
  const isOverBudget = budget.remaining < 0;
  const isWarning =
    budget.usagePercentage >= 80 && budget.usagePercentage < 100;

  const getProgressColor = () => {
    if (isOverBudget) return "bg-[#E57373]";
    if (isWarning) return "bg-[#FFB74D]";
    return "bg-[#6B9B7A]";
  };

  // 🌟 Mutation สำหรับการอัปเดตข้อมูล
  const updateMutation = useMutation({
    mutationFn: (newAmount: number) =>
      budgetService.updateBudget(budget.id, { amount: newAmount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      alert(
        error.response?.data?.message ||
          "Failed to update budget. Please try again.",
      );
    },
  });

  const handleUpdate = () => {
    if (!editAmount || Number(editAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    updateMutation.mutate(Number(editAmount));
  };

  return (
    <div className="p-4 rounded-xl border border-border/50 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              backgroundColor: `${budget.categoryColor}20`,
              color: budget.categoryColor,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">
              {budget.categoryName}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              ฿{budget.spent.toLocaleString()} of ฿
              {budget.amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 🌟 ซ่อนปุ่มดินสอไว้ใน DialogTrigger */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
              onClick={() => setEditAmount(budget.amount.toString())} // รีเซ็ตค่าให้ตรงกับปัจจุบันทุกครั้งที่กดเปิด
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium">
                Edit Budget for {budget.categoryName}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ฿
                  </span>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <Button
                disabled={updateMutation.isPending}
                className="w-full py-6 mt-2 bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl"
                onClick={handleUpdate}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(budget.usagePercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {budget.usagePercentage.toFixed(0)}% used
          </span>
          <span
            className={`text-xs font-medium ${isOverBudget ? "text-[#E57373]" : "text-[#6B9B7A]"}`}
          >
            {isOverBudget
              ? `฿${Math.abs(budget.remaining).toLocaleString()} over budget`
              : `฿${budget.remaining.toLocaleString()} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
}

function BudgetSummaryChart({ budgets }: { budgets: BudgetData[] }) {
  const chartData = budgets
    .filter((b) => b.spent > 0)
    .map((b) => ({
      name: b.categoryName,
      value: b.spent,
      color: b.categoryColor,
    }));

  const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-[150px]">
        {chartData.length > 0 ? (
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
                formatter={(value: any) => {
                  const displayValue = Array.isArray(value) ? value[0] : value;
                  const numericValue =
                    typeof displayValue === "number"
                      ? displayValue
                      : Number(displayValue ?? 0);
                  return [`฿${numericValue.toLocaleString()}`, ""];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
            No spending yet
          </div>
        )}
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">Total Budget</p>
        <p className="text-xl font-semibold text-foreground">
          ฿{totalBudget.toLocaleString()}
        </p>
        <p
          className={`text-sm font-medium ${remaining >= 0 ? "text-[#6B9B7A]" : "text-[#E57373]"}`}
        >
          ฿{Math.abs(remaining).toLocaleString()}{" "}
          {remaining >= 0 ? "remaining" : "over"}
        </p>
      </div>
    </div>
  );
}

export function ManageBudgets() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const [selectedPeriod, setSelectedPeriod] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [formPeriod, setFormPeriod] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const { data: response, isLoading } = useBudgets(selectedPeriod);
  const budgets: BudgetData[] = response || [];

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const expenseCategories = categories.filter(
    (cat: any) => cat.type === "EXPENSE",
  );

  const mutation = useMutation({
    mutationFn: budgetService.createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });

      setCategoryId("");
      setAmount("");
      setFormPeriod(new Date().toISOString().slice(0, 7));
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      alert(
        error.response?.data?.message ||
          "failed to create budget. Please try again.",
      );
    },
  });

  const handleSubmit = () => {
    if (!categoryId || !amount || !formPeriod) {
      alert("Please fill in all fields");
      return;
    }
    mutation.mutate({
      categoryId,
      amount: Number(amount),
      period: formPeriod,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium text-foreground">
            Manage Your Budgets
          </CardTitle>

          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] cursor-pointer"
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl px-5 gap-2 w-fit">
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
                      Category
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      disabled={isLoadingCategories}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">
                        {isLoadingCategories ? "Loading..." : "Select category"}
                      </option>
                      {expenseCategories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Budget Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ฿
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Period (Month)
                    </label>
                    <input
                      type="month"
                      value={formPeriod}
                      onChange={(e) => setFormPeriod(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
                    />
                  </div>

                  <Button
                    disabled={mutation.isPending}
                    className="w-full py-6 mt-2 bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl"
                    onClick={handleSubmit}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Create Budget"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#6B9B7A]" />
          </div>
        ) : budgets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You haven't set up any budgets for this month.
            </p>
            <Button
              variant="outline"
              className="mt-4 text-[#6B9B7A] border-[#6B9B7A] hover:bg-[#E8F5E9]"
              onClick={() => setIsDialogOpen(true)}
            >
              Set First Budget
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-medium text-foreground mb-4 text-center">
                  Budget Overview
                </h3>
                <BudgetSummaryChart budgets={budgets} />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {budgets.map((budget) => (
                  <BudgetCategoryCard key={budget.id} budget={budget} />
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
