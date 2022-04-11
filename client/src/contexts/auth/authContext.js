import { createContext, useContext, useState } from 'react';

const authInit = {
  user: null,
  isError: false,
  message: '',
};

const AuthContext = createContext(authInit);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authInit);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
