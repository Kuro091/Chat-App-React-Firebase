import GoogleButton from 'react-google-button';
import { PacmanLoader } from 'react-spinners';

import { cn } from '@/lib/tailwind-classname';

import { useGoogleSignIn } from '../hooks/useSignInWithGoogle';

interface LoginButtonProps {
  className?: string;
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { signInWithGoogle, loading } = useGoogleSignIn();

  if (loading)
    return (
      <div
        className={cn(
          'flex flex-col gap-y-5 items-center bg-white p-20',
          className,
        )}
      >
        <div className="text-3xl font-bold text-primary">
          Waiting for you to login...
        </div>
        <PacmanLoader color="hsl(62, 80%, 50%)" loading={loading} />
      </div>
    );

  return (
    <div>
      <GoogleButton onClick={() => signInWithGoogle()} disabled={loading} />
    </div>
  );
};
