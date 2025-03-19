import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // Importa o CSS específico

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chama o endpoint de autenticação (ex: POST /auth/login)
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Erro de login', error);
      alert('Falha na autenticação');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign In</h2>

        <div className="login-form-group">
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-form-group">
          <label>Senha</label>
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-submit-btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
