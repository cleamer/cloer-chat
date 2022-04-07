import { createContext, useState, useEffect, useContext } from 'react';
import { useHTTP } from '../hooks/useAPI';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState('');
  const [cancelHTTP, HTTP] = useHTTP();

  useEffect(() => {
    if (user === null) {
      (async () => {
        try {
          const response = await HTTP('get', '/users');
          if (response.isError) setUser(null);
          else if (response.isSuccess) {
            const userInfo = response.result.userInfo;
            return setUser(userInfo);
          }
          setAuthMessage(response.message);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser, authMessage, setAuthMessage }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
