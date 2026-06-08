import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services/budget.service";

export const useBudgets = (period?: string) => {
  return useQuery({
    queryKey: ["budgets", period],
    queryFn: () => budgetService.getBudgets(period),
  });
};
