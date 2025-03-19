import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal-content">
        <h3 className="modal-title">Confirmação</h3>
        <p className="modal-message">{message}</p>
        <div className="button-group">
          <button className="confirm-btn" onClick={onConfirm}>Sim</button>
          <button className="cancel-btn" onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
