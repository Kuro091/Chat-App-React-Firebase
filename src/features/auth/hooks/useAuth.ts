import { useUser } from 'reactfire';

export const useAuth = () => {
  const { data: user, status, isComplete, error } = useUser();

  return {
    user,
    status,
    isComplete,
    error,
  };
};
