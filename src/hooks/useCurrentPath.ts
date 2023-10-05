import { matchPath, useLocation } from 'react-router-dom';

import { allRoutes } from '@/routes';

export const useCurrentPath = () => {
  const { pathname } = useLocation();
  const found = allRoutes.find((route) => {
    return matchPath(route.path, pathname);
  });
  return found?.path || '';
};
