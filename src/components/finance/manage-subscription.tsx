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
import {
  Plus,
  Calendar,
  Repeat,
  Trash2,
  Loader2,
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
  type LucideIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  recurringService,
  type RecurringData,
} from "@/services/recurring.service";
import { useCategories } from "@/hooks/useCategory";

// 🌟 ฟังก์ชันเลือกไอคอนตามชื่อหมวดหมู่ (ดึงมาจากหน้า Budget เพื่อความเข้าธีม)
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

interface CategoryData {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
}

export default function SubscriptionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [frequency, setFrequency] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  >("MONTHLY");
  const [nextRun, setNextRun] = useState("");

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();
  const expenseCategories = (categories as CategoryData[]).filter(
    (cat) => cat.type === "EXPENSE",
  );

  const { data: subscriptions = [], isLoading } = useQuery<RecurringData[]>({
    queryKey: ["recurringTransactions"],
    queryFn: recurringService.getRecurring,
  });

  const createMutation = useMutation({
    mutationFn: recurringService.createRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Failed to create subscription");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      recurringService.updateRecurring(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: recurringService.deleteRecurring,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] });
    },
  });

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategoryId("");
    setFrequency("MONTHLY");
    setNextRun("");
  };

  const handleSubmit = () => {
    if (!title || !amount || !categoryId || !nextRun) {
      alert("Please fill in all required fields.");
      return;
    }
    createMutation.mutate({
      title,
      amount: Number(amount),
      categoryId,
      type: "EXPENSE",
      frequency,
      nextRun: new Date(nextRun).toISOString(),
    });
  };

  // 🌟 คำนวณสรุปยอดค่าใช้จ่ายรายเดือนเฉลี่ย (Subscription Summary Panel ด้านซ้าย)
  const activeSubs = subscriptions.filter((s) => s.isActive);
  const totalEstimatedMonthly = activeSubs.reduce((acc, sub) => {
    if (sub.frequency === "MONTHLY") return acc + sub.amount;
    if (sub.frequency === "DAILY") return acc + sub.amount * 30;
    if (sub.frequency === "WEEKLY") return acc + sub.amount * 4.33;
    if (sub.frequency === "YEARLY") return acc + sub.amount / 12;
    return acc;
  }, 0);

  return (
    <div className="w-full">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-medium text-foreground">
                Manage Your Subscriptions
              </CardTitle>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl px-5 gap-2 w-fit">
                  <Plus className="h-4 w-4" />
                  Add New Subscription
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium">
                    Add New Subscription
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Name</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Service name (e.g. Netflix, Spotify)"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#6B9B7A] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          ฿
                        </span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#6B9B7A] outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Frequency</label>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#6B9B7A] outline-none appearance-none"
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="DAILY">Daily</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      disabled={isLoadingCategories}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#6B9B7A] outline-none appearance-none"
                    >
                      <option value="">
                        {isLoadingCategories ? "Loading..." : "Select category"}
                      </option>
                      {expenseCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Next Billing Date
                    </label>
                    <input
                      type="date"
                      value={nextRun}
                      onChange={(e) => setNextRun(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[#6B9B7A] outline-none"
                    />
                  </div>

                  <Button
                    disabled={createMutation.isPending}
                    className="w-full py-6 mt-2 bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-xl"
                    onClick={handleSubmit}
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Save Subscription"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#6B9B7A]" />
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                You haven't set up any active subscriptions yet.
              </p>
              <Button
                variant="outline"
                className="mt-4 text-[#6B9B7A] border-[#6B9B7A] hover:bg-[#E8F5E9]"
                onClick={() => setIsDialogOpen(true)}
              >
                Set First Subscription
              </Button>
            </div>
          ) : (
            /* 🌟 ปรับเป็น 1:4 Layout Grid ตามหน้า Budget เป๊ะๆ */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: Summary Box */}
              <div className="lg:col-span-1">
                <div className="bg-muted/30 rounded-xl p-5 flex flex-col items-center justify-center text-center h-full min-h-[220px]">
                  <div className="p-4 rounded-full bg-white border border-border/60 text-[#6B9B7A] mb-4 shadow-sm">
                    <Repeat className="h-7 w-7 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Est. Monthly Cost
                  </h3>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    ฿
                    {totalEstimatedMonthly.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 bg-white px-2.5 py-1 rounded-full border border-border/40">
                    {activeSubs.length} Active Items
                  </p>
                </div>
              </div>

              {/* Right Column: Subscriptions List Cards */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => {
                    const CategoryIcon = getCategoryIcon(sub.category?.name);
                    const categoryColor = sub.category?.color || "#cbd5e1";

                    return (
                      <div
                        key={sub.id}
                        className={`p-4 rounded-xl border border-border/50 bg-white hover:shadow-sm transition-all relative flex flex-col justify-between ${
                          !sub.isActive && "opacity-60 bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {/* ดึงสีและไอคอนตาม Category สไตล์หน้า Budget */}
                            <div
                              className="p-2.5 rounded-xl"
                              style={{
                                backgroundColor: `${categoryColor}20`,
                                color: categoryColor,
                              }}
                            >
                              <CategoryIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-foreground">
                                {sub.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                ฿{sub.amount.toLocaleString()} /{" "}
                                {sub.frequency.toLowerCase()}
                              </p>
                            </div>
                          </div>

                          {/* ปุ่มลบ */}
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this subscription?",
                                )
                              ) {
                                deleteMutation.mutate(sub.id);
                              }
                            }}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-slate-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* ด้านล่างการ์ด: วันรันถัดไป + ปุ่มสวิตช์ปิดเปิด */}
                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/40">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              Next run:{" "}
                              {new Date(sub.nextRun).toLocaleDateString()}
                            </span>
                          </div>

                          {/* สวิตช์ปิด/เปิดใช้งาน */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={sub.isActive}
                              onChange={(e) =>
                                toggleMutation.mutate({
                                  id: sub.id,
                                  isActive: e.target.checked,
                                })
                              }
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#6B9B7A]"></div>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
