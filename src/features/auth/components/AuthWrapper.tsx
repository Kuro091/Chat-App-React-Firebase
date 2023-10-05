import { PropsWithChildren } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useSigninCheck } from 'reactfire';

import { LoginButton } from './LoginButton';

const LoadingAuth = () => (
  <div className="flex flex-col gap-y-5 items-center bg-white p-20">
    <div className="text-3xl font-bold text-primary">Loading...</div>
    <PacmanLoader color="hsl(62, 80%, 50%)" />
  </div>
);

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { data: signInCheckResult, status } = useSigninCheck();
  if (status === 'loading') {
    return <LoadingAuth />;
  }

  const { signedIn } = signInCheckResult;
  if (signedIn === true) {
    return <>{children}</>;
  } else {
    return <LoginButton />;
  }
};
