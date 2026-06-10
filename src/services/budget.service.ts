import { api } from "./api";

export const budgetService = {
  getBudgets: async (period?: string) => {
    const params = period ? { period } : {};
    const response = await api.get("/budgets", { params });
    return response.data.data;
  },

  createBudget: async (data: {
    categoryId: string;
    amount: number;
    period: string;
    isAutoRenew?: boolean;
  }) => {
    const response = await api.post("/budgets", data);
    return response.data;
  },

  updateBudget: async (
    id: string,
    data: { amount?: number; isAutoRenew?: boolean },
  ) => {
    const response = await api.patch(`/budgets/${id}`, data);
    return response.data;
  },
};
