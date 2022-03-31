import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ value, children }) => {
  const [user, setUser] = useState(value);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export default UserProvider;
