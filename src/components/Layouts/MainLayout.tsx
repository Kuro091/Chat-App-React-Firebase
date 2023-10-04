import React from "react";

import { Header } from "./Header/Header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen w-screen bg-background flex flex-col">
        {children}
      </main>
    </>
  );
};
