import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import Landing from '@/features/misc/routes/LandingPage';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const commonRoutes = [{ path: '/', element: <Landing /> }];

export const allRoutes = [...commonRoutes, ...publicRoutes, ...protectedRoutes];

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  const routes = currentUser ? protectedRoutes : publicRoutes;
  const element = useRoutes([...commonRoutes, ...routes]);

  useEffect(() => {});

  return <>{element}</>;
};
