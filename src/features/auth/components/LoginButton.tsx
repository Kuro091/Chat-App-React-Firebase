import GoogleButton from 'react-google-button';

import { cn } from '@/lib/tailwind-classname';

interface LoginButtonProps {
  className?: string;
  onClick?: () => void;
}

export const LoginButton = ({ className, onClick }: LoginButtonProps) => {
  return (
    <div className={cn('', className)}>
      <GoogleButton onClick={onClick} />
    </div>
  );
};
