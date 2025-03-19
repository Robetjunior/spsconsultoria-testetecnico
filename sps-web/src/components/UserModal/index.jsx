// src/components/UserModal/UserModal.jsx
import React from 'react';
import UserForm from '../UserForm';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Cabeçalho flex: X à esquerda, título ao lado */}
        <div className="modal-header">
          <h3 className="modal-title">
            {initialData ? 'Editar Usuário' : 'Cadastrar Usuário'}
          </h3>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        {/* Formulário */}
        <UserForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default UserModal;
