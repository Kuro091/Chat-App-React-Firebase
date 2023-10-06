import { PropsWithChildren } from 'react';

import { UserData } from '@/lib/firebase';
import { cn } from '@/lib/tailwind-classname';

import { Header } from './Header/Header';

export const MainLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string; currentUser?: UserData }>) => {
  return (
    <>
      <Header />
      <main
        className={cn(
          'min-h-screen w-screen flex flex-col text-black custom-background',
          className
        )}
      >
        {children}
      </main>
    </>
  );
};
