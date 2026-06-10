import { api } from "./api";

export const authService = {
  login: async (data: any) => {
    const response = await api.post("/users/login", data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post("/users/register", data);
    return response.data;
  },
};
