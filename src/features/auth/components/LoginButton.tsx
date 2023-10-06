import GoogleButton from 'react-google-button';

import { cn } from '@/lib/tailwind-classname';

import { useGoogleSignIn } from '../hooks/useSignInWithGoogle';
import { useUsers } from '../hooks/useUsers';

interface LoginButtonProps {
  className?: string;
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const { addUser } = useUsers();
  const { signInWithGoogle } = useGoogleSignIn({
    callback: (val) => {
      addUser(val);
    },
  });

  return (
    <div className={cn('', className)}>
      <GoogleButton onClick={signInWithGoogle} />
    </div>
  );
};
