import { createContext, useContext, useState, useEffect } from 'react';

const CREDENTIALS = { email: 'test@gmail.com', password: 'Password!234' };
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('session')
  );

  const login = (email, password) => {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      localStorage.setItem('session', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('session');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);