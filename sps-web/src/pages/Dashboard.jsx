import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UserModal from '../components/UserModal';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  // Busca todos os usuários
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

  // Deleta usuário
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

  // Abre o modal para editar
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Abre o modal para criar novo usuário
  const handleCreate = () => {
    setEditingUser(null); 
    setShowModal(true);
  };

  // Fecha o modal (usado após salvar ou cancelar)
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  // Submete dados do formulário (criação ou edição)
  const handleFormSubmit = async (userData) => {
    try {
      if(editingUser) {
        // Edição
        await api.put(`/users/${editingUser.id}`, userData);
      } else {
        // Criação
        await api.post('/users', userData);
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Sair</button>
      {/* Botão para criar um novo usuário */}
      <button onClick={handleCreate}>Criar Usuário</button>

      {/* Modal para criação/edição */}
      <UserModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
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
          {users.map((user) => (
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
