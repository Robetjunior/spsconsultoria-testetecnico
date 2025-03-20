import React from 'react';
import './ConfirmModal.css';

const Spinner = () => {
  return <div className="spinner" />;
};

const ConfirmModal = ({ isOpen, message, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal-content">
        <h3 className="modal-title">Confirmação</h3>
        <p className="modal-message">{message}</p>
        <div className="button-group">
          <button 
            className="confirm-btn" 
            onClick={onConfirm} 
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
              </>
            ) : (
              'Sim'
            )}
          </button>
          <button 
            className="cancel-btn" 
            onClick={onClose} 
            disabled={loading}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
