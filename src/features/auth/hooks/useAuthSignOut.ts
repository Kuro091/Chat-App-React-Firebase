import { useSignOut } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase";

export const useAuthSignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);

  return {
    signOut,
    loading,
    error,
  };
};
