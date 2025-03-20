// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Em vez de apenas 'token', guardamos { token, user }
  const [authData, setAuthData] = useState(() => {
    // Tenta ler do localStorage ao iniciar
    const stored = localStorage.getItem('authData');
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });

  // Se preferir, pode usar authData.token, authData.user
  const token = authData.token;
  const user = authData.user;

  const login = (tokenValue, userValue) => {
    // Cria objeto { token, user }
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
