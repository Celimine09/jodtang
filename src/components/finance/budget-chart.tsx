"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Housing", value: 1200, color: "#6B9B7A" },
  { name: "Food & Dining", value: 580, color: "#81C784" },
  { name: "Transportation", value: 340, color: "#FFB74D" },
  { name: "Entertainment", value: 280, color: "#64B5F6" },
  { name: "Shopping", value: 460, color: "#E57373" },
];

const totalBudget = 3500;
const totalSpent = data.reduce((acc, item) => acc + item.value, 0);
const remainingBudget = totalBudget - totalSpent;

export function BudgetChart() {
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
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {data.map((entry, index) => (
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
                        return [`$${value.toLocaleString()}`, ""];
                      }
                      return [`$${value}`, ""];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {data.map((entry, index) => (
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
                  ${totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6B9B7A] rounded-full transition-all duration-500"
                  style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium text-foreground">
                  ${totalBudget.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="text-lg font-semibold text-[#6B9B7A]">
                  ${remainingBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
