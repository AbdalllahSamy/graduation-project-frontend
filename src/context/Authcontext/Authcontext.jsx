import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setLoginData(null);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
}
