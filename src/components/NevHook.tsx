import { useAuthStore } from "@/store/AuthStore";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { user, isLoading, fetchCurrentUser, error } = useAuthStore();
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    // Only attempt once if not logged in
    if (!user && !isLoading && !hasAttempted) {
      fetchCurrentUser().finally(() => {
        setHasAttempted(true);
      });
    }
  }, [user, isLoading, fetchCurrentUser, hasAttempted]);

  return {
    isLoggedIn: !!user,
    isLoading,
    user,
    error
  };
};