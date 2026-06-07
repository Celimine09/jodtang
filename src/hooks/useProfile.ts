import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: userService.getProfile,
  });
};
