import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const RequireSignOut = () => {
  const { user } = useUser();
  const location = useLocation();

  return <Outlet />;
  // FIXME: when reflash or go the url by path, set user null
  // return user === null ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
};

export default RequireSignOut;
