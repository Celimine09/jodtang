import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
  });

  return {
    login: loginMutation,
    register: registerMutation,
  };
};
