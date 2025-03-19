import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';
import UserModal from '../../components/UserModal';
import ConfirmModal from '../../components/ConfirmModal/index.tsx';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);    
  const [showConfirm, setShowConfirm] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleCreate = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

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

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowConfirm(false);
  };

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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="header-actions">
          <button className="logout-btn" onClick={logout}>Sair</button>
          <button className="create-btn" onClick={handleCreate}>
            <FiUserPlus size={18} style={{ marginRight: '4px' }}/>
            Criar Usuário
          </button>
        </div>
      </header>

      <UserModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />

      <ConfirmModal
        isOpen={showConfirm}
        message="Tem certeza que deseja deletar este usuário?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <section className="user-list-section">
        <h3>Lista de Usuários</h3>
        <table className="user-table">
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
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(user)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => confirmDeleteUser(user.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
