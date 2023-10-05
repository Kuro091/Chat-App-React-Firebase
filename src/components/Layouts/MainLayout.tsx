import React from 'react';

import { cn } from '@/lib/tailwind-classname';

import { Header } from './Header/Header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className={cn('min-h-screen w-screen flex flex-col text-black custom-background')}>
        {children}
      </main>
    </>
  );
};
