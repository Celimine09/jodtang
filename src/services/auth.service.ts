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
  googleLogin: async (credential: string) => {
    const response = await api.post("/auths/google", { credential });
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/users/logout");
    return response.data;
  },
};
