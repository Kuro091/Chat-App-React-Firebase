import Landing from '@/features/misc/routes/Landing';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
