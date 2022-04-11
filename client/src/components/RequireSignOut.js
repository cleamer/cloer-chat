import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth/authContext';
import { useHTTP } from '../hooks/useAPI';
import { SignInFailure, SignInSuccess } from '../contexts/auth/authStates';

const RequireSignOut = () => {
  console.log('--- RequireSigOut');
  const { auth, setAuth } = useAuth();

  const [cancelSource, HTTP] = useHTTP();
  useEffect(() => {
    if (auth.user === null) {
      (async () => {
        try {
          const response = await HTTP('get', '/users');
          if (response.isError) return setAuth(SignInFailure(response.message));
          const user = response.result.userInfo;
          return setAuth(SignInSuccess(user));
        } catch (error) {
          console.error(error);
          return setAuth(SignInFailure(error.message));
        }
      })();
    }
  }, []);

  return auth.user === null ? <Outlet /> : <Navigate to='/' replace />;
};

export default RequireSignOut;
