import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services/budget.service";

export const useBudgets = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: budgetService.getBudgets,
  });
};
