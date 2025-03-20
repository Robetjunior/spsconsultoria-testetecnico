// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor para adicionar o token no header de todas as requisições
api.interceptors.request.use(
  (config) => {
    // Supondo que o login armazene um objeto { token, user } na chave 'authData'
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.token) {
      config.headers['Authorization'] = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
