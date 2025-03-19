// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { logout } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Tem certeza que deseja deletar?')){
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleFormSubmit = async (userData) => {
    try {
      if(editingUser) {
        await api.put(`/users/${editingUser.id}`, userData);
      } else {
        await api.post('/users', userData);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Sair</button>
      <UserForm 
        onSubmit={handleFormSubmit} 
        initialData={editingUser}
        key={editingUser ? editingUser.id : 'new'}
      />
      <h3>Lista de Usuários</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
