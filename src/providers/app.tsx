import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, DatabaseProvider, FirebaseAppProvider } from 'reactfire';

import { LoadingSpinner } from '@/components/loadingUI';
import { app, auth, db } from '@/lib/firebase';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<LoadingSpinner className="w-screen h-screen" />}>
      <FirebaseAppProvider suspense={true} firebaseApp={app}>
        <AuthProvider sdk={auth}>
          <DatabaseProvider sdk={db}>
            <Router>{children}</Router>
          </DatabaseProvider>
        </AuthProvider>
      </FirebaseAppProvider>
    </React.Suspense>
  );
};
