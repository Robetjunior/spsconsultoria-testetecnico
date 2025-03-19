// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UserModal from '../components/UserModal';
import ConfirmModal from '../components/ConfirmModal/index.tsx';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);    
  const [showConfirm, setShowConfirm] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null);

  const { logout } = useAuth();

  // Carrega a lista de usuários
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

  // Função para abrir modal de criação
  const handleCreate = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  // Função para abrir modal de edição
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Fecha o modal de criação/edição
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  // Quando clica em "Deletar", apenas abrimos o modal de confirmação
  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  // Se o usuário confirmar a deleção
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await api.delete(`/users/${userToDelete}`);
        fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário', error);
      }
    }
    setUserToDelete(null);
    setShowConfirm(false);
  };

  // Se o usuário cancelar a deleção
  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowConfirm(false);
  };

  // Salva os dados do formulário (criação/edição)
  const handleFormSubmit = async (userData) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, userData);
      } else {
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
      <button onClick={handleCreate}>Criar Usuário</button>

      {/* Modal para criação/edição de usuários */}
      <UserModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        isOpen={showConfirm}
        message="Tem certeza que deseja deletar este usuário?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
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
                <button onClick={() => confirmDeleteUser(user.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
