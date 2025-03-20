import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData && authData.token) {
      config.headers['Authorization'] = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
