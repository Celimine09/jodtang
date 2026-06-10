import { api } from "./api";

export interface RecurringData {
  id: string;
  categoryId: string;
  title: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  note?: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  nextRun: string;
  isActive: boolean;
  category?: {
    name: string;
    color: string;
  };
}

export const recurringService = {
  getRecurring: async (): Promise<RecurringData[]> => {
    const response = await api.get("/recurring");
    return response.data.data;
  },

  createRecurring: async (
    data: Omit<RecurringData, "id" | "isActive" | "category">,
  ) => {
    const response = await api.post("/recurring", data);
    return response.data;
  },

  updateRecurring: async (id: string, data: Partial<RecurringData>) => {
    const response = await api.patch(`/recurring/${id}`, data);
    return response.data;
  },

  deleteRecurring: async (id: string) => {
    const response = await api.delete(`/recurring/${id}`);
    return response.data;
  },
};
