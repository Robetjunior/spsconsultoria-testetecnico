import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    setTimeout(async () => {
      try {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        login(token, user);
  
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro de login', error);
        toast.error('Falha na autenticação');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-form-group">
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            disabled={loading} 
          />
        </div>

        <div className="login-form-group">
          <label>Senha</label>
          <input 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button className="login-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
