import GoogleButton from 'react-google-button';

import { cn } from '@/lib/tailwind-classname';

import { useGoogleSignIn } from '../hooks/useSignInWithGoogle';

interface LoginButtonProps {
  className?: string;
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { signInWithGoogle } = useGoogleSignIn({
    callback: (val) => {
      console.log(val);
    },
  });

  return (
    <div className={cn('', className)}>
      <GoogleButton onClick={signInWithGoogle} />
    </div>
  );
};
