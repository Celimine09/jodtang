import { api } from "./api";

export const transactionService = {
  getSummary: async () => {
    const response = await api.get("/transactions/summary");
    return response.data.data;
  },

  getTransactions: async () => {
    const response = await api.get("/transactions");
    return response.data.data;
  },

  createTransaction: async (data: any) => {
    const response = await api.post("/transactions", data);
    return response.data;
  },
};
