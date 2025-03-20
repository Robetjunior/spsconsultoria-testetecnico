
import React, { useState, useEffect } from 'react';
import './UserForm.css';


const Spinner = () => {
  return <div className="spinner" />;
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const UserForm = ({ onSubmit, initialData, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setType(initialData.type || '');
      setPassword(initialData.password || '');
    } else {
      setName('');
      setEmail('');
      setType('');
      setPassword('');
    }
    setErrors({});
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = 'Nome é obrigatório.';
    }
    if (!email.trim()) {
      tempErrors.email = 'Email é obrigatório.';
    } else if (!isValidEmail(email)) {
      tempErrors.email = 'Email inválido.';
    }
    if (!type.trim()) {
      tempErrors.type = 'Tipo é obrigatório.';
    }
    if (!initialData && !password.trim()) {
      tempErrors.password = 'Senha é obrigatória para novo usuário.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    onSubmit({ name, email, type, password });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group floating-label">
        <input
          type="text"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}  
        />
        <label>Nome</label>
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div className="form-group floating-label">
        <input
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <label>Email</label>
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div className="form-group floating-label">
        <input
          type="text"
          placeholder=" "
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={loading}
        />
        <label>Tipo</label>
        {errors.type && <span className="error-msg">{errors.type}</span>}
      </div>

      <div className="form-group floating-label">
        <input
          type="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <label>Senha</label>
        {errors.password && <span className="error-msg">{errors.password}</span>}
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? (
            <Spinner />
        ) : (
          initialData ? 'Atualizar' : 'Cadastrar'
        )}
      </button>
    </form>
  );
};

export default UserForm;
