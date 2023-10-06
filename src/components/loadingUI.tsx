import { PacmanLoader } from 'react-spinners';

export const LoadingSpinner = () => (
  <div className="flex flex-col gap-y-5 items-center bg-white p-20">
    <div className="text-3xl font-bold text-primary">Loading...</div>
    <PacmanLoader color="hsl(62, 80%, 50%)" />
  </div>
);
