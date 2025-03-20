import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiUserPlus, FiChevronDown } from 'react-icons/fi';
import api from '../../services/api';
import UserModal from '../../components/UserModal';
import ConfirmModal from '../../components/ConfirmModal/index.tsx';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css'; 
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { logout, user, login, token } = useAuth(); 

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
      setFilteredUsers(response.data);  
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

  const handleEdit = (u) => {
    setEditingUser(u);
    setShowModal(true);
  };

  const openEditProfile = () => {
    setEditingUser(user); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    if (userToDelete === user?.id) {
      toast.error('Você não pode deletar o usuário atualmente logado!');
      return; 
    }
  
    setLoading(true);
  
    try {
      await api.delete(`/users/${userToDelete}`);
      toast.success('Usuário deletado com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
      toast.error('Falha ao deletar usuário');
    } finally {
      setLoading(false);
      setUserToDelete(null);
      setShowConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowConfirm(false);
  };

  const handleFormSubmit = async (userData) => {
    setLoading(true);

    try {
      if (editingUser) {
        const response = await api.put(`/users/${editingUser.id}`, userData);
        toast.success('Usuário atualizado com sucesso!');
        
        
        if (user?.id === editingUser.id) {
          const updatedUser = response.data;
          login(token, updatedUser); 
        }

      } else {
        await api.post('/users', userData);
        toast.success('Usuário criado com sucesso!');
      }
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
      toast.error('Falha ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((u) => 
      u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);  
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredUsers(users);  
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>X</button>
          )}
        </div>

        <div className="profile-menu">
          <div className="profile-info" onClick={toggleDropdown}>
            <span className="profile-name">{user?.name || 'Usuário'}</span>
            <span className="profile-email">{user?.email || ''}</span>
            <FiChevronDown className="profile-arrow" />
          </div>

          {isDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={openEditProfile}>Atualizar Perfil</button>
              <button onClick={logout}>Sair</button>
            </div>
          )}
        </div>
      </header>

      <UserModal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleFormSubmit} initialData={editingUser} loading={loading} />

      <ConfirmModal isOpen={showConfirm} message="Tem certeza que deseja deletar este usuário?" onClose={handleCancelDelete} onConfirm={handleConfirmDelete} loading={loading} />

      <section className="user-list-section">
        <div className="section-header">
          <h3>Lista de Usuários</h3>
          <button className="create-btn" onClick={handleCreate} disabled={loading}>
            <FiUserPlus size={18} style={{ marginRight: '4px' }}/>
            {loading ? 'Processando...' : 'Criar Usuário'}
          </button>
        </div>

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
            {currentUsers.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1 + indexOfFirstUser}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.type}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(u)}><FiEdit /></button>
                  <button className="action-btn delete-btn" onClick={() => confirmDeleteUser(u.id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="5">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handleClickPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
