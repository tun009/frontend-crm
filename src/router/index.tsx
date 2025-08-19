import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Loading } from '@/components/ui';
import AuthGuard from './guards/AuthGuard';
import { routes } from './routes';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading size="large" text="Loading..." overlay />}>
      {/* <Suspense> */}
        <Routes>
          {routes.map((route) => {
            const { path, component: Component, requireAuth, roles, exact } = route;
            
            // Auth routes don't need layout
            if (path.startsWith('/auth/') || path === '/403' || path === '*') {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <AuthGuard requireAuth={requireAuth} roles={roles}>
                      <Component />
                    </AuthGuard>
                  }
                />
              );
            }
            
            // Main app routes with layout
            return (
              <Route
                key={path}
                path={path}
                element={
                  <AuthGuard requireAuth={requireAuth} roles={roles}>
                    <MainLayout>
                      <Component />
                    </MainLayout>
                  </AuthGuard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
