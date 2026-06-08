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
  }) => {
    const response = await api.post("/budgets", data);
    return response.data;
  },

  updateBudget: async (id: string, data: { amount: number }) => {
    const response = await api.put(`/budgets/${id}`, data);
    return response.data;
  },
};
