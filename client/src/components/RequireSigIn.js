import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const RequireSigIn = () => {
  const { user } = useAuth();
  console.log('req in ', user);

  return user === null ? <Navigate to='/sign/in' replace /> : <Outlet />;
};

export default RequireSigIn;
