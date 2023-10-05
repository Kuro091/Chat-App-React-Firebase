import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/firebase';

export const useGoogleSignIn = () => {
  const [signInWithGoogle, data, loading, error] = useSignInWithGoogle(auth);

  return {
    signInWithGoogle,
    loading,
    data,
    error,
  };
};
