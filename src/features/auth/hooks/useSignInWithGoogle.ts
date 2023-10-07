import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useAuth } from 'reactfire';

interface UseGoogleSignInProps {
  callback?: (value: UserCredential) => void;
}

export const useGoogleSignIn = ({ callback }: UseGoogleSignInProps) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const signIn = async (auth: Auth, callback?: (value: UserCredential) => void) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    setLoading(true);

    await signInWithPopup(auth, provider)
      .then(callback)
      .catch(() => {
        setLoading(false);
      });

    setLoading(false);
  };

  return {
    signInWithGoogle: () => signIn(auth, callback),
    loading,
  };
};
