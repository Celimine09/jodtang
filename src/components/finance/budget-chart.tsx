"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface BudgetData {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  spent: number;
  remaining: number;
  usagePercentage: number;
}

interface BudgetChartProps {
  budgets?: BudgetData[];
}

export function BudgetChart({ budgets = [] }: BudgetChartProps) {
  const chartData = budgets
    .filter((b) => b.spent > 0)
    .map((b) => ({
      name: b.categoryName,
      value: b.spent,
      color: b.categoryColor,
    }));

  const totalBudget = budgets.reduce((acc, item) => acc + item.amount, 0);
  const totalSpent = budgets.reduce((acc, item) => acc + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  if (budgets.length === 0) {
    return (
      <Card className="border-0 shadow-sm h-full flex flex-col justify-center items-center p-6 min-h-[300px]">
        <p className="text-muted-foreground text-sm">
          No budget data available. Start by creating a budget to see the
          breakdown here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-foreground">
          Budget vs. Spending
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This month&apos;s breakdown
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* ส่วนของกราฟวงกลม */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
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
                    formatter={(value) => {
                      if (typeof value === "number") {
                        return [`฿${value.toLocaleString()}`, ""];
                      }
                      return [`${value}`, ""];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {chartData.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center gap-1.5"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium text-foreground">
                  ฿{totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${spentPercentage > 100 ? "bg-red-500" : "bg-primary"}`}
                  style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium text-foreground">
                  ฿{totalBudget.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span
                  className={`text-lg font-semibold ${remainingBudget < 0 ? "text-red-500" : "text-primary"}`}
                >
                  ฿{remainingBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
