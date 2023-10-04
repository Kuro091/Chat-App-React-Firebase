import Landing from '@/features/misc/routes/Landing';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './protected';
import { protectedRoutes } from './public';

export const commonRoutes = [{ path: '/', element: <Landing /> }];

export const allRoutes = [...commonRoutes, ...publicRoutes, ...protectedRoutes];

export const AppRoutes = () => {
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
