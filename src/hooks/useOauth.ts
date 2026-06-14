import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (credential: string) => authService.googleLogin(credential),
    onSuccess: (data) => {
      if (data.status === "success") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push("/");
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      alert(error.response?.data?.message || "Login with Google failed.");
    },
  });
};
