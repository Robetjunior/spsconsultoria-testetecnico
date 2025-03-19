// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setType(initialData.type);
      setPassword(''); // não preenche a senha ao editar
    } else {
      setName('');
      setEmail('');
      setType('');
      setPassword('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !type || (!initialData && !password)) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    onSubmit({ name, email, type, password });
    setName('');
    setEmail('');
    setType('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Editar Usuário' : 'Cadastrar Usuário'}</h3>
      <div>
        <label>Nome: </label>
        <input 
          type="text"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
        />
      </div>
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
        <label>Tipo: </label>
        <input 
          type="text"
          value={type}
          onChange={(e)=> setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha: </label>
        <input 
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required={!initialData}
        />
      </div>
      <button type="submit">{initialData ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
};

export default UserForm;
