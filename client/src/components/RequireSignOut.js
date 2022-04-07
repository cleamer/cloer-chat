import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const RequireSignOut = () => {
  const { user } = useAuth();

  return user === null ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireSignOut;
