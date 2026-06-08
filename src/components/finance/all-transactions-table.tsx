"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Briefcase,
  Gamepad2,
  Tag,
  type LucideIcon,
  Gift,
  GraduationCap,
  HeartPulse,
  Plane,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { AddTransactionButton } from "./add-transaction-button";

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
  note?: string;
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
  return Tag;
};

const types = ["Income", "Expense"];

interface AllTransactionsTableProps {
  data?: TransactionData[];
}

export function AllTransactionsTable({ data = [] }: AllTransactionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const availableCategories = Array.from(
    new Set(data.map((t) => t.category?.name || "Uncategorized")),
  ).sort();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTypes, selectedCategories]);

  const filteredTransactions = data.filter((t) => {
    const title = t.title || "";
    const typeLabel = t.type === "INCOME" ? "Income" : "Expense";
    const categoryName = t.category?.name || "Uncategorized";

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount.toString().includes(searchQuery);

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(typeLabel);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(categoryName);

    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium text-foreground">
            All Transactions
          </CardTitle>
          <AddTransactionButton />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 rounded-xl focus-visible:ring-[#6B9B7A]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl border-border gap-2 text-sm"
                >
                  Type <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl">
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) =>
                      setSelectedTypes(
                        checked
                          ? [...selectedTypes, type]
                          : selectedTypes.filter((t) => t !== type),
                      )
                    }
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl border-border gap-2 text-sm"
                >
                  Category <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-xl max-h-60 overflow-y-auto"
              >
                {availableCategories.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) =>
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, cat]
                          : selectedCategories.filter((c) => c !== cat),
                      )
                    }
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">
                  Name
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">
                  Amount
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => {
                  const isIncome = transaction.type === "INCOME";
                  const categoryName =
                    transaction.category?.name || "Uncategorized";
                  const categoryColor =
                    transaction.category?.color ||
                    (isIncome ? "#6B9B7A" : "#64748b");
                  const Icon = getCategoryIcon(categoryName);

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-6 text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: isIncome
                                ? "#E8F5E9"
                                : `${categoryColor}20`,
                              color: isIncome ? "#6B9B7A" : categoryColor,
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {transaction.title}
                            </p>
                            {transaction.note && (
                              <p className="text-xs text-muted-foreground truncate max-w-[150px] pt-0.5">
                                {transaction.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {categoryName}
                      </td>
                      <td
                        className={`py-3 px-4 text-sm font-medium text-left ${isIncome ? "text-[#6B9B7A]" : "text-[#E57373]"}`}
                      >
                        {isIncome ? "+" : "-"}฿
                        {transaction.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-[#6B9B7A]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-[#E57373]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {filteredTransactions.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}{" "}
            of {filteredTransactions.length} entries
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 rounded-lg ${currentPage === page ? "bg-[#6B9B7A] hover:bg-[#5a8a69]" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
