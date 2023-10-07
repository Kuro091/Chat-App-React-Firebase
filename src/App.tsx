import { Toaster } from 'react-hot-toast';

import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      <Toaster />
    </>
  );
}

export default App;
