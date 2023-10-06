import { lazyImport } from '@/utils/lazyImport';

const { ChatRoutes } = lazyImport(
  () => import('@/features/chats'),
  'ChatRoutes',
);

export const protectedRoutes = [
  {
    path: '/chats/*',
    element: <ChatRoutes />,
  },
];
