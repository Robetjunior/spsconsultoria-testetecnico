import React from 'react';
import UserForm from '../UserForm';
import './UserModal.css'; 

const UserModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content user-modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <UserForm 
          onSubmit={onSubmit}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default UserModal;
