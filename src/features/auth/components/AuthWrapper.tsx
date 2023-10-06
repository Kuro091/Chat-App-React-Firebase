import { PropsWithChildren } from 'react';
import { useSigninCheck } from 'reactfire';

import { LoadingSpinner } from '@/components/loadingUI';

import { useGoogleSignIn } from '../hooks/useSignInWithGoogle';
import { useUsers } from '../hooks/useUsers';

import { LoginButton } from './LoginButton';

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { data: signInCheckResult, status: signInStatus } = useSigninCheck();
  const { signInWithGoogle, loading: isLoggingIn } = useGoogleSignIn({
    callback: (val) => {
      addUser(val);
    },
  });
  const { addUser } = useUsers();

  if (signInStatus === 'loading' || isLoggingIn) {
    return <LoadingSpinner className="w-screen h-screen" />;
  }

  const { signedIn } = signInCheckResult;
  if (signedIn === true) {
    return <>{children}</>;
  } else {
    return <LoginButton onClick={signInWithGoogle} />;
  }
};
