"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCategories } from "@/hooks/useCategory";
import { transactionService } from "@/services/transaction.service";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  // 🌟 ฟิลเตอร์แยกหมวดหมู่ตาม Type ที่เลือกอยู่ปัจจุบัน
  const filteredCategories = categories.filter((cat: any) => cat.type === type);

  const mutation = useMutation({
    mutationFn: transactionService.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["transactionSummary"] });

      setTitle("");
      setAmount("");
      setCategoryId("");
      setNote("");
      setOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!title || !amount || !categoryId) {
      alert("กรุณากรอก Name, Amount และ Category ให้ครบถ้วน");
      return;
    }

    mutation.mutate({
      title,
      amount: Number(amount),
      type,
      categoryId,
      note,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 md:static md:bottom-auto md:right-auto rounded-full md:rounded-full px-6 py-6 md:py-5 shadow-lg md:shadow-sm bg-[#6B9B7A] hover:bg-[#5a8a69] text-white font-medium transition-all duration-200 z-50">
          <Plus className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">New Transaction</DialogTitle>
          <DialogDescription>
            Add a new income or expense to track your finances.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Transaction Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl">
            <button
              // 🌟 เพิ่ม setCategoryId("") เพื่อเคลียร์ค่าเดิมทิ้งตอนสลับโหมด
              onClick={() => {
                setType("EXPENSE");
                setCategoryId("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                type === "EXPENSE"
                  ? "bg-white text-[#E57373] shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingDown className="h-4 w-4" />
              Expense
            </button>
            <button
              // 🌟 เพิ่ม setCategoryId("") เพื่อเคลียร์ค่าเดิมทิ้งตอนสลับโหมด
              onClick={() => {
                setType("INCOME");
                setCategoryId("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                type === "INCOME"
                  ? "bg-white text-[#6B9B7A] shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Income
            </button>
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lunch, Taxi, Salary"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Amount
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

          {/* Category Select (Dynamic & Filtered) */}
          <div className="space-y-1.5">
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
              {/* 🌟 วนลูปเฉพาะข้อมูลที่ผ่านการกรอง (filteredCategories) แล้ว */}
              {filteredCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description / Note Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Description (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What was this for?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            disabled={mutation.isPending}
            onClick={handleSubmit}
            className={`w-full py-6 mt-2 rounded-xl font-medium transition-all duration-200 ${
              type === "INCOME"
                ? "bg-[#6B9B7A] hover:bg-[#5a8a69]"
                : "bg-[#E57373] hover:bg-[#d46464]"
            } text-white`}
          >
            {mutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              `Add ${type === "INCOME" ? "Income" : "Expense"}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
