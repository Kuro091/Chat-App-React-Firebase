import { PropsWithChildren } from 'react';

import { UserData } from '@/lib/firebase';
import { cn } from '@/lib/tailwind-classname';
import { useSiteStore } from '@/store/site';

import { Header } from './Header/Header';

export const MainLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string; currentUser?: UserData }>) => {
  const { headerSize } = useSiteStore();
  return (
    <>
      <Header />
      <main
        style={{
          height: `calc(100vh - ${headerSize}px)`,
        }}
        className={cn('w-screen flex flex-col text-black custom-background', className)}
      >
        {children}
      </main>
    </>
  );
};
