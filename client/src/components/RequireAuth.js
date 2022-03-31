import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const RequireAuth = () => {
  const { user } = useUser();
  const location = useLocation();

  return user === null ? <Navigate to='/sign/in' state={{ from: location }} replace /> : <Outlet />;
};

export default RequireAuth;
