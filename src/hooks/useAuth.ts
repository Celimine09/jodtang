import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

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

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/auth");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      router.push("/auth");
    },
  });
};
