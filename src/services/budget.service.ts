import { api } from "./api";

export const budgetService = {
  getBudgets: async () => {
    const response = await api.get("/budgets");
    return response.data.data;
  },
};
