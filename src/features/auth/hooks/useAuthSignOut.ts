import { useAuth } from 'reactfire';

export const useAuthSignOut = () => {
  const auth = useAuth();
  return {
    signOut: () => auth.signOut(),
  };
};
