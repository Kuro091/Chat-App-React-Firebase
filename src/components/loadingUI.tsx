import { PacmanLoader } from 'react-spinners';

import { cn } from '@/lib/tailwind-classname';

export const LoadingSpinner = ({ className = '' }: { className?: string }) => (
  <div className={cn('flex flex-col gap-y-5 justify-center items-center bg-white p-20', className)}>
    <div className="text-3xl font-bold text-primary">Loading...</div>
    <PacmanLoader color="hsl(62, 80%, 50%)" />
  </div>
);
