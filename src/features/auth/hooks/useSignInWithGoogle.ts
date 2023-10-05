import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth';
import { useAuth } from 'reactfire';

const signIn = async (
  auth: Auth,
  callback?: (value: UserCredential) => void,
) => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider).then(callback);
};

interface UseGoogleSignInProps {
  callback?: (value: UserCredential) => void;
}

export const useGoogleSignIn = ({ callback }: UseGoogleSignInProps) => {
  const auth = useAuth();

  return {
    signInWithGoogle: () => signIn(auth, callback),
  };
};
