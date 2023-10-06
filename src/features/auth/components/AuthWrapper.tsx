import { PropsWithChildren } from 'react';
import { useSigninCheck } from 'reactfire';

import { LoadingSpinner } from '@/components/loadingUI';

import { LoginButton } from './LoginButton';

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { data: signInCheckResult, status } = useSigninCheck();
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const { signedIn } = signInCheckResult;
  if (signedIn === true) {
    return <>{children}</>;
  } else {
    return <LoginButton />;
  }
};
