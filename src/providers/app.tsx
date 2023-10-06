import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, DatabaseProvider, FirebaseAppProvider } from 'reactfire';

import { app, auth, db } from '@/lib/firebase';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          Spinner here...
        </div>
      }
    >
      <FirebaseAppProvider firebaseApp={app}>
        <AuthProvider sdk={auth}>
          <DatabaseProvider sdk={db}>
            <Router>{children}</Router>
          </DatabaseProvider>
        </AuthProvider>
      </FirebaseAppProvider>
    </React.Suspense>
  );
};
