import { ChevronDownSquare, ChevronUpSquare } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/tailwind-classname';
const OnlineLogo = ({ online }: { online: boolean }) => {
  if (online) {
    return <ChevronUpSquare color="green" />;
  }
  return <ChevronDownSquare color="red" />;
};

export const UserProfile = ({
  photoURL,
  displayName,
  online,
  inverted,
  className,
}: {
  photoURL: string;
  displayName: string;
  online: boolean;
  inverted?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex gap-x-2 items-center font-semibold',
        inverted && 'bg-primary-foreground text-primary rounded-lg px-5 py-2',
        className
      )}
    >
      <img width={50} src={photoURL || ''} alt="avatar" />
      <div className="hidden lg:block">{displayName}</div>
      <OnlineLogo online={online} />
    </div>
  );
};
