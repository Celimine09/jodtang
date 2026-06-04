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
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense",
  );

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
        <div className="space-y-6 pt-4">
          {/* Transaction Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setTransactionType("expense")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                transactionType === "expense"
                  ? "bg-white text-[#E57373] shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingDown className="h-4 w-4" />
              Expense
            </button>
            <button
              onClick={() => setTransactionType("income")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                transactionType === "income"
                  ? "bg-white text-[#6B9B7A] shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <input
              type="text"
              placeholder="What was this for?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#6B9B7A] focus:border-transparent transition-all appearance-none cursor-pointer">
              <option value="">Select category</option>
              <option value="housing">Housing</option>
              <option value="food">Food & Dining</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="utilities">Utilities</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            className={`w-full py-6 rounded-xl font-medium transition-all duration-200 ${
              transactionType === "income"
                ? "bg-[#6B9B7A] hover:bg-[#5a8a69]"
                : "bg-[#E57373] hover:bg-[#d46464]"
            } text-white`}
            onClick={() => setOpen(false)}
          >
            Add {transactionType === "income" ? "Income" : "Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
