import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </main>
  );
};

export default MainLayout;
