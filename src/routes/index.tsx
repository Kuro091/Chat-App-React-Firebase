import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Landing from "@/features/misc/routes/Landing";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const commonRoutes = [{ path: "/", element: <Landing /> }];

export const allRoutes = [...commonRoutes, ...publicRoutes, ...protectedRoutes];

export const AppRoutes = () => {
  const { user } = useAuth();

  const routes = user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...commonRoutes, ...routes]);

  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            Loading...
          </div>
        }
      >
        {element}
      </Suspense>
    </>
  );
};
