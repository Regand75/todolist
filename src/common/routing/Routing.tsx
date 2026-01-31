import { Route, Routes } from 'react-router';
import { Main } from '@/app/ui/Main/Main';
import { Login } from '@/features/auth/ui/Login/Login';
import { PageNotFound } from '@/common/components';
import { useAppSelector } from '@/common/hooks';
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice';
import { ProtectedRoute } from '@/common/components/ProtectedRoute/ProtectedRoute';

export const Path = {
  Main: '/',
  Login: '/login',
  NotFound: '*',
} as const;

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />.
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
