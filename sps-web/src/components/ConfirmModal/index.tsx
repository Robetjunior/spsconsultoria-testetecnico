import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null; // se não estiver aberto, não renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="button-group">
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onClose}>Não</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
