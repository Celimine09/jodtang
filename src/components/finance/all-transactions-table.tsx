"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Utensils,
  Briefcase,
  Gamepad2,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  account: string
  amount: number
  type: "income" | "expense"
  status: "completed" | "pending"
  icon: LucideIcon
}

const allTransactions: Transaction[] = [
  { id: "1", date: "2024-04-24", description: "Salary Deposit", category: "Income", account: "Bank", amount: 5240.00, type: "income", status: "completed", icon: Briefcase },
  { id: "2", date: "2024-04-23", description: "Rent Payment", category: "Housing", account: "Bank", amount: 1200.00, type: "expense", status: "completed", icon: Home },
  { id: "3", date: "2024-04-22", description: "Coffee Shop", category: "Food & Dining", account: "Credit Card", amount: 8.50, type: "expense", status: "completed", icon: Coffee },
  { id: "4", date: "2024-04-21", description: "Grocery Store", category: "Shopping", account: "Credit Card", amount: 156.80, type: "expense", status: "completed", icon: ShoppingBag },
  { id: "5", date: "2024-04-20", description: "Gas Station", category: "Transportation", account: "Credit Card", amount: 48.00, type: "expense", status: "completed", icon: Car },
  { id: "6", date: "2024-04-19", description: "Restaurant Dinner", category: "Food & Dining", account: "Credit Card", amount: 85.00, type: "expense", status: "completed", icon: Utensils },
  { id: "7", date: "2024-04-18", description: "Netflix Subscription", category: "Entertainment", account: "Credit Card", amount: 15.99, type: "expense", status: "completed", icon: Gamepad2 },
  { id: "8", date: "2024-04-17", description: "Phone Bill", category: "Utilities", account: "Bank", amount: 89.00, type: "expense", status: "pending", icon: Smartphone },
  { id: "9", date: "2024-04-16", description: "Freelance Payment", category: "Income", account: "Bank", amount: 850.00, type: "income", status: "completed", icon: Briefcase },
  { id: "10", date: "2024-04-15", description: "Uber Ride", category: "Transportation", account: "Credit Card", amount: 24.50, type: "expense", status: "completed", icon: Car },
  { id: "11", date: "2024-04-14", description: "Amazon Purchase", category: "Shopping", account: "Credit Card", amount: 67.99, type: "expense", status: "pending", icon: ShoppingBag },
  { id: "12", date: "2024-04-13", description: "Gym Membership", category: "Health", account: "Bank", amount: 49.99, type: "expense", status: "completed", icon: Briefcase },
]

const categories = ["Housing", "Food & Dining", "Transportation", "Entertainment", "Shopping", "Utilities", "Health", "Income"]
const types = ["Income", "Expense"]
const statuses = ["Completed", "Pending"]

export function AllTransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredTransactions = allTransactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount.toString().includes(searchQuery) ||
      t.date.includes(searchQuery)
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.map((s) => s.toLowerCase()).includes(t.type)
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(t.category)
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.map((s) => s.toLowerCase()).includes(t.status)
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-medium text-foreground">
            All Transactions
          </CardTitle>
          <Button className="bg-[#6B9B7A] hover:bg-[#5a8a69] text-white rounded-full px-5 gap-2 w-fit">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions by description, amount, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 rounded-xl focus-visible:ring-[#6B9B7A]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-border gap-2 text-sm">
                  Type
                  <ChevronDown className="h-4 w-4" />
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
                          : selectedTypes.filter((t) => t !== type)
                      )
                    }
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-border gap-2 text-sm">
                  Category
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl">
                {categories.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) =>
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, cat]
                          : selectedCategories.filter((c) => c !== cat)
                      )
                    }
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-border gap-2 text-sm">
                  Status
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl">
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) =>
                      setSelectedStatuses(
                        checked
                          ? [...selectedStatuses, status]
                          : selectedStatuses.filter((s) => s !== status)
                      )
                    }
                  >
                    {status}
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
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Description</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Category</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Account</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Amount</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => {
                const Icon = transaction.icon
                const isIncome = transaction.type === "income"
                return (
                  <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-6 text-sm text-muted-foreground">{formatDate(transaction.date)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isIncome ? "bg-[#E8F5E9] text-[#6B9B7A]" : "bg-slate-100 text-slate-500"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.category}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.account}</td>
                    <td className={`py-3 px-4 text-sm font-medium text-right ${isIncome ? "text-[#6B9B7A]" : "text-[#E57373]"}`}>
                      {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        transaction.status === "completed" 
                          ? "bg-[#E8F5E9] text-[#6B9B7A]" 
                          : "bg-[#FFF8E1] text-[#F9A825]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          transaction.status === "completed" ? "bg-[#6B9B7A]" : "bg-[#F9A825]"
                        }`} />
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-[#E57373]">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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
  )
}
