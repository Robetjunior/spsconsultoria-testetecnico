import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {

    const stored = localStorage.getItem('authData');
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });

  const token = authData.token;
  const user = authData.user;

  const login = (tokenValue, userValue) => {

    const newAuthData = { token: tokenValue, user: userValue };
    setAuthData(newAuthData);
    localStorage.setItem('authData', JSON.stringify(newAuthData));
  };

  const logout = () => {
    setAuthData({ token: null, user: null });
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
