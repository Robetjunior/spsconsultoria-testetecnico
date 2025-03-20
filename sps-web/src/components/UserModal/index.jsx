import React from 'react';
import UserForm from '../UserForm';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {initialData ? 'Editar Usuário' : 'Cadastrar Usuário'}
          </h3>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <UserForm 
          onSubmit={onSubmit} 
          initialData={initialData} 
          loading={loading} 
        />
      </div>
    </div>
  );
};

export default UserModal;
