// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chama o endpoint de autenticação (ex: POST /auth)
      const response = await api.post('/auth', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Erro de login', error);
      alert('Falha na autenticação');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha: </label>
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
