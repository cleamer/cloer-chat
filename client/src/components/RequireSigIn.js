import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const RequireSigIn = () => {
  const { user } = useUser();
  const location = useLocation();

  return <Outlet />;
  // FIXME: when reflash or go the url by path, set user null
  // return user === null ? <Navigate to='/sign/in' state={{ from: location }} replace /> : <Outlet />;
};

export default RequireSigIn;
